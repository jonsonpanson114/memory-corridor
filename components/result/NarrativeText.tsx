'use client'

import { motion } from 'framer-motion'

interface NarrativeTextProps {
  text: string
  feedback?: string[]
}

export default function NarrativeText({ text, feedback }: NarrativeTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="max-w-md mx-auto w-full"
    >
      {/* メインの物語テキスト */}
      <div className="mb-8">
        <p className="font-serif text-lg leading-relaxed text-text-primary whitespace-pre-line">
          {text}
        </p>
      </div>

      {/* フィードバック */}
      {feedback && feedback.length > 0 && (
        <div className="space-y-2">
          {feedback.map((item, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 1 }}
              className="font-sans text-text-secondary text-sm"
            >
              {item}
            </motion.p>
          ))}
        </div>
      )}
    </motion.div>
  )
}
