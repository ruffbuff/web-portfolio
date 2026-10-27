import matter from 'gray-matter'
import { changelogSources, type ChangelogSource, type ChangelogStatus } from '@/lib/changelog-sources'

export type { ChangelogStatus }

export type ChangelogEntry = {
  id: string
  date: string // YYYY-MM-DD
  title: string
  body: string // markdown
}

/** Why the text could not be loaded (the UI only shows a neutral "temporarily unavailable"). */
export type ChangelogError = 'no-token' | 'not-found' | 'auth' | 'rate-limit' | 'network' | 'empty'

export type Changelog = {
  slug: string
  title: string
  status: ChangelogStatus
  tags: string[]
  summary: string
  isPrivate: boolean
  /** link to the repository: only for public repos (never for private ones) */
  repoUrl?: string
  started?: string // date of the oldest entry
  updated?: string // date of the latest entry
  intro: string // markdown before the first entry
  entries: ChangelogEntry[] // newest first
  error?: ChangelogError
}

const REVALIDATE = 3600 // seconds
const STATUSES: ChangelogStatus[] = ['open', 'closed', 'soon']

// "## 2026-10-12 — Entry title" (separator: —, – or -, title optional)
const ISO_RE = /^##[ \t]+(\d{4}-\d{2}-\d{2})(?:[ \t]*[—–-][ \t]*(.*?))?[ \t]*$/
// Keep a Changelog: "## [1.2.0] - 2026-10-01", "## 1.2.0 — 2026-10-01", "## [1.2.0] - 2026-10-01 [YANKED]"
const KAC_RE = /^##[ \t]+\[?v?([^\]\s]+?)\]?[ \t]*[—–-][ \t]*(\d{4}-\d{2}-\d{2})(?:[ \t]*\[?YANKED\]?)?[ \t]*$/i
const UNRELEASED_RE = /^##[ \t]+\[?unreleased\]?\b/i
const LINK_DEF_RE = /^\[[^\]]+\]:[ \t]*\S+(?:[ \t]+(?:"[^"]*"|'[^']*'|\([^)]*\)))?[ \t]*$/

type Raw = { date: string; title: string; lines: string[] }

/** Splits a changelog markdown into intro + entries. Pure function: also used by tests / scripts. */
export function parseChangelog(markdown: string): { intro: string; entries: ChangelogEntry[] } {
  const { content } = matter(markdown)
  const lines = content.split(/\r?\n/)

  // trailing Keep a Changelog link definitions ("[1.0.0]: https://...") are useless on the site
  while (lines.length && (lines[lines.length - 1].trim() === '' || LINK_DEF_RE.test(lines[lines.length - 1].trim()))) lines.pop()

  const intro: string[] = []
  const raws: Raw[] = []
  let current: Raw | null = null
  let skipping = false
  let inFence = false

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    if (!inFence && /^##[ \t]/.test(line)) {
      let m: RegExpMatchArray | null
      if (UNRELEASED_RE.test(line)) {
        current = null
        skipping = true
        continue
      } else if ((m = line.match(ISO_RE))) {
        current = { date: m[1], title: (m[2] ?? '').trim(), lines: [] }
        raws.push(current)
        skipping = false
        continue
      } else if ((m = line.match(KAC_RE))) {
        current = { date: m[2], title: /^\d/.test(m[1]) ? `v${m[1]}` : m[1], lines: [] }
        raws.push(current)
        skipping = false
        continue
      }
    }
    if (current) current.lines.push(line)
    else if (!skipping) intro.push(line)
  }

  // newest first; the order of the file is kept for entries with the same date (stable sort)
  raws.sort((a, b) => b.date.localeCompare(a.date))
  const used = new Set<string>()
  const entries = raws.map((r, i): ChangelogEntry => {
    let id = `${r.date}-${(r.title || String(i)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`.replace(/-$/, '')
    while (used.has(id)) id += `-${i}`
    used.add(id)
    return { id, date: r.date, title: r.title, body: r.lines.join('\n').trim() }
  })

  // drop the "# Changelog" title and the standard Keep a Changelog preamble
  const introText = intro
    .join('\n')
    .split(/\n{2,}/)
    .filter((block) => !/^#\s/.test(block.trim()) && !/keepachangelog\.com|semver\.org/i.test(block))
    .join('\n\n')
    .trim()

  return { intro: introText, entries }
}

// last successfully loaded text per slug: used when GitHub is temporarily unavailable (lives while the server instance lives)
const lastGood = new Map<string, string>()

type Loaded = { ok: true; text: string } | { ok: false; error: ChangelogError }

async function loadFile(src: ChangelogSource): Promise<Loaded> {
  const token = process.env.GITHUB_TOKEN
  // a private repository cannot be read without a token: do not even try
  if (!token && src.visibility === 'private') return fallback(src, 'no-token')

  const path = (src.path ?? 'CHANGELOG.md').split('/').map(encodeURIComponent).join('/')
  const url = `https://api.github.com/repos/${src.repo}/contents/${path}?ref=${encodeURIComponent(src.branch ?? 'main')}`
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.raw+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'RuffBuff-Portfolio',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE, tags: ['changelog'] },
      signal: AbortSignal.timeout(10_000),
    })
    if (res.ok) {
      const text = await res.text()
      lastGood.set(src.slug, text)
      return { ok: true, text }
    }
    const rateLimited = res.status === 429 || (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0')
    const error: ChangelogError = rateLimited ? 'rate-limit' : res.status === 404 ? (token ? 'not-found' : 'no-token') : res.status === 401 || res.status === 403 ? 'auth' : 'network'
    console.warn(`[changelog] ${src.slug}: GitHub answered ${res.status} (${error})`)
    return fallback(src, error)
  } catch (e) {
    console.warn(`[changelog] ${src.slug}: request failed`, e instanceof Error ? e.message : e)
    return fallback(src, 'network')
  }
}

function fallback(src: ChangelogSource, error: ChangelogError): Loaded {
  const text = lastGood.get(src.slug)
  return text ? { ok: true, text } : { ok: false, error }
}

async function build(src: ChangelogSource): Promise<Changelog> {
  const base: Changelog = {
    slug: src.slug,
    title: src.title,
    status: STATUSES.includes(src.status) ? src.status : 'open',
    tags: src.tags,
    summary: src.summary,
    isPrivate: src.visibility === 'private',
    repoUrl: src.visibility === 'public' ? `https://github.com/${src.repo}` : undefined,
    intro: '',
    entries: [],
  }
  const loaded = await loadFile(src)
  if (!loaded.ok) return { ...base, error: loaded.error }
  const { intro, entries } = parseChangelog(loaded.text)
  return { ...base, intro, entries, started: entries[entries.length - 1]?.date, updated: entries[0]?.date, error: entries.length ? undefined : 'empty' }
}

/** All changelogs from lib/changelog-sources.ts; never throws (a failed project gets `error`). Order: as in the config. */
export async function getChangelogs(): Promise<Changelog[]> {
  return Promise.all(changelogSources.map(build))
}

export async function getChangelog(slug: string): Promise<Changelog | undefined> {
  const src = changelogSources.find((s) => s.slug === slug)
  return src ? build(src) : undefined
}

export const changelogSlugs = () => changelogSources.map((s) => s.slug)
