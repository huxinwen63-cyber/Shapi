"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Mail, User, Baby, Check, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BetaSignupProps {
  onBack: () => void
}

export function BetaSignup({ onBack }: BetaSignupProps) {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [childAge, setChildAge] = useState("")
  const [role, setRole] = useState(0)
  const [device, setDevice] = useState(0)
  const [referral, setReferral] = useState("")
  const [consent, setConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name.trim()) {
      setError(t.beta.errorName)
      return
    }
    if (!email || !email.includes("@")) {
      setError(t.beta.errorEmail)
      return
    }
    if (!consent) {
      setError(t.beta.errorConsent)
      return
    }
    setIsLoading(true)
    // Demo: in production this would POST to a database or form endpoint.
    console.log("[v0] Beta signup:", { name, email, childAge, role: t.beta.roles[role], device: t.beta.devices[device], referral })
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold" suppressHydrationWarning>
            {t.beta.title}
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-5">
            <PartyPopper className="w-9 h-9 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3" suppressHydrationWarning>
            {t.beta.successTitle}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm" suppressHydrationWarning>
            {t.beta.successText}
          </p>
          <Button onClick={onBack} className="rounded-full px-8 h-12">
            <span suppressHydrationWarning>{t.beta.done}</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold" suppressHydrationWarning>
          {t.beta.title}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Intro */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2" suppressHydrationWarning>
            {t.beta.subtitle}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed" suppressHydrationWarning>
            {t.beta.intro}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1" suppressHydrationWarning>
              {t.beta.parentName} <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.beta.parentNamePlaceholder}
                className="w-full h-12 pl-12 pr-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1" suppressHydrationWarning>
              {t.beta.email} <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.beta.emailPlaceholder}
                className="w-full h-12 pl-12 pr-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Child age */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" suppressHydrationWarning>
              {t.beta.childAge}
            </label>
            <div className="relative">
              <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder={t.beta.childAgePlaceholder}
                className="w-full h-12 pl-12 pr-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" suppressHydrationWarning>
              {t.beta.role}
            </label>
            <div className="flex flex-wrap gap-2">
              {t.beta.roles.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRole(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    role === i
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-foreground border-border hover:bg-muted/70"
                  }`}
                  suppressHydrationWarning
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Device */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" suppressHydrationWarning>
              {t.beta.device}
            </label>
            <div className="flex flex-wrap gap-2">
              {t.beta.devices.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setDevice(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    device === i
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-foreground border-border hover:bg-muted/70"
                  }`}
                  suppressHydrationWarning
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Referral */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" suppressHydrationWarning>
              {t.beta.referral}
            </label>
            <input
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder={t.beta.referralPlaceholder}
              className="w-full h-12 px-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Consent */}
          <button
            type="button"
            onClick={() => setConsent(!consent)}
            className="flex items-start gap-3 text-left w-full"
          >
            <span
              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                consent ? "bg-primary border-primary" : "bg-muted border-border"
              }`}
            >
              {consent && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
            </span>
            <span className="text-sm text-muted-foreground leading-relaxed" suppressHydrationWarning>
              {t.beta.consent}
            </span>
          </button>

          {/* Error */}
          {error && <p className="text-sm text-destructive">{error}</p>}

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl text-base font-semibold">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <span suppressHydrationWarning>{t.beta.submit}</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
