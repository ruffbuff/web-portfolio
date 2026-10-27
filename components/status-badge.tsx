import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { T } from '@/components/language-provider'
import { STATUS_KEY } from '@/lib/format'
import type { ChangelogStatus } from '@/lib/changelog-sources'

const styles: Record<ChangelogStatus, { badge: string; dot: string }> = {
  open: { badge: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300', dot: 'bg-emerald-400 animate-pulse' },
  closed: { badge: 'border-white/10 bg-white/5 text-zinc-400', dot: 'bg-zinc-500' },
  soon: { badge: 'border-primary/30 bg-primary/10 text-primary', dot: 'bg-primary' },
}

export function StatusBadge({ status }: { status: ChangelogStatus }) {
  const s = styles[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]', s.badge)}>
      <span className={cn('size-1.5 rounded-full', s.dot)} />
      <T k={STATUS_KEY[status]} />
    </span>
  )
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-secondary-foreground">
          {tag}
        </span>
      ))}
    </div>
  )
}

/** "private repo" mark: lock icon, no link to the repository. */
export function PrivateBadge({ className }: { className?: string }) {
  return (
    <span title="private" className={cn('inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-300', className)}>
      <Lock className="size-3" aria-hidden />
      <T k="changelog.private" />
    </span>
  )
}
