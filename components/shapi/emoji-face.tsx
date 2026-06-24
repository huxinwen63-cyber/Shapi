"use client"

import { cn } from "@/lib/utils"

export type FaceMood = "smile" | "happy" | "wow" | "cool"

interface EmojiFaceProps {
  /** The face's own color (CSS color). Changes as worlds are completed. */
  color: string
  mood?: FaceMood
  size?: number
  locked?: boolean
  className?: string
}

/**
 * A friendly SVG animated smiley face. The whole face is tinted with the
 * `color` prop (unlocked by completing worlds). It gently bobs, the eyes blink,
 * and a glossy highlight gives it a soft, playful look. Each mood swaps the
 * eyes/mouth for a different expression.
 *
 * Built to be easy to replace later with a different animated example.
 */
export function EmojiFace({ color, mood = "smile", size = 64, locked = false, className }: EmojiFaceProps) {
  const faceColor = locked ? "var(--muted)" : color
  const ink = locked ? "var(--muted-foreground)" : "rgba(45, 32, 20, 0.88)"
  const blush = "rgba(255, 120, 120, 0.4)"
  const gradId = `face-grad-${mood}-${locked ? "lock" : "on"}`

  return (
    <div
      className={cn("relative shrink-0", !locked && "animate-bob", className)}
      style={{ width: size, height: size, opacity: locked ? 0.5 : 1 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
        <defs>
          <radialGradient id={gradId} cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="38%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Face circle */}
        <circle cx="50" cy="50" r="46" fill={faceColor} style={{ transition: "fill 0.5s ease" }} />
        {/* Soft inner shading at the bottom for roundness */}
        {!locked && <circle cx="50" cy="58" r="46" fill="rgba(0,0,0,0.06)" />}
        {/* Glossy highlight */}
        {!locked && <circle cx="50" cy="50" r="46" fill={`url(#${gradId})`} />}

        {/* Cheeks */}
        {!locked && mood !== "cool" && (
          <>
            <ellipse cx="26" cy="60" rx="8" ry="5.5" fill={blush} />
            <ellipse cx="74" cy="60" rx="8" ry="5.5" fill={blush} />
          </>
        )}

        {/* Eyes */}
        {mood === "cool" ? (
          // Sunglasses
          <g fill={ink}>
            <rect x="18" y="38" width="27" height="15" rx="7" />
            <rect x="55" y="38" width="27" height="15" rx="7" />
            <rect x="44" y="43" width="12" height="4" />
          </g>
        ) : mood === "wow" ? (
          <g fill={ink}>
            <ellipse cx="36" cy="44" rx="6.5" ry="8.5" />
            <ellipse cx="64" cy="44" rx="6.5" ry="8.5" />
          </g>
        ) : (
          <g fill={ink} className={!locked ? "animate-blink" : undefined} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <circle cx="36" cy="44" r="6" />
            <circle cx="64" cy="44" r="6" />
          </g>
        )}

        {/* Mouth */}
        {mood === "wow" ? (
          <ellipse cx="50" cy="68" rx="10" ry="12" fill={ink} />
        ) : mood === "happy" ? (
          // Big open grin with a little tongue
          <g>
            <path d="M30 60 Q50 86 70 60 Z" fill={ink} />
            <path d="M41 71 Q50 80 59 71 Z" fill="rgba(255,120,120,0.75)" />
          </g>
        ) : (
          // Gentle curved smile
          <path
            d="M33 63 Q50 78 67 63"
            fill="none"
            stroke={ink}
            strokeWidth="5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  )
}
