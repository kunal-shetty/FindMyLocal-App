"use client"

import { MobileNavBar } from "@/components/mobile/nav-bar"
import { MobileFavoritesContent } from "@/components/mobile/favorites-content"

export default function MobileFavoritesPage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      <MobileFavoritesContent />
      <MobileNavBar />
    </div>
  )
}

