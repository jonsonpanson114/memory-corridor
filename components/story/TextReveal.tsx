'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface TextRevealProps {
  text: string
  onComplete?: () => void
  speed?: number
}

export default function TextReveal({ text, onComplete, speed = 80 }: TextRevealProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Reset if text changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current!)
      intervalRef.current = null
    }
    setIsComplete(false)
    setDisplayedText('')

    let index = 0

    const interval = setInterval(() => {
      if (index >= text.length) {
        setIsComplete(true)
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        onComplete?.()
        return
      }

      const charsToAdd = Math.min(3, text.length - index)
      setDisplayedText(text.slice(0, index + charsToAdd))
      index += charsToAdd

    }, speed)

    intervalRef.current = interval

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
      }
    }
  }, [text, speed, onComplete])

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
