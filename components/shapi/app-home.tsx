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
    <div className="flex flex-col h-full p-6">
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

      {/* Activity Grid */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4" suppressHydrationWarning>
          {t.app.todayActivity}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <ActivityCard
            color="bg-primary/10"
            iconColor="text-primary"
            title={t.activities.subitizing.title}
            subtitle={t.activities.subitizing.subtitle}
            stars={3}
            onClick={() => onNavigate("subitizing")}
          />
          <ActivityCard
            color="bg-secondary/30"
            iconColor="text-secondary-foreground"
            title={t.activities.comparison.title}
            subtitle={t.activities.comparison.subtitle}
            stars={2}
            onClick={() => onNavigate("comparison")}
          />
          <ActivityCard
            color="bg-accent/20"
            iconColor="text-accent-foreground"
            title={t.activities.numberLine.title}
            subtitle={t.activities.numberLine.subtitle}
            stars={1}
            onClick={() => onNavigate("numberLine")}
          />
          <ActivityCard
            color="bg-sky-100"
            iconColor="text-sky-700"
            title={t.activities.partWhole.title}
            subtitle={t.activities.partWhole.subtitle}
            stars={0}
            onClick={() => onNavigate("partWhole")}
          />
          <ActivityCard
            color="bg-amber-50"
            iconColor="text-amber-700"
            title={t.activities.placeValue.title}
            subtitle={t.activities.placeValue.subtitle}
            stars={0}
            onClick={() => onNavigate("placeValue")}
          />
          <ActivityCard
            color="bg-muted"
            iconColor="text-muted-foreground"
            title={t.activities.addSub.title}
            subtitle={t.activities.addSub.subtitle}
            stars={0}
            onClick={() => onNavigate("addSub")}
          />
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mt-auto pt-4">
        <button
          onClick={() => onNavigate("progress")}
          className="w-full bg-card border border-border rounded-2xl p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
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
    </div>
  )
}

function ActivityCard({
  color,
  iconColor,
  title,
  subtitle,
  stars,
  onClick,
}: {
  color: string
  iconColor: string
  title: string
  subtitle: string
  stars: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} rounded-2xl p-4 text-left transition-transform active:scale-95 hover:scale-[1.02]`}
    >
      <div className="flex gap-0.5 mb-2">
        {[...Array(3)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < stars ? "text-amber-400 fill-amber-400" : "text-foreground/20"}`}
          />
        ))}
      </div>
      <h3 className={`font-semibold ${iconColor} mb-1`} suppressHydrationWarning>
        {title}
      </h3>
      <p className="text-xs text-muted-foreground" suppressHydrationWarning>
        {subtitle}
      </p>
    </button>
  )
}
