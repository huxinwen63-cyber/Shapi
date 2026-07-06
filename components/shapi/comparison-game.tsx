"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComparisonGameProps {
  onBack: () => void
}

const colors = ["bg-primary", "bg-accent", "bg-amber-400", "bg-sky-400", "bg-pink-400"]

function randomCount() {
  return Math.floor(Math.random() * 6) + 1
}

export function ComparisonGame({ onBack }: ComparisonGameProps) {
  const { t } = useLanguage()
  const [left, setLeft] = useState(3)
  const [right, setRight] = useState(5)
  const [selected, setSelected] = useState<"left" | "right" | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [leftColor, setLeftColor] = useState(0)
  const [rightColor, setRightColor] = useState(1)

  const generateNewRound = useCallback(() => {
    let a = randomCount()
    let b = randomCount()
    // avoid ties so there is always a "more" side
    while (a === b) {
      b = randomCount()
    }
    setLeft(a)
    setRight(b)
    setSelected(null)
    setShowResult(false)
    const c1 = Math.floor(Math.random() * colors.length)
    let c2 = Math.floor(Math.random() * colors.length)
    while (c2 === c1) c2 = Math.floor(Math.random() * colors.length)
    setLeftColor(c1)
    setRightColor(c2)
  }, [])

  useEffect(() => {
    generateNewRound()
  }, [generateNewRound])

  const correctSide = left > right ? "left" : "right"

  const handleSelect = (side: "left" | "right") => {
    if (showResult) return
    setSelected(side)
    setShowResult(true)
    if (side === correctSide) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    setRound((r) => r + 1)
    generateNewRound()
  }

  const isCorrect = selected === correctSide

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold" suppressHydrationWarning>
          {t.activities.comparison.title}
        </h1>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="font-semibold">{score}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-lg text-muted-foreground mb-6" suppressHydrationWarning>
          {t.game.whichMore}
        </p>

        {/* Two groups */}
        <div className="flex items-stretch gap-4 w-full max-w-sm mb-8">
          <GroupCard
            count={left}
            color={colors[leftColor]}
            onClick={() => handleSelect("left")}
            state={
              !showResult
                ? "idle"
                : "left" === correctSide
                  ? "correct"
                  : selected === "left"
                    ? "wrong"
                    : "dim"
            }
          />
          <GroupCard
            count={right}
            color={colors[rightColor]}
            onClick={() => handleSelect("right")}
            state={
              !showResult
                ? "idle"
                : "right" === correctSide
                  ? "correct"
                  : selected === "right"
                    ? "wrong"
                    : "dim"
            }
          />
        </div>

        {!showResult && (
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            {t.game.tapMore}
          </p>
        )}

        {/* Result Feedback */}
        {showResult && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className={`text-4xl mb-2 ${isCorrect ? "text-primary" : "text-muted-foreground"}`}>
              {isCorrect ? "✨" : "💭"}
            </div>
            <p className="text-xl font-bold mb-4" suppressHydrationWarning>
              {isCorrect ? t.game.great : t.game.keepGoing}
            </p>
            <Button onClick={handleNext} className="rounded-full px-8">
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

function GroupCard({
  count,
  color,
  onClick,
  state,
}: {
  count: number
  color: string
  onClick: () => void
  state: "idle" | "correct" | "wrong" | "dim"
}) {
  const ring =
    state === "correct"
      ? "border-primary ring-4 ring-primary/20 scale-105"
      : state === "wrong"
        ? "border-destructive/40"
        : state === "dim"
          ? "opacity-50 border-border"
          : "border-border hover:border-primary hover:scale-[1.02] active:scale-95"

  return (
    <button
      onClick={onClick}
      className={`flex-1 min-h-56 bg-card border-2 rounded-3xl p-4 transition-all flex flex-wrap items-center justify-center gap-2 content-center ${ring}`}
    >
      {[...Array(count)].map((_, i) => (
        <span
          key={i}
          className={`w-9 h-9 ${color} rounded-full shadow-md`}
        />
      ))}
    </button>
  )
}
