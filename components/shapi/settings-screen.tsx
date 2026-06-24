"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Globe, Volume2, Music, Bell, Shield, ChevronRight, HelpCircle, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SettingsScreenProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
}

export function SettingsScreen({ onBack, onNavigate }: SettingsScreenProps) {
  const { t, locale, toggleLocale } = useLanguage()

  const settingsItems = [
    {
      icon: Globe,
      label: t.settings.language,
      value: locale === "zh" ? "中文" : "English",
      action: toggleLocale,
    },
    { icon: Volume2, label: t.settings.sound, toggle: true, enabled: true },
    { icon: Music, label: t.settings.music, toggle: true, enabled: true },
    { icon: Bell, label: t.settings.notifications, toggle: true, enabled: false },
    { icon: HelpCircle, label: t.settings.howItWorks, arrow: true, action: () => onNavigate?.("walkthrough") },
    { icon: Shield, label: t.settings.parentMode, arrow: true, action: () => onNavigate?.("parentLogin") },
    { icon: GraduationCap, label: t.settings.forEducators, arrow: true, action: () => onNavigate?.("educator") },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold" suppressHydrationWarning>
          {t.settings.title}
        </h1>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
            >
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-left font-medium" suppressHydrationWarning>
                {item.label}
              </span>
              {item.value && (
                <span className="text-muted-foreground" suppressHydrationWarning>
                  {item.value}
                </span>
              )}
              {item.toggle && (
                <div
                  className={`w-12 h-7 rounded-full transition-colors ${
                    item.enabled ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-background rounded-full shadow-md transition-transform mt-1 ${
                      item.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
              )}
              {item.arrow && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="mt-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl font-bold text-primary">N</span>
          </div>
          <p className="font-semibold text-foreground">Numi</p>
          <p className="text-sm text-muted-foreground">v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
