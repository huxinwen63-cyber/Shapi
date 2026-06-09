"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ParentLoginProps {
  onBack: () => void
  onLogin: (email: string) => void
}

export function ParentLogin({ onBack, onLogin }: ParentLoginProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }
    
    setIsLoading(true)
    // Simulate login - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    onLogin(email)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold" suppressHydrationWarning>
          {t.parent.loginTitle}
        </h1>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-primary">S</span>
          </div>
          <p className="text-muted-foreground" suppressHydrationWarning>
            {t.parent.loginSubtitle}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" suppressHydrationWarning>
              {t.parent.email}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.parent.emailPlaceholder}
                className="w-full h-12 pl-12 pr-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" suppressHydrationWarning>
              {t.parent.password}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.parent.passwordPlaceholder}
                className="w-full h-12 pl-12 pr-12 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-sm text-primary hover:underline" suppressHydrationWarning>
              {t.parent.forgotPassword}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl text-base font-semibold"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <span suppressHydrationWarning>{t.parent.loginButton}</span>
            )}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground" suppressHydrationWarning>{t.parent.or}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Skip Button */}
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full h-12 rounded-xl text-base"
          >
            <span suppressHydrationWarning>{t.parent.continueAsGuest}</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
