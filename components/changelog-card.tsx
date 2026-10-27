import Link from 'next/link'
import { ArrowUpRight, CloudOff } from 'lucide-react'
import { Spotlight } from '@/components/spotlight'
import { PrivateBadge, StatusBadge, TagList } from '@/components/status-badge'
import { DateText } from '@/components/date-text'
import { T } from '@/components/language-provider'
import type { Changelog } from '@/lib/changelog'

const PREVIEW_MAX = 8

/** Changelog tile: header, summary and a mini "log" preview built from the real latest entries. */
export function ChangelogCard({ b, index }: { b: Changelog; index: number }) {
  // As many entries as fit the height of the preview (whole entries only); the cap keeps the DOM small.
  const latest = b.entries.slice(0, PREVIEW_MAX)
  return (
    <Spotlight className="spot-lift group h-full">
      <span className="spot-ring" />
      <Link href={`/changelog/${b.slug}`} className="spot-body grid h-full gap-8 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:gap-10" data-cursor="hot">
        <div className="flex flex-col">
          <div className="flex items-start gap-5">
            <span className="num-outline text-6xl font-semibold leading-none tracking-[-0.06em] sm:text-7xl">{String(index + 1).padStart(2, '0')}</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <StatusBadge status={b.status} />
              {b.isPrivate && <PrivateBadge />}
              {!b.error && (
                <span className="font-mono text-[11px] text-muted-foreground">
                  {b.entries.length} <T k={b.entries.length === 1 ? 'changelog.entry' : 'changelog.entries'} />
                </span>
              )}
            </div>
          </div>
          <h2 className="mt-8 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{b.title}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{b.summary}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-8">
            <TagList tags={b.tags} />
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-muted-foreground transition-all duration-300 group-hover:rotate-12 group-hover:border-transparent group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
        </div>

        {/* mini log preview: the panel stretches to the height of the card; entries that do not fit wrap into a hidden column, so none is cut in the middle */}
        <div className="relative h-72 rounded-2xl border border-white/10 bg-black/30 font-mono text-[11px] md:h-auto md:min-h-[25rem]" aria-hidden={!b.error}>
          <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>log / latest</span>
            <span>{b.updated ? <DateText date={b.updated} /> : b.entries[0]?.title}</span>
          </div>
          {b.error ? (
            <div className="absolute inset-x-4 top-12 flex items-center gap-3 text-muted-foreground">
              <CloudOff className="size-4 shrink-0" />
              <span className="font-sans text-xs leading-5"><T k="changelog.unavailable" /></span>
            </div>
          ) : (
            <div className="absolute inset-x-4 bottom-3 top-11 overflow-hidden">
              <ol className="ml-2 flex h-full flex-col flex-wrap content-start gap-x-8 gap-y-3 border-l border-white/10 pl-4">
                {latest.map((e, i) => (
                  <li key={e.id} className="relative w-full shrink-0">
                    <span className={`absolute -left-[1.3rem] top-1 size-2 rounded-full ${i === 0 ? 'bg-primary shadow-[0_0_10px_var(--amber)]' : 'bg-white/25'}`} />
                    {e.date && <span className="block text-muted-foreground">{e.date}</span>}
                    <span className="block truncate text-foreground/85">{e.title || '—'}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-px bottom-px h-10 rounded-b-2xl bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </Link>
    </Spotlight>
  )
}
