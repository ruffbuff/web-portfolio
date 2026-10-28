// Content of the /cv page. Long texts are { en, ru }; the same data feeds the PDF (scripts/generate-cv.ts, English).

export type Bi = { en: string; ru: string }

export type Lang = "en" | "ru"
export type Row = { k: Bi; v: Bi; href?: string }

/** Name as on the site (same values as the "cv.name" translation). */
export const cvName: Bi = { en: "Sergei Avramtsuk", ru: "Сергей Аврамчук" }

/** "2024 - Present" -> "2024 - настоящее время" for the Russian version. */
export const fmtPeriod = (period: string, lang: Lang) =>
  lang === "ru" ? period.replace("Present", "настоящее время") : period

export const cvPersonal: Row[] = [
  { k: { en: "Age", ru: "Возраст" }, v: { en: "23 years old", ru: "23 года" } },
  { k: { en: "Location", ru: "Локация" }, v: { en: "Europe", ru: "Европа" } },
  { k: { en: "Role", ru: "Роль" }, v: { en: "Full Stack Developer & Blockchain Engineer", ru: "Full Stack разработчик и Blockchain-инженер" } },
  { k: { en: "Status", ru: "Статус" }, v: { en: "Available for hire", ru: "Открыт к предложениям" } },
]

const same = (v: string): Bi => ({ en: v, ru: v })

export const cvContacts: Row[] = [
  { k: { en: "Email", ru: "Почта" }, v: same("ruffgreenw@gmail.com"), href: "mailto:ruffgreenw@gmail.com" },
  { k: same("Telegram"), v: same("@ruffbuff"), href: "https://t.me/ruffbuff" },
  { k: same("GitHub"), v: same("github.com/ruffbuff"), href: "https://github.com/ruffbuff" },
  { k: same("Twitter"), v: same("@RuffBuff_"), href: "https://x.com/RuffBuff_" },
]

export type Item = { title: Bi; period: string; text: Bi; highlight?: boolean }

// Newest first (by start year), same as cvExperience.
export const cvEducation: Item[] = [
  {
    title: { en: "AI, Agents & Automation Studies", ru: "ИИ, агенты и автоматизация" },
    period: "2026 - Present",
    text: {
      en: "Ongoing self-study in AI and machine learning integration, AI agents and automation, plus reverse engineering and databases. Learning through trial and error and by building real projects.",
      ru: "Постоянное самообучение: интеграция ИИ и машинного обучения, ИИ-агенты и автоматизация, а также reverse engineering и базы данных. Учусь на ошибках и на реальных проектах.",
    },
  },  {
    title: { en: "Blockchain & Smart Contract Development", ru: "Блокчейн и смарт-контракты" },
    period: "2023 - 2024",
    text: {
      en: "Advanced online certification in Solidity programming, DeFi protocols, and blockchain architecture. Focus on security best practices, gas optimization, and integration with Chainlink oracles.",
      ru: "Продвинутая онлайн-сертификация по Solidity, DeFi-протоколам и архитектуре блокчейна. Упор на безопасность, оптимизацию газа и интеграцию оракулов Chainlink.",
    },
    highlight: true,
  },
  {
    title: { en: "Full Stack Web Development Specialization", ru: "Специализация Full Stack Web Development" },
    period: "2022 - 2023",
    text: {
      en: "Comprehensive online program covering modern web development technologies including React, Node.js, databases, and deployment strategies. Completed with distinction and built 12 real-world projects.",
      ru: "Большая онлайн-программа по современной веб-разработке: React, Node.js, базы данных и деплой. Закончил с отличием и собрал 12 реальных проектов.",
    },
    highlight: true,
  },
  {
    title: { en: "Self-Taught Computer Science & Systems Engineering", ru: "Самообучение: Computer Science и системная инженерия" },
    period: "2019 - Present",
    text: {
      en: "Self-directed learning through online resources, documentation, and hands-on projects. Focused on algorithms, data structures, system design, and software engineering principles through practical application.",
      ru: "Самостоятельное обучение по онлайн-ресурсам, документации и практическим проектам. Алгоритмы, структуры данных, проектирование систем и инженерные принципы через практику.",
    },
  },
]

