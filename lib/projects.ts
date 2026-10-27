import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type Project = {
  slug: string
  title: string
  url: string
  description: string
  image: string
  /** show the image whole (logo / svg) instead of cropped */
  contain: boolean
  tags: string[]
  order: number
}

const DIR = path.join(process.cwd(), 'content', 'projects')

function readProject(file: string): Project | null {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'))
  if (data.draft === true) return null

  const image = String(data.image ?? '')
  return {
    slug,
    title: String(data.title ?? slug),
    url: String(data.url ?? ''),
    description: String(data.description ?? content.trim()),
    image,
    contain: typeof data.contain === 'boolean' ? data.contain : /\.svg(\?|$)/i.test(image),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : 999,
  }
}

/** All projects from content/projects/*.md: by `order`, then by title. Files starting with `_` and `draft: true` are skipped. */
export function getProjects(): Project[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map(readProject)
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}
