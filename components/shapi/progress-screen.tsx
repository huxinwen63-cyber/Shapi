"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Star, Flame, Trophy, Sparkles, Award, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmojiFace, type FaceMood } from "./emoji-face"

interface ProgressScreenProps {
  onBack: () => void
}

export function ProgressScreen({ onBack }: ProgressScreenProps) {
  const { t } = useLanguage()

  // Demo: how many worlds have been completed (0-3). Each completed world
  // gives the face a new color and unlocks one more expression.
  const [worldsDone, setWorldsDone] = useState(1)

  // Face colors unlocked progressively. Index 0 is always available.
  const faceColors = ["#86c166", "#f2c94c", "#6cb6e3", "#e58fb0"]
  const faceMoods: FaceMood[] = ["smile", "happy", "wow", "cool"]
  // The face's current color follows the latest completed world.
  const currentColor = faceColors[Math.min(worldsDone, faceColors.length - 1)]

  const stats = [
    { icon: Sparkles, value: "12", label: t.progress.activitiesCompleted, color: "bg-primary/10 text-primary" },
    { icon: Flame, value: "5", label: t.progress.streakDays, color: "bg-accent/20 text-accent" },
    { icon: Trophy, value: "3", label: t.progress.level, color: "bg-amber-100 text-amber-600" },
    { icon: Star, value: "47", label: t.progress.starsEarned, color: "bg-pink-100 text-pink-600" },
  ]

  const activities = [
    { name: t.activities.subitizing.title, progress: 80, stars: 3 },
    { name: t.activities.comparison.title, progress: 60, stars: 2 },
    { name: t.activities.matching.title, progress: 40, stars: 1 },
    { name: t.activities.numberLine.title, progress: 20, stars: 0 },
  ]

  // Reward system: points, earned badges
  const totalPoints = 47
  const earnedBadges = [true, true, true, false, false, false]

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

        {/* Points */}
        <div className="mt-8 bg-amber-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/30 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-amber-700/80" suppressHydrationWarning>
              {t.progress.pointsTitle}
            </p>
            <p className="text-2xl font-bold text-amber-700">
              {totalPoints} <span className="text-base font-medium" suppressHydrationWarning>{t.progress.points}</span>
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4" suppressHydrationWarning>
            {t.progress.badgesTitle}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {t.progress.badges.map((badge, index) => {
              const earned = earnedBadges[index]
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center rounded-2xl p-3 border ${
                    earned ? "bg-card border-primary/30" : "bg-muted/40 border-border opacity-60"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      earned ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {earned ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-semibold leading-tight" suppressHydrationWarning>
                    {badge.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-tight mt-0.5" suppressHydrationWarning>
                    {badge.desc}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Faces (emoji avatars) */}
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold" suppressHydrationWarning>
              {t.progress.avatarsTitle}
            </h2>
            <span className="text-xs font-medium text-muted-foreground" suppressHydrationWarning>
              {t.progress.worldsDone}: {worldsDone}/3
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed" suppressHydrationWarning>
            {t.progress.facesHint}
          </p>

          {/* Featured current face */}
          <div className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center mb-4">
            <EmojiFace color={currentColor} mood={faceMoods[Math.min(worldsDone, faceMoods.length - 1)]} size={88} />
          </div>

          {/* Collection: one face unlocked per completed world (first always unlocked) */}
          <div className="grid grid-cols-4 gap-3">
            {t.progress.faces.map((face, index) => {
              const unlocked = index <= worldsDone
              return (
                <div key={index} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${
                      unlocked ? "border-primary bg-card" : "border-border bg-muted/40"
                    }`}
                  >
                    <EmojiFace color={faceColors[index]} mood={faceMoods[index]} size={44} locked={!unlocked} />
                    {!unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium" suppressHydrationWarning>
                    {unlocked ? face.name : t.progress.locked}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Demo controls */}
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => setWorldsDone((w) => Math.min(w + 1, 3))}
              disabled={worldsDone >= 3}
              className="flex-1 rounded-full"
            >
              <span suppressHydrationWarning>{t.progress.demoComplete}</span>
            </Button>
            <Button variant="outline" onClick={() => setWorldsDone(0)} className="rounded-full">
              <span suppressHydrationWarning>{t.progress.demoReset}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
