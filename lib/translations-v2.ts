// Strings added by the v2 (aurora) redesign. They are merged into `translations` in
// components/language-provider.tsx. Keys of the old translations (nav.home, cv.title,
// experience.*, ...) are reused and intentionally NOT redefined here.
//
// "**text**" is highlighted by <Rich k="..." />. In `home.title` the "|" marks a line break.
// Owner texts that existed only in English on the old site (the about paragraphs, subtitles) are kept
// verbatim in `en`; the `ru` versions are plain translations of them.
//
// TODO(owner): home.contact.* and home.facts.* are neutral placeholders (new sections without owner text).

type Entry = { en: string; ru: string }

export const extraTranslations: Record<string, Entry> = {
  // ── navigation / chrome ──
  "nav.work": { en: "Work", ru: "Работа" },
  "nav.backlogs": { en: "Backlogs", ru: "Бэклоги" },
  "nav.contact": { en: "Contact", ru: "Контакты" },
  "nav.language": { en: "Language", ru: "Язык" },
  "nav.menu": { en: "Menu", ru: "Меню" },
  "footer.built": { en: "Built with Next.js.", ru: "Сделано на Next.js." },

  // ── home: hero ──
  "home.title": { en: "Blockchain &| Full Stack| Developer", ru: "Блокчейн &| Full Stack| разработчик" },
  "home.badge": { en: "Available for hire", ru: "Открыт к предложениям" },
  "home.intro": {
    en: "RuffBuff — Blockchain & IT Developer. Smart contracts, and beautiful, functional websites.",
    ru: "RuffBuff — блокчейн и IT разработчик. Смарт-контракты и красивые, функциональные сайты.",
  },
  "home.cta.projects": { en: "View my work", ru: "Смотреть работы" },
  "home.cta.backlogs": { en: "Read backlogs", ru: "Читать бэклоги" },
  "home.scroll": { en: "Scroll", ru: "Листай" },

  // ── home: facts (derived from the CV data; TODO(owner): adjust wording) ──
  "home.facts.focus": { en: "Focus", ru: "Фокус" },
  "home.facts.focusValue": { en: "Blockchain & Full Stack", ru: "Блокчейн и Full Stack" },
  "home.facts.stack": { en: "Core stack", ru: "Основной стек" },
  "home.facts.stackValue": { en: "Python · TypeScript · Solidity", ru: "Python · TypeScript · Solidity" },
  "home.facts.based": { en: "Based in", ru: "Живу в" },
  "home.facts.basedValue": { en: "Europe", ru: "Европа" },

  // ── home: about (owner text of the old home page) ──
  "home.about.eyebrow": { en: "About me", ru: "Обо мне" },
  "home.about.title": { en: "Who I am", ru: "Кто я" },
  "home.about.link": { en: "Skills", ru: "Навыки" },
  "home.about.1": {
    en: "Yup! I'm a Also a **Blockchain Engineer**. Big deal, right? But wait — there's more! I'm not just any developer,",
    ru: "Ага! Я ещё и **Blockchain Engineer**. Ну и что такого, да? Но погоди — это не всё! Я не просто разработчик,",
  },
  "home.about.2": {
    en: "I'm a **Full Stack Developer**. And if that wasn't enough, guess what?",
    ru: "я **Full Stack Developer**. А если этого мало, угадай что?",
  },
  "home.about.3": {
    en: "Maybe **Freelancer**? Oh yeah, I've got that badge too!",
    ru: "Может, **фрилансер**? О да, этот значок у меня тоже есть!",
  },
  "home.about.4": {
    en: "I love both **Blockchain** & **Development**, so. That means I can create functional smart contracts, same as beautiful and functional websites. I'm always looking for new opportunities to learn and grow.",
    ru: "Я люблю и **блокчейн**, и **разработку**. Это значит, что я могу создавать функциональные смарт-контракты, а также красивые и функциональные сайты. Я всегда ищу новые возможности, чтобы учиться и расти.",
  },

  // ── home: sections ──
  "home.projects.eyebrow": { en: "Selected work", ru: "Избранное" },
  "home.projects.title": { en: "Projects", ru: "Проекты" },
  "home.projects.link": { en: "All projects", ru: "Все проекты" },
  "home.repos.eyebrow": { en: "Latest on GitHub", ru: "Последнее на GitHub" },
  "home.activity.eyebrow": { en: "Activity", ru: "Активность" },
  "home.activity.title": { en: "On GitHub", ru: "На GitHub" },
  "home.work.eyebrow": { en: "Experience", ru: "Опыт" },
  "home.work.title": { en: "Work", ru: "Работа" },
  "home.work.link": { en: "Full timeline", ru: "Вся история" },
  "home.backlogs.eyebrow": { en: "Work in public", ru: "Работа в открытую" },
  "home.backlogs.title": { en: "Latest backlogs", ru: "Свежие бэклоги" },
  "home.backlogs.link": { en: "All backlogs", ru: "Все бэклоги" },
  "home.contact.eyebrow": { en: "Contact", ru: "Контакты" },
  "home.contact.title1": { en: "Let's build", ru: "Давай сделаем" },
  "home.contact.title2": { en: "something.", ru: "что-нибудь." },
  "home.contact.text": { en: "Write me an email or find me in the socials below.", ru: "Напиши мне на почту или найди меня в соцсетях ниже." },

  // ── /projects ──
  "projects.eyebrow": { en: "Selected work", ru: "Избранное" },
  "projects.heading": { en: "Projects.", ru: "Проекты." },
  "projects.description": { en: "Websites and products I have built.", ru: "Сайты и продукты, которые я сделал." },
  "projects.github.title": { en: "GitHub", ru: "GitHub" },
  "projects.github.link": { en: "All repositories", ru: "Все репозитории" },

  // ── /work ──
  "work.eyebrow": { en: "Experience", ru: "Опыт" },
  "work.heading": { en: "Work.", ru: "Работа." },
  "work.description": { en: "Here is my work experience..", ru: "Вот мой опыт работы.." },
  "work.roles.eyebrow": { en: "Places & roles", ru: "Места и роли" },
  "work.roles.title": { en: "Roles", ru: "Роли" },
  "work.journey.eyebrow": { en: "Journey", ru: "Путь" },
  "work.links": { en: "You can check these links if you wish to:", ru: "Если хочешь, загляни по этим ссылкам:" },

  // ── /skills ──
  "skills.eyebrow": { en: "Toolbox", ru: "Инструменты" },
  "skills.heading": { en: "Skills.", ru: "Навыки." },
  "skills.description": { en: "What I can do below..", ru: "Что я умею — ниже.." },
  "skills.core.eyebrow": { en: "Core", ru: "Основное" },
  "skills.core.title": { en: "What I use daily", ru: "Чем пользуюсь каждый день" },
  "skills.languages.eyebrow": { en: "From GitHub", ru: "Из GitHub" },
  "skills.languages.title": { en: "Languages", ru: "Языки" },
  "skills.languages.loading": { en: "Loading language stats…", ru: "Загружаю статистику языков…" },
  "skills.languages.unavailable": { en: "Language stats are unavailable right now.", ru: "Статистика языков сейчас недоступна." },
  "skills.stack.eyebrow": { en: "Stack", ru: "Стек" },
  "skills.stack.title": { en: "Tools & tech", ru: "Технологии" },

  // ── /cv ──
  "cv.eyebrow": { en: "Resume", ru: "Резюме" },
  "cv.heading": { en: "CV.", ru: "Резюме." },
  "cv.description": { en: "My resume", ru: "Моё резюме" },
  "cv.personal": { en: "Personal", ru: "Личное" },
  "cv.contacts": { en: "Contacts", ru: "Контакты" },
  "cv.spoken": { en: "Languages", ru: "Языки" },
  "cv.experience.eyebrow": { en: "Career", ru: "Карьера" },
  "cv.education.eyebrow": { en: "Learning", ru: "Обучение" },
  "cv.skills.eyebrow": { en: "Skills", ru: "Навыки" },
  "cv.hackathons.eyebrow": { en: "Competitions", ru: "Соревнования" },

  // ── GitHub blocks ──
  "github.eyebrow": { en: "GitHub activity", ru: "Активность на GitHub" },
  "github.contributionsIn": { en: "contributions in", ru: "контрибуций за" },
  "github.loading": { en: "Loading contributions…", ru: "Загружаю контрибуции…" },
  "github.unavailable": { en: "Contributions unavailable", ru: "Контрибуции недоступны" },
  "github.hint": {
    en: "GitHub API is unavailable (token / rate limit). Set GITHUB_TOKEN and retry.",
    ru: "GitHub API недоступен (токен / лимит). Задай GITHUB_TOKEN и повтори.",
  },
  "github.year": { en: "Year", ru: "Год" },
  "github.mon": { en: "Mon", ru: "Пн" },
  "github.wed": { en: "Wed", ru: "Ср" },
  "github.fri": { en: "Fri", ru: "Пт" },
  "github.less": { en: "Less", ru: "Меньше" },
  "github.more": { en: "More", ru: "Больше" },
  "github.loadingRepos": { en: "Loading repositories…", ru: "Загружаю репозитории…" },
  "github.reposUnavailable": { en: "Repositories are unavailable right now.", ru: "Репозитории сейчас недоступны." },
  "github.noRepos": { en: "No featured repositories yet.", ru: "Пока нет избранных репозиториев." },
  "github.noDescription": { en: "No description yet.", ru: "Описания пока нет." },
  "github.updated": { en: "Updated", ru: "Обновлён" },

  // ── backlogs ──
  "backlogs.eyebrow": { en: "Work in public", ru: "Работа в открытую" },
  "backlogs.heading": { en: "Backlogs.", ru: "Бэклоги." },
  "backlogs.description": {
    en: "Project notes, progress, experiments, and unfinished thoughts.",
    ru: "Заметки по проектам, прогресс, эксперименты и недодуманные мысли.",
  },
  "backlogs.empty": { en: "No backlogs yet. Add a .md file to content/backlogs/.", ru: "Бэклогов пока нет. Добавь .md файл в content/backlogs/." },
  "backlogs.back": { en: "All backlogs", ru: "Все бэклоги" },
  "backlogs.started": { en: "started", ru: "начат" },
  "backlogs.updated": { en: "updated", ru: "обновлён" },
  "backlogs.log": { en: "Log", ru: "Журнал" },
  "backlogs.noEntries": { en: "No entries yet.", ru: "Записей пока нет." },
  "backlogs.entriesNav": { en: "Entries", ru: "Записи" },
  "backlogs.entry": { en: "entry", ru: "запись" },
  "backlogs.entries": { en: "entries", ru: "записей" },
  "backlogs.status.open": { en: "open", ru: "в работе" },
  "backlogs.status.closed": { en: "closed", ru: "закрыт" },
  "backlogs.status.soon": { en: "soon", ru: "скоро" },
}
