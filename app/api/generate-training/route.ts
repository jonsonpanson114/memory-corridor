import { NextRequest, NextResponse } from 'next/server'
import { generateTrainingData as generateGeminiTrainingData } from '@/lib/gemini'
import { getSession } from '@/lib/story-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { chapterId, sessionNumber, type, count } = body

    const session = getSession(chapterId, sessionNumber)
    
    const result = await generateGeminiTrainingData({
      chapterId,
      sessionNumber,
      type: type || session?.trainingData[0]?.type || 'place',
      count: count || session?.trainingData.length || 5
    })
    console.log('Gemini Result:', result)

    if (!result || result.length === 0) {
      console.warn('Gemini returned no items, falling back to static content')
      return NextResponse.json(session?.trainingData || [])
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Generate Training Data API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate training data', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
