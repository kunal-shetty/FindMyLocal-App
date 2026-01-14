"use client"

import { MobileNavBar } from "@/components/mobile/nav-bar"
import { MobileBookingsContent } from "@/components/mobile/bookings-content"

export default function MobileBookingsPage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      <MobileBookingsContent />
      <MobileNavBar />
    </div>
  )
}
