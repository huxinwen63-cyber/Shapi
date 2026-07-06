"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, ChevronRight, Lock } from "lucide-react"

type WorldId = "perception" | "representation" | "operation"

interface WorldScreenProps {
  worldId: WorldId
  onBack: () => void
  onNavigate: (screen: string) => void
}

const worldActivities: Record<
  WorldId,
  { key: "subitizing" | "comparison" | "matching" | "numberLine" | "partWhole" | "placeValue" | "addSub"; screen: string; locked?: boolean }[]
> = {
  perception: [
    { key: "subitizing", screen: "subitizing" },
    { key: "comparison", screen: "comparison" },
    { key: "matching", screen: "matching" },
  ],
  representation: [
    { key: "numberLine", screen: "numberLine" },
    { key: "placeValue", screen: "placeValue" },
  ],
  operation: [
    { key: "partWhole", screen: "partWhole" },
    { key: "addSub", screen: "addSub", locked: true },
  ],
}

const worldStyles: Record<WorldId, { bg: string; accent: string; number: number }> = {
  perception: { bg: "bg-primary/10", accent: "text-primary", number: 1 },
  representation: { bg: "bg-secondary/30", accent: "text-secondary-foreground", number: 2 },
  operation: { bg: "bg-accent/20", accent: "text-accent-foreground", number: 3 },
}

export function WorldScreen({ worldId, onBack, onNavigate }: WorldScreenProps) {
  const { t } = useLanguage()
  const world = t.worlds[worldId]
  const style = worldStyles[worldId]
  const activities = worldActivities[worldId]

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0"
          aria-label={t.game.back}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${style.bg} flex items-center justify-center font-bold text-lg ${style.accent}`}>
            {style.number}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground" suppressHydrationWarning>
              {world.title}
            </h1>
            <p className="text-sm text-muted-foreground" suppressHydrationWarning>
              {world.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Learning objective + skills */}
      <div className={`${style.bg} rounded-3xl p-5 mb-6`}>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-1.5 ${style.accent}`} suppressHydrationWarning>
          {t.worlds.objectiveLabel}
        </p>
        <p className="text-sm text-foreground leading-relaxed mb-4 text-pretty" suppressHydrationWarning>
          {world.objective}
        </p>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${style.accent}`} suppressHydrationWarning>
          {t.worlds.skillsLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {world.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-medium bg-background/70 text-foreground rounded-full px-3 py-1"
              suppressHydrationWarning
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="flex flex-col gap-4 overflow-auto">
        {activities.map((activity) => {
          const info = t.activities[activity.key]
          return (
            <button
              key={activity.key}
              onClick={() => !activity.locked && onNavigate(activity.screen)}
              disabled={activity.locked}
              className={`${style.bg} rounded-3xl p-5 text-left transition-transform flex items-center gap-4 ${
                activity.locked ? "opacity-60" : "active:scale-[0.98] hover:scale-[1.02]"
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-background/60 flex items-center justify-center shrink-0 ${style.accent}`}>
                {activity.locked ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <Star className="w-5 h-5 fill-current" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold ${style.accent} mb-0.5`} suppressHydrationWarning>
                  {info.title}
                </h3>
                <p className="text-xs text-muted-foreground text-pretty" suppressHydrationWarning>
                  {info.description}
                </p>
              </div>
              {!activity.locked && <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
