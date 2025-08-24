import { NextResponse } from 'next/server'
import { getGitHubUser } from '@/lib/github'

export async function GET() {
  try {
    const user = await getGitHubUser()
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching GitHub user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}