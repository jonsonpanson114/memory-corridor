'use client'

import { motion } from 'framer-motion'

interface ChoiceButtonProps {
  text: string
  onClick: () => void
  delay?: number
}

export default function ChoiceButton({ text, onClick, delay = 0 }: ChoiceButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 10 }}
      whileTap={{ x: 5 }}
      onClick={onClick}
      className="w-full text-left p-4 font-serif text-lg text-text-primary hover:text-accent transition-colors border-b border-text-secondary/20"
    >
      「{text}」
    </motion.button>
  )
}
