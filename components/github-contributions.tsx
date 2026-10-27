"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import type { GitHubContribution } from "@/lib/github"
import { cn } from "@/lib/utils"

const DAY_MS = 86_400_000
const LEVELS = [
  "bg-white/[0.06]",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary shadow-[0_0_10px_var(--amber)]",
]

const level = (n: number) => (n <= 0 ? 0 : n <= 3 ? 1 : n <= 6 ? 2 : n <= 9 ? 3 : 4)

type Cell = { date: string; count: number } | null

/** Weeks (Sunday-first) covering the whole year; days outside of the year are null. All maths in UTC. */
function buildWeeks(year: number, data: GitHubContribution[]): Cell[][] {
  const map = new Map(data.map((d) => [d.date, d.count]))
  const jan1 = Date.UTC(year, 0, 1)
  const dec31 = Date.UTC(year, 11, 31)
  const start = jan1 - new Date(jan1).getUTCDay() * DAY_MS
  const weeks: Cell[][] = []
  for (let t = start; t <= dec31; t += 7 * DAY_MS) {
    const week: Cell[] = []
    for (let d = 0; d < 7; d++) {
      const ts = t + d * DAY_MS
      if (ts < jan1 || ts > dec31) week.push(null)
      else {
        const date = new Date(ts).toISOString().slice(0, 10)
        week.push({ date, count: map.get(date) ?? 0 })
      }
    }
    weeks.push(week)
  }
  return weeks
}

const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1)

type Stats = { active: number; longest: number; best: { count: number; date: string } | null; topMonth: { month: number; count: number } | null }

/** Numbers for the stat tiles, from the same data as the heatmap. Days after today (current year) are ignored. */
function computeStats(data: GitHubContribution[]): Stats {
  const today = new Date().toISOString().slice(0, 10)
  const days = data.filter((d) => d.date <= today).sort((a, b) => a.date.localeCompare(b.date))
  let active = 0
  let longest = 0
  let run = 0
  let prev = 0
  let best: Stats["best"] = null
  const months = new Array<number>(12).fill(0)
  for (const d of days) {
    const ts = Date.parse(`${d.date}T00:00:00Z`)
    if (d.count > 0) {
      active++
      run = prev && ts - prev === DAY_MS ? run + 1 : 1
      longest = Math.max(longest, run)
      prev = ts
      if (!best || d.count > best.count) best = { count: d.count, date: d.date }
      months[Number(d.date.slice(5, 7)) - 1] += d.count
    } else {
      run = 0
      prev = 0
    }
  }
  const top = months.reduce((bi, c, i, a) => (c > a[bi] ? i : bi), 0)
  return { active, longest, best, topMonth: months[top] > 0 ? { month: top, count: months[top] } : null }
}

type State = { status: "loading" } | { status: "error"; code?: string } | { status: "ok"; data: GitHubContribution[] }

