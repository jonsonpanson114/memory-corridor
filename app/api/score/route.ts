import { NextRequest, NextResponse } from 'next/server'
import { scoreAnswers } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, answers, palace } = body

    if (!items || !answers || !palace) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await scoreAnswers({ items, answers, palace })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Score API error:', error)
    return NextResponse.json(
      { error: 'Failed to score answers', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
