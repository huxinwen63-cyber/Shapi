import { LanguageProvider } from "@/lib/language-context"
import { AppShell } from "@/components/shapi/app-shell"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <AppShell />
      </main>
    </LanguageProvider>
  )
}
