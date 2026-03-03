'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface TextRevealProps {
  text: string
  onComplete?: () => void
  speed?: number
}

export default function TextReveal({ text, onComplete, speed = 200 }: TextRevealProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    // 最初のレンダリングでのみ実行
    if (hasStartedRef.current) {
      return
    }

    hasStartedRef.current = true
    let index = 0

    const interval = setInterval(() => {
      if (index >= text.length) {
        setIsComplete(true)
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        onComplete?.()
        return
      }

      // 1回に1文字ずつ追加
      setDisplayedText(prev => text.slice(0, index + 1))
      index += 1

    }, speed)

    intervalRef.current = interval

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
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
