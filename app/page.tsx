'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full text-center"
      >
        {/* 燭台のイメージ */}
        <motion.div
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 mx-auto mb-8 bg-accent rounded-full candle-glow"
        />

        <h1 className="font-serif text-3xl md:text-4xl mb-4 text-text-primary">
          記憶の回廊
        </h1>

        <p className="font-serif text-text-secondary mb-8 leading-relaxed">
          失われた記憶を取り戻す旅へ
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/story/chapter1"
            className="btn-primary inline-block font-serif text-lg"
          >
            館の扉を開く
          </Link>
        </motion.div>

        <p className="font-sans text-text-secondary text-sm mt-8">
          毎日10〜15分の物語と記憶術トレーニング
        </p>
      </motion.div>
    </main>
  )
}
