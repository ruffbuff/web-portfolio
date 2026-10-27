import { ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/spotlight'
import { TagList } from '@/components/status-badge'
import type { Project } from '@/lib/projects'
import { cn } from '@/lib/utils'

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/** Project card: screenshot, title, description, tags; the whole card links to the live site. */
export function ProjectCard({ p, index, className }: { p: Project; index: number; className?: string }) {
  const host = hostOf(p.url)
  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={`${p.title} preview`}
            loading="lazy"
            className={cn('size-full transition-transform duration-700 group-hover:scale-[1.04]', p.contain ? 'object-contain p-8' : 'object-cover')}
          />
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-3 pt-6 sm:px-3">
        <div className="flex items-start justify-between gap-4">
          <span className="num-outline text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-6xl">{String(index + 1).padStart(2, '0')}</span>
          {p.url && (
            <span className="mt-1 inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-muted-foreground transition-all duration-300 group-hover:rotate-12 group-hover:border-transparent group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-5" />
            </span>
          )}
        </div>
        {host && <p className="eyebrow mt-6">{host}</p>}
        <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{p.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{p.description}</p>
        {p.tags.length > 0 && <div className="mt-auto pt-6"><TagList tags={p.tags} /></div>}
      </div>
    </>
  )

  return (
    <Spotlight as="article" className={cn('spot-lift group flex flex-col', className)}>
      <span className="spot-ring" />
      {p.url ? (
        <a href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="hot" className="spot-body flex h-full flex-col p-3 sm:p-4" aria-label={`${p.title} — ${host}`}>
          {inner}
        </a>
      ) : (
        <div className="spot-body flex h-full flex-col p-3 sm:p-4">{inner}</div>
      )}
    </Spotlight>
  )
}
