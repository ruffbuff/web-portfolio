'use client'

import { useLanguage } from '@/components/language-provider'

const w = (i: number) => ({ '--w': i }) as React.CSSProperties

function Word({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <span className="word" style={w(i)}>
      <span className={className}>{children}</span>
    </span>
  )
}

/** Animated hero headline, translated: the text of `home.title` is split into words (a "|" marks the line break). */
export function HeroTitle() {
  const { t } = useLanguage()
  const words = t('home.title').split(/\s+/)
  return (
    <h1 key={words.join(' ')} className="relative z-10 max-w-6xl text-[clamp(3.1rem,11.5vw,10.5rem)] font-medium leading-[0.84] tracking-[-0.08em]">
      {words.map((word, i) => {
        const br = word.endsWith('|')
        const text = br ? word.slice(0, -1) : word
        const cls = i === 0 ? 'text-aurora no-glow' : i === words.length - 1 ? 'text-outline' : 'text-gradient'
        return (
          <span key={i}>
            <Word i={i} className={cls}>{text}</Word>
            {br ? <br /> : ' '}
          </span>
        )
      })}
    </h1>
  )
}
