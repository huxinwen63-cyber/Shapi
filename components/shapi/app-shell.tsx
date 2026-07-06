"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { GhibliFrame } from "./ghibli-frame"
import { WelcomeScreen } from "./welcome-screen"
import { WalkthroughScreen } from "./walkthrough-screen"
import { AppHome } from "./app-home"
import { PetScreen } from "./pet-screen"
import { ExploreScreen } from "./explore-screen"
import { CurriculumMap } from "./curriculum-map"
import { WorldScreen } from "./world-screen"
import { SubitizingGame } from "./subitizing-game"
import { ComparisonGame } from "./comparison-game"
import { MatchingGame } from "./matching-game"
import { NumberLineGame } from "./number-line-game"
import { PartWholeGame } from "./part-whole-game"
import { PlaceValueGame } from "./place-value-game"
import { ProgressScreen } from "./progress-screen"
import { ScreeningTest } from "./screening-test"
import { SettingsScreen } from "./settings-screen"
import { ParentLogin } from "./parent-login"
import { ParentDashboard } from "./parent-dashboard"
import { EducatorScreen } from "./educator-screen"
import { BetaSignup } from "./beta-signup"

type Screen =
  | "welcome"
  | "walkthrough"
  | "home"
  | "pet"
  | "explore"
  | "curriculum"
  | "world-perception"
  | "world-representation"
  | "world-operation"
  | "subitizing"
  | "comparison"
  | "matching"
  | "numberLine"
  | "partWhole"
  | "placeValue"
  | "addSub"
  | "progress"
  | "screening"
  | "settings"
  | "parentLogin"
  | "parentDashboard"
  | "educator"
  | "beta"

export function AppShell() {
  const { t } = useLanguage()
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [parentEmail, setParentEmail] = useState<string | null>(null)

  // Map each activity back to the world it lives in
  const activityWorld: Record<string, Screen> = {
    subitizing: "world-perception",
    comparison: "world-perception",
    matching: "world-perception",
    numberLine: "world-representation",
    placeValue: "world-representation",
    partWhole: "world-operation",
    addSub: "world-operation",
  }

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen)
  }

  const handleBack = () => {
    setCurrentScreen("home")
  }

  // Worlds return to the explore page
  const handleWorldBack = () => {
    setCurrentScreen("explore")
  }

  // Activities return to their world; worlds return home
  const handleActivityBack = () => {
    const world = activityWorld[currentScreen]
    setCurrentScreen(world ?? "home")
  }

  return (
    <GhibliFrame>
      {currentScreen === "welcome" && (
        <WelcomeScreen onStart={() => setCurrentScreen("walkthrough")} />
      )}
      {currentScreen === "walkthrough" && (
        <WalkthroughScreen onDone={() => setCurrentScreen("home")} />
      )}
      {currentScreen === "home" && (
        <AppHome onNavigate={handleNavigate} />
      )}
      {currentScreen === "pet" && (
        <PetScreen onBack={handleBack} />
      )}
      {currentScreen === "explore" && (
        <ExploreScreen onBack={handleBack} onNavigate={handleNavigate} />
      )}
      {currentScreen === "curriculum" && (
        <CurriculumMap onBack={() => setCurrentScreen("explore")} />
      )}
      {currentScreen === "world-perception" && (
        <WorldScreen worldId="perception" onBack={handleWorldBack} onNavigate={handleNavigate} />
      )}
      {currentScreen === "world-representation" && (
        <WorldScreen worldId="representation" onBack={handleWorldBack} onNavigate={handleNavigate} />
      )}
      {currentScreen === "world-operation" && (
        <WorldScreen worldId="operation" onBack={handleWorldBack} onNavigate={handleNavigate} />
      )}
      {currentScreen === "subitizing" && (
        <SubitizingGame onBack={handleActivityBack} />
      )}
      {currentScreen === "comparison" && (
        <ComparisonGame onBack={handleActivityBack} />
      )}
      {currentScreen === "matching" && (
        <MatchingGame onBack={handleActivityBack} />
      )}
      {currentScreen === "numberLine" && (
        <NumberLineGame onBack={handleActivityBack} />
      )}
      {currentScreen === "placeValue" && (
        <PlaceValueGame onBack={handleActivityBack} />
      )}
      {currentScreen === "partWhole" && (
        <PartWholeGame onBack={handleActivityBack} />
      )}
      {currentScreen === "addSub" && (
        <div className="flex flex-col h-full items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🚧</span>
          </div>
          <p className="text-lg font-semibold text-foreground mb-2" suppressHydrationWarning>
            {t.app.comingSoon}
          </p>
          <p className="text-muted-foreground mb-6" suppressHydrationWarning>
            {t.app.comingSoonDesc}
          </p>
          <button
            onClick={handleActivityBack}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium"
          >
            {t.game.back}
          </button>
        </div>
      )}
      {currentScreen === "progress" && (
        <ProgressScreen onBack={handleBack} />
      )}
      {currentScreen === "screening" && (
        <ScreeningTest onBack={handleBack} />
      )}
      {currentScreen === "settings" && (
        <SettingsScreen onBack={handleBack} onNavigate={(screen) => {
          if (screen === "parentLogin") {
            if (parentEmail) {
              setCurrentScreen("parentDashboard")
            } else {
              setCurrentScreen("parentLogin")
            }
          } else {
            setCurrentScreen(screen as Screen)
          }
        }} />
      )}
      {currentScreen === "parentLogin" && (
        <ParentLogin 
          onBack={handleBack} 
          onLogin={(email) => {
            setParentEmail(email)
            setCurrentScreen("parentDashboard")
          }} 
        />
      )}
      {currentScreen === "parentDashboard" && (
        <ParentDashboard 
          onBack={handleBack} 
          onLogout={() => {
            setParentEmail(null)
            setCurrentScreen("settings")
          }}
          email={parentEmail || ""} 
        />
      )}
      {currentScreen === "educator" && (
        <EducatorScreen onBack={() => setCurrentScreen("settings")} onNavigate={handleNavigate} />
      )}
      {currentScreen === "beta" && (
        <BetaSignup onBack={() => setCurrentScreen("home")} />
      )}
    </GhibliFrame>
  )
}
