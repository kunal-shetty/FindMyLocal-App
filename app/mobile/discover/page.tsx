"use client"

import { MobileNavBar } from "@/components/mobile/nav-bar"
import { MobileDiscoverContent } from "@/components/mobile/discover-content"

export default function MobileDiscoverPage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      <MobileDiscoverContent />
      <MobileNavBar />
    </div>
  )
}
