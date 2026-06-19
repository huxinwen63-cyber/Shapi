"use client"

import { useLanguage } from "@/lib/language-context"
import { Star, ChevronRight, ArrowLeft, Map } from "lucide-react"

interface ExploreScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

export function ExploreScreen({ onBack, onNavigate }: ExploreScreenProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 hover:bg-muted/70 transition-colors"
          aria-label={t.game.back}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground" suppressHydrationWarning>
            {t.worlds.title}
          </h1>
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            {t.worlds.subtitle}
          </p>
        </div>
      </div>

      {/* Worlds */}
      <div className="flex flex-col gap-4">
        <WorldCard
          color="bg-primary/10"
          accent="text-primary"
          number={1}
          title={t.worlds.perception.title}
          subtitle={t.worlds.perception.subtitle}
          stars={5}
          totalStars={6}
          onClick={() => onNavigate("world-perception")}
        />
        <WorldCard
          color="bg-secondary/30"
          accent="text-secondary-foreground"
          number={2}
          title={t.worlds.representation.title}
          subtitle={t.worlds.representation.subtitle}
          stars={1}
          totalStars={6}
          onClick={() => onNavigate("world-representation")}
        />
        <WorldCard
          color="bg-accent/20"
          accent="text-accent-foreground"
          number={3}
          title={t.worlds.operation.title}
          subtitle={t.worlds.operation.subtitle}
          stars={0}
          totalStars={6}
          onClick={() => onNavigate("world-operation")}
        />
      </div>

      {/* Curriculum map entry */}
      <button
        onClick={() => onNavigate("curriculum")}
        className="mt-4 bg-card border border-border rounded-2xl p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Map className="w-5 h-5 text-foreground" />
          </div>
          <span className="font-medium text-foreground text-sm" suppressHydrationWarning>
            {t.curriculum.entry}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
      </button>
    </div>
  )
}

function WorldCard({
  color,
  accent,
  number,
  title,
  subtitle,
  stars,
  totalStars,
  onClick,
}: {
  color: string
  accent: string
  number: number
  title: string
  subtitle: string
  stars: number
  totalStars: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} rounded-3xl p-5 text-left transition-transform active:scale-[0.98] hover:scale-[1.02] flex items-center gap-4`}
    >
      <div className={`w-12 h-12 rounded-2xl bg-background/60 flex items-center justify-center font-bold text-xl ${accent} shrink-0`}>
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-base ${accent} mb-0.5`} suppressHydrationWarning>
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2 text-pretty" suppressHydrationWarning>
          {subtitle}
        </p>
        <div className="flex items-center gap-1">
          <Star className={`w-3.5 h-3.5 ${accent} fill-current`} />
          <span className="text-xs font-medium text-muted-foreground">
            {stars} / {totalStars}
          </span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
    </button>
  )
}
