import type { Metadata } from 'next'
import { Download, Gamepad2, HardHat, Laptop, Link2, Trophy, type LucideIcon } from 'lucide-react'
import { Bi, T } from '@/components/language-provider'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Spotlight } from '@/components/spotlight'
import {
  cvContacts, cvCoreLanguages, cvEducation, cvExperience, cvHackathons, cvPersonal, cvSkillBlocks, cvSpoken,
} from '@/lib/cv-data'
import { roles, site } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'CV' }

const ICONS: Record<string, LucideIcon> = { Laptop, Gamepad2, Link2, HardHat, Trophy }

// Stages of the former /work "experience" block (texts live in the translations).
const journey = ['basics', 'trading', 'smart', 'fullstack']

type Item = { title: string; period: string; text: string; highlight?: boolean }

function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative space-y-5 pl-6 sm:pl-10">
      <span className="tl-line" aria-hidden />
      {items.map((it) => (
        <li key={it.title} className="relative">
          <span className="absolute -left-[1.85rem] top-7 size-3 rounded-full border-2 border-background bg-gradient-to-br from-[var(--amber)] to-[var(--pink)] shadow-[0_0_14px_var(--pink)] sm:-left-[2.85rem]" />
          <Reveal>
            <div className={cn('rounded-3xl border bg-gradient-to-br from-white/[0.05] to-transparent p-5 transition-colors hover:border-white/20 sm:p-6', it.highlight ? 'border-primary/30' : 'border-white/10')}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{it.period}</p>
              <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] sm:text-2xl">{it.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{it.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

function KeyValue({ rows }: { rows: { k: string; v: string; href?: string }[] }) {
  return (
    <dl className="space-y-3 text-sm">
      {rows.map((r) => (
        <div key={r.k} className="flex flex-col gap-0.5">
          <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{r.k}</dt>
          <dd className="break-words">
            {r.href ? (
              <a href={r.href} target={r.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className="underline-offset-4 transition-colors hover:text-primary hover:underline">{r.v}</a>
            ) : (
              r.v
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default function CvPage() {
  return (
    <>
      <PageHero eyebrow={<T k="cv.eyebrow" />} title={<T k="cv.heading" />} description={<T k="cv.description" />} />

      <div className="grid gap-12 lg:grid-cols-[18rem_1fr]">
        {/* Sidebar: personal info, contacts, spoken languages, download */}
        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <Spotlight className="rounded-3xl">
            <span className="spot-ring" />
            <div className="spot-body space-y-8 p-6">
              <div>
                <p className="eyebrow mb-4"><T k="cv.personal" /></p>
                <KeyValue rows={cvPersonal} />
              </div>
              <div>
                <p className="eyebrow mb-4"><T k="cv.contacts" /></p>
                <KeyValue rows={cvContacts} />
              </div>
              <div>
                <p className="eyebrow mb-4"><T k="cv.spoken" /></p>
                <KeyValue rows={cvSpoken} />
              </div>
            </div>
          </Spotlight>
          {/* The RU PDF (cv_ru.pdf) is not in the repo: both languages download the English CV. */}
          <a href={site.cvFile} download="RuffBuff_CV.pdf" className="btn-aurora w-full justify-center">
            <Download className="size-4" /> <T k="cv.download" />
          </a>
        </aside>

        <div className="min-w-0 space-y-28 sm:space-y-36">
          <section aria-label="Experience">
            <SectionHeading index="01" eyebrow={<T k="cv.experience.eyebrow" />} title={<T k="cv.experience.title" />} />
            <Timeline items={cvExperience} />
          </section>

          <section aria-label="Roles">
            <SectionHeading index="02" eyebrow={<T k="cv.roles.eyebrow" />} title={<T k="cv.roles.title" />} />
            <div className="grid gap-3 sm:grid-cols-2">
              {roles.map((r, i) => {
                const Icon = ICONS[r.icon]
                return (
                  <Reveal key={r.name} delay={(i % 2) * 80}>
                    <Spotlight className="h-full rounded-2xl">
                      <span className="spot-ring" />
                      <div className="spot-body flex items-center gap-5 p-6">
                        <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-primary" aria-hidden><Icon className="size-6" /></span>
                        <div>
                          <h3 className="text-2xl font-medium tracking-[-0.04em]">{r.name}</h3>
                          <p className="mt-1 font-mono text-xs text-muted-foreground"><Bi v={r.period} /></p>
                        </div>
                      </div>
                    </Spotlight>
                  </Reveal>
                )
              })}
            </div>
          </section>

          <section aria-label="Journey">
            <SectionHeading index="03" eyebrow={<T k="cv.journey.eyebrow" />} title={<T k="experience.title" />} />
            <ol className="relative space-y-5 pl-6 sm:pl-10">
              <span className="tl-line" aria-hidden />
              {journey.map((j) => (
                <li key={j} className="relative">
                  <span className="absolute -left-[1.85rem] top-7 size-3 rounded-full border-2 border-background bg-gradient-to-br from-[var(--amber)] to-[var(--pink)] shadow-[0_0_14px_var(--pink)] sm:-left-[2.85rem]" />
                  <Reveal>
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5 transition-colors hover:border-white/20 sm:p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary"><T k={`experience.${j}.period`} /></p>
                      <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] sm:text-2xl"><T k={`experience.${j}.title`} /></h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground"><T k={`experience.${j}.description`} /></p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          <section aria-label="Education">
            <SectionHeading index="04" eyebrow={<T k="cv.education.eyebrow" />} title={<T k="cv.education.title" />} />
            <Timeline items={cvEducation} />
          </section>

          <section aria-label="Skills">
            <SectionHeading index="05" eyebrow={<T k="cv.skills.eyebrow" />} title={<T k="cv.skills.title" />} />
            <div className="grid gap-3 sm:grid-cols-2">
              {cvCoreLanguages.map((l) => (
                <Reveal key={l.name}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-lg font-medium tracking-[-0.03em]">{l.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{l.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {cvSkillBlocks.map((b) => (
                <Reveal key={b.title} className="grid gap-2 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8">
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{b.title}</h3>
                  <p className="text-sm leading-6">{b.text}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section aria-label="Hackathons">
            <SectionHeading index="06" eyebrow={<T k="cv.hackathons.eyebrow" />} title={<T k="cv.hackathons.title" />} />
            <div className="grid gap-4 md:grid-cols-2">
              {cvHackathons.map((h) => (
                <Reveal key={h.title}>
                  <Spotlight className="spot-lift h-full rounded-3xl">
                    <span className="spot-ring" />
                    <a href={h.href} target="_blank" rel="noopener noreferrer" data-cursor="hot" className="spot-body block h-full p-6">
                      <span className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-primary" aria-hidden>
                        {(() => { const Icon = ICONS[h.icon]; return <Icon className="size-6" /> })()}
                      </span>
                      <h3 className="mt-4 text-xl font-medium tracking-[-0.03em]">{h.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{h.text}</p>
                    </a>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
