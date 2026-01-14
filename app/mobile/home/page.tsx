"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { MobileNavBar } from "@/components/mobile/nav-bar"
import { MobileHomeContent } from "@/components/mobile/home-content"

export default function MobileHomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/mobile/auth/login")
      } else {
        setIsChecking(false)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      <MobileHomeContent />
      <MobileNavBar />
    </div>
  )
}
