import { NextResponse } from 'next/server'
import { getContributionData, GitHubConfigError } from '@/lib/github'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = parseInt(searchParams.get('year') ?? '', 10)
    const year = Number.isFinite(parsed) && parsed > 2000 && parsed < 2100 ? parsed : undefined
    
    const contributions = await getContributionData(year)
    return NextResponse.json(contributions)
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    // 503 = not configured (no GITHUB_TOKEN) or GitHub unavailable: the UI shows an "unavailable" state
    return NextResponse.json(
      { error: error instanceof GitHubConfigError ? 'GITHUB_TOKEN is not configured' : 'Failed to fetch contributions' },
      { status: 503 }
    )
  }
}