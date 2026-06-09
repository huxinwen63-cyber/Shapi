"use client"

import { useState, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, Sparkles, Clock, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCat } from "./animated-cat"

interface ScreeningTestProps {
  onBack: () => void
}

type Dimension = "subitizing" | "comparison" | "numberLine" | "matching" | "ordering" | "calculation"

interface Question {
  dimension: Dimension
  prompt: { zh: string; en: string }
  options: string[]
  answer: number
  dots?: number
  leftDots?: number
  rightDots?: number
  numberLineTarget?: number // value 0-10 to locate
}

// Research-backed number-sense screening questions across 6 dimensions
const questions: Question[] = [
  // Subitizing (instantly recognizing small sets) x2 — quick-look emphasis
  {
    dimension: "subitizing",
    prompt: { zh: "快看一眼，有几个点？", en: "Quick look! How many dots?" },
    options: ["2", "3", "4"],
    answer: 1,
    dots: 3,
  },
  {
    dimension: "subitizing",
    prompt: { zh: "快看一眼，有几个点？", en: "Quick look! How many dots?" },
    options: ["4", "5", "6"],
    answer: 1,
    dots: 5,
  },
  // Magnitude comparison x3
  {
    dimension: "comparison",
    prompt: { zh: "哪边的点更多？", en: "Which side has more dots?" },
    options: ["Left", "Right"],
    answer: 1,
    leftDots: 4,
    rightDots: 6,
  },
  {
    dimension: "comparison",
    prompt: { zh: "哪个数字更大？", en: "Which number is bigger?" },
    options: ["7", "9"],
    answer: 1,
  },
  {
    dimension: "comparison",
    prompt: { zh: "哪个数字更小？", en: "Which number is smaller?" },
    options: ["3", "8"],
    answer: 0,
  },
  // Number line — arrow points to a spot, which number is it? x2
  {
    dimension: "numberLine",
    prompt: { zh: "箭头指着哪个数字？", en: "Which number is the arrow pointing to?" },
    options: ["4", "5", "6"],
    answer: 1,
    numberLineTarget: 5,
  },
  {
    dimension: "numberLine",
    prompt: { zh: "箭头指着哪个数字？", en: "Which number is the arrow pointing to?" },
    options: ["7", "8", "9"],
    answer: 1,
    numberLineTarget: 8,
  },
  // Counting larger sets (dot-to-numeral) x2
  {
    dimension: "matching",
    prompt: { zh: "图里有几个点？", en: "How many dots in the picture?" },
    options: ["3", "4", "5"],
    answer: 1,
    dots: 4,
  },
  {
    dimension: "matching",
    prompt: { zh: "图里有几个点？", en: "How many dots in the picture?" },
    options: ["5", "6", "7"],
    answer: 1,
    dots: 6,
  },
  // Ordering / sequencing x2
  {
    dimension: "ordering",
    prompt: { zh: "接下来是哪个数字？2, 3, 4, ?", en: "What comes next? 2, 3, 4, ?" },
    options: ["5", "6", "7"],
    answer: 0,
  },
  {
    dimension: "ordering",
    prompt: { zh: "哪个数字应该排在中间？3, ?, 5", en: "Which number goes in the middle? 3, ?, 5" },
    options: ["2", "4", "6"],
    answer: 1,
  },
  // Simple calculation / part-whole x2
  {
    dimension: "calculation",
    prompt: { zh: "2 加 3 等于几？", en: "What is 2 + 3?" },
    options: ["4", "5", "6"],
    answer: 1,
  },
  {
    dimension: "calculation",
    prompt: { zh: "5 减 2 等于几？", en: "What is 5 − 2?" },
    options: ["2", "3", "4"],
    answer: 1,
  },
]

const TOTAL = questions.length
// Slow if a single answer takes longer than this (ms)
const SLOW_THRESHOLD = 6000

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

