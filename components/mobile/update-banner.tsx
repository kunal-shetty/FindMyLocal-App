"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface UpdateBannerProps {
  hasUpdate: boolean
  onUpdate: () => void
}

export function UpdateBanner({ hasUpdate, onUpdate }: UpdateBannerProps) {
  if (!hasUpdate) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground px-4 py-2 safe-area-pt">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <span className="text-sm">A new version is available</span>
        <Button size="sm" variant="secondary" onClick={onUpdate} className="h-7 text-xs">
          <RefreshCw className="w-3 h-3 mr-1" />
          Update
        </Button>
      </div>
    </div>
  )
}
