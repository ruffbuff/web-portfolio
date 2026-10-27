// Real content of the site (moved from the old pages). Bilingual fields use { en, ru };
// where only the English text existed on the old site, the same text is used for both languages.

export type Bi = { en: string; ru: string }

export const site = {
  name: "RuffBuff",
  email: "ruffgreenw@gmail.com",
  github: "https://github.com/ruffbuff",
  x: "https://x.com/RuffBuff_",
  telegram: "https://t.me/ruffbuff",
  cvFile: "/cv/cv_en.pdf",
}

export const socials = [
  { key: "github", label: "GitHub", href: site.github, icon: "/github.svg" },
  { key: "x", label: "Twitter", href: site.x, icon: "/x.svg" },
  { key: "telegram", label: "Telegram", href: site.telegram, icon: "/telegram.svg" },
]

/** Roles / places of work (the timeline badges of the old home page). `icon` is a lucide-react icon name. */
export const roles: { icon: "Laptop" | "Gamepad2" | "Link2" | "HardHat"; name: string; period: Bi }[] = [
  { icon: "Laptop", name: "Freelance", period: { en: "2025 - Present", ru: "2025 - настоящее время" } },
  { icon: "Gamepad2", name: "DECISON", period: { en: "2022 - Jun 2024", ru: "2022 - июнь 2024" } },
  { icon: "Link2", name: "Blockchain", period: { en: "2020 - 2023", ru: "2020 - 2023" } },
  { icon: "HardHat", name: "Otis", period: { en: "2018 - 2019", ru: "2018 - 2019" } },
]
