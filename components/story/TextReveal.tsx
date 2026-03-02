'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TextRevealProps {
  text: string
  onComplete?: () => void
  speed?: number
}

export default function TextReveal({ text, onComplete, speed = 50 }: TextRevealProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(interval)
        onComplete?.()
      }
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
    </motion.p>
  )
}
