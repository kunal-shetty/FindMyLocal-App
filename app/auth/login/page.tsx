"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Try full user object first
    const userRaw = localStorage.getItem("user")
    const roleOnly = localStorage.getItem("userRole")

    let role: string | null = null

    if (userRaw) {
      try {
        role = JSON.parse(userRaw)?.role
      } catch {}
    } else if (roleOnly) {
      role = roleOnly
    }

    if (!role) return

    // Role-based routing
    if (role === "provider") {
      router.push("/provider/dashboard")
    } else {
      router.push("/discover") // normal users
    }
  }, [router])


  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const otp = generateOTP()

// store temporarily
localStorage.setItem("otp", otp)
localStorage.setItem("otpEmail", email)


    try {
      // Call API to send OTP
      const response = await fetch("https://find-my-local.vercel.app/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      if (response.ok) {
        // Store email in sessionStorage for verification page
        sessionStorage.setItem("otp-email", email)
        router.push("/auth/verify-otp")
      } else {
        console.error("Failed to send OTP")
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="w-7 h-7 text-primary" />
            <span>FindMyLocal</span>
          </Link>
          <p className="text-muted-foreground">Welcome back</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in to your account</CardTitle>
            <CardDescription>Enter your email to receive a one-time password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Sending OTP..."
                ) : (
                  <>
                    Continue with email
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              No password required. We'll send you a secure code.
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm">
          <Link href="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
