'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getMemories, getProgress } from '@/lib/user-progress'

interface MemoryFragment {
  id: string
  chapterId: string
  content: string
  unlockedAt: Date
}

export default function DiaryPage() {
  const [memories, setMemories] = useState<MemoryFragment[]>([])
  const [progress, setProgress] = useState(() => {
    // 初期値は空のオブジェクトを返し、useEffectでロード
    if (typeof window !== 'undefined') {
      return getProgress()
    }
    return { totalSessions: 0, totalCorrectAnswers: 0, currentChapter: 'chapter1', completedSessions: {} }
  })

  useEffect(() => {
    setMemories(getMemories().memories)
    setProgress(getProgress())
  }, [])

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main className="min-h-screen flex flex-col p-4 md:p-8">
      {/* ヘッダー */}
      <div className="max-w-md mx-auto w-full mb-8">
        <Link
          href="/"
          className="font-sans text-text-secondary text-sm hover:text-accent transition-colors"
        >
          ← 館に戻る
        </Link>

        <h1 className="font-serif text-2xl text-text-primary mt-4 mb-2">
          記憶の日記
        </h1>
        <p className="font-sans text-text-secondary text-sm">
          取り戻した記憶の断片
        </p>
      </div>

      {/* 進捗サマリー */}
      <div className="max-w-md mx-auto w-full mb-8 p-4 bg-background/50 border border-text-secondary/20 rounded">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="font-sans text-text-secondary text-xs mb-1">
              セッション数
            </p>
            <p className="font-serif text-2xl text-text-primary">
              {progress.totalSessions}
            </p>
          </div>
          <div>
            <p className="font-sans text-text-secondary text-xs mb-1">
              正解率
            </p>
            <p className="font-serif text-2xl text-text-primary">
              {progress.totalSessions > 0
                ? Math.round((progress.totalCorrectAnswers / (progress.totalSessions * 5)) * 100)
                : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* 記憶の断片リスト */}
      <div className="max-w-md mx-auto w-full flex-1">
        {memories.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-serif text-text-secondary mb-4">
              まだ記憶の断片がありません
            </p>
            <p className="font-sans text-text-secondary/50 text-sm">
              記憶術トレーニングを続けて、
              <br />
              失われた記憶を取り戻しましょう
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-accent/10 border border-accent/30 rounded relative"
              >
                {/* 日付 */}
                <p className="font-sans text-text-secondary text-xs mb-2">
                  {formatDate(memory.unlockedAt)}
                </p>

                {/* 章のラベル */}
                <p className="font-sans text-accent/70 text-xs mb-2">
                  {memory.chapterId === 'chapter1' && '第一章'}
                  {memory.chapterId === 'chapter2' && '第二章'}
                  {memory.chapterId === 'chapter3' && '第三章'}
                  {memory.chapterId === 'chapter4' && '第四章'}
                  {memory.chapterId === 'chapter5' && '第五章'}
                </p>

                {/* 記憶の内容 */}
                <p className="font-serif text-text-primary leading-relaxed">
                  * {memory.content}
                </p>

                {/* 装飾 */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-accent/50 rounded-full" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="max-w-md mx-auto w-full mt-8 pt-4 border-t border-text-secondary/10">
        <p className="font-sans text-text-secondary/50 text-xs text-center">
          記憶は、歩くことで深くなる。
        </p>
      </div>
    </main>
  )
}
