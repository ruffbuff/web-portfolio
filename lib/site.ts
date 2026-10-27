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

/** Roles / places of work (the timeline badges of the old home page). */
export const roles: { emoji: string; name: string; period: Bi }[] = [
  { emoji: "💻", name: "Freelance", period: { en: "2025 - Present", ru: "2025 - настоящее время" } },
  { emoji: "🎮", name: "DECISON", period: { en: "2022 - Jun 2024", ru: "2022 - июнь 2024" } },
  { emoji: "⛓️", name: "Blockchain", period: { en: "2020 - 2023", ru: "2020 - 2023" } },
  { emoji: "👷", name: "Otis", period: { en: "2018 - 2019", ru: "2018 - 2019" } },
]

export type Project = {
  number: string
  title: string
  description: string
  imageUrl: string
  /** the logo is a transparent svg: show it "contained" instead of cropped */
  contain?: boolean
  siteUrl: string
}

// Moved as-is from the old /projects page.
export const projects: Project[] = [
  {
    number: "01",
    title: "Auto Newsletter",
    description:
      "Smart automotive news delivered daily. Get personalized automotive news digests, trend analytics, and real-time notifications about the latest industry developments directly to your email-inbox and the platform dashboard.",
    imageUrl: "/carnews.jpg",
    siteUrl: "https://auto-newsletter.com/",
  },
  {
    number: "02",
    title: "NoExplorer",
    description:
      "Open-source, privacy-first search that learns from your intent—without learning about you. A modern search engine that prioritizes user privacy while delivering intelligent results.",
    imageUrl: "/bg-logo.svg",
    contain: true,
    siteUrl: "https://noexplorer.vercel.app/",
  },
  {
    number: "03",
    title: "SO Group",
    description:
      "Turnkey apartment renovation. Designer apartment renovation in Rostov-on-Don. Full process control, material selection and procurement, warranty up to 3 years. Professional construction services.",
    imageUrl: "/slider-4.jpg",
    siteUrl: "https://sogroup-one.vercel.app/",
  },
]

export type SkillGroup = { key: string; title: Bi; items: { name: string; color: string }[] }

// Chips of the old /skills page. "Languages" is filled live from the GitHub API.
export const skillGroups: SkillGroup[] = [
  {
    key: "frameworks",
    title: { en: "Frameworks", ru: "Фреймворки" },
    items: [
      { name: "React", color: "#22d3ee" },
      { name: "Next.js", color: "#ffffff" },
      { name: "Vite", color: "#a855f7" },
      { name: "Node.js", color: "#16a34a" },
      { name: "TailwindCSS", color: "#22d3ee" },
      { name: "Web3", color: "#eab308" },
    ],
  },
  {
    key: "db",
    title: { en: "Database & Tools", ru: "Базы данных и инструменты" },
    items: [
      { name: "Supabase", color: "#22c55e" },
      { name: "NeonDB", color: "#4ade80" },
      { name: "MySQL", color: "#2563eb" },
      { name: "Drizzle", color: "#22c55e" },
      { name: "Prisma", color: "#3b82f6" },
      { name: "DataGrip", color: "#a855f7" },
    ],
  },
  {
    key: "platforms",
    title: { en: "Platforms & OS", ru: "Платформы и ОС" },
    items: [
      { name: "Arch Linux", color: "#2563eb" },
      { name: "Ubuntu", color: "#f97316" },
      { name: "GitHub", color: "#e5e7eb" },
      { name: "Vercel", color: "#e5e7eb" },
      { name: "Netlify", color: "#22c55e" },
    ],
  },
  {
    key: "dev",
    title: { en: "Development & AI", ru: "Разработка и ИИ" },
    items: [
      { name: "Postman", color: "#f97316" },
      { name: "Docker", color: "#3b82f6" },
      { name: "Git", color: "#dc2626" },
      { name: "PostgreSQL", color: "#a855f7" },
      { name: "Neovim", color: "#4ade80" },
      { name: "AI Models", color: "#eab308" },
    ],
  },
  {
    key: "exploring",
    title: { en: "Exploring", ru: "Изучаю" },
    items: [
      { name: "C#", color: "#c084fc" },
      { name: "Java", color: "#ea580c" },
      { name: "Go", color: "#60a5fa" },
      { name: "Rust", color: "#f97316" },
      { name: "WebAssembly", color: "#ef4444" },
      { name: "Blender", color: "#16a34a" },
      { name: "Unreal Engine", color: "#2563eb" },
    ],
  },
]

// The "core" paragraph of the old /skills page, as tiles.
export const coreSkills: { emoji: string; name: string; note: Bi }[] = [
  { emoji: "🐍", name: "Python", note: { en: "Core language: backend development and automation", ru: "Основной язык: бэкенд и автоматизация" } },
  { emoji: "⚛️", name: "React / Next.js", note: { en: "Frontend, with TypeScript and TailwindCSS for styling", ru: "Фронтенд, с TypeScript и TailwindCSS для стилей" } },
  { emoji: "⚡", name: "Supabase · NeonDB · MySQL", note: { en: "Databases", ru: "Базы данных" } },
  { emoji: "💎", name: "Solidity", note: { en: "Smart contracts (also C++, and Lua for scripting)", ru: "Смарт-контракты (а также C++ и Lua для скриптов)" } },
  { emoji: "🐧", name: "Arch Linux", note: { en: "Main development environment", ru: "Основная среда разработки" } },
  { emoji: "🤖", name: "AI/ML models", note: { en: "Passion for exploring their capabilities", ru: "Увлечение: изучаю их возможности" } },
]

/** Running line on the home page. */
export const stack = ["Python", "TypeScript", "React", "Next.js", "Solidity", "Node.js", "Tailwind CSS", "Supabase", "Web3", "Arch Linux"]
