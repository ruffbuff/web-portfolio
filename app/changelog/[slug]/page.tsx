import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CloudOff, Github } from 'lucide-react'
import { Markdown } from '@/components/markdown'
import { Reveal } from '@/components/reveal'
import { ScrollProgress } from '@/components/scroll-progress'
import { PrivateBadge, StatusBadge, TagList } from '@/components/status-badge'
import { DateText } from '@/components/date-text'
import { T } from '@/components/language-provider'
import { changelogSlugs, getChangelog } from '@/lib/changelog'

export const dynamicParams = false
// Text comes from GitHub: built once, then refreshed in the background every hour (ISR).
export const revalidate = 3600

export function generateStaticParams() {
  return changelogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const b = await getChangelog(slug)
  return b ? { title: b.title, description: b.summary } : {}
}

export default async function ChangelogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const b = await getChangelog(slug)
  if (!b) notFound()

  return (
    <article className="pt-10 sm:pt-16">
      <ScrollProgress />
      <Link href="/changelog" className="reveal inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-3.5" /> <T k="changelog.back" />
      </Link>

      <header className="pb-12 pt-8 sm:pb-16">
        <div className="reveal flex flex-wrap items-center gap-3" style={{ '--i': 1 } as React.CSSProperties}>
          <StatusBadge status={b.status} />
          {b.isPrivate && <PrivateBadge />}
          <span className="font-mono text-[11px] text-muted-foreground">
            {b.started && <><T k="changelog.started" /> <DateText date={b.started} /> · <T k="changelog.updated" /> <DateText date={b.updated} /></>}
          </span>
        </div>
        <h1 className="text-gradient reveal mt-6 max-w-5xl text-[clamp(3rem,10vw,8rem)] font-medium leading-[0.88] tracking-[-0.075em]" style={{ '--i': 2 } as React.CSSProperties}>
          {b.title}
        </h1>
        <p className="reveal mt-5 max-w-xl text-base leading-7 text-muted-foreground" style={{ '--i': 3 } as React.CSSProperties}>{b.summary}</p>
        <div className="reveal mt-6 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ '--i': 4 } as React.CSSProperties}>
          <TagList tags={b.tags} />
          {b.repoUrl ? (
            <a href={b.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3 !py-1.5 text-xs">
              <Github className="size-3.5" /> <T k="changelog.repo" />
            </a>
          ) : (
            b.isPrivate && <span className="text-xs text-muted-foreground"><T k="changelog.privateHint" /></span>
          )}
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_16rem]">
        <div className="min-w-0">
          {b.intro && (
            <div className="reveal relative mb-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6 sm:p-8" style={{ '--i': 5 } as React.CSSProperties}>
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[var(--pink)] opacity-20 blur-3xl" />
              <div className="relative"><Markdown>{b.intro}</Markdown></div>
            </div>
          )}

          <h2 className="eyebrow mb-8"><T k="changelog.log" /></h2>
          {b.error && b.error !== 'empty' && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8" role="status">
              <p className="flex items-center gap-3 text-lg font-medium tracking-[-0.03em]"><CloudOff className="size-5 text-muted-foreground" /> <T k="changelog.unavailable" /></p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground"><T k="changelog.unavailableHint" /></p>
            </div>
          )}
          <ol className="relative space-y-6 pl-6 sm:pl-10">
            <span className="tl-line" aria-hidden />
            {b.entries.map((e) => (
              <li key={e.id} id={e.id} className="relative scroll-mt-28">
                <span className="absolute -left-[1.85rem] top-7 size-3 rounded-full border-2 border-background bg-gradient-to-br from-[var(--amber)] to-[var(--pink)] shadow-[0_0_14px_var(--pink)] sm:-left-[2.85rem]" />
                <Reveal>
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5 transition-colors hover:border-white/20 sm:p-7">
                    <time dateTime={e.date} className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary"><DateText date={e.date} /></time>
                    {e.title && <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{e.title}</h3>}
                    {e.body && <div className="mt-4"><Markdown>{e.body}</Markdown></div>}
                  </div>
                </Reveal>
              </li>
            ))}
            {b.entries.length === 0 && !b.error && <li className="text-sm text-muted-foreground"><T k="changelog.noEntries" /></li>}
          </ol>
        </div>

        {b.entries.length > 1 && (
          <aside className="hidden lg:block">
            <nav className="sticky top-28 text-sm" aria-label="Entries">
              <p className="eyebrow mb-4"><T k="changelog.entriesNav" /></p>
              <ul className="space-y-2 border-l border-border">
                {b.entries.map((e) => (
                  <li key={e.id}>
                    <a href={`#${e.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                      <span className="block font-mono text-[11px]">{e.date}</span>
                      <span className="line-clamp-1">{e.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </article>
  )
}
