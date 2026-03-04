'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface TextRevealProps {
  text: string
  onComplete?: () => void
  speed?: number
}

export default function TextReveal({ text, onComplete, speed = 100 }: TextRevealProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    let index = 0
    let timeout: NodeJS.Timeout | null = null
    let isCancelled = false

    const displayNextChar = () => {
      if (isCancelled) return

      if (index >= text.length) {
        setIsComplete(true)
        onComplete?.()
        return
      }

      setDisplayedText(text.slice(0, index + 1))

      const nextChar = text[index]
      const isPunctuation = nextChar === '。' || nextChar === '、'
      const nextDelay = isPunctuation ? speed * 3 : speed

      index += 1
      timeout = setTimeout(displayNextChar, nextDelay)
    }

    // 文字列が変わった場合はリセットする
    setDisplayedText('')
    setIsComplete(false)
    timeout = setTimeout(displayNextChar, speed)

    return () => {
      isCancelled = true
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [text, speed])

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-serif text-lg leading-relaxed tracking-wide text-text-primary"
    >
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </motion.p>
  )
}
