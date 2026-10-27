import type { Metadata } from 'next'
import { Bi, T } from '@/components/language-provider'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Spotlight } from '@/components/spotlight'
import { SvgIcon } from '@/components/ui/svg-icon'
import { roles, site } from '@/lib/site'

export const metadata: Metadata = { title: 'Work' }

// Stages of the old "experience" block (texts already exist in en/ru in the translations).
const journey = ['basics', 'trading', 'smart', 'fullstack']

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow={<T k="work.eyebrow" />} title={<T k="work.heading" />} description={<T k="work.description" />} />

      <section aria-label="Roles">
        <SectionHeading index="01" eyebrow={<T k="work.roles.eyebrow" />} title={<T k="work.roles.title" />} />
        <div className="grid gap-3 sm:grid-cols-2">
          {roles.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 80}>
              <Spotlight className="h-full rounded-2xl">
                <span className="spot-ring" />
                <div className="spot-body flex items-center gap-5 p-6">
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-3xl" aria-hidden>{r.emoji}</span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.04em]">{r.name}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground"><Bi v={r.period} /></p>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-28 sm:mt-40" aria-label="Journey">
        <SectionHeading index="02" eyebrow={<T k="work.journey.eyebrow" />} title={<T k="experience.title" />} />
        <ol className="relative space-y-6 pl-6 sm:pl-10">
          <span className="tl-line" aria-hidden />
          {journey.map((j) => (
            <li key={j} className="relative">
              <span className="absolute -left-[1.85rem] top-7 size-3 rounded-full border-2 border-background bg-gradient-to-br from-[var(--amber)] to-[var(--pink)] shadow-[0_0_14px_var(--pink)] sm:-left-[2.85rem]" />
              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5 transition-colors hover:border-white/20 sm:p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary"><T k={`experience.${j}.period`} /></p>
                  <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl"><T k={`experience.${j}.title`} /></h3>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7"><T k={`experience.${j}.description`} /></p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <Reveal className="mt-20 border-t border-white/10 pt-8">
        <p className="mb-4 text-sm text-muted-foreground"><T k="work.links" /></p>
        <div className="flex flex-wrap gap-3">
          <a href={site.x} target="_blank" rel="noopener noreferrer" className="btn-ghost"><SvgIcon src="/x.svg" size={14} /> Twitter</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"><SvgIcon src="/github.svg" size={14} /> GitHub</a>
        </div>
      </Reveal>
    </>
  )
}
