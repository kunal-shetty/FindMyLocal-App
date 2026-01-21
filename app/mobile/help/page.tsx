"use client"

import { MobileNavBar } from "@/components/mobile/nav-bar"
import { MobileHelpContent } from "@/components/mobile/help-content"

export default function MobileHelpPage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      <MobileHelpContent />
      <MobileNavBar />
    </div>
  )
}

