"use client"

import { WifiOff } from "lucide-react"

interface OfflineBannerProps {
  isOffline: boolean
}

export function OfflineBanner({ isOffline }: OfflineBannerProps) {
  if (!isOffline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm safe-area-pt">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span>You&apos;re offline. Some features may be limited.</span>
      </div>
    </div>
  )
}