export function GitHubContributions() {
  const { t, language } = useLanguage()
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)
  const [year, setYear] = useState(currentYear)
  const [state, setState] = useState<State>({ status: "loading" })
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctrl = new AbortController()
    setState({ status: "loading" })
    fetch(`/api/github/contributions?year=${year}`, { signal: ctrl.signal })
      .then(async (r) => {
        if (r.ok) return setState({ status: "ok", data: (await r.json()) as GitHubContribution[] })
        const body = await r.json().catch(() => null)
        setState({ status: "error", code: body?.code })
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setState({ status: "error" })
      })
    return () => ctrl.abort()
  }, [year])

  const weeks = useMemo(() => buildWeeks(year, state.status === "ok" ? state.data : []), [year, state])
  const total = state.status === "ok" ? state.data.reduce((s, d) => s + d.count, 0) : 0
  const monthFmt = useMemo(() => new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-US", { month: "short", timeZone: "UTC" }), [language])
  const stats = useMemo(() => (state.status === "ok" ? computeStats(state.data) : null), [state])
  const locale = language === "ru" ? "ru-RU" : "en-US"
  const longMonth = useMemo(() => new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }), [locale])
  const shortDate = useMemo(() => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", timeZone: "UTC" }), [locale])
  const tiles = [
    { label: t("github.stat.active"), value: stats ? `${stats.active} ${t("github.days")}` : "—" },
    { label: t("github.stat.streak"), value: stats ? `${stats.longest} ${t("github.days")}` : "—" },
    {
      label: t("github.stat.best"),
      value: stats?.best ? String(stats.best.count) : "—",
      note: stats?.best ? shortDate.format(new Date(`${stats.best.date}T00:00:00Z`)) : undefined,
    },
    {
      label: t("github.stat.month"),
      value: stats?.topMonth ? cap(longMonth.format(new Date(Date.UTC(year, stats.topMonth.month, 1)))) : "—",
      note: stats?.topMonth ? String(stats.topMonth.count) : undefined,
    },
  ]
  const monthAt = useMemo(() => {
    const labels: Record<number, string> = {}
    weeks.forEach((w, i) => {
      const first = w.find((c) => c && c.date.endsWith("-01")) ?? null
      if (first) labels[i] = monthFmt.format(new Date(`${first.date}T00:00:00Z`))
    })
    return labels
  }, [weeks, monthFmt])

  // On small screens show the latest part of the year first
  useEffect(() => {
    if (state.status === "ok" && scroller.current) scroller.current.scrollLeft = year === currentYear ? scroller.current.scrollWidth : 0
  }, [state, year, currentYear])

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{t("github.eyebrow")}</p>
          <p className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
            {state.status === "ok" ? (
              <>
                <span className="text-aurora no-glow">{total.toLocaleString(language === "ru" ? "ru-RU" : "en-US")}</span> {t("github.contributionsIn")} {year}
              </>
            ) : (
              <span className="text-muted-foreground">{state.status === "loading" ? t("github.loading") : t("github.unavailable")}</span>
            )}
          </p>
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="sr-only">{t("github.year")}</span>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            className="rounded-full border border-white/10 bg-background/60 px-3 py-1.5 font-mono text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-background">
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div ref={scroller} className="overflow-x-auto pb-2" tabIndex={0} aria-label={t("github.eyebrow")}>
        <div className={cn("min-w-[44rem] transition-opacity duration-300", state.status === "ok" ? "opacity-100" : "opacity-40")}>
          <div className="relative mb-1.5 ml-8 h-4 text-[10px] text-muted-foreground">
            {Object.entries(monthAt).map(([i, label]) => (
              <span key={i} className="absolute top-0" style={{ left: `${(Number(i) / weeks.length) * 100}%` }}>
                {label}
              </span>
            ))}
          </div>
          <div className="flex items-stretch gap-[3px]">
            <div className="grid w-7 shrink-0 grid-rows-7 gap-[3px] pr-1 text-[10px] leading-none text-muted-foreground" aria-hidden>
              {["", t("github.mon"), "", t("github.wed"), "", t("github.fri"), ""].map((d, i) => (
                <span key={i} className="flex items-center">
                  {d}
                </span>
              ))}
            </div>
            <div className="grid min-w-0 flex-1 grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
              {weeks.flatMap((w, wi) =>
                w.map((c, di) =>
                  c ? (
                    <span
                      key={`${wi}-${di}`}
                      title={`${c.date}: ${c.count}`}
                      className={cn("aspect-square w-full rounded-[3px] transition-transform hover:scale-150", LEVELS[level(c.count)])}
                    />
                  ) : (
                    <span key={`${wi}-${di}`} className="aspect-square w-full" />
                  ),
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <span className="min-w-0">{state.status === "error" ? t(state.code === "no-token" && process.env.NODE_ENV !== "production" ? "github.hint.token" : "github.hint") : ""}</span>
        <div className="flex shrink-0 items-center gap-1.5">
          <span>{t("github.less")}</span>
          {LEVELS.map((l, i) => (
            <span key={i} className={cn("size-[11px] rounded-[3px]", l)} />
          ))}
          <span>{t("github.more")}</span>
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 lg:grid-cols-4">
        {tiles.map((x) => (
          <div key={x.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{x.label}</dt>
            <dd className="mt-2 flex flex-wrap items-baseline gap-x-2 text-xl font-medium tracking-[-0.03em] sm:text-2xl">
              {x.value}
              {x.note && <span className="font-mono text-[11px] font-normal normal-case tracking-normal text-muted-foreground">{x.note}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
