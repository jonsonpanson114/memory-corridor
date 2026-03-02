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
  const hasStartedRef = useRef(false)

  useEffect(() => {
    return () => {
      if (hasStartedRef.current || isComplete) return
      hasStartedRef.current = true

      let index = 0
      let charIndex = 0

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsComplete(false)
      setDisplayedText('')
      index = 0
      charIndex = 0
      hasStartedRef.current = false
      return
      }

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
        charIndex += charsToAdd

      }, speed)

      intervalRef.current = interval
    }

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
      <span className="animate-pulse">|</span>
    </motion.p>
  )
}
