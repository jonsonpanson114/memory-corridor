'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface WalkThroughProps {
  items: Array<{ id: string; content: string }>
  places: string[]
  onComplete: () => void
}

export default function WalkThrough({ items, places, onComplete }: WalkThroughProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0)

  const currentItem = items[currentItemIndex]
  const currentPlace = places[currentPlaceIndex] || ''

  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <p className="text-text-secondary">課題を読み込んでいます...</p>
      </div>
    )
  }

  const handleNext = () => {
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1)
      if (currentPlaceIndex < places.length - 1) {
        setCurrentPlaceIndex(currentPlaceIndex + 1)
      } else {
        setCurrentPlaceIndex(0) // 場所を循環
      }
    } else {
      onComplete()
    }
  }

  const progress = ((currentItemIndex + 1) / items.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="text-center mb-6">
        <p className="font-sans text-text-secondary text-sm mb-1">
          項目 {currentItemIndex + 1} / {items.length}
        </p>
        <div className="w-full h-1 bg-text-secondary/20 rounded">
          <motion.div
            className="h-full bg-accent rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 現在の項目 */}
      <div className="mb-8">
        <p className="font-sans text-text-secondary text-sm mb-2 text-center">
          覚えるもの
        </p>
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-background/50 border border-accent/30 rounded text-center"
        >
          <p className="font-serif text-lg text-text-primary">
            {currentItem.content}
          </p>
        </motion.div>
      </div>

      {/* 現在の場所 */}
      <div className="mb-8">
        <p className="font-sans text-text-secondary text-sm mb-2 text-center">
          置く場所
        </p>
        <div className="p-4 bg-background/30 border border-text-secondary/20 rounded text-center">
          <p className="font-serif text-text-primary">
            {currentPlace || '場所を選択してください'}
          </p>
        </div>
      </div>

      {/* イメージガイド */}
      <div className="mb-8 p-4 bg-text-secondary/5 rounded">
        <p className="font-sans text-text-secondary text-sm text-center">
          目を閉じて、{currentPlace}に{currentItem.content}を置くイメージをしてください
        </p>
        <p className="font-sans text-text-secondary/70 text-xs text-center mt-2">
          奇妙で印象的なシーンにするほど、記憶に残りやすくなります
        </p>
      </div>

      {/* 次へボタン */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNext}
        className="btn-primary w-full font-serif text-lg"
      >
        {currentItemIndex < items.length - 1 ? '次へ' : '想起へ進む'}
      </motion.button>
    </motion.div>
  )
}
