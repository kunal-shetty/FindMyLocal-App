"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function CheckoutPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  /* ---------------- AMOUNT ---------------- */
  const baseAmount = useMemo(() => {
    const raw = searchParams.get("amt")
    if (!raw) return null
    const parsed = Number(raw)
    if (!Number.isFinite(parsed) || parsed <= 0) return null
    return Math.round(parsed)
  }, [searchParams])

  if (!baseAmount) {
    router.replace("/")
    return null
  }

  const taxRate = 0.08
  const tax = Math.round(baseAmount * taxRate)
  
  const platformFeeRate = 0.10
  const platformFee = Math.round(baseAmount * platformFeeRate)

  const total = baseAmount + tax + platformFee
  const totalInPaise = total * 100

  /* ---------------- FORM ---------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [address, setAddress] = useState("")
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [loading, setLoading] = useState(false)

  /* ---------------- BOOKING INFO ---------------- */
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("booking")
    if (stored) {
      setBooking(JSON.parse(stored))
    }
  }, [])

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" }
    let valid = true

    if (!form.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  /* ---------------- PAYMENT ---------------- */
  const startPayment = async () => {
  if (!validateForm() || !address.trim()) return
  setLoading(true)

  const orderRes = await fetch(
    "https://find-my-local.vercel.app/api/order",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalInPaise }),
    }
  )

  const order = await orderRes.json()

  if (!order?.id) {
    setLoading(false)
    alert("Failed to create payment order")
    return
  }

  const keyRes = await fetch(
    "https://find-my-local.vercel.app/api/razorpay-key"
  )
  const { key } = await keyRes.json()

  setLoading(false)

  if (!key) {
    alert("Unable to load payment gateway")
    return
  }
  const options = {
    key, // dynamically fetched
    amount: order.amount,
    currency: "INR",
    name: "FindMyLocal",
    description: "Service Payment (incl. tax)",
    order_id: order.id,

    prefill: {
      name: form.name,
      email: form.email,
      contact: form.phone,
    },

    handler: () => {
      router.push(`/payment-success?amt=${total}&view=2`)
    },
  }

  const razorpay = new (window as any).Razorpay(options)
  razorpay.open()
}


  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="w-full max-w-4xl bg-card text-card-foreground rounded-2xl shadow-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 text-center border-b border-border">
          <h1 className="text-3xl font-bold">Secure Checkout</h1>
          <p className="text-muted-foreground mt-1">
            Complete your payment securely
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* FORM */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Your Details</h2>

            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <input
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field === "email"
                      ? "Email Address"
                      : "Phone Number"
                  }
                  value={form[field]}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border text-sm outline-none transition",
                    "bg-background text-foreground placeholder:text-muted-foreground",
                    errors[field]
                      ? "border-red-500"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                  )}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}

            {/* Address */}
            <textarea
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={cn(
                "w-full min-h-[90px] px-4 py-3 rounded-lg border text-sm outline-none transition",
                "bg-background text-foreground placeholder:text-muted-foreground",
                "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              )}
            />
          </div>

          {/* SUMMARY */}
          <div className="space-y-4">
            {booking && (
              <div className="rounded-xl border border-border bg-muted/50 p-4 space-y-2 text-sm">
                <h3 className="font-semibold">Booking Details</h3>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span>{booking.serviceName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>
                    {new Date(booking.date).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>{booking.time}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider</span>
                  <span>{booking.provider}</span>
                </div>
              </div>
            )}

            <div className="rounded-xl bg-muted/40 p-6 border border-border space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Amount</span>
                  <span>₹{baseAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={startPayment}
                disabled={loading || !address.trim()}
                className="w-full py-3 rounded-lg font-semibold text-white
                  bg-primary hover:bg-primary/90
                  disabled:opacity-60 transition"
              >
                {loading ? "Processing…" : `Pay ₹${total}`}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Secured by Razorpay • SSL Encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
