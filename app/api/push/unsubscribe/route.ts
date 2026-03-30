import { NextRequest, NextResponse } from 'next/server'
import { removePushSubscription } from '@/lib/push-subscriptions'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { endpoint?: string }
    if (!body.endpoint) {
      return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 })
    }

    await removePushSubscription(body.endpoint)
    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    console.error('Push unsubscribe API error:', error)
    return NextResponse.json({ error: 'Failed to remove subscription' }, { status: 500 })
  }
}
