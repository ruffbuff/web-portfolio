"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Star, GitFork } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Reveal } from "@/components/reveal"
import { Spotlight } from "@/components/spotlight"
import { SvgIcon } from "@/components/ui/svg-icon"
import { formatDate } from "@/lib/format"
import type { GitHubRepo } from "@/lib/github"

/** Featured repositories from the GitHub API (/api/github/repos?featured=true), as on the old home page. */
export function GitHubRepos() {
  const { t, language } = useLanguage()
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch("/api/github/repos?featured=true", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: GitHubRepo[]) => setRepos(d))
      .catch((e) => {
        if (e?.name !== "AbortError") setFailed(true)
      })
    return () => ctrl.abort()
  }, [])

  if (failed) return <p className="text-sm text-muted-foreground">{t("github.reposUnavailable")}</p>
  if (!repos) return <p className="text-sm text-muted-foreground">{t("github.loadingRepos")}</p>
  if (repos.length === 0) return <p className="text-sm text-muted-foreground">{t("github.noRepos")}</p>

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {repos.map((repo, i) => (
        <Reveal key={repo.id} delay={(i % 2) * 80}>
          <Spotlight as="article" className="spot-lift group h-full">
            <span className="spot-ring" />
            <div className="spot-body flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 break-words text-xl font-medium tracking-[-0.03em] sm:text-2xl">{repo.name}</h3>
                <div className="flex shrink-0 items-center gap-2">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label={`${repo.name} on GitHub`} className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition-colors hover:bg-white/10">
                    <SvgIcon src="/github.svg" size={15} />
                  </a>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label={`${repo.name} demo`} className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{repo.description || t("github.noDescription")}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 font-mono text-[11px] text-muted-foreground">
                {repo.language && <span className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-secondary-foreground">{repo.language}</span>}
                {repo.topics?.slice(0, 3).map((topic) => (
                  <span key={topic} className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-secondary-foreground">{topic}</span>
                ))}
                {repo.stargazers_count > 0 && <span className="inline-flex items-center gap-1"><Star className="size-3" /> {repo.stargazers_count}</span>}
                {repo.forks_count > 0 && <span className="inline-flex items-center gap-1"><GitFork className="size-3" /> {repo.forks_count}</span>}
                <span>{t("github.updated")} {formatDate(repo.updated_at.slice(0, 10), language)}</span>
              </div>
            </div>
          </Spotlight>
        </Reveal>
      ))}
    </div>
  )
}
