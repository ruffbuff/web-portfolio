import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Marquee({ items, reverse = false, outline = false, className }: { items: string[]; reverse?: boolean; outline?: boolean; className?: string }) {
  const track = (hidden: boolean) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10">
          <span className={cn('whitespace-nowrap text-4xl font-medium tracking-[-0.05em] sm:text-6xl', outline ? 'text-outline' : 'text-foreground/90')}>{item}</span>
          <Sparkles className="size-5 shrink-0 text-primary" />
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
