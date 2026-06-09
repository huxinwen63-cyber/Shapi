"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const numberShapes = [
  { value: 1, blocks: [[true]] },
  { value: 2, blocks: [[true, true]] },
  { value: 3, blocks: [[true, true, true]] },
  { value: 4, blocks: [[true, true], [true, true]] },
  { value: 5, blocks: [[true, true, true], [false, true, true]] },
]

export function ShapeBlocks() {
  const [activeNumber, setActiveNumber] = useState(3)

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Shape display */}
      <div className="bg-card rounded-3xl p-8 shadow-lg border border-border min-h-[140px] flex items-center justify-center">
        <div className="flex flex-col gap-2">
          {numberShapes[activeNumber - 1].blocks.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {row.map((filled, colIndex) => (
                <div
                  key={colIndex}
                  className={cn(
                    "w-12 h-12 md:w-16 md:h-16 rounded-xl transition-all duration-300",
                    filled
                      ? "bg-primary shadow-md transform hover:scale-105"
                      : "bg-transparent"
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Number selector */}
      <div className="flex gap-3">
        {numberShapes.map((shape) => (
          <button
            key={shape.value}
            onClick={() => setActiveNumber(shape.value)}
            className={cn(
              "w-14 h-14 md:w-16 md:h-16 rounded-2xl text-2xl font-bold transition-all duration-200",
              activeNumber === shape.value
                ? "bg-primary text-primary-foreground shadow-lg scale-110"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {shape.value}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        点击数字，看看它的"形状"是什么样子
      </p>
    </div>
  )
}
