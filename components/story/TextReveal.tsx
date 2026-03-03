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
    // 最初のレンダリングでのみ実行
    if (hasStartedRef.current) {
      return
    }

    hasStartedRef.current = true
    let index = 0

    const displayNextChar = () => {
      if (index >= text.length) {
        setIsComplete(true)
        timeoutRef.current = null
        onComplete?.()
        return
      }

      // 1回に1文字ずつ追加
      setDisplayedText(prev => text.slice(0, index + 1))

      // 次の文字を表示するまでの待ち時間を計算
      const nextChar = text[index]
      const isPunctuation = nextChar === '。' || nextChar === '、'
      const nextDelay = isPunctuation ? speed * 3 : speed  // 句読点は3倍待つ

      index += 1
      timeoutRef.current = setTimeout(displayNextChar, nextDelay)
    }

    timeoutRef.current = setTimeout(displayNextChar, speed)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
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
