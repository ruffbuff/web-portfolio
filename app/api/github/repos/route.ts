import { NextResponse } from 'next/server'
import { CACHE_ERROR, CACHE_OK, getFeaturedRepos, getGitHubRepos, githubErrorStatus } from '@/lib/github'

export async function GET(request: Request) {
  const featured = new URL(request.url).searchParams.get('featured') === 'true'

  try {
    const repos = featured ? await getFeaturedRepos() : await getGitHubRepos()
    return NextResponse.json(repos, { headers: { 'Cache-Control': CACHE_OK } })
  } catch (error) {
    console.error('Error fetching GitHub repos:', error instanceof Error ? error.message : error)
    const { code, status } = githubErrorStatus(error)
    // 503 + code: the UI shows a calm "temporarily unavailable" state
    return NextResponse.json({ error: 'Failed to fetch repositories', code }, { status, headers: { 'Cache-Control': CACHE_ERROR } })
  }
}
