"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MobileSplashScreen } from "@/components/mobile/splash-screen"
import { OnboardingFlow } from "@/components/mobile/onboarding/onboarding-flow"

export default function MobileEntry() {
  const router = useRouter()

  const [showSplash, setShowSplash] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)

      if (typeof window !== "undefined") {
        const onboardingDone = localStorage.getItem("onboardingCompleted")

        if (!onboardingDone) {
          setShowOnboarding(true)
        } else {
          router.push("/mobile/home")
        }
      }
    }, 3500)

    return () => clearTimeout(timer)
  }, [router])

  //  Splash screen
  if (showSplash) {
    return <MobileSplashScreen />
  }

  //  Onboarding flow (first-time users)
  if (showOnboarding) {
    return (
      <OnboardingFlow
        onComplete={() => {
          localStorage.setItem("onboardingCompleted", "true")
          router.replace("mobile/auth/login")
        }}
      />
    )
  }

  //  Fallback loader (very brief)
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
