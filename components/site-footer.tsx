import { Mail } from 'lucide-react'
import { SvgIcon } from '@/components/ui/svg-icon'
import { T } from '@/components/language-provider'
import { site, socials } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="relative mt-28 overflow-hidden border-t border-white/10 pt-8">
      <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} RuffBuff. <T k="footer.built" /></p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={`mailto:${site.email}`} aria-label="Email" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Mail className="size-3.5" /> Email
          </a>
          {socials.map((s) => (
            <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <SvgIcon src={s.icon} size={13} className="opacity-70" /> {s.label}
            </a>
          ))}
        </div>
      </div>
      <p aria-hidden className="text-gradient-faint pointer-events-none -mb-[0.16em] mt-8 select-none whitespace-nowrap text-center text-[clamp(4rem,19vw,17rem)] font-semibold leading-[0.8] tracking-[-0.04em] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_95%)]">
        RuffBuff
      </p>
    </footer>
  )
}
