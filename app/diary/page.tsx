'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getMemories, getProgress, undoLastSession, getHistory } from '@/lib/user-progress'

interface MemoryFragment {
  id: string
  chapterId: string
  content: string
  unlockedAt: Date
}

export default function DiaryPage() {
  const [memories, setMemories] = useState<MemoryFragment[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'memories' | 'history'>('memories')
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
    setHistory(getHistory())
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
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
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

        {progress.totalSessions > 0 && (
          <button
            onClick={() => {
              if (confirm('直近のセッション記録と獲得した記憶を取り消しますか？')) {
                undoLastSession()
                setMemories(getMemories().memories)
                setProgress(getProgress())
              }
            }}
            className="w-full py-2 border border-accent/30 text-accent/70 hover:bg-accent/10 transition-colors rounded font-sans text-xs"
          >
            直近の記録を取り消す
          </button>
        )}
      </div>

      {/* タブ切り替え */}
      <div className="max-w-md mx-auto w-full mb-6 flex gap-4 border-b border-text-secondary/10">
        <button
          onClick={() => setActiveTab('memories')}
          className={`pb-2 px-2 font-sans text-sm transition-colors relative ${
            activeTab === 'memories' ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          記憶の断片
          {activeTab === 'memories' && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-2 px-2 font-sans text-sm transition-colors relative ${
            activeTab === 'history' ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          訓練の全記録
          {activeTab === 'history' && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
          )}
        </button>
      </div>

      {/* コンテンツエリア */}
      <div className="max-w-md mx-auto w-full flex-1">
        {activeTab === 'memories' ? (
          memories.length === 0 ? (
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
                  <p className="font-sans text-text-secondary text-xs mb-2">
                    {formatDate(memory.unlockedAt)}
                  </p>
                  <p className="font-sans text-accent/70 text-xs mb-2">
                    {memory.chapterId === 'chapter1' && '第一章'}
                    {memory.chapterId === 'chapter2' && '第二章'}
                    {memory.chapterId === 'chapter3' && '第三章'}
                    {memory.chapterId === 'chapter4' && '第四章'}
                    {memory.chapterId === 'chapter5' && '第五章'}
                  </p>
                  <p className="font-serif text-text-primary leading-relaxed">
                    * {memory.content}
                  </p>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-accent/50 rounded-full" />
                </motion.div>
              ))}
            </div>
          )
        ) : (
          history.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-text-secondary mb-4">
                訓練の記録がまだありません
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {[...history].reverse().map((session, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-background/30 border border-text-secondary/10 rounded"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-sans text-text-secondary text-[10px] uppercase tracking-wider">
                        {formatDate(session.completedAt)}
                      </p>
                      <h3 className="font-serif text-text-primary text-sm">
                        {session.chapterId === 'chapter1' && '第一章'}
                        {session.chapterId === 'chapter2' && '第二章'}
                        {session.chapterId === 'chapter3' && '第三章'}
                        {session.chapterId === 'chapter4' && '第四章'}
                        {session.chapterId === 'chapter5' && '第五章'}
                        {' '}セッション {session.sessionNumber}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-accent text-xs font-bold">
                        {session.score.correctCount} / {session.score.totalCount}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mt-2 border-t border-text-secondary/5 pt-2">
                    {session.items.map((item: any, i: number) => {
                      const answer = session.answers.find((a: any) => a.itemId === item.id)?.answer || '---'
                      return (
                        <div key={i} className="flex justify-between text-[11px] gap-4">
                          <span className="text-text-secondary truncate flex-1 leading-relaxed">
                             {i + 1}. {item.content}
                          </span>
                          <span className="text-text-primary/70 shrink-0 italic">
                            {answer}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )
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
