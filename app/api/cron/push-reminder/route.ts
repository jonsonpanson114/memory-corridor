import { NextRequest, NextResponse } from 'next/server'
import { sendDailyReminderPush } from '@/lib/push'

export const runtime = 'nodejs'

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim()
  if (!cronSecret) return false
  const authHeader = request.headers.get('authorization')?.trim()
  return authHeader === `Bearer ${cronSecret}`
}

async function runReminder(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await sendDailyReminderPush()
    return NextResponse.json({ ok: true, ...result })
  } catch (error: unknown) {
    console.error('Cron push reminder failed:', error)
    return NextResponse.json({ error: 'Failed to send reminders' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return runReminder(request)
}

export async function POST(request: NextRequest) {
  return runReminder(request)
}
