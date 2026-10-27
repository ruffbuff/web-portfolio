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

type State = { status: "loading" } | { status: "error" } | { status: "ok"; data: GitHubContribution[] }

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
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: GitHubContribution[]) => setState({ status: "ok", data }))
      .catch((e) => {
        if (e?.name !== "AbortError") setState({ status: "error" })
      })
    return () => ctrl.abort()
  }, [year])

  const weeks = useMemo(() => buildWeeks(year, state.status === "ok" ? state.data : []), [year, state])
  const total = state.status === "ok" ? state.data.reduce((s, d) => s + d.count, 0) : 0
  const monthFmt = useMemo(() => new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-US", { month: "short", timeZone: "UTC" }), [language])
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
        <div className={cn("w-max transition-opacity duration-300", state.status === "ok" ? "opacity-100" : "opacity-40")}>
          <div className="relative mb-1.5 ml-8 h-4 text-[10px] text-muted-foreground">
            {Object.entries(monthAt).map(([i, label]) => (
              <span key={i} className="absolute top-0" style={{ left: `${Number(i) * 14}px` }}>
                {label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="flex w-7 flex-col gap-[3px] pr-1 text-[10px] leading-[11px] text-muted-foreground" aria-hidden>
              {["", t("github.mon"), "", t("github.wed"), "", t("github.fri"), ""].map((d, i) => (
                <span key={i} className="h-[11px]">
                  {d}
                </span>
              ))}
            </div>
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {w.map((c, di) =>
                  c ? (
                    <span
                      key={di}
                      title={`${c.date}: ${c.count}`}
                      className={cn("size-[11px] rounded-[3px] transition-transform hover:scale-150", LEVELS[level(c.count)])}
                    />
                  ) : (
                    <span key={di} className="size-[11px]" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <span className="min-w-0 truncate">{state.status === "error" ? t("github.hint") : ""}</span>
        <div className="flex shrink-0 items-center gap-1.5">
          <span>{t("github.less")}</span>
          {LEVELS.map((l, i) => (
            <span key={i} className={cn("size-[11px] rounded-[3px]", l)} />
          ))}
          <span>{t("github.more")}</span>
        </div>
      </div>
    </div>
  )
}
