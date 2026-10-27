'use client'

import { useLanguage } from '@/components/language-provider'
import { fmtPeriod } from '@/lib/cv-data'

/** "2026 - Present" in English, "2026 - настоящее время" in Russian */
export function Period({ v }: { v: string }) {
  const { language } = useLanguage()
  return <>{fmtPeriod(v, language)}</>
}
