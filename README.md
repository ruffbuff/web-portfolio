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
| `GITHUB_TOKEN` | Серверный токен GitHub. Нужен для: графика контрибуций (GraphQL API без авторизации не работает), блока «Latest on GitHub» (без токена лимит 60 запросов/час на IP, а у Vercel IP общий — блок падает), и **чтения changelog из приватных репозиториев**. Без токена сайт собирается и работает, а блоки показывают спокойное «временно недоступно». |
| `GITHUB_USERNAME` | Ник GitHub (по умолчанию `ruffbuff`). |
| `REVALIDATE_SECRET` | (необязательно) включает `POST /api/revalidate`, см. раздел Changelog. Без неё маршрут отвечает 404. |

#### Что сделать на Vercel (чтобы заработали «Latest on GitHub», «Activity» и приватные changelog)

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. Resource owner — `ruffbuff`. Repository access: **Only select repositories** → выбери репозитории, чьи `CHANGELOG.md` показываются на сайте (`personal-swarm`, `web-portfolio`, …). Для публичных данных (репозитории, график контрибуций) отдельных прав не нужно.
3. Repository permissions: **Contents: Read-only** (Metadata: Read-only добавится сам). Больше ничего не нужно, токен только на чтение.
4. Vercel → Project → **Settings → Environment Variables** → добавь `GITHUB_TOKEN` (Production и Preview), вставь токен.
5. Сделай **Redeploy** (переменные подхватываются только новым деплоем). Токен никогда не коммить и не клади в `NEXT_PUBLIC_*`.

Если токен для приватного репо не покрывает его (или не задан), карточка changelog показывает «Changelog временно недоступен», сборка при этом не падает.

#### Кэширование GitHub-данных

- Репозитории, контрибуции и changelog кэшируются на **1 час** (ISR / data cache); API-маршруты `/api/github/*` отдают `Cache-Control: s-maxage=3600, stale-while-revalidate`.
- Если GitHub временно не отвечает, сервер отдаёт последний удачный ответ; если его нет — клиент показывает «временно недоступно» (без стектрейсов и подсказок про токен для посетителей).
- Сбой не «залипает»: ошибки кэшируются всего на минуту.

### Стек

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4 (конфиг в `app/globals.css`, без `tailwind.config.ts`), Geist + Inter/JetBrains Mono (кириллица), `next-themes` не используется — одна тёмная тема.

### Языки (EN/RU)

Тексты лежат в `components/language-provider.tsx` (старые ключи) и `lib/translations-v2.ts` (ключи редизайна). В серверных страницах используются `<T k="ключ" />`, `<Bi v={{ en, ru }} />`. Данные CV — `lib/cv-data.ts`, роли — `lib/site.ts`, технологии бегущей строки на главной — `lib/stack.ts`, проекты — `content/projects/*.md`.

### Резюме (PDF)

Файлы `public/cv/cv_en.pdf` и `public/cv/cv_ru.pdf`. На странице CV можно выбрать язык PDF (по умолчанию язык сайта). Оба файла собираются из `lib/cv-data.ts` (то же содержимое, что и на странице). Генерация обоих: `pnpm cv:generate` (скрипт `scripts/generate-cv.ts`, puppeteer).

## Проекты (`/projects`)

На странице — только карточки проектов. Один проект = один файл `content/projects/<slug>.md`. Код менять не нужно: страница подхватит файл сама (в dev — после перезагрузки, на проде — после нового деплоя).

### Как добавить проект

1. Положи картинку-превью в `public/` (например `public/my-project.jpg`) или возьми полный `https://` URL.
2. Скопируй `content/projects/_template.md` в `content/projects/my-project.md` и заполни:

```md
---
title: My Project
url: https://my-project.com/
description: Одно-два предложения для карточки.
image: /my-project.jpg
# contain: true     # показать картинку целиком, а не обрезать (логотипы, svg)
tags: [Next.js, Web3]   # необязательно
order: 4            # меньше число — выше в списке
# draft: true       # скрыть с сайта
---
```

Файлы, начинающиеся с `_`, и `draft: true` игнорируются. Карточка целиком ссылается на `url`. На главной проектов нет.

## Changelog (`/changelog`)

