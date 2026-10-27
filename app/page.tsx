import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GitHubContributions } from '@/components/github-contributions'
import { GitHubRepos } from '@/components/github-repos'
import { HeroTitle } from '@/components/hero-title'
import { Rich, T, Bi } from '@/components/language-provider'
import { Magnetic } from '@/components/magnetic'
import { Marquee } from '@/components/marquee'
import { Parallax } from '@/components/parallax'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Spotlight } from '@/components/spotlight'
import { SvgIcon } from '@/components/ui/svg-icon'
import { roles, site, socials } from '@/lib/site'
import { stackBottom, stackTop } from '@/lib/stack'

const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties

const facts = [
  ['home.facts.focus', 'home.facts.focusValue'],
  ['home.facts.stack', 'home.facts.stackValue'],
  ['home.facts.based', 'home.facts.basedValue'],
]

export default function Page() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center py-16 sm:py-20">
        <Parallax speed={0.18} mouse={30} className="pointer-events-none absolute right-0 top-[36%] hidden size-[20rem] md:block lg:-right-4 lg:size-[26rem]">
          <div className="orb size-full" />
          <div className="orb-ring" />
        </Parallax>
        <Parallax speed={0.06} mouse={-18} className="pointer-events-none absolute right-[-1%] top-[67%] z-20 hidden lg:block">
          <div className="glass chip-float rounded-2xl !bg-black/60 px-4 py-3 font-mono text-[11px]" style={{ '--fd': '-2s' } as React.CSSProperties}>
            <span className="text-primary">Python</span> · <span className="text-[var(--cyan)]">TypeScript</span> · <span className="text-[var(--pink)]">Solidity</span>
          </div>
        </Parallax>
        <Parallax speed={0.1} mouse={-26} className="pointer-events-none absolute right-[3%] top-[7%] z-20 hidden lg:block">
          <div className="glass chip-float flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 text-xs" style={{ '--fd': '-4s' } as React.CSSProperties}>
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Freelance · <Bi v={roles[0].period} />
          </div>
        </Parallax>

        <div className="reveal relative mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-3 pr-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur" style={stagger(0)}>
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <T k="home.badge" />
        </div>

        <HeroTitle />

        <div className="relative mt-12 flex max-w-5xl flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <p className="reveal max-w-md text-base leading-7 text-muted-foreground sm:text-lg" style={stagger(7)}>
            <T k="home.intro" />
          </p>
          <div className="reveal flex flex-wrap items-center gap-3 sm:shrink-0" style={stagger(8)}>
            <Magnetic>
              <Link href="/projects" className="btn-aurora group">
                <T k="home.cta.projects" /> <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/changelog" className="btn-ghost"><T k="home.cta.changelog" /></Link>
            </Magnetic>
          </div>
        </div>

        <div className="reveal absolute inset-x-0 bottom-6 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex" style={stagger(10)}>
          <span className="relative h-8 w-px overflow-hidden bg-white/15"><span className="absolute inset-x-0 top-0 h-3 animate-[scroll-cue_2s_ease-in-out_infinite] bg-primary" /></span>
          <T k="home.scroll" />
        </div>
      </section>

      {/* ───────── Stack: two running lines in opposite directions ───────── */}
      <section aria-label="Stack" className="relative left-1/2 w-screen -translate-x-1/2 border-y border-white/10 bg-white/[0.025] py-10 backdrop-blur-sm sm:py-14">
        <Reveal className="mx-auto mb-8 flex max-w-[88rem] items-center gap-3 px-5 sm:mb-10 sm:px-8">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" /> <T k="home.stack.eyebrow" />
          </p>
          <span className="text-sm text-muted-foreground"><T k="home.stack.title" /></span>
        </Reveal>
        <Reveal className="space-y-3 sm:space-y-4">
          <Marquee items={stackTop} />
          <Marquee items={stackBottom} reverse />
        </Reveal>
      </section>

      {/* ───────── Facts strip ───────── */}
      <Reveal className="mt-20 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {facts.map(([k, v]) => (
          <Spotlight key={k} className="rounded-2xl">
            <span className="spot-ring" />
            <div className="spot-body p-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"><T k={k} /></dt>
              <dd className="mt-2 text-xl font-medium tracking-[-0.03em]"><T k={v} /></dd>
            </div>
          </Spotlight>
        ))}
      </Reveal>

      {/* ───────── About ───────── */}
      <section className="mt-32 sm:mt-44" aria-label="About">
        <SectionHeading index="01" eyebrow={<T k="home.about.eyebrow" />} title={<T k="home.about.title" />} />
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3 text-xl leading-snug tracking-[-0.02em] text-muted-foreground sm:text-2xl">
            <p><Rich k="home.about.1" /></p>
            <p><Rich k="home.about.2" /></p>
            <p><Rich k="home.about.3" /></p>
          </div>
          <p className="border-l border-white/15 pl-6 text-base leading-7 text-muted-foreground sm:text-lg">
            <Rich k="home.about.4" />
          </p>
        </Reveal>
      </section>

      {/* ───────── Latest on GitHub ───────── */}
      <section className="relative mt-32 sm:mt-44" aria-label="Latest on GitHub">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-20 -z-10 size-[34rem] rounded-full bg-[var(--violet)] opacity-[0.16] blur-[120px]" />
        <SectionHeading index="02" eyebrow={<T k="home.repos.eyebrow" />} title={<T k="home.repos.title" />} />
        <GitHubRepos />
      </section>

      {/* ───────── GitHub activity ───────── */}
      <section className="mt-32 sm:mt-44" aria-label="GitHub activity">
        <SectionHeading index="03" eyebrow={<T k="home.activity.eyebrow" />} title={<T k="home.activity.title" />} />
        <Reveal><GitHubContributions /></Reveal>
      </section>

      {/* ───────── Contact / CTA ───────── */}
      <section id="contact" className="mt-32 scroll-mt-28 sm:mt-44" aria-label="Contact">
        <Reveal>
          <Spotlight className="rounded-[2rem]">
            <span className="spot-ring" />
            <div className="spot-body relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16 sm:py-28">
              <div aria-hidden className="pointer-events-none absolute -left-1/4 -top-1/2 size-[40rem] rounded-full bg-[var(--amber)] opacity-20 blur-[120px]" />
              <div aria-hidden className="pointer-events-none absolute -bottom-1/2 -right-1/4 size-[40rem] rounded-full bg-[var(--violet)] opacity-30 blur-[120px]" />
              <p className="eyebrow relative"><T k="home.contact.eyebrow" /></p>
              <h2 className="relative mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,8.5vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.07em]">
                <span className="text-gradient"><T k="home.contact.title1" /></span>
                <br />
                <span className="text-aurora"><T k="home.contact.title2" /></span>
              </h2>
              {/* TODO(owner): CTA copy is a neutral placeholder — replace in lib/translations-v2.ts (home.contact.*) */}
              <p className="relative mx-auto mt-6 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                <T k="home.contact.text" />
              </p>
              <div className="relative mt-10 flex justify-center">
                <Magnetic strength={0.35}>
                  <a href={`mailto:${site.email}`} className="btn-aurora group max-w-full text-sm sm:text-base">
                    <Mail className="size-4 shrink-0" /> <span className="truncate">{site.email}</span>
                    <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
              </div>
              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                {socials.map((s) => (
                  <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-sm">
                    <SvgIcon src={s.icon} size={14} /> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Spotlight>
        </Reveal>
      </section>
    </>
  )
}
