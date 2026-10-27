"use client"

import { useLanguage } from "@/components/language-provider"
import { formatDate } from "@/lib/format"

/** Localised date inside server components: <DateText date="2026-10-27" /> */
export function DateText({ date }: { date: string }) {
  const { language } = useLanguage()
  return <>{formatDate(date, language)}</>
}
