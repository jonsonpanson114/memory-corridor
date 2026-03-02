'use client'

import { motion } from 'framer-motion'

interface ScoreCandlesProps {
  correctCount: number
  totalCount: number
}

export default function ScoreCandles({ correctCount, totalCount }: ScoreCandlesProps) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: totalCount }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative"
        >
          {/* ろうそくの台座 */}
          <div className="w-2 h-6 bg-text-secondary/40 mx-auto" />

          {/* 炎 */}
          {index < correctCount ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.2 + 0.3,
                type: 'spring',
                stiffness: 200,
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-4 h-6 bg-gradient-to-t from-accent to-orange-400 rounded-full mx-auto relative"
            >
              {/* 光のエフェクト */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-accent blur-md rounded-full"
              />
            </motion.div>
          ) : (
            <div className="w-4 h-6 bg-text-secondary/20 rounded-full mx-auto opacity-30" />
          )}
        </motion.div>
      ))}
    </div>
  )
}
