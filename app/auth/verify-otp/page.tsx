"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuth, type UserRole } from "@/context/auth-context"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [showRoleSelector, setShowRoleSelector] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>("user")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("otp-email")
    if (!storedEmail) {
      router.push("/auth/login")
      return
    }
    setEmail(storedEmail)
  }, [router])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("https://find-my-local.vercel.app/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,
    enteredOtp: otpCode,
    generatedOtp: localStorage.getItem("otp"), }),
      })

      const data = await response.json()

      if (response.ok) {
        // Check if this is a new user (needs role selection)
        if (data.isNewUser) {
          setShowRoleSelector(true)
        } else {
          // Existing user, log them in
          login(email, data.role)
          sessionStorage.removeItem("otp-email")
          localStorage.removeItem("otp")
    localStorage.removeItem("otpEmail")

          router.push(data.role === "provider" ? "/provider/dashboard" : "/discover")
        }
      } else {
        setError(data.error || "Invalid OTP. Please try again.")
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleSelection = () => {
    login(email, selectedRole)
    sessionStorage.removeItem("otp-email")
    router.push(selectedRole === "provider" ? "/provider/dashboard" : "/discover")
  }

  if (showRoleSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Choose your account type</CardTitle>
            <CardDescription>How would you like to use FindMyLocal?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedRole || "user"} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user" className="flex-1 cursor-pointer space-y-1">
                  <div className="font-semibold">I'm looking for services</div>
                  <div className="text-sm text-muted-foreground">Find and compare local service providers</div>
                </Label>
              </div>
              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="provider" id="provider" />
                <Label htmlFor="provider" className="flex-1 cursor-pointer space-y-1">
                  <div className="font-semibold">I'm a service provider</div>
                  <div className="text-sm text-muted-foreground">Manage your profile and connect with customers</div>
                </Label>
              </div>
            </RadioGroup>

            <Button onClick={handleRoleSelection} className="w-full">
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Verify your email</CardTitle>
            <CardDescription>
              We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter verification code</label>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border border-input rounded-lg bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      disabled={isLoading}
                    />
                  ))}
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify and continue"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <button type="button" className="text-sm text-primary hover:underline">
                Didn't receive the code? Resend
              </button>

              <div>
                <Link
                  href="/auth/login"
                  className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back to login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
