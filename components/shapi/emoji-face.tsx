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
 * A simple CSS-drawn animated face. Built to be easy to swap later for a
 * different animated example. The face gently bobs and blinks; the `color`
 * prop controls the face's own color (unlocked by completing worlds).
 */
export function EmojiFace({ color, mood = "smile", size = 64, locked = false, className }: EmojiFaceProps) {
  // No background circle — features are drawn directly and tinted with `color`.
  const featureColor = locked ? "var(--muted-foreground)" : color
  const eyeStyle = "absolute top-[34%] h-[12%] w-[12%] rounded-full"

  return (
    <div
      className={cn("relative", !locked && "animate-bob", className)}
      style={{ width: size, height: size, opacity: locked ? 0.5 : 1 }}
      aria-hidden="true"
    >
      {/* Eyes */}
      {mood === "cool" ? (
        // Sunglasses bar
        <div
          className="absolute top-[36%] left-[20%] right-[20%] h-[14%] rounded-full transition-colors duration-500"
          style={{ backgroundColor: featureColor }}
        />
      ) : mood === "wow" ? (
        <>
          <div
            className="absolute top-[32%] left-[26%] h-[16%] w-[16%] rounded-full transition-colors duration-500"
            style={{ backgroundColor: featureColor }}
          />
          <div
            className="absolute top-[32%] right-[26%] h-[16%] w-[16%] rounded-full transition-colors duration-500"
            style={{ backgroundColor: featureColor }}
          />
        </>
      ) : (
        <>
          <div className={cn(eyeStyle, "left-[28%]", !locked && "animate-blink")} style={{ backgroundColor: featureColor }} />
          <div className={cn(eyeStyle, "right-[28%]", !locked && "animate-blink")} style={{ backgroundColor: featureColor }} />
        </>
      )}

      {/* Mouth */}
      {mood === "wow" ? (
        <div
          className="absolute bottom-[22%] left-1/2 h-[20%] w-[20%] -translate-x-1/2 rounded-full transition-colors duration-500"
          style={{ backgroundColor: featureColor }}
        />
      ) : mood === "happy" ? (
        <div
          className="absolute bottom-[26%] left-1/2 h-[18%] w-[40%] -translate-x-1/2 rounded-b-full transition-colors duration-500"
          style={{ backgroundColor: featureColor }}
        />
      ) : (
        <div
          className="absolute bottom-[30%] left-1/2 h-[16%] w-[34%] -translate-x-1/2 rounded-b-full transition-colors duration-500"
          style={{ borderBottom: `3px solid ${featureColor}` }}
        />
      )}
    </div>
  )
}
