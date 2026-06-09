"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, Mail, Clock, TrendingUp, Star, Bell, CheckCircle, Send, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ParentDashboardProps {
  onBack: () => void
  onLogout: () => void
  email: string
}

export function ParentDashboard({ onBack, onLogout, email }: ParentDashboardProps) {
  const { t } = useLanguage()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSendConfirm, setShowSendConfirm] = useState(false)

  // Mock data for the report preview
  const mockData = {
    totalMinutes: 245,
    activitiesCompleted: 38,
    currentStreak: 7,
    skills: [
      { name: t.parent.subitizing, progress: 85 },
      { name: t.parent.partWhole, progress: 45 },
      { name: t.parent.spatial, progress: 62 },
    ],
  }

  const handleSendTestReport = () => {
    setShowSendConfirm(true)
    setTimeout(() => setShowSendConfirm(false), 3000)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold" suppressHydrationWarning>
            {t.parent.dashboard}
          </h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onLogout} className="rounded-full text-muted-foreground">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* User Info Card */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{email}</p>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                {t.parent.childName}: Emma
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Report Subscription */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground" suppressHydrationWarning>
                {t.parent.monthlyReport}
              </h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                {t.parent.reportDescription}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsSubscribed(!isSubscribed)}
            variant={isSubscribed ? "secondary" : "default"}
            className="w-full rounded-xl"
          >
            {isSubscribed ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span suppressHydrationWarning>{t.parent.subscribed}</span>
              </span>
            ) : (
              <span suppressHydrationWarning>{t.parent.subscribe}</span>
            )}
          </Button>
        </div>

        {/* Report Preview */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="font-semibold text-foreground mb-4" suppressHydrationWarning>
            {t.parent.reportPreview}
          </h3>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-muted rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{mockData.totalMinutes}</p>
              <p className="text-xs text-muted-foreground" suppressHydrationWarning>{t.parent.minutes}</p>
            </div>
            <div className="bg-muted rounded-xl p-3 text-center">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{mockData.activitiesCompleted}</p>
              <p className="text-xs text-muted-foreground" suppressHydrationWarning>{t.progress.activitiesCompleted}</p>
            </div>
            <div className="bg-muted rounded-xl p-3 text-center">
              <Star className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{mockData.currentStreak}</p>
              <p className="text-xs text-muted-foreground" suppressHydrationWarning>{t.progress.streakDays}</p>
            </div>
          </div>

          {/* Skill Progress */}
          <div className="space-y-3 mb-4">
            <h4 className="text-sm font-medium text-foreground" suppressHydrationWarning>
              {t.parent.skillProgress}
            </h4>
            {mockData.skills.map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground" suppressHydrationWarning>{skill.name}</span>
                  <span className="font-medium text-foreground">{skill.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3">
            <h4 className="text-sm font-medium text-primary mb-1" suppressHydrationWarning>
              {t.parent.recommendation}
            </h4>
            <p className="text-sm text-muted-foreground" suppressHydrationWarning>
              {t.parent.recommendationText}
            </p>
          </div>
        </div>

        {/* Send Test Report Button */}
        <Button
          onClick={handleSendTestReport}
          variant="outline"
          className="w-full rounded-xl"
          disabled={showSendConfirm}
        >
          {showSendConfirm ? (
            <span className="flex items-center gap-2 text-primary">
              <CheckCircle className="w-4 h-4" />
              Sent to {email}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span suppressHydrationWarning>{t.parent.sendTestReport}</span>
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
