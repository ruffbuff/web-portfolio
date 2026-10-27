import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { DateText } from '@/components/date-text'
import type { Backlog } from '@/lib/backlogs'

/** One line of the "latest backlogs" list on the home page. */
export function BacklogRow({ b, index }: { b: Backlog; index: number }) {
  return (
    <Link href={`/backlogs/${b.slug}`} data-cursor="hot" className="row-link group grid items-center gap-x-8 gap-y-3 py-7 sm:grid-cols-[4.5rem_1fr_auto_auto] sm:py-9">
      <span className="num-outline text-4xl font-semibold leading-none tracking-[-0.06em] sm:text-5xl">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3 className="text-2xl font-medium tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{b.title}</h3>
        <p className="mt-1.5 line-clamp-1 max-w-xl text-sm text-muted-foreground">{b.summary}</p>
      </div>
      <div className="flex items-center gap-4">
        <StatusBadge status={b.status} />
        <span className="hidden font-mono text-[11px] text-muted-foreground md:inline"><DateText date={b.updated} /></span>
      </div>
      <span className="hidden size-12 items-center justify-center rounded-full border border-white/15 text-muted-foreground transition-all duration-300 group-hover:rotate-12 group-hover:border-transparent group-hover:bg-primary group-hover:text-primary-foreground sm:inline-flex">
        <ArrowUpRight className="size-5" />
      </span>
    </Link>
  )
}
