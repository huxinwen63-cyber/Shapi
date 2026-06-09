"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

const characterEmojis = ["🐱", "🐶", "🐟", "🦋"]
const characterBgColors = [
  "bg-secondary/20",
  "bg-primary/10",
  "bg-accent/15",
  "bg-secondary/25",
]

export function CharactersSection() {
  const { t } = useLanguage()
  const [activeCharacter, setActiveCharacter] = useState(0)
  const character = t.characters.items[activeCharacter]

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.characters.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.characters.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Character display */}
          <div className={cn(
            "flex-1 rounded-3xl p-12 flex flex-col items-center justify-center transition-colors duration-300",
            characterBgColors[activeCharacter]
          )}>
            <div className="text-9xl mb-6 animate-bounce-gentle">
              {characterEmojis[activeCharacter]}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {character.name}
            </h3>
            <p className="text-muted-foreground text-center max-w-xs">
              {character.description}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {character.unlocks.map((unlock, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-card rounded-full text-sm text-muted-foreground border border-border"
                >
                  {unlock}
                </span>
              ))}
            </div>
          </div>

          {/* Character selector */}
          <div className="flex lg:flex-col gap-4">
            {characterEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setActiveCharacter(index)}
                className={cn(
                  "w-20 h-20 rounded-2xl text-4xl flex items-center justify-center transition-all duration-200",
                  activeCharacter === index
                    ? "bg-card shadow-lg scale-110 border-2 border-primary"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
