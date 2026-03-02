'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getProgress } from '@/lib/user-progress'

export default function Home() {
  const [progress, setProgress] = useState(getProgress())
  const [lastPlayed, setLastPlayed] = useState<string | null>(null)

  useEffect(() => {
    setProgress(getProgress())
    const stored = localStorage.getItem('last-score')
    if (stored) {
      const data = JSON.parse(stored)
      const lastPlayedDate = new Date(data.timestamp || Date.now())
      const now = new Date()
      const diffHours = Math.floor((now.getTime() - lastPlayedDate.getTime()) / (1000 * 60 * 60))

      if (diffHours < 24) {
        setLastPlayed(`${diffHours}時間前`)
      } else if (diffHours < 48) {
        setLastPlayed('昨日')
      } else {
        setLastPlayed(`${Math.floor(diffHours / 24)}日前`)
      }
    }
  }, [])

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

        {/* 前回のプレイ状況 */}
        {lastPlayed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-4 bg-background/50 border border-text-secondary/20 rounded"
          >
            <p className="font-sans text-text-secondary text-xs mb-1">
              前回のプレイ
            </p>
            <p className="font-sans text-text-primary">
              {lastPlayed}
            </p>
            <p className="font-sans text-text-secondary/50 text-xs mt-2">
              セッション {progress.totalSessions} · 正解率{' '}
              {progress.totalSessions > 0
                ? Math.round((progress.totalCorrectAnswers / (progress.totalSessions * 5)) * 100)
                : 0}%
            </p>
          </motion.div>
        )}

        {/* メインボタン */}
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

        {/* サブメニュー */}
        <div className="mt-6 space-y-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/diary"
              className="block font-sans text-text-secondary text-sm hover:text-accent transition-colors"
            >
              記憶の日記を見る
            </Link>
          </motion.div>
        </div>

        <p className="font-sans text-text-secondary/50 text-xs mt-8">
          毎日10〜15分の物語と記憶術トレーニング
        </p>
      </motion.div>
    </main>
  )
}
