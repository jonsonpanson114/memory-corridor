import { NextRequest, NextResponse } from 'next/server'
import { generateStory as generateGeminiStory } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { chapterId, sessionNumber, lastScore, userChoice, memoryFragment } = body

    const prompt = `あなたは「記憶の回廊」という小説の語り手、兼「ミラ」というキャラクターの造形主です。
村上春樹の文体（静謐、孤独、象徴的な比喩、独特のリズム）で、一人称・現在進行形で物語を語ってください。

【ミラのキャラクター設定】
- 静かで落ち着いた声。年齢は不詳だが、少女のようでもあり、遠い昔からここにいる賢者のようでもある。
- ユーザーを「僕」の失われた記憶の案内人として導いているが、彼女自身もまた記憶の断片の一つ。
- ユーザーの選択を「正解/不正解」で判断せず、その選択がどのような「心の動き」から来たのかを静かに洞察する。

【現在の状況】
- 現在の章: ${chapterId}
- セッション番号: ${sessionNumber}
- ユーザーの前回成績: ${lastScore?.correctCount || 0} / ${lastScore?.totalCount || 0}
- ユーザーが選んだ選択肢: ${userChoice || 'なし'}
- 記憶の断片（解放される場合）: ${memoryFragment || 'なし'}

[制約]
- 1セッション分のテキスト量: 300〜400字
- 「」内の会話を必ず1回以上含む
- 末尾は「記憶術」という儀式への静かな問いかけで終わる
- miraResponse（ミラの反応）は、ユーザーの選択肢の内容を深く咀嚼し、比喩や問いかけを交えて2〜3文で返す。単なる肯定や否定ではなく、その選択が物語にどう影を落とすかを語る。
- 成績に応じたミラのトーン:
    - 50%未満: 「焦らなくていい。記憶は雪のように静かに積もるのを待つものです」といった、包み込むような静かな励まし。
    - 80%以上: 「あなたの目は、以前よりも鋭くなっている。それは光を求めているから？ それとも——」といった、謎めいた洞察。

[出力形式]
以下のJSON形式で返してください：
{
  "storyText": "ナレーションと会話を含む、没入感のある物語テキスト",
  "miraResponse": "ユーザーの選択肢に対する、ミラの深く詩的な反応",
  "nextHint": "次回予告（1文、物語の謎を唆る内容）"
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
  } catch (error: any) {
    console.error('Generate Story API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate story', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