export const cvCoreLanguages: { name: string; text: Bi }[] = [
  { name: "Python", text: { en: "Backend development, automation, AI/ML integration, AI agents", ru: "Бэкенд, автоматизация, интеграция ИИ/ML, ИИ-агенты" } },
  { name: "JavaScript/TypeScript", text: { en: "Full-stack development, modern frameworks", ru: "Full-stack разработка, современные фреймворки" } },
  { name: "Solidity", text: { en: "Smart contract development, DeFi protocols", ru: "Смарт-контракты, DeFi-протоколы" } },
  { name: "C++, Lua, Bash", text: { en: "Systems programming and scripting", ru: "Системное программирование и скрипты" } },
]

export const cvSkillBlocks: { title: Bi; text: Bi }[] = [
  {
    title: { en: "Frontend & Frameworks", ru: "Фронтенд и фреймворки" },
    text: {
      en: "React.js, Next.js 15, Vite, TailwindCSS, Framer Motion, Web3 integration, Responsive design, Performance optimization",
      ru: "React.js, Next.js 15, Vite, TailwindCSS, Framer Motion, Web3-интеграция, адаптивная вёрстка, оптимизация производительности",
    },
  },
  {
    title: { en: "Backend & Databases", ru: "Бэкенд и базы данных" },
    text: {
      en: "Node.js, Supabase, NeonDB, MySQL, PostgreSQL, Drizzle ORM, Prisma, RESTful APIs, GraphQL, Authentication systems, various backend services",
      ru: "Node.js, Supabase, NeonDB, MySQL, PostgreSQL, Drizzle ORM, Prisma, RESTful API, GraphQL, системы авторизации, разные бэкенд-сервисы",
    },
  },
  {
    title: { en: "DevOps & Tools", ru: "DevOps и инструменты" },
    text: {
      en: "Arch Linux (deep dive in 2025), Docker, Git, GitHub Actions, Vercel, Netlify, Postman, DataGrip, Neovim, CI/CD pipelines",
      ru: "Arch Linux (глубокое погружение в 2025), Docker, Git, GitHub Actions, Vercel, Netlify, Postman, DataGrip, Neovim, CI/CD",
    },
  },
  {
    title: { en: "Blockchain & Web3", ru: "Блокчейн и Web3" },
    text: {
      en: "Smart contract development, Chainlink integration, DeFi protocols, Polygon blockchain, Web3.js, Ethereum ecosystem",
      ru: "Разработка смарт-контрактов, интеграция Chainlink, DeFi-протоколы, блокчейн Polygon, Web3.js, экосистема Ethereum",
    },
  },
  {
    title: { en: "AI, Automation & Reverse Engineering", ru: "ИИ, автоматизация и reverse engineering" },
    text: {
      en: "AI agents, AI model integration, automation, Machine Learning workflows, reverse engineering, WebAssembly, Exploring: Rust, Go, C#, Unreal Engine, Blender",
      ru: "ИИ-агенты, интеграция ИИ-моделей, автоматизация, ML-пайплайны, reverse engineering, WebAssembly, изучаю: Rust, Go, C#, Unreal Engine, Blender",
    },
  },
]

export const cvSpoken: Row[] = [
  { k: { en: "Russian", ru: "Русский" }, v: { en: "Native speaker", ru: "Родной" } },
  { k: { en: "Estonian", ru: "Эстонский" }, v: { en: "Fluent (B2+ level)", ru: "Свободно (уровень B2+)" } },
  { k: { en: "English", ru: "Английский" }, v: { en: "Advanced (B1 level)", ru: "Продвинутый (уровень B1)" } },
]

