'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/language-provider'

const links = [
  { href: '/work', key: 'nav.work' },
  { href: '/projects', key: 'nav.projects' },
  { href: '/skills', key: 'nav.skills' },
  { href: '/backlogs', key: 'nav.backlogs' },
  { href: '/cv', key: 'nav.cv' },
]

function LangToggle({ className }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className={cn('flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 font-mono text-[11px]', className)} role="group" aria-label={t('nav.language')}>
      {(['en', 'ru'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLanguage(l)}
          aria-pressed={language === l}
          className={cn('rounded-full px-2.5 py-1.5 uppercase transition-colors', language === l ? 'bg-white/15 text-foreground' : 'text-muted-foreground hover:text-foreground')}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-3 z-40 mt-3 sm:top-4 sm:mt-4">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-background/55 py-2 pl-5 pr-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <Link href="/" className="font-mono text-base font-semibold tracking-[-0.05em]" aria-label={`RuffBuff — ${t('nav.home')}`}>
          RB<span className="text-aurora">.</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex" aria-label="Main navigation">
          {links.map(({ href, key }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground',
                  active && 'bg-white/10 text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset]',
                )}
              >
                {t(key)}
              </Link>
            )
          })}
          <LangToggle className="ml-2" />
          <Link href="/#contact" className="ml-1 rounded-full bg-foreground px-4 py-2 font-medium text-background transition-transform hover:scale-[1.04]">
            {t('nav.contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t('nav.menu')}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-foreground"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="mt-2 rounded-3xl border border-white/10 bg-background/85 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl md:hidden">
          {[{ href: '/', key: 'nav.home' }, ...links, { href: '/#contact', key: 'nav.contact' }].map(({ href, key }) => {
            const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn('block rounded-2xl px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground', active && 'bg-white/10 text-foreground')}
              >
                {t(key)}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
