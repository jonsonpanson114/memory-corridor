import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = process.env.GEMINI_API_KEY

if (!API_KEY) {
  console.warn('GEMINI_API_KEY is not set. AI features will be disabled.')
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null

export async function generateStory(prompt: string): Promise<string> {
  if (!genAI) {
    return '[AI機能が無効されています]'
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
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
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })

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
    console.error('Gemini API error:', error)
    throw error
  }
}
