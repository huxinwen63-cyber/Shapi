"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlaceValueGameProps {
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

interface Option {
  tens: number
  ones: number
}

interface Round {
  target: number
  options: Option[]
}

function makeRound(): Round {
  const target = Math.floor(Math.random() * 28) + 11 // 11-38
  const tens = Math.floor(target / 10)
  const ones = target % 10
  const correct: Option = { tens, ones }

  const set = new Map<string, Option>()
  set.set(`${tens}-${ones}`, correct)
  while (set.size < 3) {
    // create plausible distractors by tweaking tens/ones
    const dt = Math.max(1, Math.min(3, tens + (Math.random() < 0.5 ? -1 : 1)))
    const do_ = Math.max(0, Math.min(9, ones + (Math.random() < 0.5 ? -2 : 2)))
    set.set(`${dt}-${do_}`, { tens: dt, ones: do_ })
  }
  return { target, options: shuffle([...set.values()]) }
}

export function PlaceValueGame({ onBack }: PlaceValueGameProps) {
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

  const isOptionCorrect = (o: Option) => o.tens * 10 + o.ones === round.target

  const handleSelect = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    if (isOptionCorrect(round.options[index])) setScore((s) => s + 1)
  }

  const isCorrect = selected !== null && isOptionCorrect(round.options[selected])

  useEffect(() => {
    if (selected === null) return
    const timer = window.setTimeout(nextRound, 1200)
    return () => window.clearTimeout(timer)
  }, [selected, nextRound])

  const prompt = t.game.placeValuePrompt.replace("{n}", String(round.target))

  if (showHelp) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold" suppressHydrationWarning>
            {t.activities.placeValue.title}
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-secondary/40 flex items-center justify-center">
            <HelpCircle className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground" suppressHydrationWarning>
            {t.game.howToPlay}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xs text-pretty" suppressHydrationWarning>
            {t.game.placeValueInstruction.replace("{n}", String(round.target))}
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
          {t.activities.placeValue.title}
        </h1>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="font-semibold">{score}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-base text-muted-foreground mb-3 text-center text-pretty" suppressHydrationWarning>
          {prompt}
        </p>

        {/* Target numeral */}
        <div className="w-24 h-24 rounded-3xl bg-secondary/40 flex items-center justify-center mb-6">
          <span className="text-5xl font-bold text-secondary-foreground">{round.target}</span>
        </div>

        {/* Options: bundles (tens) + dots (ones) */}
        <div className="flex flex-col gap-3 w-full max-w-sm mb-6">
          {round.options.map((option, index) => {
            const state =
              selected === null
                ? "idle"
                : isOptionCorrect(option)
                  ? "correct"
                  : selected === index
                    ? "wrong"
                    : "dim"
            const ring =
              state === "correct"
                ? "border-primary ring-4 ring-primary/20"
                : state === "wrong"
                  ? "border-destructive/40"
                  : state === "dim"
                    ? "opacity-50 border-border"
                    : "border-border hover:border-primary active:scale-[0.99]"
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full bg-card border-2 rounded-2xl p-3 transition-all flex items-center gap-3 ${ring}`}
                aria-label={`${option.tens} tens ${option.ones} ones`}
              >
                {/* tens bundles */}
                <div className="flex gap-1.5">
                  {[...Array(option.tens)].map((_, i) => (
                    <span key={i} className="flex flex-col gap-0.5 bg-primary/10 rounded-md p-1">
                      {[...Array(5)].map((_, r) => (
                        <span key={r} className="flex gap-0.5">
                          <span className="w-1 h-1.5 bg-primary rounded-full" />
                          <span className="w-1 h-1.5 bg-primary rounded-full" />
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
                {/* divider */}
                <span className="w-px self-stretch bg-border" />
                {/* ones dots */}
                <div className="flex flex-wrap gap-1 flex-1 content-center max-w-[5rem]">
                  {[...Array(option.ones)].map((_, i) => (
                    <span key={i} className="w-3 h-3 bg-accent rounded-full" />
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        {selected === null ? (
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            {t.game.placeValueHint}
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
