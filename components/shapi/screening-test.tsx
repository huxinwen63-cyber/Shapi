"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCat } from "./animated-cat"

interface ScreeningTestProps {
  onBack: () => void
}

type QuestionType = "subitizing" | "comparison" | "numberLine" | "matching" | "ordering" | "missing"

interface Question {
  type: QuestionType
  prompt: { zh: string; en: string }
  options: string[]
  answer: number
  // optional visual data
  dots?: number
  leftDots?: number
  rightDots?: number
}

// 10 research-backed number-sense screening questions
const questions: Question[] = [
  {
    type: "subitizing",
    prompt: { zh: "一眼看，有几个点？", en: "How many dots at a glance?" },
    options: ["2", "3", "4"],
    answer: 1,
    dots: 3,
  },
  {
    type: "subitizing",
    prompt: { zh: "一眼看，有几个点？", en: "How many dots at a glance?" },
    options: ["4", "5", "6"],
    answer: 1,
    dots: 5,
  },
  {
    type: "comparison",
    prompt: { zh: "哪边的点更多？", en: "Which side has more dots?" },
    options: ["左边", "右边"],
    answer: 0,
    leftDots: 6,
    rightDots: 4,
  },
  {
    type: "comparison",
    prompt: { zh: "哪个数字更大？", en: "Which number is bigger?" },
    options: ["7", "9"],
    answer: 1,
  },
  {
    type: "comparison",
    prompt: { zh: "哪个数字更小？", en: "Which number is smaller?" },
    options: ["3", "8"],
    answer: 0,
  },
  {
    type: "numberLine",
    prompt: { zh: "数轴上，5 在哪里？", en: "Where is 5 on the number line?" },
    options: ["A", "B", "C"],
    answer: 1,
  },
  {
    type: "matching",
    prompt: { zh: "4 个点配哪个数字？", en: "Which number matches 4 dots?" },
    options: ["3", "4", "5"],
    answer: 1,
    dots: 4,
  },
  {
    type: "ordering",
    prompt: { zh: "接下来是哪个数字？2, 3, 4, ?", en: "What comes next? 2, 3, 4, ?" },
    options: ["5", "6", "7"],
    answer: 0,
  },
  {
    type: "ordering",
    prompt: { zh: "哪个数字应该排在中间？3, ?, 5", en: "Which number goes in the middle? 3, ?, 5" },
    options: ["2", "4", "6"],
    answer: 1,
  },
  {
    type: "missing",
    prompt: { zh: "几个点加起来是 5？已有 2 个", en: "How many more dots make 5? Have 2" },
    options: ["2", "3", "4"],
    answer: 1,
    dots: 2,
  },
]

const dotPositions: Record<number, { x: number; y: number }[]> = {
  2: [{ x: 35, y: 50 }, { x: 65, y: 50 }],
  3: [{ x: 50, y: 28 }, { x: 30, y: 70 }, { x: 70, y: 70 }],
  4: [{ x: 32, y: 32 }, { x: 68, y: 32 }, { x: 32, y: 68 }, { x: 68, y: 68 }],
  5: [{ x: 50, y: 50 }, { x: 26, y: 26 }, { x: 74, y: 26 }, { x: 26, y: 74 }, { x: 74, y: 74 }],
  6: [{ x: 30, y: 28 }, { x: 70, y: 28 }, { x: 30, y: 50 }, { x: 70, y: 50 }, { x: 30, y: 72 }, { x: 70, y: 72 }],
}

function DotBox({ count, color = "bg-primary" }: { count: number; color?: string }) {
  return (
    <div className="w-32 h-32 bg-muted rounded-2xl relative shadow-inner">
      {dotPositions[count]?.map((pos, i) => (
        <div
          key={i}
          className={`absolute w-6 h-6 ${color} rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md`}
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        />
      ))}
    </div>
  )
}

