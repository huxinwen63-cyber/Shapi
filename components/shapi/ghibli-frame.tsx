"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/lib/language-context"
import { Languages } from "lucide-react"

interface GhibliFrameProps {
  children: ReactNode
}

// Twinkling stars scattered across the upper sky
const STARS = [
  { top: "8%", left: "12%", size: 6, delay: "0s" },
  { top: "14%", left: "34%", size: 4, delay: "0.6s" },
  { top: "6%", left: "58%", size: 5, delay: "1.2s" },
  { top: "20%", left: "88%", size: 4, delay: "0.3s" },
  { top: "26%", left: "22%", size: 4, delay: "1.6s" },
  { top: "30%", left: "70%", size: 6, delay: "0.9s" },
  { top: "12%", left: "76%", size: 3, delay: "2s" },
]

/**
 * Full-screen Ghibli-inspired website chrome.
 * Layered dreamy sky: sun glow + twinkling stars + drifting gradient clouds
 * (placeholders for future illustrations) + rolling hills. Wraps the app
 * content in a centered glassmorphic window with a brand nav and footer.
 */
export function GhibliFrame({ children }: GhibliFrameProps) {
  const { t, locale, toggleLocale } = useLanguage()

  return (
    <div className="ghibli-sky relative min-h-[100dvh] w-full overflow-hidden">
      {/* Decorative sky layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Sun glow */}
        <div className="ghibli-sun animate-sun-pulse absolute right-[10%] top-[2%] h-64 w-64" />

        {/* Twinkling stars */}
        {STARS.map((s, i) => (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              boxShadow: "0 0 8px 1px rgba(255,255,255,0.8)",
            }}
          />
        ))}

        {/* Drifting clouds */}
        <div className="ghibli-cloud animate-drift absolute left-[6%] top-[16%] h-24 w-56 opacity-90" />
        <div className="ghibli-cloud animate-drift-slow absolute right-[8%] top-[12%] h-20 w-48 opacity-75" />
        <div className="ghibli-cloud animate-drift absolute left-[22%] top-[36%] h-16 w-40 opacity-60" />
        <div className="ghibli-cloud animate-drift-slow absolute right-[20%] top-[44%] h-24 w-64 opacity-50" />

        {/* Layered rolling hills */}
        <div className="ghibli-hill-back absolute -bottom-10 left-[-8%] h-52 w-[70%] opacity-70" />
        <div className="ghibli-hill-back absolute -bottom-12 right-[-10%] h-60 w-[65%] opacity-60" />
        <div className="ghibli-hill absolute -bottom-10 -left-10 h-48 w-[60%] opacity-95" />
        <div className="ghibli-hill absolute -bottom-16 right-[-5%] h-56 w-[55%] opacity-90" />
        <div className="ghibli-hill absolute -bottom-8 left-[30%] h-44 w-[55%] opacity-80" />

        {/* Soft vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,transparent_55%,oklch(0.4_0.05_250/0.12)_100%)]" />
      </div>

      {/* Top navigation */}
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30 ring-1 ring-white/40">
            <span className="font-display text-2xl font-semibold text-primary-foreground">N</span>
          </div>
          <span className="font-display text-3xl font-semibold tracking-tight">
            <span className="text-primary">Nu</span>
            <span className="text-accent">mi</span>
          </span>
        </div>
        <button
          onClick={toggleLocale}
          className="flex items-center gap-2 rounded-full bg-card/70 px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-white/50 backdrop-blur transition-all hover:bg-card hover:shadow-md"
        >
          <Languages className="h-4 w-4" />
          {locale === "en" ? "中文" : "EN"}
        </button>
      </header>

      {/* App window */}
      <main className="relative z-10 flex justify-center px-4 pb-8 sm:px-6">
        <div className="ghibli-window h-[80vh] min-h-[560px] w-full max-w-2xl overflow-hidden rounded-[2.75rem] border border-white/60">
          <div className="h-full w-full overflow-hidden rounded-[2.75rem] bg-background/90">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 px-5 pb-8 text-center sm:px-8">
        <p className="font-display text-base text-foreground/75" suppressHydrationWarning>
          {t.welcome.appName} · {t.welcome.subtitle}
        </p>
        <p className="mt-1 text-xs text-foreground/50">&copy; 2026 Numi. All rights reserved.</p>
      </footer>
    </div>
  )
}
