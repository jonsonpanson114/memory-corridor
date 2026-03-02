'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { getSession } from '@/lib/story-data'
import TextReveal from '@/components/story/TextReveal'
import ChoiceButton from '@/components/story/ChoiceButton'
import CandleAmbient from '@/components/story/CandleAmbient'

export default function StoryPage({
  params,
}: {
  params: Promise<{ chapterId: string }>
}) {
  const { chapterId } = use(params)
  const session = getSession(chapterId, 1)
  const [showChoices, setShowChoices] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-primary">章が見つかりません</p>
      </div>
    )
  }

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId)
  }

  return (
    <main className="min-h-screen flex flex-col p-4 md:p-8">
      <CandleAmbient />

      <div className="flex-1 max-w-2xl mx-auto w-full">
        {/* 章タイトル */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl md:text-3xl text-accent mb-2">
            第一章「館の扉」
          </h1>
          <p className="font-sans text-text-secondary text-sm">
            第一話「目覚め」
          </p>
        </div>

        {/* 物語テキスト */}
        <div className="mb-8 min-h-[400px]">
          <TextReveal
            text={session.storyText}
            speed={30}
            onComplete={() => setShowChoices(true)}
          />
        </div>

        {/* 選択肢 */}
        {showChoices && !selectedChoice && session.choices && (
          <div className="space-y-2">
            {session.choices.map((choice, index) => (
              <ChoiceButton
                key={choice.id}
                text={choice.text}
                onClick={() => handleChoiceSelect(choice.id)}
                delay={index * 0.2}
              />
            ))}
          </div>
        )}

        {/* 選択後の遷移ボタン */}
        {selectedChoice && (
          <div className="mt-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Link
                href="/training"
                className="btn-primary inline-block font-serif text-lg"
              >
                記憶術へ進む
              </Link>
              <p className="font-sans text-text-secondary text-sm mt-4">
                自分の場所——記憶の宮殿を準備してください
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  )
}

import { motion } from 'framer-motion'
