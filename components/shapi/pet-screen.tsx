"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Heart, Sparkles, Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCat, CatMood } from "./animated-cat"

interface PetScreenProps {
  onBack: () => void
}

export function PetScreen({ onBack }: PetScreenProps) {
  const { t } = useLanguage()
  const [catMood, setCatMood] = useState<CatMood>("idle")

  const handleFeed = () => {
    setCatMood("happy")
    setTimeout(() => setCatMood("idle"), 3000)
  }

  const handlePlay = () => {
    setCatMood("happy")
    setTimeout(() => setCatMood("idle"), 3000)
  }

  const handleSleep = () => {
    setCatMood("sleepy")
  }

  const getMoodText = () => {
    switch (catMood) {
      case "happy":
        return t.pet.happy
      case "sleepy":
        return t.pet.sleepy
      default:
        return t.pet.happy
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold" suppressHydrationWarning>
          {t.pet.title}
        </h1>
      </div>

      {/* Pet Display */}
      <div className="bg-amber-50 flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Floating decorations */}
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-amber-200/50 animate-float" />
        <div className="absolute top-20 right-12 w-3 h-3 rounded-full bg-amber-300/40 animate-float-delayed" />
        <div className="absolute bottom-20 left-16 w-5 h-5 rounded-full bg-amber-200/30 animate-float" />
        
        {/* Animated Cat */}
        <div className="bg-background/50 rounded-3xl p-6 mb-6 shadow-lg">
          <AnimatedCat mood={catMood} size="lg" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2" suppressHydrationWarning>
          {t.pet.items[0].name}
        </h2>
        <p className="text-muted-foreground" suppressHydrationWarning>
          {t.pet.items[0].description}
        </p>

        {/* Mood indicator */}
        <div className="mt-4 bg-background/60 rounded-full px-4 py-2 flex items-center gap-2">
          <Heart className={`w-4 h-4 ${catMood === "happy" ? "text-red-400 fill-red-400 animate-pulse" : "text-red-300 fill-red-300"}`} />
          <span className="text-sm font-medium" suppressHydrationWarning>
            {t.pet.mood}: {getMoodText()}
          </span>
        </div>

        {/* Mood Switcher */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setCatMood("idle")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              catMood === "idle" ? "bg-primary text-primary-foreground" : "bg-background/60 text-foreground"
            }`}
          >
            Idle
          </button>
          <button
            onClick={() => setCatMood("happy")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              catMood === "happy" ? "bg-primary text-primary-foreground" : "bg-background/60 text-foreground"
            }`}
          >
            Happy
          </button>
          <button
            onClick={() => setCatMood("sleepy")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              catMood === "sleepy" ? "bg-primary text-primary-foreground" : "bg-background/60 text-foreground"
            }`}
          >
            Sleepy
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 bg-background">
        <div className="grid grid-cols-3 gap-4">
          <ActionButton 
            icon={Heart} 
            label={t.pet.feed} 
            color="bg-red-50 text-red-500" 
            onClick={handleFeed}
          />
          <ActionButton 
            icon={Sparkles} 
            label={t.pet.play} 
            color="bg-amber-50 text-amber-500" 
            onClick={handlePlay}
          />
          <ActionButton 
            icon={Shirt} 
            label={t.pet.dress} 
            color="bg-primary/10 text-primary" 
            onClick={handleSleep}
          />
        </div>
      </div>
    </div>
  )
}

function ActionButton({
  icon: Icon,
  label,
  color,
  onClick,
}: {
  icon: typeof Heart
  label: string
  color: string
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className={`${color} rounded-2xl p-4 flex flex-col items-center gap-2 transition-transform active:scale-95 hover:scale-105`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs font-medium" suppressHydrationWarning>
        {label}
      </span>
    </button>
  )
}
