import { NextResponse } from 'next/server'
import { getGitHubRepos, getFeaturedRepos } from '@/lib/github'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured') === 'true'
  
  try {
    const repos = featured ? await getFeaturedRepos() : await getGitHubRepos()
    return NextResponse.json(repos)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}