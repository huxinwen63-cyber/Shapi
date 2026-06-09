"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Mail, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const parentIcons = [BarChart3, Mail, Shield]
const parentColors = [
  "bg-primary/10 text-primary",
  "bg-secondary/30 text-secondary-foreground",
  "bg-accent/20 text-accent",
]

export function ParentSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.parent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.parent.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.parent.items.map((item, index) => {
            const Icon = parentIcons[index]
            return (
              <Card key={index} className="border-0 shadow-lg bg-card rounded-3xl">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${parentColors[index]} flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
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
