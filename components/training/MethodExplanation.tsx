'use client'

import { motion } from 'framer-motion'

interface MethodExplanationProps {
  type: 'place' | 'number' | 'word' | 'story'
  onComplete: () => void
}

const explanations = {
  place: {
    title: '場所法 — 記憶の宮殿',
    description: '自分のよく知っている場所（自宅や通勤路など）をイメージし、覚えたいものをその場所の特定のポイントに置いていく手法です。',
    tips: [
      '場所の細部（質感、温度、匂い）までありありと思い浮かべてください。',
      '置くものと場所を、衝突させたり、溶け込ませたりして強く印象づけましょう。',
      '自分がその場所を歩いている感覚を大切に。'
    ]
  },
  word: {
    title: '連想法 — 記憶の鎖',
    description: '覚えたい言葉同士を、強烈なイメージで結びつけて鎖（チェーン）のように繋いでいく手法です。',
    tips: [
      'AとBを結びつけるとき、できるだけ「平凡じゃない」イメージを。（例：巨大、動く、奇妙な色）',
      '五感を使ってください。音がしたり、変な匂いがしたり。',
      '前の言葉から次の言葉が自然に浮かぶまで、イメージを反芻しましょう。'
    ]
  },
  number: {
    title: '数字変換法 — 暗号の解読',
    description: '無機質な数字を、あらかじめ決めたルールに基づいて具体的な「モノ」や「イメージ」に変換して覚える手法です。',
    tips: [
      '提示された数字の横にある「イメージのヒント」を頼りにしてください。',
      '数字そのものではなく、その「モノ」がそこにある風景を焼き付けましょう。',
      '慣れてくると、数字がひとつの物語に見えてくるはずです。'
    ]
  },
  story: {
    title: 'ストーリー法 — 記憶の断片',
    description: 'いくつかの言葉を繋げて、自分だけの短い物語（シーン）を作る手法です。',
    tips: [
      'あなたがその物語の主人公になってください。',
      '論理的である必要はありません。感情が動くようなシーンを。',
      '短く、鮮烈な映画のワンシーンのように。'
    ]
  }
}

export default function MethodExplanation({ type, onComplete }: MethodExplanationProps) {
  const info = explanations[type] || explanations.place

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto w-full p-8 bg-background/60 border border-accent/20 rounded-2xl"
    >
      <div className="text-center mb-8">
        <p className="font-sans text-accent text-xs uppercase tracking-[0.2em] mb-2">
          Mira's Guide
        </p>
        <h2 className="font-serif text-2xl text-text-primary">
          {info.title}
        </h1>
      </div>

      <div className="space-y-6 mb-10">
        <p className="font-serif text-text-primary leading-relaxed text-sm">
          {info.description}
        </p>

        <div className="space-y-3">
          <p className="font-sans text-accent/80 text-xs font-bold">
            ミラからの助言：
          </p>
          <ul className="space-y-2">
            {info.tips.map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent text-xs mt-1">•</span>
                <span className="font-sans text-text-secondary text-xs leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="btn-primary w-full font-serif text-lg py-4"
      >
        修行を始める
      </motion.button>
      
      <p className="font-sans text-text-secondary/40 text-[10px] text-center mt-6">
        急ぐ必要はありません。心が静まるのを待ってから始めてください。
      </p>
    </motion.div>
  )
}
