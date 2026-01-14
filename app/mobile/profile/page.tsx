"use client"

import { MobileNavBar } from "@/components/mobile/nav-bar"
import { MobileProfileContent } from "@/components/mobile/profile-content"

export default function MobileProfilePage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      <MobileProfileContent />
      <MobileNavBar />
    </div>
  )
}
