import { NextRequest, NextResponse } from 'next/server'
import { generateStory as generateGeminiStory } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { chapterId, sessionNumber, lastScore, userChoice, memoryFragment } = body

    const prompt = `あなたは「記憶の回廊」という小説の語り手です。
村上春樹の文体で、一人称・現在進行形で物語を語ってください。

現在の章: ${chapterId}
セッション番号: ${sessionNumber}
ユーザーの前回成績: ${lastScore?.correctCount || 0} / ${lastScore?.totalCount || 0}
ユーザーが選んだ選択肢: ${userChoice || 'なし'}
解放すべき記憶の断片: ${memoryFragment || 'なし'}

[制約]
- 1セッション分のテキスト量: 300〜400字
- 「」内の会話を必ず1回以上含む
- 末尾は次への問いかけで終わる
- 成績が低い場合（正解率50%未満）: ミラのセリフを温かく、励ますトーンに
- 成績が高い場合（正解率80%以上）: ミラのセリフをより謎めいた、深いトーンに
- 成績が中程度の場合: ミラのセリフを標準的なトーンに

[出力形式]
以下のJSON形式で返してください：
{
  "storyText": "物語テキスト（ナレーションと会話を含む）",
  "miraResponse": "ミラのユーザー選択肢への反応セリフ（選択肢がある場合）",
  "nextHint": "次回予告（1文）"
}`

    const result = await generateGeminiStory(prompt)

    // JSONを抽出
    const jsonMatch = result.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse Gemini response')
    }

    const jsonText = jsonMatch[0]
    const parsed = JSON.parse(jsonText)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Generate Story API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    )
  }
}
