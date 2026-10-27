import type { Metadata } from 'next'
import { ChangelogCard } from '@/components/changelog-card'
import { BorderBeamWrapper } from '@/components/border-beam-wrapper'
import { T } from '@/components/language-provider'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { getChangelogs } from '@/lib/changelog'

export const metadata: Metadata = { title: 'Changelog' }

// Texts are loaded from GitHub at build time and refreshed in the background once an hour.
export const revalidate = 3600

export default async function ChangelogPage() {
  const changelogs = await getChangelogs()

  return (
    <>
      <PageHero eyebrow={<T k="changelog.eyebrow" />} title={<T k="changelog.heading" />} description={<T k="changelog.description" />} />
      <section className="grid gap-4" aria-label="Changelog">
        {changelogs.length === 0 && <p className="text-sm text-muted-foreground"><T k="changelog.empty" /></p>}
        {changelogs.map((b, i) => (
          <Reveal key={b.slug}>
            {b.status === 'open' ? (
              <BorderBeamWrapper size="line" colorVariant="sunset" theme="dark" strength={0.55} className="rounded-3xl">
                <ChangelogCard b={b} index={i} />
              </BorderBeamWrapper>
            ) : (
              <ChangelogCard b={b} index={i} />
            )}
          </Reveal>
        ))}
      </section>
    </>
  )
}
