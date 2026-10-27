import { NextResponse } from 'next/server'
import { CACHE_ERROR, CACHE_OK, getContributionData, githubErrorStatus } from '@/lib/github'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = parseInt(searchParams.get('year') ?? '', 10)
    const year = Number.isFinite(parsed) && parsed > 2000 && parsed < 2100 ? parsed : undefined

    const contributions = await getContributionData(year)
    return NextResponse.json(contributions, { headers: { 'Cache-Control': CACHE_OK } })
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error instanceof Error ? error.message : error)
    // 503 + code ('no-token' = GITHUB_TOKEN is not configured): the UI shows an "unavailable" state
    const { code, status } = githubErrorStatus(error)
    return NextResponse.json({ error: 'Failed to fetch contributions', code }, { status, headers: { 'Cache-Control': CACHE_ERROR } })
  }
}
