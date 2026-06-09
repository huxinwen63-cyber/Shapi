"use client"

import { useLanguage } from "@/lib/language-context"
import { Star, ChevronRight, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCat } from "./animated-cat"

interface AppHomeProps {
  onNavigate: (screen: string) => void
}

export function AppHome({ onNavigate }: AppHomeProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-muted-foreground text-sm" suppressHydrationWarning>
            {t.app.greeting}
          </p>
          <h1 className="text-2xl font-bold text-foreground" suppressHydrationWarning>
            {t.app.defaultName}
          </h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => onNavigate("settings")}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Pet Card - Cat Only */}
      <button
        onClick={() => onNavigate("pet")}
        className="bg-amber-50 rounded-3xl p-4 mb-6 flex items-center gap-4 transition-transform active:scale-98 hover:scale-[1.02]"
      >
        <div className="w-20 h-20 bg-background/50 rounded-2xl flex items-center justify-center overflow-hidden">
          <AnimatedCat mood="idle" size="sm" />
        </div>
        <div className="flex-1 text-left">
          <h2 className="font-semibold text-foreground" suppressHydrationWarning>
            {t.pet.items[0].name}
          </h2>
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            {t.pet.mood}: {t.pet.happy}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Worlds */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1" suppressHydrationWarning>
          {t.worlds.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-4" suppressHydrationWarning>
          {t.worlds.subtitle}
        </p>
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
      </div>

      {/* Progress - directly after the three worlds */}
      <button
        onClick={() => onNavigate("progress")}
        className="w-full bg-card border border-border rounded-2xl p-4 mb-2 flex items-center justify-between hover:bg-muted/50 transition-colors shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Star className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground" suppressHydrationWarning>
              {t.app.progress}
            </p>
            <p className="text-sm text-muted-foreground">12 / 20</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
