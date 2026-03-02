'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BlankTimeProps {
  duration?: number
  onComplete: () => void
}

export default function BlankTime({ duration = 30, onComplete }: BlankTimeProps) {
  const [countdown, setCountdown] = useState(duration)

  useEffect(() => {
    if (countdown <= 0) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, onComplete])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-accent/20 blur-xl"
        />

        <p className="font-serif text-2xl text-text-primary mb-4">
          目を閉じてください
        </p>

        <p className="font-sans text-text-secondary mb-4">
          記憶の宮殿を歩いてください
        </p>

        <motion.p
          key={countdown}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-mono text-6xl text-accent"
        >
          {countdown}
        </motion.p>

        <p className="font-sans text-text-secondary/50 text-sm mt-4">
          秒
        </p>
      </motion.div>
    </div>
  )
}
