# Changelog

Notable changes to the portfolio site, newest first.

## 2026-10-27 — Removed changelog pages

- The `/changelog` and `/changelog/<slug>` pages, their components, the GitHub changelog loader and `POST /api/revalidate` are removed: changelogs now live on the sites of the products themselves. `/changelog` redirects to `/projects`.
- The CV no longer mentions the Changelog page.

## 2026-10-27 — Fixes v5

- CV: education is ordered newest first (by start year), like experience; competitions too. The duplicate old "Experience" block (journey) is gone from the page; the English and Russian PDFs have a single experience section.
- Changelog cards show as many entries as fit the card height (up to 8, never cut in the middle of an entry), on mobile too.
- New project in the changelog: Rusty Colony (`ruffbuff/rea-oni-rust`, private). The parser understands Keep a Changelog versions without dates (`## [1.18.3]`) and an "Earlier" section.
- Changelog page: section headings Added, Changed, Fixed, Removed, Security and Deprecated are colour badges with icons, and their bullets match the colour.

## 2026-10-27 — Fixes v4

- GitHub activity card: the heatmap now fills the whole card (responsive cells) and has stat tiles under it: active days, longest streak, best day and top month.
- Changelog errors are specific now (no token, file or access not found, token refused, rate limit, no response). A failed load is re-checked after a minute instead of staying for an hour.
- CV (EN and RU): new experience from 2026 to now (AI, automation, AI agents, own projects), Linux (Arch) in 2025, GameDev.tv Jam 2026 ("Spellbound") in competitions.
- PDF CV in English and Russian (`cv_en.pdf`, `cv_ru.pdf`), generated from the same data as the page, with all sections translated. The CV page has a PDF language switch (defaults to the site language). The name in the PDF comes from the site data.
- Home: the "About me" block says what I focus on now (AI, databases, reverse engineering, backend).
- New "RuffBuff" wordmark in the navigation bar.

## 2026-10-27 — Fixes v3

- Home page trimmed to the essentials: hero, stack, facts, about, latest repositories and GitHub activity.
- The tech stack became two running lines (opposite directions, pause on hover, still when motion is reduced) with technology icons.
- `/skills` and `/work` are gone (permanent redirects to `/`); roles and the career journey now live on `/cv`.
- `/projects` shows only project cards. Every project is a file in `content/projects/<slug>.md`.
- Backlogs renamed to Changelog (`/changelog`, `/changelog/<slug>`); `/backlogs` redirects to `/changelog`.
- Changelog texts are now pulled from each project's `CHANGELOG.md` on GitHub and refreshed hourly; private repos are shown with a lock and no link.
- GitHub blocks hardened: hourly cache, a calm fallback instead of raw errors, and `GITHUB_TOKEN` set on the server fixes the rate limit.
- Emoji removed everywhere in favour of icons.

## 2026-10-27 — Redesign v2

- New dark "aurora" design on Next.js 16, React 19 and Tailwind CSS 4.
- English and Russian versions of every page.
- Pages: home, projects, skills, work, backlogs and CV.
- Home page with GitHub repositories and a contribution graph.

## 2025-08-26 — v0.1.3

- Updated the CV generation script and the English CV PDF.
- Added notes for AI assistants (`QWEN.md`).

## 2025-08-25 — v0.1.2

- Added the Projects page and project cards.
- Added the SVG icon component and tidied the CV page.

## 2025-08-24 — v0.1.1

- Added the README and the license.

## 2025-08-24 — v0.1.0

- Added GitHub API routes: contributions, languages, repositories, user.
- Added the CV page, the Skills page and the Work page.
- Reworked the home page.

## 2025-04-08 — First version

- First version of the site: home page with about, experience and gallery sections, language switch, CV section.
- Added the script that generates the CV as a PDF.
