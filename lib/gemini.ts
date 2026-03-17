import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = process.env.GEMINI_API_KEY

if (!API_KEY) {
  console.warn('GEMINI_API_KEY is not set. AI features will be disabled.')
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null

export async function generateStory(prompt: string): Promise<string> {
  if (!genAI) {
    return JSON.stringify({
      storyText: "……。",
      miraResponse: "……。",
      nextHint: "（AI機能が無効なため、予告は作れません）"
    })
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini API error, using fallback:', error)
    return JSON.stringify({
      storyText: "……。",
      miraResponse: "……あなたの声は、今の私には遠く霞んで聞こえます。先へ進んでください。",
      nextHint: "（通信が途切れているようです。記憶術へ直行します）"
    })
  }
}

export async function scoreAnswers(params: {
  items: Array<{ id: string; content: string }>
  answers: Array<{ itemId: string; answer: string }>
  palace: { name: string; places: string[] }
}): Promise<{
  scores: Array<{
    itemId: string
    isCorrect: boolean
    feedback: string
  }>
  correctCount: number
  totalCount: number
  narrative: string
  feedback: string[]
}> {
  if (!genAI) {
    // ダミーの採点結果を返す
    return {
      scores: params.answers.map((a) => ({
        itemId: a.itemId,
        isCorrect: false,
        feedback: 'AI機能が無効されています',
      })),
      correctCount: 0,
      totalCount: params.items.length,
      narrative: '[AI機能が無効されています]',
      feedback: [],
    }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })

    const itemMap = new Map(params.items.map((i) => [i.id, i.content]))

    const prompt = `あなたは記憶術の採点者です。以下の回答を採点してください。

【正解リスト】
${params.items.map((i, idx) => `${idx + 1}. ${i.content}`).join('\n')}

【ユーザーの回答】
${params.answers.map((a, idx) => {
      const correctItem = itemMap.get(a.itemId)
      return `${idx + 1}. ${a.answer}`
    }).join('\n')}

【記憶の宮殿】
場所名：${params.palace.name}
通過点：
${params.palace.places.map((p, i) => `${i + 1}. ${p}`).join('\n')}

【採点基準】
- 表記ゆれ・部分一致・意味的一致はすべて正解とみなす
- 完全に一致しなくても、核心を捉えていれば正解
- 想像力が豊かであれば、部分的に加点

【返却形式】
以下のJSON形式で返してください：
{
  "scores": [
    {
      "itemId": "item1",
      "isCorrect": true,
      "feedback": "正解です。詳細なフィードバック"
    }
  ],
  "correctCount": 3,
  "totalCount": 5,
  "narrative": "村上春樹風の詩的なフィードバック（記憶の宮殿を使った描写）",
  "feedback": ["短いフィードバック1", "短いフィードバック2"]
}

narrativeは「${params.palace.name}」を使った詩的な描写にしてください。`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // JSONを抽出
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse Gemini response')
    }

    const jsonText = jsonMatch[0]
    return JSON.parse(jsonText)
  } catch (error) {
    console.error('Gemini API error, using fallback:', error)
    return {
      scores: params.answers.map((a) => ({
        itemId: a.itemId,
        isCorrect: false,
        feedback: 'AI機能が無効なため、採点できませんでした',
      })),
      correctCount: 0,
      totalCount: params.items.length,
      narrative: '……。AI機能にエラーが発生しました。',
      feedback: [],
    }
  }
}
export async function generateTrainingData(params: {
  chapterId: string
  sessionNumber: number
  type: string
  count?: number
}): Promise<Array<{ id: string; content: string; type: string }>> {
  if (!genAI) {
    return []
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })
    const count = params.count || 5

    const prompt = `あなたは「記憶の回廊」という物語の記憶術トレーニング講師です。
以下の条件に基づいて、記憶術のトレーニング用アイテム（覚える対象）を${count}個生成してください。

現在の章: ${params.chapterId}
セッション番号: ${params.sessionNumber}
記憶術のタイプ: ${params.type} (place: 場所法, number: 数字変換法, word: 連想法, story: ストーリー法)

[生成ルール]
- ${params.type === 'place' ? '「館（古びた洋館、書斎、廊下）」にふさわしい、具体的でイメージしやすい「物」を生成してください。' : ''}
- ${params.type === 'number' ? '3〜4桁の数字、または日付（4桁）をランダムに生成してください。' : ''}
- ${params.type === 'word' ? '互いに関連性があるようでいて意外性のある名詞（例：銀の鈴、赤いリボン）を生成してください。' : ''}
- ${params.type === 'story' ? '物語のキーとなる情景や感情、キーワードを5〜10文字程度のフレーズで生成してください。' : ''}
- アイテムは「${params.chapterId}」の世界観（村上春樹風の静謐で謎めいた雰囲気）に合致させてください。

[出力形式]
以下のJSON形式で返してください：
[
  { "id": "item1", "content": "生成されたアイテム内容", "type": "${params.type}" },
  ...
]`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // JSONを抽出
    const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/)
    if (!jsonMatch) {
      throw new Error('Failed to parse Gemini response for training data')
    }

    const jsonText = jsonMatch[0]
    return JSON.parse(jsonText).map((item: any, idx: number) => ({
      ...item,
      id: `dynamic-${idx + 1}`
    }))
  } catch (error) {
    console.error('Gemini API error for training data:', error)
    return []
  }
}
