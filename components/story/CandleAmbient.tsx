'use client'

import { motion } from 'framer-motion'

export default function CandleAmbient() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        {/* 燭台の台座 */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-text-secondary/30" />

        {/* 炎 */}
        <div className="w-8 h-12 bg-gradient-to-t from-accent to-orange-400 rounded-full relative">
          {/* 炎の光 */}
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
        </div>

        {/* ろうそくの芯 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-800" />
      </motion.div>
    </div>
  )
}
