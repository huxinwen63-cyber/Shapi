"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubitizingGameProps {
  onBack: () => void
}

const dotPatterns: Record<number, { x: number; y: number }[]> = {
  1: [{ x: 50, y: 50 }],
  2: [{ x: 30, y: 50 }, { x: 70, y: 50 }],
  3: [{ x: 50, y: 30 }, { x: 30, y: 70 }, { x: 70, y: 70 }],
  4: [{ x: 30, y: 30 }, { x: 70, y: 30 }, { x: 30, y: 70 }, { x: 70, y: 70 }],
  5: [{ x: 50, y: 50 }, { x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }],
}

const colors = ["bg-primary", "bg-accent", "bg-amber-400", "bg-sky-400", "bg-pink-400"]

export function SubitizingGame({ onBack }: SubitizingGameProps) {
  const { t } = useLanguage()
  const [currentNumber, setCurrentNumber] = useState(3)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [dotColor, setDotColor] = useState(0)

  const generateNewRound = useCallback(() => {
    const newNumber = Math.floor(Math.random() * 5) + 1
    setCurrentNumber(newNumber)
    setSelectedAnswer(null)
    setShowResult(false)
    setDotColor(Math.floor(Math.random() * colors.length))
  }, [])

  useEffect(() => {
    generateNewRound()
  }, [generateNewRound])

  const handleAnswer = (answer: number) => {
    if (showResult) return
    setSelectedAnswer(answer)
    setShowResult(true)
    if (answer === currentNumber) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    setRound(round + 1)
    generateNewRound()
  }

  const isCorrect = selectedAnswer === currentNumber

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold" suppressHydrationWarning>
          {t.activities.subitizing.title}
        </h1>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="font-semibold">{score}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Question */}
        <p className="text-lg text-muted-foreground mb-6" suppressHydrationWarning>
          {t.game.howMany}
        </p>

        {/* Dots Display */}
        <div className="w-48 h-48 bg-muted rounded-3xl relative mb-8 shadow-inner">
          {dotPatterns[currentNumber]?.map((pos, i) => (
            <div
              key={i}
              className={`absolute w-8 h-8 ${colors[dotColor]} rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 shadow-md`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Answer Buttons */}
        <p className="text-sm text-muted-foreground mb-4" suppressHydrationWarning>
          {t.game.tapAnswer}
        </p>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleAnswer(num)}
              disabled={showResult}
              className={`w-14 h-14 rounded-2xl text-xl font-bold transition-all ${
                showResult
                  ? num === currentNumber
                    ? "bg-primary text-primary-foreground scale-110"
                    : num === selectedAnswer
                      ? "bg-muted text-muted-foreground"
                      : "bg-muted/50 text-muted-foreground"
                  : "bg-card border-2 border-border hover:border-primary hover:scale-105 active:scale-95"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className={`text-4xl mb-2 ${isCorrect ? "text-primary" : "text-muted-foreground"}`}>
              {isCorrect ? "✨" : "💭"}
            </div>
            <p className="text-xl font-bold mb-4" suppressHydrationWarning>
              {isCorrect ? t.game.great : t.game.keepGoing}
            </p>
            <Button
              onClick={handleNext}
              className="rounded-full px-8"
            >
              <span suppressHydrationWarning>{t.game.next}</span>
            </Button>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="p-4 border-t border-border">
        <div className="flex justify-center gap-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-2 rounded-full transition-colors ${
                i < round ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
