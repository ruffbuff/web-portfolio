import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

/** index "01", eyebrow/title/linkLabel are ReactNode so they can hold <T k="..." />. */
export function SectionHeading({ index, eyebrow, title, href, linkLabel }: { index: string; eyebrow: ReactNode; title: ReactNode; href?: string; linkLabel?: ReactNode }) {
  return (
    <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-muted-foreground">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
          {eyebrow}
        </p>
        <h2 className="text-gradient mt-5 text-[clamp(2.4rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.06em]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="btn-ghost group w-fit shrink-0">
          {linkLabel} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
    </Reveal>
  )
}
