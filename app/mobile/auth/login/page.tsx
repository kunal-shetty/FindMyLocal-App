"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Sparkles, Mail, AlertCircle, User } from "lucide-react"

const API_BASE = "https://find-my-local.vercel.app"

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default function MobileLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
useEffect(() => {
  const user = localStorage.getItem("user")

  if (user) {
    router.replace("/mobile") // or "/mobile/home" if that's your home
  }
}, [router])


  useEffect(() => {
    // Animate in
    if (containerRef.current) {
      containerRef.current.style.opacity = "1"
      containerRef.current.style.transform = "translateY(0)"
    }
  }, [])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const otp = generateOTP()

    // store temporarily
    localStorage.setItem("otp", otp)
    localStorage.setItem("otpEmail", email)
    localStorage.setItem("name", name);

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
        router.push("/mobile/auth/verify")
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
    <div
      ref={containerRef}
      className="min-h-screen bg-background px-4 transition-all duration-500 opacity-0 translate-y-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <header className="py-4">
       
      </header>

      <div className="max-w-sm mx-auto pt-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
            }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to continue to FindMyLocal</p>
        </div>

        {/* Form */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="px-6 ">
            <form onSubmit={handleSendOTP} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-11 h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-base font-medium"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
                }}
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending OTP...
                  </span>
                ) : (
                  "Continue with Email"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
