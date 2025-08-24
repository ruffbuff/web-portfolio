import { NextResponse } from 'next/server'
import { getContributionData } from '@/lib/github'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : undefined
    
    const contributions = await getContributionData(year)
    return NextResponse.json(contributions)
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    )
  }
}