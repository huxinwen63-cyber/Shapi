"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Compass, Star, Smile, LineChart, Mail } from "lucide-react"

interface WalkthroughScreenProps {
  onDone: () => void
}

const stepIcons = [Compass, Star, Smile, LineChart, Mail]
const stepColors = [
  "bg-primary/10 text-primary",
  "bg-amber-100 text-amber-600",
  "bg-secondary/40 text-secondary-foreground",
  "bg-accent/20 text-accent-foreground",
  "bg-primary/10 text-primary",
]

export function WalkthroughScreen({ onDone }: WalkthroughScreenProps) {
  const { t } = useLanguage()
  const steps = t.walkthrough.steps
  const [index, setIndex] = useState(0)

  const isLast = index === steps.length - 1
  const step = steps[index]
  const Icon = stepIcons[index] ?? Compass
  const color = stepColors[index] ?? stepColors[0]

  return (
    <div className="flex flex-col h-full p-6">
      {/* Skip */}
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={onDone} className="rounded-full text-muted-foreground">
          <span suppressHydrationWarning>{t.walkthrough.skip}</span>
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
        <span
          className="text-xs font-semibold uppercase tracking-wide bg-background/70 border border-border rounded-full px-3 py-1 text-muted-foreground"
          suppressHydrationWarning
        >
          {step.audience}
        </span>
        <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center ${color}`}>
          <Icon className="w-14 h-14" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-foreground text-balance px-4" suppressHydrationWarning>
          {step.title}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed text-pretty max-w-xs px-2" suppressHydrationWarning>
          {step.text}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Step ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-muted"}`}
          />
        ))}
      </div>

      {/* Next / Done */}
      <Button
        onClick={() => (isLast ? onDone() : setIndex((i) => i + 1))}
        size="lg"
        className="rounded-full py-6 text-base w-full"
      >
        <span suppressHydrationWarning>{isLast ? t.walkthrough.done : t.walkthrough.next}</span>
      </Button>
    </div>
  )
}