function NumberLineVisual({ target }: { target: number }) {
  // ticks 0..10, arrow points to the target value
  return (
    <div className="w-72 pt-6">
      {/* Arrow above the target */}
      <div className="relative h-6 mb-1">
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${target * 10}%` }}
        >
          <ArrowDown className="w-7 h-7 text-green-600" strokeWidth={3} />
        </div>
      </div>
      {/* The line with ticks */}
      <div className="relative h-3 bg-muted rounded-full">
        {Array.from({ length: 11 }, (_, n) => (
          <div
            key={n}
            className="absolute top-1/2 w-1 h-3 bg-primary/40 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n * 10}%` }}
          />
        ))}
      </div>
      {/* Labels: show only 0, 5, 10 to keep it clean */}
      <div className="relative h-5 mt-1">
        {[0, 5, 10].map((n) => (
          <span
            key={n}
            className="absolute -translate-x-1/2 text-xs text-muted-foreground"
            style={{ left: `${n * 10}%` }}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}

const dimensionOrder: Dimension[] = ["subitizing", "comparison", "numberLine", "matching", "ordering", "calculation"]

export function ScreeningTest({ onBack }: ScreeningTestProps) {
  const { t, locale } = useLanguage()
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro")
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  // per-question records
  const [records, setRecords] = useState<{ dimension: Dimension; correct: boolean; ms: number }[]>([])
  const startRef = useRef<number>(Date.now())

  const q = questions[current]
  const isLast = current === TOTAL - 1

  // reset timer when a new question shows
  if (stage === "quiz" && selected === null) {
    // only set once per question render where unanswered
  }

  const handleSelect = (i: number) => {
    if (selected !== null) return
    const ms = Date.now() - startRef.current
    setSelected(i)
    setRecords((r) => [...r, { dimension: q.dimension, correct: i === q.answer, ms }])
  }

  const handleNext = () => {
    if (isLast) {
      setStage("result")
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      startRef.current = Date.now()
    }
  }

  const startQuiz = () => {
    setStage("quiz")
    setCurrent(0)
    setSelected(null)
    setRecords([])
    startRef.current = Date.now()
  }

  const resetTest = () => {
    setStage("intro")
    setCurrent(0)
    setSelected(null)
    setRecords([])
  }

  // INTRO
  if (stage === "intro") {
    return (
      <div className="flex flex-col h-full bg-background">
        <Header title={t.screening.title} onBack={onBack} />
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
          <Button onClick={startQuiz} className="rounded-full px-10 py-6 text-base" size="lg">
            <span suppressHydrationWarning>{t.screening.start}</span>
          </Button>
        </div>
      </div>
    )
  }

  // RESULT
  if (stage === "result") {
    const totalCorrect = records.filter((r) => r.correct).length
    const slowCount = records.filter((r) => r.ms > SLOW_THRESHOLD).length

    // Overall message
    const overall =
      totalCorrect >= 11 && slowCount <= 3
        ? t.screening.overallStrong
        : totalCorrect >= 7
          ? t.screening.overallMedium
          : t.screening.overallWatch

    // Per-dimension breakdown
    const dimStats = dimensionOrder.map((dim) => {
      const recs = records.filter((r) => r.dimension === dim)
      const total = recs.length
      const correct = recs.filter((r) => r.correct).length
      const avgMs = total ? recs.reduce((s, r) => s + r.ms, 0) / total : 0
      const acc = total ? correct / total : 0
      const level = acc >= 0.75 ? "strong" : acc >= 0.5 ? "medium" : "watch"
      const speed = avgMs <= 3000 ? "fast" : avgMs <= SLOW_THRESHOLD ? "medium" : "slow"
      return { dim, total, correct, acc, level, speed }
    })

    const levelText: Record<string, string> = {
      strong: t.screening.levelStrong,
      medium: t.screening.levelMedium,
      watch: t.screening.levelWatch,
    }
    const levelColor: Record<string, string> = {
      strong: "text-primary",
      medium: "text-accent-foreground",
      watch: "text-destructive",
    }
    const speedText: Record<string, string> = {
      fast: t.screening.speedFast,
      medium: t.screening.speedMedium,
      slow: t.screening.speedSlow,
    }
    const dimName: Record<Dimension, string> = {
      subitizing: t.screening.dim_subitizing,
      comparison: t.screening.dim_comparison,
      numberLine: t.screening.dim_numberLine,
      matching: t.screening.dim_matching,
      ordering: t.screening.dim_ordering,
      calculation: t.screening.dim_calculation,
    }

    return (
      <div className="flex flex-col h-full bg-background">
        <Header title={t.screening.title} onBack={onBack} />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Sparkles className="w-12 h-12 text-amber-400 mb-3" />
            <h2 className="text-2xl font-bold mb-2" suppressHydrationWarning>
              {t.screening.resultTitle}
            </h2>
            <div className="flex items-end gap-2 my-2">
              <span className="text-5xl font-bold text-primary">{totalCorrect}</span>
              <span className="text-lg text-muted-foreground mb-1" suppressHydrationWarning>
                / {TOTAL}
              </span>
            </div>
            <p className="text-muted-foreground text-pretty leading-relaxed max-w-sm" suppressHydrationWarning>
              {overall}
            </p>
          </div>

          {/* Dimension breakdown */}
          <h3 className="text-sm font-semibold text-muted-foreground mb-3" suppressHydrationWarning>
            {t.screening.dimensionTitle}
          </h3>
          <div className="flex flex-col gap-3 mb-6">
            {dimStats.map((d) => (
              <div key={d.dim} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground" suppressHydrationWarning>
                    {dimName[d.dim]}
                  </span>
                  <span className={`text-sm font-semibold ${levelColor[d.level]}`} suppressHydrationWarning>
                    {levelText[d.level]}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${Math.round(d.acc * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span suppressHydrationWarning>
                    {t.screening.accuracy}: {d.correct}/{d.total}
                  </span>
                  <span className="flex items-center gap-1" suppressHydrationWarning>
                    <Clock className="w-3 h-3" />
                    {t.screening.speed}: {speedText[d.speed]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/80 mb-2 text-pretty leading-relaxed" suppressHydrationWarning>
            {t.screening.speedNote}
          </p>
          <p className="text-xs text-muted-foreground/70 mb-6 text-pretty leading-relaxed" suppressHydrationWarning>
            {t.screening.disclaimer}
          </p>

          <div className="flex flex-col gap-3">
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
  const answeredCorrect = records.filter((r) => r.correct).length
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
          <span className="font-semibold">{answeredCorrect}</span>
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
          {q.dimension === "comparison" && q.leftDots !== undefined && q.rightDots !== undefined ? (
            <>
              <DotBox count={q.leftDots} color="bg-primary" />
              <DotBox count={q.rightDots} color="bg-accent" />
            </>
          ) : q.dimension === "numberLine" ? (
            <NumberLineVisual target={q.numberLineTarget ?? 5} />
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

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center p-4 border-b border-border">
      <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h1 className="text-lg font-bold ml-2" suppressHydrationWarning>
        {title}
      </h1>
    </div>
  )
}
