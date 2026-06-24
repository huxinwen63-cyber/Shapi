"use client"

import { cn } from "@/lib/utils"

export type FaceMood = "smile" | "happy" | "wow" | "cool"

interface EmojiFaceProps {
  /** The face's line color (CSS color). Changes as worlds are completed. */
  color: string
  mood?: FaceMood
  size?: number
  locked?: boolean
  className?: string
}

/**
 * A minimal line-art smiley face. Everything is drawn with strokes only —
 * no fills, no gloss. The whole face is tinted with the `color` prop
 * (unlocked by completing worlds). It gently bobs and the eyes blink.
 * Each mood swaps the eyes/mouth lines for a different expression.
 */
export function EmojiFace({ color, mood = "smile", size = 64, locked = false, className }: EmojiFaceProps) {
  const ink = locked ? "var(--muted-foreground)" : color
  const stroke = {
    fill: "none",
    stroke: ink,
    strokeWidth: 5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { transition: "stroke 0.5s ease" },
  }

  return (
    <div
      className={cn("relative shrink-0", !locked && "animate-bob", className)}
      style={{ width: size, height: size, opacity: locked ? 0.5 : 1 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
        {/* Face outline */}
        <circle cx="50" cy="50" r="44" {...stroke} />

        {/* Eyes */}
        {mood === "cool" ? (
          // Sunglasses drawn as lines
          <g {...stroke}>
            <path d="M22 42 h22 v8 a6 6 0 0 1 -22 1 Z" />
            <path d="M56 42 h22 v9 a6 6 0 0 1 -22 -1 Z" />
            <path d="M44 44 h12" />
          </g>
        ) : mood === "wow" ? (
          <g {...stroke}>
            <circle cx="37" cy="43" r="5" />
            <circle cx="63" cy="43" r="5" />
          </g>
        ) : (
          <g
            {...stroke}
            className={!locked ? "animate-blink" : undefined}
            style={{ ...stroke.style, transformBox: "fill-box", transformOrigin: "center" }}
          >
            <path d="M37 43 v0.5" />
            <path d="M63 43 v0.5" />
          </g>
        )}

        {/* Mouth */}
        {mood === "wow" ? (
          <circle cx="50" cy="68" r="9" {...stroke} />
        ) : mood === "happy" ? (
          <path d="M30 60 Q50 84 70 60" {...stroke} />
        ) : (
          <path d="M33 64 Q50 78 67 64" {...stroke} />
        )}
      </svg>
    </div>
  )
}
