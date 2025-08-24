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
}

export interface GitHubContribution {
  date: string
  count: number
}

export interface LanguageStats {
  [language: string]: number
}

const GITHUB_API_URL = 'https://api.github.com'
const username = process.env.GITHUB_USERNAME || 'ruffbuff'

async function fetchGitHub(endpoint: string): Promise<any> {
  const token = process.env.GITHUB_TOKEN
  
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is required')
  }

  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'RuffBuff-Portfolio',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getGitHubUser(): Promise<GitHubUser> {
  return fetchGitHub(`/users/${username}`)
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchGitHub(`/users/${username}/repos?sort=updated&per_page=100`)
  
  // Filter out forks and archived repos, sort by stars and recent activity
  return repos
    .filter((repo: GitHubRepo) => !repo.fork && !repo.archived)
    .sort((a: GitHubRepo, b: GitHubRepo) => {
      // Sort by stars first, then by recent activity
      if (a.stargazers_count !== b.stargazers_count) {
        return b.stargazers_count - a.stargazers_count
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
}

export async function getLanguageStats(): Promise<LanguageStats> {
  const repos = await getGitHubRepos()
  const languageStats: LanguageStats = {}

  // Get language stats for each repo
  await Promise.all(
    repos.slice(0, 20).map(async (repo) => {
      if (repo.language) {
        try {
          const languages = await fetchGitHub(`/repos/${repo.full_name}/languages`)
          
          Object.entries(languages).forEach(([lang, bytes]) => {
            languageStats[lang] = (languageStats[lang] || 0) + (bytes as number)
          })
        } catch (error) {
          // Skip repos with language API issues
          console.warn(`Could not fetch languages for ${repo.full_name}`)
        }
      }
    })
  )

  return languageStats
}

export async function getContributionData(year?: number): Promise<GitHubContribution[]> {
  const token = process.env.GITHUB_TOKEN
  
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is required')
  }

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

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { username, from, to },
    }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
  }

  const contributions: GitHubContribution[] = []
  
  data.data.user.contributionsCollection.contributionCalendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      contributions.push({
        date: day.date,
        count: day.contributionCount,
      })
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
      repo.homepage || // Has a homepage/demo
      repo.topics?.length > 0 // Has topics (usually means it's well-maintained)
    )
  })

  return featured.slice(0, 6) // Return top 6 featured repos
}

// Helper function to get language color (GitHub's official colors)
export function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Solidity: '#AA6C39',
    HTML: '#e34c26',
    CSS: '#1572B6',
    Lua: '#000080',
    Shell: '#89e051',
    'Jupyter Notebook': '#DA5B0B',
    Dockerfile: '#384d54',
    Vue: '#4FC08D',
    React: '#61DAFB',
    'C++': '#f34b7d',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
  }
  
  return colors[language] || '#8b949e'
}