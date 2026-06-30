"use client"

// A lightweight confetti / sparkle burst that fires once when `show` is true.
// Pieces shoot outward from the center using the CSS `burst` keyframe.

interface CelebrationBurstProps {
  show: boolean
  // pieces is small for a gentle, child-friendly effect
  pieces?: number
}

const COLORS = [
  "oklch(0.85 0.11 80)", // gold
  "oklch(0.62 0.12 150)", // green
  "oklch(0.72 0.1 230)", // sky blue
  "oklch(0.78 0.13 20)", // coral
  "oklch(0.8 0.12 330)", // pink
]

export function CelebrationBurst({ show, pieces = 14 }: CelebrationBurstProps) {
  if (!show) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-visible">
      {Array.from({ length: pieces }).map((_, i) => {
        const angle = (360 / pieces) * i + (i % 2 === 0 ? 0 : 12)
        const distance = 70 + (i % 4) * 26
        const rad = (angle * Math.PI) / 180
        const bx = Math.cos(rad) * distance
        const by = Math.sin(rad) * distance
        const isStar = i % 3 === 0
        return (
          <span
            key={i}
            className="animate-burst absolute"
            style={
              {
                width: isStar ? 12 : 9,
                height: isStar ? 12 : 9,
                background: COLORS[i % COLORS.length],
                borderRadius: isStar ? "2px" : "9999px",
                "--bx": `${bx.toFixed(1)}px`,
                "--by": `${by.toFixed(1)}px`,
                "--br": `${(i % 2 === 0 ? 1 : -1) * 220}deg`,
                animationDelay: `${(i % 5) * 20}ms`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
