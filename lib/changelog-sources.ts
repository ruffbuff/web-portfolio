// Where the changelogs come from. One entry = one project on /changelog.
// The text itself is NOT stored in this repo: it is pulled from the project's own repository
// (default file CHANGELOG.md, branch main) at build time and then refreshed every hour (ISR).
//
// To add a project: add an object to `changelogSources` below and keep a CHANGELOG.md in that repo.
// See "Changelog" in README.md.

export type ChangelogStatus = 'open' | 'closed' | 'soon'

export type ChangelogSource = {
  /** URL: /changelog/<slug> */
  slug: string
  title: string
  /** "owner/name" */
  repo: string
  /** file in the repository, default: CHANGELOG.md */
  path?: string
  /** default: main */
  branch?: string
  /**
   * 'private' -> the card gets a "private repo" mark (lock) and the repository is NOT linked.
   * 'public'  -> the card links to the repository.
   * The changelog text is shown on the site in both cases; the only thing to change when a repo becomes public is this field.
   */
  visibility: 'public' | 'private'
  status: ChangelogStatus
  tags: string[]
  /** one or two lines for the card */
  summary: string
}

export const changelogSources: ChangelogSource[] = [
  {
    slug: 'personal-swarm',
    title: 'Personal Swarm',
    repo: 'ruffbuff/personal-swarm',
    visibility: 'private',
    status: 'open',
    tags: ['Tauri', 'React', 'Rust'],
    summary: 'Desktop app for AI agents: per-agent chat, shared memory and local or cloud model providers.',
  },
  {
    slug: 'portfolio',
    title: 'Portfolio',
    repo: 'ruffbuff/web-portfolio',
    visibility: 'public',
    status: 'open',
    tags: ['Next.js', 'Tailwind CSS'],
    summary: 'This website: redesign, content and fixes.',
  },
]
