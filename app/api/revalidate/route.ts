import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'

// Optional on-demand refresh of the changelog (so you do not have to wait for the hourly ISR):
//   curl -X POST "https://<site>/api/revalidate" -H "Authorization: Bearer $REVALIDATE_SECRET"
// Works only when REVALIDATE_SECRET is set in the environment; otherwise the route is disabled (404).
// Can be called from a GitHub Action / webhook of the project repo after a push that touches CHANGELOG.md.

function authorized(request: Request, secret: string): boolean {
  const header = request.headers.get('authorization') ?? ''
  const given = header.startsWith('Bearer ') ? header.slice(7) : ''
  const a = Buffer.from(given)
  const b = Buffer.from(secret)
  return a.length === b.length && timingSafeEqual(a, b)
}

async function handle(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!authorized(request, secret)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  revalidateTag('changelog', { expire: 0 })
  revalidatePath('/changelog', 'layout')
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() })
}

export const POST = handle
export const dynamic = 'force-dynamic'
