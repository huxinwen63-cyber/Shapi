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
      {/* Soft decorative glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/30 blur-3xl"
      />

      {/*
        Animation placeholder.
        Replace the contents of the framed circle below with your animation
        (e.g. a Lottie player, a <video>, an animated SVG, or any component).
      */}
      <div className="animate-pop-in relative mb-8" aria-hidden="true">
        <Sparkles className="absolute -left-4 -top-2 h-6 w-6 text-secondary animate-twinkle" />
        <Sparkles className="absolute -right-3 top-6 h-5 w-5 text-accent animate-twinkle" style={{ animationDelay: "1s" }} />
        <div className="animate-sway flex h-44 w-44 items-center justify-center rounded-full bg-card/70 ring-1 ring-white/60 shadow-xl backdrop-blur">
          {/* Your animation goes here */}
        </div>
      </div>

      {/* Brand */}
      <h1
        className="animate-pop-in font-display text-5xl font-semibold tracking-tight text-foreground mb-3"
        style={{ animationDelay: "0.1s" }}
        suppressHydrationWarning
      >
        {t.welcome.appName}
      </h1>

      <p
        className="animate-pop-in font-display text-xl text-primary text-balance mb-2"
        style={{ animationDelay: "0.2s" }}
        suppressHydrationWarning
      >
        {t.welcome.tagline}
      </p>

      <p
        className="animate-pop-in text-sm text-muted-foreground text-pretty max-w-xs mb-10 leading-relaxed"
        style={{ animationDelay: "0.3s" }}
        suppressHydrationWarning
      >
        {t.welcome.subtitle}
      </p>

      {/* Start */}
      <Button
        onClick={onStart}
        size="lg"
        className="shimmer-btn animate-pop-in rounded-full px-10 py-6 text-base gap-2 shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
        style={{ animationDelay: "0.4s" }}
      >
        <Sparkles className="w-5 h-5" />
        <span suppressHydrationWarning>{t.welcome.start}</span>
      </Button>
    </div>
  )
}
