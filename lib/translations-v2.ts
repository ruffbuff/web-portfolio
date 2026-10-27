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
  "nav.changelog": { en: "Changelog", ru: "Журнал изменений" },
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
  "home.cta.changelog": { en: "Read changelog", ru: "Читать changelog" },
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
  "home.stack.eyebrow": { en: "Stack", ru: "Стек" },
  "home.stack.title": { en: "Tools & tech", ru: "Технологии" },
  "home.repos.eyebrow": { en: "Repositories", ru: "Репозитории" },
  "home.repos.title": { en: "Latest on GitHub", ru: "Последнее на GitHub" },
  "home.activity.eyebrow": { en: "Activity", ru: "Активность" },
  "home.activity.title": { en: "On GitHub", ru: "На GitHub" },
  "home.contact.eyebrow": { en: "Contact", ru: "Контакты" },
  "home.contact.title1": { en: "Let's build", ru: "Давай сделаем" },
  "home.contact.title2": { en: "something.", ru: "что-нибудь." },
  "home.contact.text": { en: "Write me an email or find me in the socials below.", ru: "Напиши мне на почту или найди меня в соцсетях ниже." },

  // ── /projects ──
  "projects.eyebrow": { en: "Selected work", ru: "Избранное" },
  "projects.heading": { en: "Projects.", ru: "Проекты." },
  "projects.description": { en: "Websites and products I have built.", ru: "Сайты и продукты, которые я сделал." },
  "projects.empty": { en: "No projects yet.", ru: "Проектов пока нет." },



  // ── /cv (roles and journey moved here from the removed /work page) ──
  "cv.roles.eyebrow": { en: "Places & roles", ru: "Места и роли" },
  "cv.roles.title": { en: "Roles", ru: "Роли" },
  "cv.journey.eyebrow": { en: "Journey", ru: "Путь" },
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
  "github.unavailable": { en: "Contributions are temporarily unavailable", ru: "Контрибуции временно недоступны" },
  "github.hint": {
    en: "GitHub did not answer. It will refresh on its own, try again a bit later.",
    ru: "GitHub не ответил. Данные обновятся сами, загляни чуть позже.",
  },
  "github.hint.token": {
    en: "The contribution graph needs the GITHUB_TOKEN environment variable on the server.",
    ru: "Для графика контрибуций на сервере нужна переменная окружения GITHUB_TOKEN.",
  },
  "github.retry": { en: "Retry", ru: "Повторить" },
  "github.year": { en: "Year", ru: "Год" },
  "github.mon": { en: "Mon", ru: "Пн" },
  "github.wed": { en: "Wed", ru: "Ср" },
  "github.fri": { en: "Fri", ru: "Пт" },
  "github.less": { en: "Less", ru: "Меньше" },
  "github.more": { en: "More", ru: "Больше" },
  "github.loadingRepos": { en: "Loading repositories…", ru: "Загружаю репозитории…" },
  "github.reposUnavailable": { en: "Repositories are temporarily unavailable.", ru: "Репозитории временно недоступны." },
  "github.viewOnGithub": { en: "Open GitHub profile", ru: "Открыть профиль GitHub" },
  "github.noRepos": { en: "No featured repositories yet.", ru: "Пока нет избранных репозиториев." },
  "github.noDescription": { en: "No description yet.", ru: "Описания пока нет." },
  "github.updated": { en: "Updated", ru: "Обновлён" },


  // ── changelog ──
  "changelog.eyebrow": { en: "Work in public", ru: "Работа в открытую" },
  "changelog.heading": { en: "Changelog.", ru: "Changelog." },
  "changelog.description": {
    en: "What changed in my projects and when. Pulled straight from each project's CHANGELOG.md.",
    ru: "Что и когда менялось в моих проектах. Берётся прямо из CHANGELOG.md каждого проекта.",
  },
  "changelog.empty": { en: "No projects in the changelog yet.", ru: "Проектов в changelog пока нет." },
  "changelog.back": { en: "All changelogs", ru: "Все changelog" },
  "changelog.started": { en: "since", ru: "с" },
  "changelog.updated": { en: "updated", ru: "обновлён" },
  "changelog.log": { en: "Log", ru: "Журнал" },
  "changelog.noEntries": { en: "No entries yet.", ru: "Записей пока нет." },
  "changelog.entriesNav": { en: "Entries", ru: "Записи" },
  "changelog.entry": { en: "entry", ru: "запись" },
  "changelog.entries": { en: "entries", ru: "записей" },
  "changelog.private": { en: "private repo", ru: "приватный репо" },
  "changelog.privateHint": { en: "The source code is private, only the changelog is public.", ru: "Исходный код приватный, публично только changelog." },
  "changelog.repo": { en: "Repository", ru: "Репозиторий" },
  "changelog.unavailable": { en: "Changelog temporarily unavailable", ru: "Changelog временно недоступен" },
  "changelog.unavailableHint": { en: "Could not load it from GitHub right now. The page refreshes itself, please check back later.", ru: "Сейчас не удалось загрузить его с GitHub. Страница обновится сама, загляни позже." },
  "changelog.status.open": { en: "open", ru: "в работе" },
  "changelog.status.closed": { en: "closed", ru: "закрыт" },
  "changelog.status.soon": { en: "soon", ru: "скоро" },
}
