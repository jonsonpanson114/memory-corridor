import webpush from 'web-push'
import {
  listPushSubscriptions,
  removePushSubscription,
  type StoredPushSubscription,
} from '@/lib/push-subscriptions'

type PushPayload = {
  title: string
  body: string
  url?: string
  icon?: string
}

const APP_ORIGIN = (process.env.NEXT_PUBLIC_APP_ORIGIN || 'https://memory-corridor.vercel.app').replace(/\/$/, '')

function ensureVapidConfigured(): void {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim()
  const privateKey = process.env.VAPID_PRIVATE_KEY?.trim()
  const subject = process.env.VAPID_SUBJECT?.trim()

  if (!publicKey || !privateKey || !subject) {
    throw new Error('VAPID keys are not configured')
  }

  webpush.setVapidDetails(subject, publicKey, privateKey)
}

function getDailyPayload(): PushPayload {
  return {
    title: '記憶の回廊 | 今日の扉',
    body: 'ろうそくが灯っています。12時の回廊へ。',
    url: '/',
    icon: `${APP_ORIGIN}/icon-192.png`,
  }
}

function isExpiredSubscriptionError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const statusCode = (error as { statusCode?: number }).statusCode
  return statusCode === 404 || statusCode === 410
}

export async function sendPushToSubscription(
  subscription: StoredPushSubscription,
  payload: PushPayload
): Promise<void> {
  ensureVapidConfigured()
  await webpush.sendNotification(subscription, JSON.stringify(payload))
}

export async function sendDailyReminderPush(): Promise<{
  total: number
  sent: number
  removed: number
  failed: number
}> {
  const subscriptions = await listPushSubscriptions()
  const payload = getDailyPayload()
  let sent = 0
  let removed = 0
  let failed = 0

  for (const sub of subscriptions) {
    try {
      await sendPushToSubscription(sub, payload)
      sent += 1
    } catch (error) {
      if (isExpiredSubscriptionError(error)) {
        await removePushSubscription(sub.endpoint)
        removed += 1
        continue
      }
      failed += 1
      console.error('Push send failed:', error)
    }
  }

  return {
    total: subscriptions.length,
    sent,
    removed,
    failed,
  }
}
