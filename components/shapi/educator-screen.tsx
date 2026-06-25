"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, BookOpen, Sparkles, Layers, ListChecks, Rocket, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EducatorScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
}

const worldIds = ["perception", "representation", "operation"] as const

export function EducatorScreen({ onBack, onNavigate }: EducatorScreenProps) {
  const { t } = useLanguage()
  const e = t.educator

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold" suppressHydrationWarning>
            {e.title}
          </h1>
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            {e.subtitle}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Intro */}
        <section className="bg-primary/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-semibold" suppressHydrationWarning>{e.introTitle}</h2>
          </div>
          <p className="text-sm text-foreground leading-relaxed text-pretty" suppressHydrationWarning>
            {e.introText}
          </p>
        </section>

        {/* Pedagogy */}
        <section className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 text-accent-foreground">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-semibold text-foreground" suppressHydrationWarning>{e.pedagogyTitle}</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty" suppressHydrationWarning>
            {e.pedagogyText}
          </p>
        </section>

        {/* Units */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground" suppressHydrationWarning>{e.unitsTitle}</h2>
          </div>
          <div className="space-y-3">
            {worldIds.map((id, i) => {
              const w = t.worlds[id]
              return (
                <div key={id} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-foreground" suppressHydrationWarning>{w.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-pretty mb-2" suppressHydrationWarning>
                    {w.objective}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {w.skills.map((s) => (
                      <span key={s} className="text-xs bg-muted rounded-full px-2.5 py-0.5 text-foreground" suppressHydrationWarning>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground" suppressHydrationWarning>{e.featuresTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {e.features.map((f, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-3 flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground" suppressHydrationWarning>{f.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed text-pretty" suppressHydrationWarning>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Classroom use */}
        <section className="bg-secondary/30 rounded-2xl p-5">
          <h2 className="font-semibold text-foreground mb-3" suppressHydrationWarning>{e.classroomTitle}</h2>
          <ol className="space-y-2">
            {e.classroomSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground">
                <span className="w-5 h-5 rounded-full bg-background text-foreground font-semibold flex items-center justify-center text-xs shrink-0">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-pretty" suppressHydrationWarning>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Roadmap */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground" suppressHydrationWarning>{e.roadmapTitle}</h2>
          </div>
          <div className="space-y-2">
            {e.roadmap.map((item, i) => (
              <div key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="leading-relaxed text-pretty" suppressHydrationWarning>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-1.5 text-primary">
            <Mail className="w-5 h-5" />
            <h2 className="font-semibold" suppressHydrationWarning>{e.contactTitle}</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed text-pretty mb-4" suppressHydrationWarning>
            {e.contactText}
          </p>
          {onNavigate && (
            <Button onClick={() => onNavigate("beta")} className="w-full rounded-full h-11">
              <span suppressHydrationWarning>{t.app.betaCta}</span>
            </Button>
          )}
        </section>
      </div>
    </div>
  )
}
