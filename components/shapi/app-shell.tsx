"use client"

import { useState } from "react"
import { WelcomeScreen } from "./welcome-screen"
import { AppHome } from "./app-home"
import { PetScreen } from "./pet-screen"
import { ExploreScreen } from "./explore-screen"
import { CurriculumMap } from "./curriculum-map"
import { WorldScreen } from "./world-screen"
import { SubitizingGame } from "./subitizing-game"
import { ComparisonGame } from "./comparison-game"
import { MatchingGame } from "./matching-game"
import { NumberLineGame } from "./number-line-game"
import { ProgressScreen } from "./progress-screen"
import { ScreeningTest } from "./screening-test"
import { SettingsScreen } from "./settings-screen"
import { ParentLogin } from "./parent-login"
import { ParentDashboard } from "./parent-dashboard"

type Screen =
  | "welcome"
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

export function AppShell() {
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
    <div className="w-full max-w-md mx-auto h-[100dvh] bg-background overflow-hidden shadow-2xl">
      {currentScreen === "welcome" && (
        <WelcomeScreen onStart={() => setCurrentScreen("home")} />
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
      {(currentScreen === "partWhole" || currentScreen === "placeValue" || currentScreen === "addSub") && (
        <div className="flex flex-col h-full items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🚧</span>
          </div>
          <p className="text-lg font-semibold text-foreground mb-2">Coming Soon</p>
          <p className="text-muted-foreground mb-6">This activity is under development</p>
          <button
            onClick={handleActivityBack}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium"
          >
            Back
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
    </div>
  )
}
