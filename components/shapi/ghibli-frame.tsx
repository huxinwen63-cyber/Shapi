"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/lib/language-context"
import { Languages } from "lucide-react"

interface GhibliFrameProps {
  children: ReactNode
}

/**
 * Full-screen Ghibli-inspired website chrome.
 * Dreamy sky gradient + soft gradient clouds (placeholders for future
 * illustrations) + rolling hills, a top nav with the Numi brand and a
 * language toggle, and the app content presented in a centered window.
 */
export function GhibliFrame({ children }: GhibliFrameProps) {
  const { t, locale, toggleLocale } = useLanguage()

  return (
    <div className="ghibli-sky relative min-h-[100dvh] w-full overflow-hidden">
      {/* Decorative gradient clouds (placeholder illustrations) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="ghibli-cloud animate-drift absolute left-[6%] top-[14%] h-24 w-56 opacity-80" />
        <div className="ghibli-cloud animate-drift-slow absolute right-[8%] top-[10%] h-20 w-48 opacity-70" />
        <div className="ghibli-cloud animate-drift absolute left-[20%] top-[34%] h-16 w-40 opacity-60" />
        <div className="ghibli-cloud animate-drift-slow absolute right-[18%] top-[40%] h-24 w-64 opacity-50" />
        {/* Rolling hills at the bottom */}
        <div className="ghibli-hill absolute -bottom-10 -left-10 h-48 w-[60%] opacity-90" />
        <div className="ghibli-hill absolute -bottom-16 right-[-5%] h-56 w-[55%] opacity-80" />
        <div className="ghibli-hill absolute -bottom-8 left-[30%] h-40 w-[55%] opacity-70" />
      </div>

      {/* Top navigation */}
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/90 shadow-md">
            <span className="text-xl font-bold text-primary-foreground">N</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            <span className="text-primary">Nu</span>
            <span className="text-accent">mi</span>
          </span>
        </div>
        <button
          onClick={toggleLocale}
          className="flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur transition-colors hover:bg-card"
        >
          <Languages className="h-4 w-4" />
          {locale === "en" ? "中文" : "EN"}
        </button>
      </header>

      {/* App window */}
      <main className="relative z-10 flex justify-center px-4 pb-8 sm:px-6">
        <div className="h-[80vh] min-h-[560px] w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/50 bg-background/95 shadow-2xl backdrop-blur-sm">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 px-5 pb-8 text-center sm:px-8">
        <p className="text-sm text-foreground/70" suppressHydrationWarning>
          {t.welcome.appName} · {t.welcome.subtitle}
        </p>
        <p className="mt-1 text-xs text-foreground/50">&copy; 2026 Numi. All rights reserved.</p>
      </footer>
    </div>
  )
}
