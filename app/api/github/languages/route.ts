import { NextResponse } from 'next/server'
import { getLanguageStats } from '@/lib/github'

export async function GET() {
  try {
    const languages = await getLanguageStats()
    return NextResponse.json(languages)
  } catch (error) {
    console.error('Error fetching GitHub languages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch language statistics' },
      { status: 500 }
    )
  }
}