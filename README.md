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
| `GITHUB_TOKEN` | Серверный токен GitHub. Нужен для: графика контрибуций (GraphQL API без авторизации не работает), блока «Latest on GitHub» (без токена лимит 60 запросов/час на IP, а у Vercel IP общий — блок падает). Без токена сайт собирается и работает, а блоки показывают спокойное «временно недоступно». |
| `GITHUB_USERNAME` | Ник GitHub (по умолчанию `ruffbuff`). |

#### Что сделать на Vercel (чтобы заработали «Latest on GitHub» и «Activity»)

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. Resource owner — `ruffbuff`. Для публичных данных (репозитории, график контрибуций) отдельных прав не нужно: достаточно read-only токена.
3. Дополнительных Repository permissions не нужно: токен только на чтение.
4. Vercel → Project → **Settings → Environment Variables** → добавь `GITHUB_TOKEN` (Production и Preview), вставь токен.
5. Сделай **Redeploy** (переменные подхватываются только новым деплоем). Токен никогда не коммить и не клади в `NEXT_PUBLIC_*`.


#### Кэширование GitHub-данных

- Репозитории и контрибуции кэшируются на **1 час** (ISR / data cache); API-маршруты `/api/github/*` отдают `Cache-Control: s-maxage=3600, stale-while-revalidate`.
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

## Главная

Hero → бегущие строки со стеком (две строки в разные стороны, иконки `simple-icons`/lucide, пауза при наведении, при `prefers-reduced-motion` строки останавливаются и переносятся) → факты → обо мне → Latest on GitHub → Activity → контакты. Добавить технологию: строка в `lib/stack.ts`.

Страницы `/skills` и `/work` удалены (постоянные редиректы на `/`, настроены в `next.config.mjs`); опыт и роли перенесены в `/cv`.

### Contribution
[ruffbuff](https://github.com/ruffbuff)

### License
[License](License.md)
