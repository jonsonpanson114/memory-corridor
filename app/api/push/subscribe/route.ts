import { NextRequest, NextResponse } from 'next/server'
import { savePushSubscription, type StoredPushSubscription } from '@/lib/push-subscriptions'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const subscription = (await request.json()) as StoredPushSubscription

    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
      return NextResponse.json({ error: 'Invalid subscription payload' }, { status: 400 })
    }

    await savePushSubscription(subscription)
    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    console.error('Push subscribe API error:', error)
    return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 })
  }
}
