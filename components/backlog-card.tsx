import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/spotlight'
import { StatusBadge, TagList } from '@/components/status-badge'
import { DateText } from '@/components/date-text'
import { T } from '@/components/language-provider'
import type { Backlog } from '@/lib/backlogs'

/** Backlog tile: header, summary and a mini "log" preview built from the real latest entries. */
export function BacklogCard({ b, index }: { b: Backlog; index: number }) {
  const latest = b.entries.slice(0, 3)
  return (
    <Spotlight className="spot-lift group h-full">
      <span className="spot-ring" />
      <Link href={`/backlogs/${b.slug}`} className="spot-body grid h-full gap-8 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:gap-10" data-cursor="hot">
        <div className="flex flex-col">
          <div className="flex items-start gap-5">
            <span className="num-outline text-6xl font-semibold leading-none tracking-[-0.06em] sm:text-7xl">{String(index + 1).padStart(2, '0')}</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <StatusBadge status={b.status} />
              <span className="font-mono text-[11px] text-muted-foreground">
                {b.entries.length} <T k={b.entries.length === 1 ? 'backlogs.entry' : 'backlogs.entries'} />
              </span>
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

        {/* mini log preview */}
        <div className="relative rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-[11px]" aria-hidden>
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>log / latest</span>
            <span><DateText date={b.updated} /></span>
          </div>
          <ol className="relative space-y-3 border-l border-white/10 pl-4">
            {latest.map((e, i) => (
              <li key={e.date + i} className="relative">
                <span className={`absolute -left-[1.3rem] top-1 size-2 rounded-full ${i === 0 ? 'bg-primary shadow-[0_0_10px_var(--amber)]' : 'bg-white/25'}`} />
                <span className="block text-muted-foreground">{e.date}</span>
                <span className="block truncate text-foreground/85">{e.title || '—'}</span>
              </li>
            ))}
            {latest.length === 0 && <li className="text-muted-foreground">—</li>}
          </ol>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-2xl bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </Link>
    </Spotlight>
  )
}
