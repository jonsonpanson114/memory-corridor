'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NumberConversionProps {
  numbers: string[]
  onComplete: () => void
}

export default function NumberConversion({ numbers, onComplete }: NumberConversionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showConversion, setShowConversion] = useState(false)
  const [userWords, setUserWords] = useState<Record<number, string>>({})

  const conversionRules: Record<string, string> = {
    '0': 's, z',
    '1': 't, d',
    '2': 'n',
    '3': 'm',
    '4': 'r',
    '5': 'l',
    '6': 'j, sh',
    '7': 'k, g',
    '8': 'f, v',
    '9': 'p, b',
  }

  const handleNext = () => {
    if (currentIndex < numbers.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowConversion(false)
    } else {
      onComplete()
    }
  }

  const handleWordChange = (index: number, word: string) => {
    setUserWords((prev) => ({ ...prev, [index]: word }))
  }

  const currentNumber = numbers[currentIndex]
  const currentSound = conversionRules[currentNumber.split('')[0]] || '?'

  return (
    <div className="max-w-md mx-auto w-full">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <p className="font-sans text-text-secondary text-sm mb-2">
          数字変換法トレーニング
        </p>
        <p className="font-sans text-text-primary text-xs mb-1">
          項目 {currentIndex + 1} / {numbers.length}
        </p>
        <div className="w-full h-1 bg-text-secondary/20 rounded">
          <motion.div
            className="h-full bg-accent rounded"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / numbers.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 現在の数字 */}
      <div className="mb-8">
        <p className="font-sans text-text-secondary text-sm mb-2 text-center">
          覚える数字
        </p>
        <motion.div
          key={currentNumber}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-background/50 border border-accent/30 rounded text-center"
        >
          <p className="font-mono text-5xl text-text-primary mb-2">
            {currentNumber}
          </p>
          <p className="font-sans text-text-secondary text-xs mb-2">
            音: {currentSound}
          </p>
        </motion.div>
      </div>

      {/* 変換表 */}
      <div className="mb-8 p-6 bg-background/30 border border-text-secondary/20 rounded">
        <p className="font-sans text-text-secondary text-xs mb-4 text-center">
          数字変換表
        </p>
        <div className="grid grid-cols-5 gap-2 text-xs font-mono text-text-primary">
          {Object.entries(conversionRules).map(([digit, sounds]) => (
            <div key={digit} className="flex flex-col items-center p-2 bg-background/20 rounded">
              <span className="text-lg text-accent mb-1">{digit}</span>
              <span className="text-text-secondary/70">{sounds}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 変換後の言葉入力 */}
      {showConversion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="font-sans text-text-secondary text-sm mb-2 text-center">
            この数字から思い浮かんだ言葉を入力してください
          </p>
          <input
            type="text"
            value={userWords[currentIndex] || ''}
            onChange={(e) => handleWordChange(currentIndex, e.target.value)}
            placeholder="例：まどか、真冬の家..."
            className="w-full px-4 py-4 bg-background/50 border border-text-secondary/30 rounded text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 font-serif text-lg text-center"
          />
        </motion.div>
      )}

      {/* ボタン */}
      {!showConversion && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowConversion(true)}
          className="btn-primary w-full font-serif text-lg mb-4"
        >
          言葉を考える
        </motion.button>
      )}

      {showConversion && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="btn-primary w-full font-serif text-lg"
        >
          {currentIndex < numbers.length - 1 ? '次へ' : '完了'}
        </motion.button>
      )}
    </div>
  )
}
