'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TextRevealProps {
  text: string
  onComplete?: () => void
  speed?: number
}

export default function TextReveal({ text, onComplete, speed = 80 }: TextRevealProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    let charIndex = 0

    const interval = setInterval(() => {
      if (index >= text.length) {
        setIsComplete(true)
        clearInterval(interval)
        onComplete?.()
        return
      }

      // 1〜3文字ずつ表示して読みやすく
      const charsToAdd = Math.min(3, text.length - index)
      setDisplayedText(text.slice(0, index + charsToAdd))
      index += charsToAdd
      charIndex += charsToAdd

    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-serif text-lg leading-relaxed tracking-wide text-text-primary"
    >
      {displayedText}
      <span className="animate-pulse">|</span>
    </motion.p>
  )
}
