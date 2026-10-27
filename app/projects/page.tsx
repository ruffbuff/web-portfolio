import type { Metadata } from 'next'
import { T } from '@/components/language-provider'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { Reveal } from '@/components/reveal'
import { getProjects } from '@/lib/projects'

export const metadata: Metadata = { title: 'Projects' }

export default function ProjectsPage() {
  const projects = getProjects()
  return (
    <>
      <PageHero eyebrow={<T k="projects.eyebrow" />} title={<T k="projects.heading" />} description={<T k="projects.description" />} />
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Projects">
        {projects.length === 0 && <p className="text-sm text-muted-foreground"><T k="projects.empty" /></p>}
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 100}>
            <ProjectCard p={p} index={i} className="h-full" />
          </Reveal>
        ))}
      </section>
    </>
  )
}
