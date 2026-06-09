"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, Flame, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProgressScreenProps {
  onBack: () => void
}

export function ProgressScreen({ onBack }: ProgressScreenProps) {
  const { t } = useLanguage()

  const stats = [
    { icon: Sparkles, value: "12", label: t.progress.activitiesCompleted, color: "bg-primary/10 text-primary" },
    { icon: Flame, value: "5", label: t.progress.streakDays, color: "bg-accent/20 text-accent" },
    { icon: Trophy, value: "3", label: t.progress.level, color: "bg-amber-100 text-amber-600" },
    { icon: Star, value: "47", label: t.progress.starsEarned, color: "bg-pink-100 text-pink-600" },
  ]

  const activities = [
    { name: t.activities.subitizing.title, progress: 80, stars: 3 },
    { name: t.activities.partWhole.title, progress: 60, stars: 2 },
    { name: t.activities.spatial.title, progress: 40, stars: 1 },
    { name: t.activities.matching.title, progress: 20, stars: 0 },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold" suppressHydrationWarning>
          {t.progress.title}
        </h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-2xl p-4 flex flex-col items-center`}
            >
              <stat.icon className="w-8 h-8 mb-2" />
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-center opacity-80" suppressHydrationWarning>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Activity Progress */}
        <h2 className="text-lg font-semibold mb-4" suppressHydrationWarning>
          {t.activities.title}
        </h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium" suppressHydrationWarning>
                  {activity.name}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < activity.stars ? "text-amber-400 fill-amber-400" : "text-muted"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${activity.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{activity.progress}%</p>
            </div>
          ))}
        </div>

        {/* Weekly Calendar */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4" suppressHydrationWarning>
            {t.progress.thisWeek}
          </h2>
          <div className="flex justify-between">
            {["一", "二", "三", "四", "五", "六", "日"].map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">{day}</span>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index < 5
                      ? "bg-primary/10"
                      : index === 5
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                  }`}
                >
                  {index < 5 && <Star className="w-5 h-5 text-primary fill-primary" />}
                  {index === 5 && <Flame className="w-5 h-5" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
