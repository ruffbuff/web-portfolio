import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { GitHubRepos } from '@/components/github-repos'
import { T } from '@/components/language-provider'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { projects, site } from '@/lib/site'

export const metadata: Metadata = { title: 'Projects' }

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow={<T k="projects.eyebrow" />} title={<T k="projects.heading" />} description={<T k="projects.description" />} />
      <section className="grid gap-4 md:grid-cols-2" aria-label="Projects">
        {projects.map((p, i) => (
          <Reveal key={p.number} delay={(i % 2) * 100} className={i === 0 ? 'md:col-span-2' : ''}>
            <ProjectCard p={p} large={i === 0} className="h-full" />
          </Reveal>
        ))}
      </section>

      <section className="mt-28 sm:mt-40" aria-label="GitHub">
        <SectionHeading index="02" eyebrow={<T k="home.repos.eyebrow" />} title={<T k="projects.github.title" />} />
        <GitHubRepos />
        <Reveal className="mt-10">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-ghost group w-fit">
            <T k="projects.github.link" /> <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </section>
    </>
  )
}
