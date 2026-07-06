"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Gamepad2, Target, Trophy, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CurriculumMapProps {
  onBack: () => void
}

const unitStyles = [
  { bg: "bg-primary/10", accent: "text-primary", chip: "bg-primary/15" },
  { bg: "bg-secondary/30", accent: "text-secondary-foreground", chip: "bg-secondary/40" },
  { bg: "bg-accent/20", accent: "text-accent-foreground", chip: "bg-accent/25" },
]

export function CurriculumMap({ onBack }: CurriculumMapProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold" suppressHydrationWarning>
            {t.curriculum.title}
          </h1>
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            {t.curriculum.subtitle}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-5">
          {t.curriculum.units.map((unit, index) => {
            const style = unitStyles[index] ?? unitStyles[0]
            return (
              <div key={index} className={`${style.bg} rounded-3xl p-5`}>
                {/* Unit title */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-xl bg-background/60 flex items-center justify-center font-bold ${style.accent}`}
                  >
                    {index + 1}
                  </div>
                  <h2 className={`text-lg font-bold ${style.accent}`} suppressHydrationWarning>
                    {unit.unit}
                  </h2>
                </div>

                {/* Games */}
                <Section icon={<Gamepad2 className="w-4 h-4" />} label={t.curriculum.gamesLabel} accent={style.accent}>
                  <div className="flex flex-wrap gap-2">
                    {unit.games.map((g) => (
                      <span
                        key={g}
                        className={`text-xs font-medium ${style.chip} text-foreground rounded-full px-3 py-1`}
                        suppressHydrationWarning
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </Section>

                <Arrow />

                {/* Skills */}
                <Section icon={<Target className="w-4 h-4" />} label={t.curriculum.skillsLabel} accent={style.accent}>
                  <div className="flex flex-wrap gap-2">
                    {unit.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-medium bg-background/70 text-foreground rounded-full px-3 py-1"
                        suppressHydrationWarning
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Section>

                <Arrow />

                {/* Outcome */}
                <Section icon={<Trophy className="w-4 h-4" />} label={t.curriculum.outcomeLabel} accent={style.accent}>
                  <p className="text-sm text-foreground leading-relaxed text-pretty" suppressHydrationWarning>
                    {unit.outcome}
                  </p>
                </Section>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Section({
  icon,
  label,
  accent,
  children,
}: {
  icon: React.ReactNode
  label: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className={`flex items-center gap-1.5 mb-2 ${accent}`}>
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide" suppressHydrationWarning>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function Arrow() {
  return (
    <div className="flex justify-center py-2">
      <ChevronDown className="w-4 h-4 text-muted-foreground" />
    </div>
  )
}
