"use client"

import { useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { t, toggleLocale } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLocale}
      className="fixed top-4 right-4 z-50 rounded-full gap-2 bg-card/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all"
    >
      <Globe className="w-4 h-4" />
      <span>{t.langToggle}</span>
    </Button>
  )
}
