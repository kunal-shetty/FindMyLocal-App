"use client"

import { MobileNavBar } from "@/components/mobile/nav-bar"
import { MobileSettingsContent } from "@/components/mobile/settings-content"

export default function MobileSettingsPage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      <MobileSettingsContent />
      <MobileNavBar />
    </div>
  )
}