function NumberLineVisual() {
  // marks A, B, C at positions; correct (5) is B
  return (
    <div className="w-full max-w-xs">
      <div className="relative h-2 bg-muted rounded-full mb-3">
        {[0, 5, 10].map((n) => (
          <div
            key={n}
            className="absolute -top-1 w-4 h-4 bg-primary/30 rounded-full -translate-x-1/2"
            style={{ left: `${n * 10}%` }}
          />
        ))}
      </div>
      <div className="relative h-6">
        {[
          { label: "A", pos: 20 },
          { label: "B", pos: 50 },
          { label: "C", pos: 80 },
        ].map((m) => (
          <span
            key={m.label}
            className="absolute -translate-x-1/2 text-sm font-bold text-accent-foreground"
            style={{ left: `${m.pos}%` }}
          >
            {m.label}
          </span>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  )
}

export function ScreeningTest({ onBack }: ScreeningTestProps) {
  const { t, locale } = useLanguage()
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro")
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const q = questions[current]
  const isLast = current === questions.length - 1

  const handleSelect = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (isLast) {
      setStage("result")
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const resetTest = () => {
    setStage("intro")
    setCurrent(0)
    setSelected(null)
    setScore(0)
  }

  // INTRO
  if (stage === "intro") {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold ml-2" suppressHydrationWarning>
            {t.screening.title}
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
          <div className="w-28 h-28 mb-6">
            <AnimatedCat mood="happy" size="md" />
          </div>
          <h2 className="text-xl font-bold mb-3 text-balance" suppressHydrationWarning>
            {t.screening.introTitle}
          </h2>
          <p className="text-muted-foreground mb-4 text-pretty leading-relaxed max-w-sm" suppressHydrationWarning>
            {t.screening.introText}
          </p>
          <p className="text-xs text-muted-foreground/80 mb-8 max-w-sm" suppressHydrationWarning>
            {t.screening.introNote}
          </p>
          <Button onClick={() => setStage("quiz")} className="rounded-full px-10 py-6 text-base" size="lg">
            <span suppressHydrationWarning>{t.screening.start}</span>
          </Button>
        </div>
      </div>
    )
  }

  // RESULT
  if (stage === "result") {
    const message = score >= 8 ? t.screening.strong : score >= 5 ? t.screening.medium : t.screening.watch
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold ml-2" suppressHydrationWarning>
            {t.screening.title}
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
          <Sparkles className="w-12 h-12 text-amber-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2" suppressHydrationWarning>
            {t.screening.resultTitle}
          </h2>
          <div className="flex items-end gap-2 my-4">
            <span className="text-5xl font-bold text-primary">{score}</span>
            <span className="text-lg text-muted-foreground mb-1" suppressHydrationWarning>
              / 10
            </span>
          </div>
          <p className="text-muted-foreground mb-2 text-pretty leading-relaxed max-w-sm" suppressHydrationWarning>
            {message}
          </p>
          <p className="text-xs text-muted-foreground/70 mb-8 max-w-sm" suppressHydrationWarning>
            {t.screening.disclaimer}
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button onClick={resetTest} variant="outline" className="rounded-full">
              <span suppressHydrationWarning>{t.screening.retake}</span>
            </Button>
            <Button onClick={onBack} className="rounded-full">
              <span suppressHydrationWarning>{t.screening.backHome}</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // QUIZ
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm font-medium text-muted-foreground" suppressHydrationWarning>
          {t.screening.question.replace("{n}", String(current + 1))}
        </span>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="font-semibold">{score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-3">
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < current ? "bg-primary" : i === current ? "bg-primary/50" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        <p className="text-lg font-semibold text-center mb-6 text-balance" suppressHydrationWarning>
          {locale === "zh" ? q.prompt.zh : q.prompt.en}
        </p>

        {/* Visual area */}
        <div className="mb-8 flex items-center justify-center gap-6">
          {q.type === "comparison" && q.leftDots !== undefined && q.rightDots !== undefined ? (
            <>
              <DotBox count={q.leftDots} color="bg-primary" />
              <DotBox count={q.rightDots} color="bg-accent" />
            </>
          ) : q.type === "numberLine" ? (
            <NumberLineVisual />
          ) : q.dots !== undefined ? (
            <DotBox count={q.dots} />
          ) : null}
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-3 justify-center w-full max-w-sm">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer
            const isPicked = i === selected
            const showState = selected !== null
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showState}
                className={`min-w-20 px-5 h-14 rounded-2xl text-lg font-bold transition-all ${
                  showState
                    ? isAnswer
                      ? "bg-primary text-primary-foreground scale-105"
                      : isPicked
                        ? "bg-muted text-muted-foreground"
                        : "bg-muted/50 text-muted-foreground"
                    : "bg-card border-2 border-border hover:border-primary hover:scale-105 active:scale-95"
                }`}
                suppressHydrationWarning
              >
                {opt}
              </button>
            )
          })}
        </div>

        {/* Feedback + next */}
        {selected !== null && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-3xl mb-3">{selected === q.answer ? "✨" : "💭"}</div>
            <Button onClick={handleNext} className="rounded-full px-8">
              <span suppressHydrationWarning>{isLast ? t.screening.finish : t.screening.next}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
