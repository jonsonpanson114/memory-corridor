'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface StoryMethodProps {
  items: Array<{ id: string; content: string }>
  onComplete: (order: Array<{ id: string; content: string }>) => void
}

export default function StoryMethod({ items, onComplete }: StoryMethodProps) {
  const [fragments, setFragments] = useState(items)
  const [selectedFragment, setSelectedFragment] = useState<string | null>(null)

  if (fragments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <p className="text-text-secondary">課題を読み込んでいます...</p>
      </div>
    )
  }

  const handleSelect = (id: string) => {
    if (selectedFragment === null) {
      setSelectedFragment(id)
    } else if (selectedFragment === id) {
      setSelectedFragment(null)
    } else {
      // Swap the selected fragments
      const newFragments = [...fragments]
      const selectedIndex = newFragments.findIndex(f => f.id === selectedFragment)
      const targetIndex = newFragments.findIndex(f => f.id === id)

      const temp = newFragments[selectedIndex]
      newFragments[selectedIndex] = newFragments[targetIndex]
      newFragments[targetIndex] = temp

      setFragments(newFragments)
      setSelectedFragment(null)
    }
  }

  const handleComplete = () => {
    onComplete(fragments)
  }

  return (
    <div className="max-w-md mx-auto w-full">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <p className="font-sans text-text-secondary text-sm mb-2">
          ストーリー法トレーニング
        </p>
        <p className="font-sans text-text-primary text-xs mb-4">
          断片を並べ替えて、一つの物語を作りましょう
        </p>
        <div className="p-4 bg-background/30 border border-text-secondary/20 rounded">
          <p className="font-sans text-text-secondary text-xs mb-2 text-center">
            💡 ヒント
          </p>
          <p className="font-sans text-text-primary text-sm leading-relaxed">
            二つの断片を選ぶと、場所が入れ替わります。
            時系列に、因果関係を意識して並べてみてください。
          </p>
        </div>
      </div>

      {/* 断片リスト */}
      <div className="mb-8 space-y-3">
        {fragments.map((fragment, index) => (
          <motion.button
            key={fragment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(fragment.id)}
            className={`w-full text-left p-4 border rounded transition-colors ${
              selectedFragment === fragment.id
                ? 'bg-accent/30 border-accent text-text-primary'
                : 'bg-background/50 border-text-secondary/30 text-text-primary hover:border-accent/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-sans ${
                selectedFragment === fragment.id
                  ? 'bg-accent text-background'
                  : 'bg-text-secondary/20 text-text-secondary'
              }`}>
                {index + 1}
              </div>
              <p className="font-serif text-sm leading-relaxed">
                {fragment.content}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 完了ボタン */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleComplete}
        className="btn-primary w-full font-serif text-lg"
      >
        並べ替え完了
      </motion.button>
    </div>
  )
}
