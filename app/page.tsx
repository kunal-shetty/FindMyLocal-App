"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { LandingHero } from "@/components/landing/hero"
import { LandingFeatures } from "@/components/landing/features"
import { LandingCTA } from "@/components/landing/cta"
import { LandingNav } from "@/components/landing/nav"
import { LandingFooter } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background overflow-hidden">
        <LandingNav />
        <LandingHero />
        <LandingFeatures />
        <LandingCTA />
        <LandingFooter />
      </div>
    </ThemeProvider>
  )
}
