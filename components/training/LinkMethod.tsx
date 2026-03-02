'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface LinkMethodProps {
  items: Array<{ id: string; content: string }>
  onComplete: () => void
}

export default function LinkMethod({ items, onComplete }: LinkMethodProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [links, setLinks] = useState<Record<number, string[]>>({})
  const [showLinks, setShowLinks] = useState(false)

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowLinks(false)
    } else {
      onComplete()
    }
  }

  const handleLinkChange = (fromIndex: number, toIndex: number, description: string) => {
    setLinks((prev) => ({
      ...prev,
      [currentIndex]: [...(prev[currentIndex] || []), { from: fromIndex, to: toIndex, description }]
    }))
  }

  const currentItem = items[currentIndex]
  const previousItem = items[currentIndex - 1]
  const nextItem = items[currentIndex + 1]

  return (
    <div className="max-w-md mx-auto w-full">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <p className="font-sans text-text-secondary text-sm mb-2">
          連想法トレーニング
        </p>
        <p className="font-sans text-text-primary text-xs mb-1">
          項目 {currentIndex + 1} / {items.length}
        </p>
        <div className="w-full h-1 bg-text-secondary/20 rounded">
          <motion.div
            className="h-full bg-accent rounded"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 現在のアイテム */}
      <div className="mb-8">
        <p className="font-sans text-text-secondary text-sm mb-2 text-center">
          覚えるもの
        </p>
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-background/50 border border-accent/30 rounded text-center"
        >
          <p className="font-serif text-xl text-text-primary mb-2">
            {currentItem.content}
          </p>
        </motion.div>
      </div>

      {/* 連想の説明 */}
      <div className="mb-8 p-6 bg-background/30 border border-text-secondary/20 rounded">
        <p className="font-sans text-text-secondary text-xs mb-4 text-center">
          連想法のヒント
        </p>
        <p className="font-sans text-text-primary text-sm leading-relaxed">
          覚えるものを、知っているものと関連付けましょう。<br />
          例：{previousItem?.content} → {currentItem.content} → {nextItem?.content}<br />
          <br />
          奇妙で面白い物語を考えると、より記憶に残ります。
        </p>
      </div>

      {/* 連想入力 */}
      {showLinks && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="font-sans text-text-secondary text-sm mb-4 text-center">
            {previousItem?.content}と{currentItem.content}をどう繋げますか？
          </p>
          <textarea
            value={links[currentIndex]?.find(l => l.from === currentIndex)?.description || ''}
            onChange={(e) => handleLinkChange(currentIndex, currentIndex, e.target.value)}
            placeholder="例：ペンでリボンを結んだ..."
            className="w-full px-4 py-4 bg-background/50 border border-text-secondary/30 rounded text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 font-serif text-lg resize-none"
            rows={3}
          />
        </motion.div>
      )}

      {/* ボタン */}
      {!showLinks && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowLinks(true)}
          className="btn-primary w-full font-serif text-lg mb-4"
        >
          連想を作る
        </motion.button>
      )}

      {showLinks && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="btn-primary w-full font-serif text-lg"
        >
          {currentIndex < items.length - 1 ? '次へ' : '完了'}
        </motion.button>
      )}
    </div>
  )
}
