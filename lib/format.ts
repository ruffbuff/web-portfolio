import type { BacklogStatus } from "@/lib/backlogs"

export type Lang = "en" | "ru"

/** 27 Oct 2026 / 27 окт. 2026 г. — client-safe (does not import fs). */
export function formatDate(date: string, lang: Lang = "en"): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

export const STATUS_KEY: Record<BacklogStatus, string> = {
  open: "backlogs.status.open",
  closed: "backlogs.status.closed",
  soon: "backlogs.status.soon",
}
