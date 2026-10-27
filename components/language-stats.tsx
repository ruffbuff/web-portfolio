"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { getLanguageColor } from "@/lib/github"

type Stats = Record<string, number>

/** Top languages across public repositories (GitHub API /api/github/languages). */
export function LanguageStats() {
  const { t } = useLanguage()
  const [stats, setStats] = useState<Stats | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch("/api/github/languages", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Stats) => setStats(d))
      .catch((e) => {
        if (e?.name !== "AbortError") setFailed(true)
      })
    return () => ctrl.abort()
  }, [])

  if (failed) return <p className="text-sm text-muted-foreground">{t("skills.languages.unavailable")}</p>
  if (!stats) return <p className="text-sm text-muted-foreground">{t("skills.languages.loading")}</p>

  const sorted = Object.entries(stats).sort(([, a], [, b]) => b - a).slice(0, 8)
  const total = sorted.reduce((s, [, b]) => s + b, 0) || 1
  if (sorted.length === 0) return <p className="text-sm text-muted-foreground">{t("skills.languages.unavailable")}</p>

  return (
    <div className="space-y-5">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]" role="img" aria-label="Language breakdown">
        {sorted.map(([lang, bytes]) => (
          <span key={lang} style={{ width: `${(bytes / total) * 100}%`, backgroundColor: getLanguageColor(lang) }} title={lang} />
        ))}
      </div>
      <ul className="flex flex-wrap gap-2">
        {sorted.map(([lang, bytes]) => (
          <li key={lang} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-sm">
            <span className="size-2 rounded-full" style={{ backgroundColor: getLanguageColor(lang) }} />
            {lang}
            <span className="font-mono text-[11px] text-muted-foreground">{((bytes / total) * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
