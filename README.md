## RuffBuff's web portfolio
Developed by:
```shell
▄▄▄  ▄• ▄▌·▄▄▄·▄▄▄ ▄▄▄▄·  ▄• ▄▌·▄▄▄·▄▄▄
▀▄ █·█▪██▌▐▄▄·▐▄▄· ▐█ ▀█▪ █▪██▌▐▄▄·▐▄▄·
▐▀▀▄ █▌▐█▌██▪ ██▪  ▐█▀▀█▄ █▌▐█▌██▪ ██▪ 
▐█•█▌▐█▄█▌██▌.██▌ .██▄▪▐█ ▐█▄█▌██▌.██▌.
.▀  ▀ ▀▀▀ ▀▀▀ ▀▀▀  ·▀▀▀▀   ▀▀▀ ▀▀▀ ▀▀▀ 
```


## Запуск локально

Нужны Node.js ≥ 20.9 и pnpm.

```shell
pnpm i
pnpm dev        # http://localhost:3000
```

Прод-сборка и проверки:

```shell
pnpm build && pnpm start
pnpm exec tsc --noEmit
```

### Переменные окружения

Скопируй `.env.example` в `.env.local` (файл в git не попадает):

| Переменная | Зачем |
| --- | --- |
| `GITHUB_TOKEN` | Нужен **только** для графика контрибуций (GitHub GraphQL API требует авторизацию). Без него сайт работает, а блок покажет «Contributions unavailable». С токеном лимит REST-запросов (репозитории, языки) 5000/час вместо 60/час на IP. |
| `GITHUB_USERNAME` | Ник GitHub (по умолчанию `ruffbuff`). |

На Vercel эти же переменные задаются в Project → Settings → Environment Variables.

### Стек

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4 (конфиг в `app/globals.css`, без `tailwind.config.ts`), Geist + Inter/JetBrains Mono (кириллица), `next-themes` не используется — одна тёмная тема.

### Языки (EN/RU)

Тексты лежат в `components/language-provider.tsx` (старые ключи) и `lib/translations-v2.ts` (ключи редизайна). В серверных страницах используются `<T k="ключ" />`, `<Bi v={{ en, ru }} />`. Данные CV — `lib/cv-data.ts`, проекты/навыки/роли — `lib/site.ts`.

### Резюме (PDF)

Файл `public/cv/cv_en.pdf`. Кнопка «Download CV» отдаёт его для обоих языков (`cv_ru.pdf` в репозитории нет). Генерация: `pnpm cv:generate` (скрипт `scripts/generate-cv.ts`, puppeteer).

## Backlogs

### Как добавить новый бэклог

1. Создай файл `content/backlogs/<slug>.md` — имя файла = URL (`my-project.md` → `/backlogs/my-project`).
2. Заполни frontmatter и пиши записи. Код менять не нужно: список `/backlogs` и страница `/backlogs/<slug>` подхватят файл сами (в dev — после перезагрузки страницы; на проде — после нового деплоя/`next build`).

```md
---
title: My Project          # заголовок
status: open               # open | closed | soon
tags: [Next.js, Product]   # любые теги
date: 2026-10-27           # дата старта (YYYY-MM-DD)
summary: Одна-две строки для карточки в списке.
# draft: true              # (необязательно) скрыть из сайта
---

Вводный текст (необязательно) — всё, что идёт до первой датированной записи.

## 2026-10-27 — Заголовок записи

Обычный markdown: списки, **жирный**, `код`, ссылки, таблицы, блоки кода.

## 2026-10-20 — Предыдущая запись

Новые записи просто дописывай — порядок в файле не важен, на сайте они сортируются по дате (новые сверху).
```

## Схема

- **Один файл = один проект.** Внутри — лог: каждая запись это заголовок `## YYYY-MM-DD — Название` + markdown-текст.
- Заголовки `##` без даты в начале считаются обычным текстом; внутри записи используй `###` и ниже.
- В списке «updated» и порядок карточек берутся по дате самой свежей записи.
- Файлы, начинающиеся с `_`, и `draft: true` — игнорируются.
- Поддерживается только `.md` (без JSX/MDX).

Примеры: `content/backlogs/project-*.md` — это **заглушки** (lorem ipsum + пометка TODO), их нужно удалить или заменить реальными проектами.

### Contribution
[ruffbuff](https://github.com/ruffbuff)

### License
[License](License.md)
