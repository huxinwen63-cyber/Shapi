"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { AnimatedCat } from "./animated-cat"
import { Sparkles } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t, locale, toggleLocale } = useLanguage()

  return (
    <div className="relative flex flex-col h-full items-center justify-center p-8 text-center overflow-hidden">
      {/* Language toggle */}
      <button
        onClick={toggleLocale}
        className="absolute top-5 right-5 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
      >
        {locale === "zh" ? "EN" : "中文"}
      </button>

      {/* Mascot */}
      <div className="mb-8">
        <AnimatedCat mood="happy" size="lg" />
      </div>

      {/* Brand */}
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3" suppressHydrationWarning>
        {t.welcome.appName}
      </h1>

      <p className="text-lg font-medium text-primary text-balance mb-2" suppressHydrationWarning>
        {t.welcome.tagline}
      </p>

      <p className="text-sm text-muted-foreground text-pretty max-w-xs mb-10" suppressHydrationWarning>
        {t.welcome.subtitle}
      </p>

      {/* Start */}
      <Button
        onClick={onStart}
        size="lg"
        className="rounded-full px-10 py-6 text-base gap-2"
      >
        <Sparkles className="w-5 h-5" />
        <span suppressHydrationWarning>{t.welcome.start}</span>
      </Button>
    </div>
  )
}
