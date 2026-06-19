"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, HelpCircle, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NumberLineGameProps {
  onBack: () => void
}

const MAX = 10

export function NumberLineGame({ onBack }: NumberLineGameProps) {
  const { t } = useLanguage()
  const [showHelp, setShowHelp] = useState(true)
  const [target, setTarget] = useState(() => Math.floor(Math.random() * (MAX - 1)) + 1)
  const [roundNum, setRoundNum] = useState(1)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const nextRound = useCallback(() => {
    setTarget(Math.floor(Math.random() * (MAX - 1)) + 1)
    setSelected(null)
    setRoundNum((r) => r + 1)
  }, [])

  const handleSelect = (value: number) => {
    if (selected !== null) return
    setSelected(value)
    if (value === target) setScore((s) => s + 1)
  }

  const isCorrect = selected === target

  useEffect(() => {
    if (selected === null) return
    const timer = window.setTimeout(nextRound, 1200)
    return () => window.clearTimeout(timer)
  }, [selected, nextRound])

  const prompt = t.game.numberLinePrompt.replace("{n}", String(target))

  if (showHelp) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold" suppressHydrationWarning>
            {t.activities.numberLine.title}
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-secondary/30 flex items-center justify-center">
            <HelpCircle className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground" suppressHydrationWarning>
            {t.game.howToPlay}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xs text-pretty" suppressHydrationWarning>
            {t.game.numberLineInstruction}
          </p>
          <Button onClick={() => setShowHelp(false)} className="rounded-full px-10 py-6 text-base" size="lg">
            <span suppressHydrationWarning>{t.game.gotIt}</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold" suppressHydrationWarning>
          {t.activities.numberLine.title}
        </h1>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="font-semibold">{score}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-base text-muted-foreground mb-6" suppressHydrationWarning>
          {prompt}
        </p>

        {/* Target numeral */}
        <div className="w-20 h-20 rounded-3xl bg-secondary/30 flex items-center justify-center mb-10">
          <span className="text-4xl font-bold text-secondary-foreground">{target}</span>
        </div>

        {/* The number line with tappable ticks */}
        <div className="w-full max-w-sm">
          <div className="relative h-3 bg-muted rounded-full mb-2">
            {Array.from({ length: MAX + 1 }, (_, n) => (
              <div
                key={n}
                className="absolute top-1/2 w-1 h-3 bg-primary/30 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(n / MAX) * 100}%` }}
              />
            ))}
            {/* feedback arrow at selected/correct position */}
            {selected !== null && (
              <div
                className="absolute -top-9 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${(target / MAX) * 100}%` }}
              >
                <ArrowDown className="w-6 h-6 text-green-600" strokeWidth={3} />
              </div>
            )}
          </div>
          {/* Tappable number buttons */}
          <div className="flex justify-between">
            {Array.from({ length: MAX + 1 }, (_, n) => {
              const state =
                selected === null
                  ? "idle"
                  : n === target
                    ? "correct"
                    : selected === n
                      ? "wrong"
                      : "dim"
              const cls =
                state === "correct"
                  ? "bg-primary text-primary-foreground scale-110"
                  : state === "wrong"
                    ? "bg-destructive/20 text-foreground"
                    : state === "dim"
                      ? "opacity-40 bg-muted text-muted-foreground"
                      : "bg-muted text-foreground hover:bg-primary/20 active:scale-95"
              return (
                <button
                  key={n}
                  onClick={() => handleSelect(n)}
                  className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${cls}`}
                  aria-label={`${n}`}
                >
                  {n}
                </button>
              )
            })}
          </div>
        </div>

        {selected === null ? (
          <p className="text-sm text-muted-foreground mt-8" suppressHydrationWarning>
            {t.game.numberLineHint}
          </p>
        ) : (
          <div className="text-center mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-4xl mb-1">{isCorrect ? "✨" : "💭"}</div>
            <p className="text-lg font-bold" suppressHydrationWarning>
              {isCorrect ? t.game.great : t.game.keepGoing}
            </p>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="p-4 border-t border-border">
        <div className="flex justify-center gap-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-2 rounded-full transition-colors ${i < roundNum ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
