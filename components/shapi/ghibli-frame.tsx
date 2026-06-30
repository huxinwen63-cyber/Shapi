"use client"

import { type ReactNode, useRef, useState, useCallback } from "react"
import { useLanguage } from "@/lib/language-context"
import { Languages } from "lucide-react"
import { ClickRipple } from "./click-ripple"

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

// Floating fireflies / dust motes (fixed values to avoid hydration mismatch)
const MOTES = [
  { left: "8%", size: 5, dur: "15s", delay: "0s", opacity: 0.7 },
  { left: "18%", size: 3, dur: "19s", delay: "3s", opacity: 0.5 },
  { left: "27%", size: 6, dur: "13s", delay: "6s", opacity: 0.8 },
  { left: "39%", size: 4, dur: "21s", delay: "1.5s", opacity: 0.55 },
  { left: "48%", size: 3, dur: "17s", delay: "8s", opacity: 0.5 },
  { left: "57%", size: 7, dur: "14s", delay: "4s", opacity: 0.7 },
  { left: "66%", size: 4, dur: "20s", delay: "10s", opacity: 0.6 },
  { left: "74%", size: 5, dur: "16s", delay: "2s", opacity: 0.75 },
  { left: "83%", size: 3, dur: "22s", delay: "7s", opacity: 0.5 },
  { left: "91%", size: 6, dur: "15s", delay: "5s", opacity: 0.7 },
  { left: "13%", size: 4, dur: "18s", delay: "11s", opacity: 0.6 },
  { left: "62%", size: 3, dur: "23s", delay: "9s", opacity: 0.45 },
]

/**
 * Full-screen Ghibli-inspired website chrome.
 * Layered dreamy sky with mouse-parallax depth, drifting clouds, twinkling
 * stars, floating fireflies, and rolling hills. Wraps the app content in a
 * centered glassmorphic window that subtly tilts toward the cursor.
 */
export function GhibliFrame({ children }: GhibliFrameProps) {
  const { t, locale, toggleLocale } = useLanguage()
  const rafRef = useRef<number | null>(null)
  // Pointer offset normalized to roughly -1..1 from the viewport center
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const handlePointerMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => setPointer({ x, y }))
  }, [])

  const resetPointer = useCallback(() => setPointer({ x: 0, y: 0 }), [])

  // Helper to build a parallax translate for a given depth (px of travel)
  const par = (depth: number) => ({
    transform: `translate3d(${(-pointer.x * depth).toFixed(1)}px, ${(-pointer.y * depth).toFixed(1)}px, 0)`,
  })

  return (
    <div
      className="ghibli-sky relative min-h-[100dvh] w-full overflow-hidden"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      style={{ perspective: "1200px" }}
    >
      {/* App-wide dynamic click ripple */}
      <ClickRipple />

      {/* Decorative sky layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Sun glow */}
        <div className="ghibli-sun animate-sun-pulse parallax-layer absolute right-[10%] top-[2%] h-64 w-64" style={par(14)} />

        {/* Twinkling stars (gentle parallax) */}
        <div className="parallax-layer absolute inset-0" style={par(8)}>
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
        </div>

        {/* Floating fireflies / motes rising upward */}
        <div className="parallax-layer absolute inset-0" style={par(22)}>
          {MOTES.map((m, i) => (
            <span
              key={i}
              className="animate-rise absolute bottom-0 rounded-full bg-amber-100"
              style={
                {
                  left: m.left,
                  width: m.size,
                  height: m.size,
                  boxShadow: "0 0 10px 2px oklch(0.95 0.09 95 / 0.7)",
                  "--mote-dur": m.dur,
                  "--mote-delay": m.delay,
                  "--mote-opacity": m.opacity,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Drifting clouds (more travel = closer) */}
        <div className="parallax-layer absolute inset-0" style={par(30)}>
          <div className="ghibli-cloud animate-drift absolute left-[6%] top-[16%] h-24 w-56 opacity-90" />
          <div className="ghibli-cloud animate-drift-slow absolute right-[8%] top-[12%] h-20 w-48 opacity-75" />
          <div className="ghibli-cloud animate-drift absolute left-[22%] top-[36%] h-16 w-40 opacity-60" />
          <div className="ghibli-cloud animate-drift-slow absolute right-[20%] top-[44%] h-24 w-64 opacity-50" />
        </div>

        {/* Layered rolling hills (foreground moves most) */}
        <div className="parallax-layer absolute inset-0" style={par(40)}>
          <div className="ghibli-hill-back absolute -bottom-10 left-[-8%] h-52 w-[70%] opacity-70" />
          <div className="ghibli-hill-back absolute -bottom-12 right-[-10%] h-60 w-[65%] opacity-60" />
          <div className="ghibli-hill absolute -bottom-10 -left-10 h-48 w-[60%] opacity-95" />
          <div className="ghibli-hill absolute -bottom-16 right-[-5%] h-56 w-[55%] opacity-90" />
          <div className="ghibli-hill absolute -bottom-8 left-[30%] h-44 w-[55%] opacity-80" />
        </div>

        {/* Soft vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,transparent_55%,oklch(0.4_0.05_250/0.12)_100%)]" />
      </div>

      {/* Top navigation */}
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30 ring-1 ring-white/40 tap-pop">
            <span className="font-display text-2xl font-semibold text-primary-foreground">N</span>
          </div>
          <span className="font-display text-3xl font-semibold tracking-tight">
            <span className="text-primary">Nu</span>
            <span className="text-accent">mi</span>
          </span>
        </div>
        <button
          onClick={toggleLocale}
          className="tap-pop flex items-center gap-2 rounded-full bg-card/70 px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-white/50 backdrop-blur hover:bg-card hover:shadow-md"
        >
          <Languages className="h-4 w-4" />
          {locale === "en" ? "中文" : "EN"}
        </button>
      </header>

      {/* App window — subtly tilts toward the cursor */}
      <main className="relative z-10 flex justify-center px-4 pb-8 sm:px-6">
        <div
          className="parallax-layer ghibli-window h-[80vh] min-h-[560px] w-full max-w-2xl overflow-hidden rounded-[2.75rem] border border-white/60"
          style={{
            transform: `rotateY(${(pointer.x * 2.2).toFixed(2)}deg) rotateX(${(-pointer.y * 2.2).toFixed(2)}deg) translateZ(0)`,
          }}
        >
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
