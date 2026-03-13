'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RecallInputProps {
  items: Array<{ id: string; content: string }>
  places: string[]
  onSubmit: (answers: Array<{ itemId: string; answer: string }>) => void
}

export default function RecallInput({ items, places, onSubmit }: RecallInputProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswerChange = (itemId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [itemId]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < items.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const answerArray = items.map((item) => ({
        itemId: item.id,
        answer: answers[item.id] || '',
      }))
      onSubmit(answerArray)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentItem = items[currentStep]
  const currentPlace = places[currentStep] || '—'
  const progress = ((currentStep + 1) / items.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl text-text-primary mb-2">
          想起の扉
        </h2>
        <p className="font-sans text-text-secondary text-sm">
          記憶の宮殿を歩いて、そこに置いたものを思い出してください
        </p>
      </div>

      {/* プログレスバー */}
      <div className="mb-8 overflow-hidden h-1 bg-text-secondary/10 rounded-full">
        <motion.div
           initial={{ width: 0 }}
           animate={{ width: `${progress}%` }}
           className="h-full bg-accent"
        />
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 bg-background/40 border border-text-secondary/20 rounded-xl">
              <p className="font-sans text-text-secondary text-xs uppercase tracking-widest mb-1 text-center">
                Location {currentStep + 1}
              </p>
              <h3 className="font-serif text-xl text-text-primary text-center mb-6">
                {currentPlace}
              </h3>

              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={answers[currentItem.id] || ''}
                  onChange={(e) => handleAnswerChange(currentItem.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && answers[currentItem.id]?.trim()) {
                      handleNext()
                    }
                  }}
                  placeholder="ここには何がありましたか？"
                  className="w-full px-4 py-4 bg-background/60 border border-accent/20 rounded-lg text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent/60 font-serif text-lg text-center"
                />
              </div>
            </div>

            <p className="font-sans text-text-secondary/60 text-xs text-center italic">
              目を閉じて、その場所に置いてあるものの感触や匂いを思い出して...
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* コントロールボタン */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-lg font-serif transition-colors ${
            currentStep === 0 
              ? 'text-text-secondary/20 cursor-not-allowed' 
              : 'text-text-secondary hover:text-accent'
          }`}
        >
          戻る
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={!answers[currentItem.id]?.trim()}
          className={`flex-1 btn-primary font-serif text-lg active:scale-95 transition-all ${
            !answers[currentItem.id]?.trim() ? 'opacity-50 grayscale' : ''
          }`}
        >
          {currentStep < items.length - 1 ? '次の場所へ' : '答えを使い切る'}
        </motion.button>
      </div>

      <p className="font-sans text-text-secondary/40 text-[10px] text-center mt-6">
        完全に一致しなくても、記憶の糸口があれば大丈夫。自分なりの言葉で。
      </p>
    </motion.div>
  )
}
