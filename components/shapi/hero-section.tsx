"use client"

import { Button } from "@/components/ui/button"
import { ShapeBlocks } from "./shape-blocks"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-secondary/30 animate-float" />
        <div className="absolute top-40 right-20 w-12 h-12 rounded-lg bg-primary/20 animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 rounded-2xl bg-accent/15 animate-float" />
        <div className="absolute bottom-20 right-1/3 w-14 h-14 rounded-full bg-secondary/25 animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground">
            <span className="text-primary">Sha</span>
            <span className="text-accent">pi</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-2">
            {t.hero.tagline}
          </p>
        </div>

        {/* Interactive shape blocks demo */}
        <div className="my-12">
          <ShapeBlocks />
        </div>

        {/* Main tagline */}
        <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-6 text-balance leading-relaxed" suppressHydrationWarning>
          {t.hero.title}
        </h2>

        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed" suppressHydrationWarning>
          {t.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            {t.hero.cta}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 rounded-2xl border-2 hover:bg-muted transition-colors"
          >
            {t.hero.learnMore}
          </Button>
        </div>
      </div>
    </section>
  )
}
