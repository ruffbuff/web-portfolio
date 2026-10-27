import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type BacklogStatus = 'open' | 'closed' | 'soon'

export type BacklogEntry = {
  date: string // YYYY-MM-DD
  title: string
  body: string // markdown
}

export type Backlog = {
  slug: string
  title: string
  status: BacklogStatus
  tags: string[]
  date: string // YYYY-MM-DD, project start / creation date
  updated: string // date of the latest log entry (or `date` when there are none)
  summary: string
  intro: string // markdown before the first dated "##" heading
  entries: BacklogEntry[] // newest first
}

const DIR = path.join(process.cwd(), 'content', 'backlogs')
const STATUSES: BacklogStatus[] = ['open', 'closed', 'soon']
// "## 2026-10-12 — Entry title" (separator: —, – or -, title optional)
const ENTRY_RE = /^##[ \t]+(\d{4}-\d{2}-\d{2})(?:[ \t]*[—–-][ \t]*(.*))?[ \t]*$/

function toDateString(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10)
  return '1970-01-01'
}

function parseBody(content: string) {
  const intro: string[] = []
  const entries: BacklogEntry[] = []
  let current: { date: string; title: string; lines: string[] } | null = null
  let inFence = false

  for (const line of content.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    const match = inFence ? null : line.match(ENTRY_RE)
    if (match) {
      if (current) entries.push({ date: current.date, title: current.title, body: current.lines.join('\n').trim() })
      current = { date: match[1], title: (match[2] ?? '').trim(), lines: [] }
    } else if (current) current.lines.push(line)
    else intro.push(line)
  }
  if (current) entries.push({ date: current.date, title: current.title, body: current.lines.join('\n').trim() })

  entries.sort((a, b) => b.date.localeCompare(a.date))
  return { intro: intro.join('\n').trim(), entries }
}

function readBacklog(file: string): Backlog | null {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'))
  if (data.draft === true) return null

  const { intro, entries } = parseBody(content)
  const date = toDateString(data.date)
  const status: BacklogStatus = STATUSES.includes(data.status) ? data.status : 'open'

  return {
    slug,
    title: String(data.title ?? slug),
    status,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    date,
    updated: entries[0]?.date ?? date,
    summary: String(data.summary ?? ''),
    intro,
    entries,
  }
}

/** All backlogs, most recently updated first. */
export function getBacklogs(): Backlog[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.md$/.test(f) && !f.startsWith('_'))
    .map(readBacklog)
    .filter((b): b is Backlog => b !== null)
    .sort((a, b) => b.updated.localeCompare(a.updated))
}

export function getBacklog(slug: string): Backlog | undefined {
  return getBacklogs().find((b) => b.slug === slug)
}
