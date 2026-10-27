import type { Metadata } from 'next'
import { BacklogCard } from '@/components/backlog-card'
import { BorderBeamWrapper } from '@/components/border-beam-wrapper'
import { T } from '@/components/language-provider'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { getBacklogs } from '@/lib/backlogs'

export const metadata: Metadata = { title: 'Backlogs' }

export default function BacklogsPage() {
  const backlogs = getBacklogs()

  return (
    <>
      <PageHero eyebrow={<T k="backlogs.eyebrow" />} title={<T k="backlogs.heading" />} description={<T k="backlogs.description" />} />
      <section className="grid gap-4" aria-label="Backlogs">
        {backlogs.length === 0 && <p className="text-sm text-muted-foreground"><T k="backlogs.empty" /></p>}
        {backlogs.map((b, i) => (
          <Reveal key={b.slug}>
            {b.status === 'open' ? (
              <BorderBeamWrapper size="line" colorVariant="sunset" theme="dark" strength={0.55} className="rounded-3xl">
                <BacklogCard b={b} index={i} />
              </BorderBeamWrapper>
            ) : (
              <BacklogCard b={b} index={i} />
            )}
          </Reveal>
        ))}
      </section>
    </>
  )
}