Раньше это называлось Backlogs. Текст журнала **не хранится в этом репозитории**: он берётся с GitHub из файла `CHANGELOG.md` самого проекта (GitHub contents API, серверный `GITHUB_TOKEN`) при сборке и затем обновляется каждый час (ISR, `revalidate = 3600`). Старые адреса `/backlogs` и `/backlogs/<slug>` ведут на `/changelog`.

### Как добавить проект в changelog

1. В репозитории проекта заведи `CHANGELOG.md` в корне (или другой путь, см. `path`).
2. Добавь одну запись в `lib/changelog-sources.ts`:

```ts
{
  slug: 'my-project',             // URL: /changelog/my-project
  title: 'My Project',
  repo: 'ruffbuff/my-project',    // owner/name
  // path: 'docs/CHANGELOG.md',   // по умолчанию CHANGELOG.md
  // branch: 'main',              // по умолчанию main
  visibility: 'private',          // 'public' | 'private'
  status: 'open',                 // open | closed | soon
  tags: ['Next.js'],
  summary: 'Одна-две строки для карточки.',
},
```

3. Дай токену доступ к репозиторию (если он приватный) — см. «Что сделать на Vercel». Закоммить, задеплой — готово.

**Приватность.** Приватный репозиторий на сайте *показывается*: у карточки метка «private repo» с замком и **нет ссылки** на репозиторий. У публичного (`visibility: 'public'`) есть ссылка на репозиторий. Когда репозиторий открываешь — поменяй одно поле `visibility`.

### Формат `CHANGELOG.md`

Поддерживаются два формата заголовков записей (уровень `##`), frontmatter не нужен:

```md
## 2026-10-27 — Заголовок записи        <- дата + название (разделитель —, – или -)

## [1.2.0] - 2026-10-01                 <- Keep a Changelog: версия + дата
```

- Всё до первой записи — вступительный текст (заголовок `# Changelog` и стандартная преамбула Keep a Changelog скрываются).
- Внутри записи — обычный markdown (`###`, списки, код, таблицы). Секция `## [Unreleased]` без даты и ссылки-определения внизу файла пропускаются.
- Записи сортируются по дате (новые сверху); одинаковые даты (несколько релизов в день) допустимы.
- Нет токена / файла / GitHub недоступен — на сайте «Changelog временно недоступен», сборка не падает. Если GitHub отвечал раньше, показывается последняя удачная версия.

### Обновление раньше часа (необязательно)

Задай `REVALIDATE_SECRET` в окружении Vercel и вызови:

```shell
curl -X POST https://<твой-домен>/api/revalidate -H "Authorization: Bearer $REVALIDATE_SECRET"
```

Маршрут сбросит кэш changelog и перестроит `/changelog`. Его можно дёргать из GitHub Action проекта после пуша, который трогает `CHANGELOG.md`. Без `REVALIDATE_SECRET` маршрут отключён (404).

Если первая сборка прошла без токена и на страницах зафиксировалось «недоступно», то после добавления `GITHUB_TOKEN` сделай Redeploy или вызови `/api/revalidate` — иначе страница обновится только в течение часа.

**Если у приватного репозитория «недоступно»:** на странице проекта теперь написана причина. «Не найдено» у приватного репо почти всегда значит, что у токена нет доступа к репозиторию (fine-grained токен должен включать его в Repository access и иметь Contents: Read), либо нет `CHANGELOG.md` в нужной ветке. После смены токена или прав в Vercel нужен Redeploy (переменные окружения применяются только к новым деплоям). Неудачная загрузка перепроверяется через минуту, а не через час.

## Главная

Hero → бегущие строки со стеком (две строки в разные стороны, иконки `simple-icons`/lucide, пауза при наведении, при `prefers-reduced-motion` строки останавливаются и переносятся) → факты → обо мне → Latest on GitHub → Activity → контакты. Добавить технологию: строка в `lib/stack.ts`.

Страницы `/skills` и `/work` удалены (постоянные редиректы на `/`, настроены в `next.config.mjs`); опыт и роли перенесены в `/cv`.

### Contribution
[ruffbuff](https://github.com/ruffbuff)

### License
[License](License.md)
