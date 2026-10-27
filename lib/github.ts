/**
 * Why a GitHub call failed. The UI/route turn it into a calm "temporarily unavailable" state:
 *  no-token   - GITHUB_TOKEN is not set (needed for the contribution graph; also lifts the 60 req/h anonymous limit)
 *  rate-limit - GitHub rate limit (Vercel shares IPs, so anonymous requests hit it quickly)
 *  auth       - the token is invalid / expired / lacks access
 *  upstream   - GitHub answered with an error, or the request failed / timed out
 */
export type GitHubErrorCode = 'no-token' | 'rate-limit' | 'auth' | 'upstream'

export class GitHubError extends Error {
  constructor(public code: GitHubErrorCode, message: string) {
    super(message)
    this.name = 'GitHubError'
  }
}

export interface GitHubUser {
  login: string
  name: string
  bio: string
  location: string
  company: string
  blog: string
  twitter_username: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  avatar_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  topics: string[]
  fork: boolean
  archived: boolean
  private?: boolean
}

export interface GitHubContribution {
  date: string
  count: number
}

const GITHUB_API_URL = 'https://api.github.com'
const username = process.env.GITHUB_USERNAME || 'ruffbuff'
const REVALIDATE = 3600 // seconds: GitHub data is cached for an hour (Next data cache)

// Last successful answer per request (lives as long as the server instance): shown when GitHub fails later.
const lastGood = new Map<string, unknown>()

function headers(token: string | undefined, extra: Record<string, string> = {}) {
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'RuffBuff-Portfolio',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  }
}

function errorFor(res: Response, hasToken: boolean): GitHubError {
  const limited = res.status === 429 || (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0')
  if (limited) return new GitHubError(hasToken ? 'rate-limit' : 'no-token', `GitHub rate limit (${res.status})`)
  if (res.status === 401 || res.status === 403) return new GitHubError('auth', `GitHub refused the token (${res.status})`)
  return new GitHubError('upstream', `GitHub API error: ${res.status} ${res.statusText}`)
}

/** GET/POST to GitHub with cache, timeout, error codes and a last-good fallback. */
async function request<T>(key: string, url: string, init: RequestInit = {}): Promise<T> {
  // The token is optional for public REST data (anonymous limit: 60 requests/hour per IP, which a shared Vercel IP burns quickly),
  // so set GITHUB_TOKEN on the server: it raises the limit to 5000/h and is required for the contribution graph.
  const token = process.env.GITHUB_TOKEN
  try {
    const res = await fetch(url, {
      ...init,
      headers: { ...headers(token), ...(init.headers as Record<string, string> | undefined) },
      next: { revalidate: REVALIDATE, tags: ['github'] },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw errorFor(res, Boolean(token))
    const data = (await res.json()) as T
    lastGood.set(key, data)
    return data
  } catch (e) {
    const err = e instanceof GitHubError ? e : new GitHubError('upstream', e instanceof Error ? e.message : 'GitHub request failed')
    if (lastGood.has(key)) {
      console.warn(`[github] ${key}: ${err.message}; serving the last good answer`)
      return lastGood.get(key) as T
    }
    throw err
  }
}

export async function getGitHubUser(): Promise<GitHubUser> {
  return request('user', `${GITHUB_API_URL}/users/${username}`)
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = await request<GitHubRepo[]>('repos', `${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100&type=owner`)

  // Only public, non-fork, non-archived repos; sort by stars, then by recent activity
  return repos
    .filter((repo) => !repo.private && !repo.fork && !repo.archived)
    .sort((a, b) => {
      if (a.stargazers_count !== b.stargazers_count) return b.stargazers_count - a.stargazers_count
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
}

export async function getContributionData(year?: number): Promise<GitHubContribution[]> {
  // The GraphQL API has no anonymous access: set GITHUB_TOKEN (Vercel -> Settings -> Environment Variables).
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new GitHubError('no-token', 'GITHUB_TOKEN environment variable is required for contribution data')

  // Calculate date range for the specified year
  const targetYear = year || new Date().getFullYear()
  const from = `${targetYear}-01-01T00:00:00Z`
  const to = `${targetYear}-12-31T23:59:59Z`

  // GitHub GraphQL API for contribution data with year filtering
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `

  const targetKey = `contributions:${targetYear}`
  const data = await request<any>(targetKey, `${GITHUB_API_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { username, from, to } }),
  })

  const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar
  if (data?.errors || !calendar) {
    // GraphQL answers 200 with "errors" (bad token scope, user not found, ...): treat as a failure and keep the last good data
    lastGood.delete(targetKey)
    throw new GitHubError('upstream', `GraphQL errors: ${JSON.stringify(data?.errors ?? 'empty response')}`)
  }

  const contributions: GitHubContribution[] = []
  calendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      contributions.push({ date: day.date, count: day.contributionCount })
    })
  })

  return contributions
}

export async function getFeaturedRepos(): Promise<GitHubRepo[]> {
  const repos = await getGitHubRepos()
  
  // Get featured repos based on various criteria
  const featured = repos.filter(repo => {
    // Include repos with specific topics or names that indicate they're portfolio-worthy
    const portfolioKeywords = [
      'portfolio', 'hackathon', 'bot', 'blockchain', 'dapp', 'smart-contract',
      'ai', 'ml', 'web3', 'nft', 'defi', 'telegram', 'discord'
    ]
    
    const repoText = `${repo.name} ${repo.description || ''} ${repo.topics?.join(' ') || ''}`.toLowerCase()
    
    return (
      repo.stargazers_count > 0 || // Has stars
      portfolioKeywords.some(keyword => repoText.includes(keyword)) || // Has portfolio keywords
      Boolean(repo.homepage) || // Has a homepage/demo
      repo.topics?.length > 0 // Has topics (usually means it's well-maintained)
    )
  })

  return featured.slice(0, 6) // Return top 6 featured repos
}

/** CDN caching for the API routes (Vercel edge): an hour for good answers, a short pause for failures so we do not hammer GitHub. */
export const CACHE_OK = 'public, s-maxage=3600, stale-while-revalidate=86400'
export const CACHE_ERROR = 'public, s-maxage=60, stale-while-revalidate=300'

export function githubErrorStatus(error: unknown): { code: GitHubErrorCode; status: number } {
  const code = error instanceof GitHubError ? error.code : 'upstream'
  return { code, status: 503 }
}
