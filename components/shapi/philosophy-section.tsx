"use client"

import { Check, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function PhilosophySection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.philosophy.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.philosophy.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* What we don't have */}
          <div className="bg-muted/50 rounded-3xl p-8 md:p-10">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </span>
              {t.philosophy.weDoNotHave}
            </h3>
            <ul className="space-y-4">
              {t.philosophy.notItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What we have */}
          <div className="bg-primary/5 rounded-3xl p-8 md:p-10 border border-primary/10">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </span>
              {t.philosophy.weProvide}
            </h3>
            <ul className="space-y-4">
              {t.philosophy.haveItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