export const cvExperience: Item[] = [
  {
    title: { en: "AI, Automation & Own Projects", ru: "ИИ, автоматизация и собственные проекты" },
    period: "2026 - Present",
    text: {
      en: "Working with AI, automation and AI agents, and putting together assorted projects on these topics. Alongside that I develop my own projects on various themes: see the Projects page. Currently focused on AI, databases, reverse engineering and various backend work.",
      ru: "Занимаюсь ИИ, автоматизацией и ИИ-агентами, собираю разные проекты на эти темы. Параллельно разрабатываю собственные проекты на разные тематики: смотри страницу Projects. Сейчас в фокусе ИИ, базы данных, reverse engineering и разный бэкенд.",
    },
    highlight: true,
  },
  {
    title: { en: "Linux (Arch) Deep Dive", ru: "Глубокое погружение в Linux (Arch)" },
    period: "2025",
    text: {
      en: "Spent a large part of 2025 on Arch Linux: built and tuned my own environment, got deep into how the system works and enjoyed it a lot. It became part of how I develop and run my projects.",
      ru: "Большую часть 2025 года плотно сидел на Arch Linux: собрал и настроил своё окружение, глубоко разобрался, как устроена система, и мне это очень понравилось. Это стало частью того, как я разрабатываю и запускаю проекты.",
    },
  },
  {
    title: { en: "Full Stack Developer", ru: "Full Stack разработчик" },
    period: "2024 - Present",
    text: {
      en: "Developing full-stack web applications with focus on performance optimization and user experience. Building scalable applications using modern technologies, implementing deployment pipelines through self-learning and experimentation. Achieved significant performance improvements through iterative testing and optimization.",
      ru: "Разрабатываю full-stack веб-приложения с упором на производительность и удобство. Строю масштабируемые приложения на современных технологиях, настраиваю деплой через самообучение и эксперименты. Заметно ускорил приложения за счёт итеративного тестирования и оптимизации.",
    },
    highlight: true,
  },
  {
    title: { en: "Blockchain Engineer & Smart Contract Developer", ru: "Blockchain-инженер и разработчик смарт-контрактов" },
    period: "2023 - 2024",
    text: {
      en: "Self-taught blockchain development, specializing in secure smart contracts using Solidity. Learned to integrate Chainlink oracles and DeFi protocols through documentation and hands-on practice. Built multiple blockchain projects by experimenting with different approaches and learning from mistakes.",
      ru: "Самостоятельно освоил блокчейн-разработку, специализируясь на безопасных смарт-контрактах на Solidity. Научился интегрировать оракулы Chainlink и DeFi-протоколы по документации и на практике. Собрал несколько блокчейн-проектов, пробуя разные подходы и учась на ошибках.",
    },
    highlight: true,
  },
  {
    title: { en: "Freelance Developer", ru: "Фриланс-разработчик" },
    period: "2022 - Present",
    text: {
      en: "Providing development services including web applications, automation solutions, and AI integration. Learning new technologies as needed for each project, adapting quickly to client requirements through self-study and practical implementation.",
      ru: "Разработка на заказ: веб-приложения, автоматизация и интеграция ИИ. Осваиваю нужные технологии под каждый проект и быстро подстраиваюсь под требования клиентов через самообучение и практику.",
    },
  },
  {
    title: { en: "Self-Taught Developer", ru: "Разработчик-самоучка" },
    period: "2018 - 2022",
    text: {
      en: "Started programming journey through online resources and documentation. Learned web development fundamentals, modern frameworks, and development methodologies through trial and error, building various personal projects.",
      ru: "Начал путь в программировании по онлайн-ресурсам и документации. Освоил основы веб-разработки, современные фреймворки и методологии методом проб и ошибок, собирая разные личные проекты.",
    },
  },
]

export const cvHackathons: { icon: "Trophy" | "Gamepad2"; title: Bi; href: string; text: Bi }[] = [
  {
    icon: "Gamepad2",
    title: { en: "GameDev.tv Jam 2026", ru: "GameDev.tv Jam 2026" },
    href: "https://ruffbuff.itch.io/spellbound",
    text: {
      en: 'Took part in the game jam with the theme "Connection". Our team made "Spellbound", a game you can play on itch.io.',
      ru: 'Участвовал в геймджеме с темой "Connection" (связь). Наша команда сделала игру "Spellbound", в неё можно поиграть на itch.io.',
    },
  },
  {
    icon: "Gamepad2",
    title: { en: "BlockMagic Hackathon 2024", ru: "BlockMagic Hackathon 2024" },
    href: "https://github.com/ruffbuff/Hackathon-2024-OnChainTTT",
    text: {
      en: 'Created "OnChainTTT" - A fully decentralized Tic-Tac-Toe game on Polygon blockchain. Implemented Chainlink VRF for provably fair randomness and automated game state management. Secured top 10 position in competitive gaming track.',
      ru: 'Создал "OnChainTTT" — полностью децентрализованные крестики-нолики на блокчейне Polygon. Использовал Chainlink VRF для честной случайности и автоматическое управление состоянием игры. Топ-10 в игровом треке.',
    },
  },
  {
    icon: "Trophy",
    title: { en: "Constellation Hackathon 2023", ru: "Constellation Hackathon 2023" },
    href: "https://github.com/ruffbuff/Hackathon-2023-DynamicAI",
    text: {
      en: 'Developed "DynamicAI" - An innovative blockchain-based AI solution that integrates machine learning with smart contracts. Won first place among 200+ participants for technical innovation and implementation quality.',
      ru: 'Разработал "DynamicAI" — блокчейн-решение с ИИ, объединяющее машинное обучение и смарт-контракты. Первое место среди 200+ участников за техническую инновацию и качество реализации.',
    },
  },
]
