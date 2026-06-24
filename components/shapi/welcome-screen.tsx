"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useLanguage()

  return (
    <div className="relative flex flex-col h-full items-center justify-center p-8 text-center overflow-hidden">
      {/*
        Animation placeholder.
        Replace the empty <div> below with your animation (e.g. a Lottie player,
        a <video>, an animated SVG, or any component). The box is 12rem (h-48)
        tall and centered — adjust the sizing classes as needed.
      */}
      <div className="mb-8 flex h-48 w-48 items-center justify-center" aria-hidden="true">
        {/* Your animation goes here */}
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
