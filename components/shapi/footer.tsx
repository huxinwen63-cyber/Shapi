"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-16 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        {/* CTA */}
        <div className="text-center mb-16 bg-card rounded-3xl p-10 md:p-14 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t.footer.ctaTitle}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {t.footer.ctaSubtitle}
          </p>
          <Button size="lg" className="text-lg px-10 py-6 rounded-2xl shadow-lg">
            {t.footer.ctaButton}
          </Button>
        </div>

        {/* Footer info */}
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-4">
            <span className="text-primary">Sha</span>
            <span className="text-accent">pi</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {t.footer.slogan}
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground flex-wrap">
            <a href="#" className="hover:text-foreground transition-colors">{t.footer.about}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.footer.contact}</a>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            &copy; 2026 Shapi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
