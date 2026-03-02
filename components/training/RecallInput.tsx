'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface RecallInputProps {
  items: Array<{ id: string; content: string }>
  places: string[]
  onSubmit: (answers: Array<{ itemId: string; answer: string }>) => void
}

export default function RecallInput({ items, places, onSubmit }: RecallInputProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswerChange = (itemId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [itemId]: value,
    }))
  }

  const handleSubmit = () => {
    const answerArray = items.map((item) => ({
      itemId: item.id,
      answer: answers[item.id] || '',
    }))
    onSubmit(answerArray)
  }

  const isComplete = items.every((item) => answers[item.id]?.trim() !== '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl text-text-primary mb-2">
          想起
        </h2>
        <p className="font-sans text-text-secondary text-sm">
          記憶の宮殿を歩いて、覚えたものを書き出してください
        </p>
      </div>

      {/* 入力フォーム */}
      <div className="space-y-4 mb-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="font-sans text-text-secondary text-sm mb-2">
              場所 {index + 1}
            </p>
            <p className="font-sans text-text-secondary/70 text-xs mb-1">
              {places[index] || '—'}
            </p>
            <input
              type="text"
              value={answers[item.id] || ''}
              onChange={(e) => handleAnswerChange(item.id, e.target.value)}
              placeholder="ここに置いたもの..."
              className="w-full px-4 py-3 bg-background/50 border border-text-secondary/30 rounded text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 font-serif"
            />
          </motion.div>
        ))}
      </div>

      {/* 提出ボタン */}
      {isComplete && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="btn-primary w-full font-serif text-lg"
        >
          答えを差し出す
        </motion.button>
      )}

      <p className="font-sans text-text-secondary/50 text-xs text-center mt-4">
        完全に思い出せなくても大丈夫です。思い出せる範囲で書いてください。
      </p>
    </motion.div>
  )
}
