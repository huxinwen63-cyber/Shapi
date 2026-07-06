"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CelebrationBurst } from "./celebration-burst"

interface PartWholeGameProps {
  onBack: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Round {
  total: number
  part: number // the part already shown
  answer: number // the missing part
  options: number[]
}

function makeRound(): Round {
  const total = Math.floor(Math.random() * 6) + 5 // 5-10
  const part = Math.floor(Math.random() * (total - 1)) + 1 // 1..total-1
  const answer = total - part
  const options = new Set<number>([answer])
  while (options.size < 3) {
    const guess = Math.floor(Math.random() * total) + 1
    options.add(guess)
  }
  return { total, part, answer, options: shuffle([...options]) }
}

export function PartWholeGame({ onBack }: PartWholeGameProps) {
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
    if (value === round.answer) setScore((s) => s + 1)
  }

  const isCorrect = selected !== null && round.options[selected] === round.answer

  useEffect(() => {
    if (selected === null) return
    const timer = window.setTimeout(nextRound, 1100)
    return () => window.clearTimeout(timer)
  }, [selected, nextRound])

  const prompt = t.game.partWholePrompt
    .replace("{n}", String(round.total))
    .replace("{a}", String(round.part))

  if (showHelp) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold" suppressHydrationWarning>
            {t.activities.partWhole.title}
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center">
            <HelpCircle className="w-10 h-10 text-accent-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground" suppressHydrationWarning>
            {t.game.howToPlay}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xs text-pretty" suppressHydrationWarning>
            {t.game.partWholeInstruction.replace("{n}", String(round.total))}
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
          {t.activities.partWhole.title}
        </h1>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="font-semibold">{score}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-base text-muted-foreground mb-4 text-center text-pretty" suppressHydrationWarning>
          {prompt}
        </p>

        {/* Number bond: total on top, two parts below */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-2">
            <span className="text-4xl font-bold text-accent-foreground">{round.total}</span>
          </div>
          {/* connector lines */}
          <div className="flex gap-16 mb-2" aria-hidden="true">
            <div className="w-px h-5 bg-border rotate-12 origin-top" />
            <div className="w-px h-5 bg-border -rotate-12 origin-top" />
          </div>
          <div className="flex gap-6">
            {/* Known part */}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-primary">{round.part}</span>
            </div>
            {/* Missing part */}
            <div
              className={`w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center transition-colors ${
                selected === null ? "border-accent/60" : isCorrect ? "border-primary bg-primary/10" : "border-destructive/40"
              }`}
            >
              <span className="text-3xl font-bold text-muted-foreground">
                {selected === null ? "?" : round.answer}
              </span>
            </div>
          </div>
        </div>

        {/* Ten-frame style visual of the known part */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[12rem] mb-8" aria-hidden="true">
          {[...Array(round.total)].map((_, i) => (
            <span
              key={i}
              className={`w-5 h-5 rounded-full ${i < round.part ? "bg-primary" : "bg-muted border border-border"}`}
            />
          ))}
        </div>

        {/* Options */}
        <div className="flex items-stretch gap-3 w-full max-w-xs mb-6">
          {round.options.map((value, index) => {
            const state =
              selected === null
                ? "idle"
                : value === round.answer
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
                className={`flex-1 h-16 bg-card border-2 rounded-2xl transition-all flex items-center justify-center ${ring}`}
                aria-label={`${value}`}
              >
                <span className="text-2xl font-bold text-foreground">{value}</span>
              </button>
            )
          })}
        </div>

        {selected === null ? (
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            {t.game.partWholeHint}
          </p>
        ) : (
          <div className="relative text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CelebrationBurst show={isCorrect} />
            <div className={`text-4xl mb-1 ${isCorrect ? "animate-pop-spin" : ""}`}>{isCorrect ? "✨" : "💭"}</div>
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
