'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PalaceSetupProps {
  onComplete: (palace: { name: string; places: string[] }) => void
}

export default function PalaceSetup({ onComplete }: PalaceSetupProps) {
  const [palaceName, setPalaceName] = useState('')
  const [places, setPlaces] = useState<string[]>(['', '', '', '', ''])

  const handlePlaceChange = (index: number, value: string) => {
    const newPlaces = [...places]
    newPlaces[index] = value
    setPlaces(newPlaces)
  }

  const handleAddPlace = () => {
    setPlaces([...places, ''])
  }

  const isComplete = palaceName.trim() !== '' && places.every((p) => p.trim() !== '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl text-text-primary mb-2">
          記憶の宮殿
        </h2>
        <p className="font-sans text-text-secondary text-sm">
          自分がよく知っている場所を思い浮かべてください
        </p>
      </div>

      {/* 宮殿名 */}
      <div className="mb-6">
        <label className="font-sans text-text-secondary text-sm mb-2 block">
          宮殿名
        </label>
        <input
          type="text"
          value={palaceName}
          onChange={(e) => setPalaceName(e.target.value)}
          placeholder="例：実家、会社までの道、いつものカフェ..."
          className="w-full px-4 py-3 bg-background/50 border border-text-secondary/30 rounded text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 font-serif"
        />
      </div>

      {/* 通過点 */}
      <div className="mb-8">
        <label className="font-sans text-text-secondary text-sm mb-2 block">
          通過点（場所の順序）
        </label>
        <p className="font-sans text-text-secondary/70 text-xs mb-4">
          この場所を順番に歩いていくイメージで記憶します
        </p>

        <div className="space-y-3">
          {places.map((place, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <input
                type="text"
                value={place}
                onChange={(e) => handlePlaceChange(index, e.target.value)}
                placeholder={`場所 ${index + 1}`}
                className="w-full px-4 py-3 bg-background/50 border border-text-secondary/30 rounded text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 font-serif"
              />
            </motion.div>
          ))}
        </div>

        <button
          onClick={handleAddPlace}
          className="mt-4 w-full py-2 border border-text-secondary/30 rounded text-text-secondary/70 text-sm font-sans hover:border-accent/50 hover:text-accent/70 transition-colors"
        >
          + 通過点を追加
        </button>
      </div>

      {/* 完了ボタン */}
      {isComplete && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onComplete({ name: palaceName, places })}
          className="btn-primary w-full font-serif text-lg"
        >
          宮殿を完成させる
        </motion.button>
      )}
    </motion.div>
  )
}
