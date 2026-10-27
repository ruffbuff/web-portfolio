import type { ReactNode } from 'react'

export function PageHero({ eyebrow, title, description }: { eyebrow: ReactNode; title: ReactNode; description?: ReactNode }) {
  return (
    <section className="relative pb-14 pt-16 sm:pb-20 sm:pt-28">
      <p className="eyebrow reveal flex items-center gap-3" style={{ '--i': 0 } as React.CSSProperties}>
        <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
        {eyebrow}
      </p>
      <div className="mt-6 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <h1 className="reveal max-w-4xl text-[clamp(3rem,12vw,9.5rem)] font-medium leading-[0.86] tracking-[-0.075em]" style={{ '--i': 1 } as React.CSSProperties}>
          <span className="text-gradient">{title}</span>
        </h1>
        {description && (
          <p className="reveal max-w-xs border-l border-white/15 pl-5 text-sm leading-6 text-muted-foreground" style={{ '--i': 3 } as React.CSSProperties}>{description}</p>
        )}
      </div>
    </section>
  )
}
