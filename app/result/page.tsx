'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ScoreCandles from '@/components/result/ScoreCandles'
import NarrativeText from '@/components/result/NarrativeText'
import { getSession, getChapter } from '@/lib/story-data'
import { updateScore, incrementSession, unlockMemory, saveProgress, getProgress, saveSessionResult } from '@/lib/user-progress'
import type { ScoreResult } from '@/types/training'

export default function ResultPage() {
  const [score, setScore] = useState<ScoreResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [nextHint, setNextHint] = useState<string>('')
  const [currentChapter, setCurrentChapter] = useState<string>('chapter1')
  const [currentSession, setCurrentSession] = useState<number>(1)
  const processedRef = useRef(false)

  useEffect(() => {
    async function fetchScore() {
      if (processedRef.current) return
      processedRef.current = true
      const answersStr = localStorage.getItem('training-answers')
      const palaceStr = localStorage.getItem('training-palace')
      const itemsStr = localStorage.getItem('training-items') // 実際のお題を優先
      const chapterId = localStorage.getItem('current-chapter') || 'chapter1'
      const sessionNumber = parseInt(localStorage.getItem('current-session') || '1')
      const storedNextHint = localStorage.getItem('next-hint') || ''

      // Store for render-time access
      setCurrentChapter(chapterId)
      setCurrentSession(sessionNumber)

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

      // 実際のお題を優先的に使用する。なければ静的データ。
      const actualItems = itemsStr ? JSON.parse(itemsStr) : session.trainingData

      setNextHint(storedNextHint)

      try {
        const response = await fetch('/api/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: actualItems,
            answers,
            palace,
          }),
        })

        if (response.ok) {
          const result = await response.json()
          setScore(result)

          // 進捗を更新
          updateScore(result.correctCount, result.totalCount)

          // 記憶の断片を解放
          if (result.correctCount >= 3) {
            const memoryContent = getMemoryContent(chapterId, sessionNumber, result.correctCount)
            unlockMemory(chapterId, memoryContent)
          }

          // セッションの進行を確定
          const current = getProgress()
          const chapter = getChapter(chapterId)
          const isLastSession = sessionNumber >= (chapter?.sessions?.length || 0)

          let updatedProgress: ReturnType<typeof incrementSession>
          if (isLastSession) {
            // 次の章への遷移
            const chapterIds = ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5']
            const currentIndex = chapterIds.indexOf(chapterId)
            if (currentIndex !== -1 && currentIndex < chapterIds.length - 1) {
              const nextChapterId = chapterIds[currentIndex + 1]
              updatedProgress = incrementSession(nextChapterId, 1)
            } else {
              // 最終章の場合
              const nextChapter = getChapter(chapterIds[currentIndex])
              const nextSessionNumber = (nextChapter?.sessions?.length || 0) + 1
              updatedProgress = incrementSession(chapterId, nextSessionNumber)
            }
          } else {
            // 同一章内の次のセッションへ
            updatedProgress = incrementSession(current.currentChapter, sessionNumber + 1)
          }

          // Stateを更新
          if (updatedProgress) {
            setCurrentChapter(updatedProgress.currentChapter)
            setCurrentSession(updatedProgress.currentSession)
          }

          // スコアを保存
          localStorage.setItem('last-score', JSON.stringify({
            correctCount: result.correctCount,
            totalCount: result.totalCount,
            timestamp: Date.now(),
          }))

          // 詳細な履歴を保存
          saveSessionResult({
            chapterId,
            sessionNumber,
            items: actualItems,
            answers,
            palace,
            narrative: result.narrative,
            itemScores: result.scores, // 個別の採点とフィードバック
            score: {
              correctCount: result.correctCount,
              totalCount: result.totalCount,
            }
          })
        }
      } catch (error) {
        console.error('Failed to fetch score:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchScore()
  }, [])

  // 記憶の断片の内容を取得
  function getMemoryContent(chapterId: string, sessionNumber: number, correctCount: number): string {
    const memories: Record<string, string[]> = {
      chapter1: [
        '台所の朝の光。誰かがそこにいた。',
        '手元のカップから湯気が立ち上る。',
        '誰かの声がした。温かい声。',
      ],
      chapter2: [
        '「317」という数字。それは時刻ではなく——部屋番号だったかもしれない。',
        '午後三時十七分。秋の匂い。',
        '古い写真。色褪せて顔は見えない。でも——その写真を大切にしていた自分の記憶がある。',
      ],
      chapter3: [
        '断片が、少しずつ並び始めた。秋の日。金木犀。声。目。——物語の輪郭が、見えそうになっている。',
        '「待っています」——その言葉の重さを、初めてちゃんと受け取った気がした。あの人は、ずっと待っていた。そして今も—',
      ],
      chapter4: [
        '「忘れても、いいよ」——その言葉を、僕は受け取っていた。でも忘れた。それが——ずっと、痛かったのかもしれない。',
        '「待っています」——その言葉の重さを、初めてちゃんと受け取った気がした。あの人は、ずっと待っていた。そして今も—',
      ],
      chapter5: [
        'ミラは——まどかが残した記憶の投影。僕が思い出したことで、役割を終える。',
        '「また来てね」——別れの言葉じゃなかった。続きの言葉だった。僕は——続きを見たくなかったから。',
      ],
    }

    const chapterMemories = memories[chapterId] || []
    const index = Math.min(Math.floor(correctCount / 2), chapterMemories.length - 1)
    return chapterMemories[index]
  }

  // スコアに応じた結果タイトル
  function getResultTitle(correctCount: number, totalCount: number): string {
    const percentage = correctCount / totalCount

    if (percentage >= 0.8) return '星の降る夜'
    if (percentage >= 0.6) return '月明かりの下'
    if (percentage >= 0.4) return '曇りの空'
    return '霧の中'
  }

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

  const percentage = score.correctCount / score.totalCount
  const resultTitle = getResultTitle(score.correctCount, score.totalCount)

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
            {resultTitle}
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

        {/* 記憶の断片（動的） */}
        {score.correctCount >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 p-6 bg-accent/10 border border-accent/30 rounded text-center relative overflow-hidden"
          >
            {/* 背景の光のエフェクト */}
            <motion.div
              animate={{
                opacity: [0, 0.2, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-accent/20 pointer-events-none"
            />

            <p className="font-sans text-text-secondary text-xs mb-2 relative z-10">
              解放された記憶の断片
            </p>
            <p className="font-serif text-text-primary text-sm relative z-10">
              * {getMemoryContent(currentChapter, currentSession, score.correctCount)}
            </p>
          </motion.div>
        )}

        {/* 激励メッセージ（低スコアの場合） */}
        {percentage < 0.4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 p-4 bg-background/50 border border-text-secondary/20 rounded text-center"
          >
            <p className="font-serif text-text-secondary text-sm">
              大丈夫です。記憶は時間をかけて戻ります。
              <br />
              明日また、歩いてみましょう。
            </p>
          </motion.div>
        )}

        {/* 次回予告 */}
        {nextHint && (
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
              {nextHint}
            </p>
          </motion.div>
        )}

        {/* ボタン */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-12 space-y-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={`/story/${currentChapter}?session=${currentSession}`}
              className="btn-primary block font-serif text-xl py-4 shadow-lg shadow-accent/20"
            >
              物語の続きへ
            </Link>
          </motion.div>
          <Link
            href="/"
            className="block font-sans text-text-secondary text-sm hover:text-accent transition-colors py-2 border border-text-secondary/20 rounded"
          >
            一度館を出る
          </Link>
          <Link
            href="/diary"
            className="block font-sans text-text-secondary text-sm hover:text-accent transition-colors"
          >
            記憶の日記を見る
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
