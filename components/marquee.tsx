import type { StackItem } from '@/lib/stack'
import { cn } from '@/lib/utils'

function Icon({ item }: { item: StackItem }) {
  if (item.icon) {
    // brand mark from simple-icons, tinted with the text colour (no external requests)
    return (
      <svg viewBox="0 0 24 24" role="img" aria-hidden className="size-6 shrink-0 fill-current text-foreground/80 transition-colors duration-300 group-hover/chip:text-primary sm:size-7">
        <path d={item.icon.path} />
      </svg>
    )
  }
  const Lucide = item.lucide
  return Lucide ? <Lucide aria-hidden className="size-6 shrink-0 text-foreground/80 transition-colors duration-300 group-hover/chip:text-primary sm:size-7" strokeWidth={1.6} /> : null
}

/**
 * One running line of technologies: icon + name. Pauses on hover; with prefers-reduced-motion it stops
 * and wraps into a static, centred cloud (see .marquee in globals.css). `reverse` runs it the other way.
 */
export function Marquee({ items, reverse = false, label, className }: { items: StackItem[]; reverse?: boolean; label?: string; className?: string }) {
  const track = (hidden: boolean) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined} aria-label={!hidden ? label : undefined}>
      {items.map((item) => (
        <li
          key={item.name}
          className="group/chip flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.08] sm:py-3 sm:pl-5 sm:pr-7"
        >
          <Icon item={item} />
          <span className="whitespace-nowrap text-base font-medium tracking-[-0.03em] text-foreground/90 sm:text-xl">{item.name}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn('marquee', reverse && 'reverse', className)}>
      {track(false)}
      {track(true)}
    </div>
  )
}
