import type { Metadata } from 'next'
import { Bi, T } from '@/components/language-provider'
import { LanguageStats } from '@/components/language-stats'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Spotlight } from '@/components/spotlight'
import { coreSkills, skillGroups } from '@/lib/site'

export const metadata: Metadata = { title: 'Skills' }

export default function SkillsPage() {
  return (
    <>
      <PageHero eyebrow={<T k="skills.eyebrow" />} title={<T k="skills.heading" />} description={<T k="skills.description" />} />

      <section aria-label="Core skills">
        <SectionHeading index="01" eyebrow={<T k="skills.core.eyebrow" />} title={<T k="skills.core.title" />} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coreSkills.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 80}>
              <Spotlight className="spot-lift h-full rounded-2xl">
                <span className="spot-ring" />
                <div className="spot-body p-6">
                  <span className="text-3xl" aria-hidden>{s.emoji}</span>
                  <h3 className="mt-5 text-xl font-medium tracking-[-0.03em]">{s.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground"><Bi v={s.note} /></p>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-28 sm:mt-40" aria-label="Languages">
        <SectionHeading index="02" eyebrow={<T k="skills.languages.eyebrow" />} title={<T k="skills.languages.title" />} />
        <Reveal><LanguageStats /></Reveal>
      </section>

      <section className="mt-28 sm:mt-40" aria-label="Stack">
        <SectionHeading index="03" eyebrow={<T k="skills.stack.eyebrow" />} title={<T k="skills.stack.title" />} />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {skillGroups.map((g) => (
            <Reveal key={g.key} className="grid gap-4 py-7 sm:grid-cols-[14rem_1fr] sm:gap-10 sm:py-9">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">&lt;<Bi v={g.title} />/&gt;</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item.name} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-sm">
                    <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
