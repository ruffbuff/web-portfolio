import { NextResponse } from 'next/server'
import { CACHE_ERROR, CACHE_OK, getGitHubUser, githubErrorStatus } from '@/lib/github'

export async function GET() {
  try {
    const user = await getGitHubUser()
    return NextResponse.json(user, { headers: { 'Cache-Control': CACHE_OK } })
  } catch (error) {
    console.error('Error fetching GitHub user:', error instanceof Error ? error.message : error)
    const { code, status } = githubErrorStatus(error)
    return NextResponse.json({ error: 'Failed to fetch user data', code }, { status, headers: { 'Cache-Control': CACHE_ERROR } })
  }
}
