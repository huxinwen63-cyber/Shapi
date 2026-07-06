"use client"

import { cn } from "@/lib/utils"

export type FaceMood = "smile" | "happy" | "wow" | "cool" | "sleepy"

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
        {/* Eyes — no face outline, features only */}
        {mood === "happy" ? (
          // Closed happy curve eyes
          <g {...stroke}>
            <path d="M30 44 Q37 38 44 44" />
            <path d="M56 44 Q63 38 70 44" />
          </g>
        ) : mood === "wow" ? (
          // Round dot eyes
          <g {...stroke}>
            <circle cx="37" cy="44" r="4" />
            <circle cx="63" cy="44" r="4" />
          </g>
        ) : mood === "cool" ? (
          // Sparkle eyes
          <g {...stroke}>
            <path d="M37 38 v12 M31 44 h12" />
            <path d="M63 38 v12 M57 44 h12" />
          </g>
        ) : mood === "sleepy" ? (
          // Closed, downward sleepy eyes
          <g {...stroke}>
            <path d="M30 46 Q37 52 44 46" />
            <path d="M56 46 Q63 52 70 46" />
          </g>
        ) : (
          // Simple line/dot eyes that blink
          <g
            {...stroke}
            className={!locked ? "animate-blink" : undefined}
            style={{ ...stroke.style, transformBox: "fill-box", transformOrigin: "center" }}
          >
            <path d="M37 42 v6" />
            <path d="M63 42 v6" />
          </g>
        )}

        {/* Mouth — gentle smile curve */}
        <path d="M33 60 Q50 76 67 60" {...stroke} />
      </svg>
    </div>
  )
}
