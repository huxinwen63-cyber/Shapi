"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MatchingGameProps {
  onBack: () => void
}

const dotColors = ["bg-primary", "bg-accent", "bg-amber-400", "bg-sky-400", "bg-pink-400"]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Round {
  target: number
  options: number[]
  color: string
}

function makeRound(): Round {
  const target = Math.floor(Math.random() * 6) + 1 // 1-6
  const options = new Set<number>([target])
  while (options.size < 3) {
    options.add(Math.floor(Math.random() * 6) + 1)
  }
  return {
    target,
    options: shuffle([...options]),
    color: dotColors[Math.floor(Math.random() * dotColors.length)],
  }
}

export function MatchingGame({ onBack }: MatchingGameProps) {
  const { t } = useLanguage()
  const [showHelp, setShowHelp] = useState(true)
  const [round, setRound] = useState<Round>(() => makeRound())
  const [roundNum, setRoundNum] = useState(1)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const nextRound = useCallback(() => {
    setRound(makeRound())
    setSelected(null)
    setRoundNum((r) => r + 1)
  }, [])

  const handleSelect = (value: number, index: number) => {
    if (selected !== null) return
    setSelected(index)
    if (value === round.target) setScore((s) => s + 1)
  }

  const isCorrect = selected !== null && round.options[selected] === round.target

  useEffect(() => {
    if (selected === null) return
    const timer = window.setTimeout(nextRound, 1100)
    return () => window.clearTimeout(timer)
  }, [selected, nextRound])

  const prompt = t.game.matchPrompt.replace("{n}", String(round.target))

  if (showHelp) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold" suppressHydrationWarning>
            {t.activities.matching.title}
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground" suppressHydrationWarning>
            {t.game.howToPlay}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xs text-pretty" suppressHydrationWarning>
            {t.game.matchInstruction}
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
          {t.activities.matching.title}
        </h1>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="font-semibold">{score}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-base text-muted-foreground mb-3" suppressHydrationWarning>
          {prompt}
        </p>

        {/* Target numeral */}
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8">
          <span className="text-5xl font-bold text-primary">{round.target}</span>
        </div>

        {/* Options: groups of dots */}
        <div className="flex items-stretch gap-3 w-full max-w-sm mb-6">
          {round.options.map((value, index) => {
            const state =
              selected === null
                ? "idle"
                : value === round.target
                  ? "correct"
                  : selected === index
                    ? "wrong"
                    : "dim"
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
                key={index}
                onClick={() => handleSelect(value, index)}
                className={`flex-1 min-h-32 bg-card border-2 rounded-3xl p-3 transition-all flex flex-wrap items-center justify-center gap-1.5 content-center ${ring}`}
                aria-label={`${value}`}
              >
                {[...Array(value)].map((_, i) => (
                  <span key={i} className={`w-6 h-6 ${round.color} rounded-full shadow-sm`} />
                ))}
              </button>
            )
          })}
        </div>

        {selected === null ? (
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            {t.game.matchHint}
          </p>
        ) : (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
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
