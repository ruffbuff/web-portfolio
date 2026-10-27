'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { T, useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

const FILES = [
  { lang: 'en', label: 'EN', file: '/cv/cv_en.pdf', name: 'RuffBuff_CV_EN.pdf' },
  { lang: 'ru', label: 'RU', file: '/cv/cv_ru.pdf', name: 'RuffBuff_CV_RU.pdf' },
] as const

/** Two PDF downloads (EN / RU). The one for the current site language is highlighted and goes first in the tab order. */
export function CvDownload() {
  const { language } = useLanguage()
  const [pick, setPick] = useState<'en' | 'ru'>(language)
  useEffect(() => setPick(language), [language])
  const current = FILES.find((f) => f.lang === pick)!

  return (
    <div className="space-y-3">
      <a href={current.file} download={current.name} className="btn-aurora w-full justify-center">
        <Download className="size-4" /> <T k="cv.download" /> ({current.label})
      </a>
      <div role="group" aria-label="PDF language" className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
        {FILES.map((f) => (
          <button
            key={f.lang}
            type="button"
            aria-pressed={pick === f.lang}
            onClick={() => setPick(f.lang)}
            className={cn(
              'rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors',
              pick === f.lang ? 'bg-white/[0.12] text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            PDF {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
