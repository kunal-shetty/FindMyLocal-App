"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeProvider } from "@/components/theme-provider"
import { CheckCircle, Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const amount = searchParams.get("amt")
  const view = searchParams.get("view") || 1

  const handleViewBookings = () => {
    if (view === "1") {
      router.push("/mobile/bookings")
      return
    }

    if (view === "2") {
      router.push("/bookings")
      return
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    router.push(isMobile ? "/mobile/bookings" : "/bookings")
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16 max-w-2xl">
          <Card className="border-border/50">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Payment Successful!
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                Your booking has been confirmed. We've sent a confirmation email
                with all the details.
              </p>

              {amount && (
                <div className="bg-muted/50 rounded-lg p-4 mb-8">
                  <p className="text-sm text-muted-foreground mb-1">
                    Amount Paid
                  </p>
                  <p className="text-2xl font-bold">
                    ₹{parseInt(amount).toLocaleString()}
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Booking details sent to your email</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Provider will contact you soon</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {view == 1 && <Button size="lg" onClick={handleViewBookings}>
                  View My Bookings
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>}

                <Button variant="outline" asChild size="lg">
                  <Link href="/discover">
                    Book Another Service
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  )
}
