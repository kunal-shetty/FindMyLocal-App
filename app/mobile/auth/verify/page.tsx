"use client"

import type React from "react"
import { useState, useRef, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react"

const API_BASE = "https://find-my-local.vercel.app"

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("otpEmail")
      if (storedEmail) {
        setEmail(storedEmail)
      }
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError("")

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (pastedData) {
      const newOtp = [...otp]
      pastedData.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char
      })
      setOtp(newOtp)
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    }
  }

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(
        "https://find-my-local.vercel.app/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("otpEmail"),
            enteredOtp: otpCode,
            generatedOtp: localStorage.getItem("otp"),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP. Please try again.")
      }

      //  OTP verified
      setSuccess(true)

      setTimeout(() => {
        // Existing user → login
        login(email, data.role)

        // Cleanup
        sessionStorage.removeItem("otp-email")
        sessionStorage.removeItem("pendingEmail")
        localStorage.removeItem("otp")

        router.push(
          data.role === "provider"
            ? "/provider/dashboard"
            : "/mobile/home"
        )

      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed")
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }


  const handleResend = async () => {
    if (resendCooldown > 0) return

    try {
      await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "user" }),
      })
      setResendCooldown(59)
      setError("")
    } catch {
      setError("Failed to resend OTP")
    }
  }

  const isComplete = otp.every((digit) => digit !== "")

  return (
    <div className="min-h-screen bg-background px-4" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="py-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </header>

      <div className="max-w-sm mx-auto pt-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-all duration-300 ${success ? "bg-green-500 shadow-green-500/20" : "shadow-primary/20"
              }`}
            style={
              !success
                ? {
                  background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
                }
                : undefined
            }
          >
            {success ? (
              <CheckCircle2 className="w-10 h-10 text-white" />
            ) : (
              <Sparkles className="w-10 h-10 text-white" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground">{success ? "Verified!" : "Verify Email"}</h1>
          <p className="text-muted-foreground text-sm mt-2 text-center">
            {success ? (
              "Redirecting you to home..."
            ) : (
              <>
                Enter the 6-digit code sent to
                <br />
                <span className="text-foreground font-medium">{email}</span>
              </>
            )}
          </p>
        </div>

        {!success && (
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="p-6">
              {/* OTP Input */}
              <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
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
                    className={`w-12 h-14 text-center text-xl font-bold rounded-xl bg-muted border-2 transition-all outline-none ${error
                        ? "border-destructive focus:border-destructive"
                        : "border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      }`}
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm mb-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                className="w-full h-12 rounded-xl text-base font-medium"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
                }}
                onClick={handleVerify}
                disabled={!isComplete || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Verify & Continue"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Didn&apos;t receive code?{" "}
                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className={`font-medium ${resendCooldown > 0 ? "text-muted-foreground" : "text-primary hover:underline"
                    }`}
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
                </button>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function MobileVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  )
}
