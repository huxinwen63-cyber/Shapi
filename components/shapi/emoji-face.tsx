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
 * A friendly CSS-drawn animated smiley face. The whole face is tinted with the
 * `color` prop (unlocked by completing worlds). It gently bobs, and the eyes
 * blink. Each mood swaps the eyes/mouth for a different expression.
 *
 * Built to be easy to replace later with a different animated example.
 */
export function EmojiFace({ color, mood = "smile", size = 64, locked = false, className }: EmojiFaceProps) {
  const faceColor = locked ? "var(--muted)" : color
  // Darker shade for features so they read against the face color.
  const ink = locked ? "var(--muted-foreground)" : "rgba(40, 30, 20, 0.85)"

  return (
    <div
      className={cn("relative shrink-0", !locked && "animate-bob", className)}
      style={{ width: size, height: size, opacity: locked ? 0.55 : 1 }}
      aria-hidden="true"
    >
      {/* Face circle */}
      <div
        className="absolute inset-0 rounded-full transition-colors duration-500"
        style={{
          backgroundColor: faceColor,
          boxShadow: locked ? "none" : "inset 0 -8% 18% rgba(0,0,0,0.12), 0 6% 16% rgba(0,0,0,0.12)",
        }}
      />

      {/* Cheeks (blush) */}
      {!locked && mood !== "cool" && (
        <>
          <div
            className="absolute top-[55%] left-[14%] h-[12%] w-[16%] rounded-full"
            style={{ backgroundColor: "rgba(255,120,120,0.35)" }}
          />
          <div
            className="absolute top-[55%] right-[14%] h-[12%] w-[16%] rounded-full"
            style={{ backgroundColor: "rgba(255,120,120,0.35)" }}
          />
        </>
      )}

      {/* Eyes */}
      {mood === "cool" ? (
        // Sunglasses
        <>
          <div
            className="absolute top-[38%] left-[18%] h-[16%] w-[26%] rounded-[40%]"
            style={{ backgroundColor: ink }}
          />
          <div
            className="absolute top-[38%] right-[18%] h-[16%] w-[26%] rounded-[40%]"
            style={{ backgroundColor: ink }}
          />
          <div className="absolute top-[44%] left-[44%] h-[3%] w-[12%]" style={{ backgroundColor: ink }} />
        </>
      ) : mood === "wow" ? (
        <>
          <div className="absolute top-[34%] left-[26%] h-[18%] w-[15%] rounded-full" style={{ backgroundColor: ink }} />
          <div className="absolute top-[34%] right-[26%] h-[18%] w-[15%] rounded-full" style={{ backgroundColor: ink }} />
        </>
      ) : (
        <>
          <div
            className={cn("absolute top-[37%] left-[29%] h-[13%] w-[13%] rounded-full", !locked && "animate-blink")}
            style={{ backgroundColor: ink }}
          />
          <div
            className={cn("absolute top-[37%] right-[29%] h-[13%] w-[13%] rounded-full", !locked && "animate-blink")}
            style={{ backgroundColor: ink }}
          />
        </>
      )}

      {/* Mouth */}
      {mood === "wow" ? (
        <div
          className="absolute bottom-[20%] left-1/2 h-[22%] w-[22%] -translate-x-1/2 rounded-full"
          style={{ backgroundColor: ink }}
        />
      ) : mood === "happy" ? (
        // Big open smile
        <div
          className="absolute bottom-[22%] left-1/2 h-[20%] w-[44%] -translate-x-1/2 overflow-hidden rounded-b-full"
          style={{ backgroundColor: ink }}
        >
          <div
            className="absolute bottom-0 left-1/2 h-[55%] w-[60%] -translate-x-1/2 rounded-t-full"
            style={{ backgroundColor: "rgba(255,120,120,0.65)" }}
          />
        </div>
      ) : (
        // Gentle curved smile
        <div
          className="absolute bottom-[28%] left-1/2 h-[18%] w-[40%] -translate-x-1/2 rounded-b-full"
          style={{ borderBottom: `${Math.max(3, size * 0.06)}px solid ${ink}` }}
        />
      )}
    </div>
  )
}
