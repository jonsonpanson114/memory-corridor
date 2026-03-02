'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ScoreCandles from '@/components/result/ScoreCandles'
import NarrativeText from '@/components/result/NarrativeText'
import { getSession } from '@/lib/story-data'
import type { ScoreResult } from '@/types/training'

export default function ResultPage() {
  const [score, setScore] = useState<ScoreResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchScore() {
      const answersStr = localStorage.getItem('training-answers')
      const palaceStr = localStorage.getItem('training-palace')
      const chapterId = localStorage.getItem('current-chapter') || 'chapter1'
      const sessionNumber = parseInt(localStorage.getItem('current-session') || '1')

      if (!answersStr || !palaceStr) {
        setLoading(false)
        return
      }

      const answers = JSON.parse(answersStr)
      const palace = JSON.parse(palaceStr)
      const session = getSession(chapterId, sessionNumber)

      if (!session) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: session.trainingData,
            answers,
            palace,
          }),
        })

        if (response.ok) {
          const result = await response.json()
          setScore(result)
        }
      } catch (error) {
        console.error('Failed to fetch score:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchScore()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 bg-accent/20 rounded-full"
        />
      </div>
    )
  }

  if (!score) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-primary">結果の読み込みに失敗しました</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col p-4 md:p-8">
      <div className="flex-1 max-w-md mx-auto w-full">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-serif text-2xl text-text-primary mb-2">
            試練の結果
          </h1>
          <p className="font-sans text-text-secondary text-sm">
            {score.correctCount} / {score.totalCount}
          </p>
        </motion.div>

        {/* 燭台スコア表示 */}
        <ScoreCandles
          correctCount={score.correctCount}
          totalCount={score.totalCount}
        />

        {/* 物語的フィードバック */}
        <NarrativeText
          text={score.narrative}
          feedback={score.feedback}
        />

        {/* 記憶の断片（固定値） */}
        {score.correctCount >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded text-center"
          >
            <p className="font-sans text-text-secondary text-xs mb-2">
              解放された記憶の断片
            </p>
            <p className="font-serif text-text-primary text-sm">
              台所の朝の光。誰かがそこにいた。
            </p>
          </motion.div>
        )}

        {/* 次回予告 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-8 text-center"
        >
          <p className="font-sans text-text-secondary/50 text-xs mb-2">
            次回予告
          </p>
          <p className="font-serif text-text-secondary text-sm">
            明日——ミラは、時計塔に何かが埋まっていると言った。
          </p>
        </motion.div>

        {/* ホームへ戻る */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="btn-primary inline-block font-serif text-lg"
          >
            館を出る
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
