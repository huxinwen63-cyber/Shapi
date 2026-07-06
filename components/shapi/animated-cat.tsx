"use client"

import { cn } from "@/lib/utils"

export type CatMood = "idle" | "happy" | "sleepy"

interface AnimatedCatProps {
  mood?: CatMood
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "w-24 h-24",
  md: "w-40 h-40",
  lg: "w-56 h-56",
}

export function AnimatedCat({ mood = "idle", size = "md", className }: AnimatedCatProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        className={cn(
          sizeClasses[size],
          "relative transition-all duration-500 ease-in-out",
          mood === "idle" && "animate-cat-idle",
          mood === "happy" && "animate-cat-happy",
          mood === "sleepy" && "animate-cat-sleepy"
        )}
      >
        {/* Animation placeholder — kitty photo removed. Drop your own animation here. */}
        <div className="absolute inset-0" aria-hidden="true" />

        {/* Sparkles for happy mood */}
        {mood === "happy" && (
          <>
            <div className="absolute -top-2 -left-2 w-4 h-4 animate-sparkle">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-secondary">
                <path d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute -top-1 -right-3 w-3 h-3 animate-sparkle-delayed">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-accent">
                <path d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute bottom-4 -right-2 w-3 h-3 animate-sparkle-delayed-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary">
                <path d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z" fill="currentColor"/>
              </svg>
            </div>
          </>
        )}
        
        {/* Zzz for sleepy mood */}
        {mood === "sleepy" && (
          <div className="absolute -top-4 -right-4 flex flex-col items-start">
            <span className="text-muted-foreground text-xs animate-zzz opacity-60">z</span>
            <span className="text-muted-foreground text-sm animate-zzz-delayed -mt-1 ml-1 opacity-80">z</span>
            <span className="text-muted-foreground text-base animate-zzz-delayed-2 -mt-1 ml-2">Z</span>
          </div>
        )}
      </div>
    </div>
  )
}
