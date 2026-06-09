"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Eye, Puzzle, Brain, Heart, Shapes } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const featureIcons = [Eye, Puzzle, Brain, Heart, Shapes]
const featureColors = [
  "bg-primary/10 text-primary",
  "bg-secondary/30 text-secondary-foreground",
  "bg-accent/20 text-accent-foreground",
  "bg-primary/10 text-primary",
  "bg-secondary/30 text-secondary-foreground",
]

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, index) => {
            const Icon = featureIcons[index]
            return (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card rounded-3xl overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${featureColors[index]} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
