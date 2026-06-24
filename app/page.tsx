import { LanguageProvider } from "@/lib/language-context"
import { AppShell } from "@/components/shapi/app-shell"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <AppShell />
      </main>
    </LanguageProvider>
  )
}
