"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useServices } from "@/context/service-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ArrowLeft, Star, MapPin, Shield, Heart, Share2, Check, Calendar, Clock, Phone } from "lucide-react"
import Image from "next/image"

interface MobileServiceDetailProps {
  serviceId: string
}

export function MobileServiceDetail({ serviceId }: MobileServiceDetailProps) {
  const router = useRouter()
  const { services, addToComparison, comparison, addBooking } = useServices()
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const service = services.find((s) => s.id === serviceId)
  const isInComparison = comparison.some((s) => s.id === serviceId)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = "1"
    }
  }, [])

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Service Not Found</h2>
          <p className="text-muted-foreground mb-6">The service you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push("/mobile/discover")}>Browse Services</Button>
        </div>
      </div>
    )
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      addBooking({
        serviceId: service.id,
        date: selectedDate,
        time: selectedTime,
      })
      setBookingSuccess(true)
      setTimeout(() => {
        setIsBookingOpen(false)
        setBookingSuccess(false)
        router.push("/mobile/bookings")
      }, 1500)
    }
  }

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <div ref={containerRef} className="min-h-screen bg-background pb-28 opacity-0 transition-opacity duration-300">
      {/* Header Image */}
      <div className="relative h-72 bg-muted">
        <Image
src={
    service.images?.[0] && service.images[0].trim() !== ""
      ? service.images[0]
      : "/placeholder-service.jpg"
  }          alt={service.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Top Actions */}
        <div
          className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 16px)" }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn("w-5 h-5 transition-colors", isLiked && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-10 relative z-10">
        {/* Main Info */}
        <Card className="mb-4 bg-card border-border/50 shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                {service.category}
              </Badge>
              <Badge
                variant="secondary"
                className={cn(
                  "border-0",
                  service.availability === "Available"
                    ? "bg-green-500/20 text-green-400"
                    : service.availability === "Busy"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {service.availability}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
            <p className="text-muted-foreground mb-4">{service.provider.name}</p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{service.rating}</span>
                <span className="text-muted-foreground">({service.provider.completedJobs} jobs)</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{service.distance}km away</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="mb-4 bg-card border-border/50">
          <CardContent className="p-5">
            <h2 className="font-semibold mb-2">Pricing</h2>
            <p className="text-3xl font-bold text-primary">
              {service.pricing.type === "fixed"
                ? `₹${service.pricing.amount}`
                : `₹${service.pricing.min} - ₹${service.pricing.max}`}
              <span className="text-sm font-normal text-muted-foreground ml-2">{service.pricing.unit}</span>
            </p>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="mb-4 bg-card border-border/50">
          <CardContent className="p-5">
            <h2 className="font-semibold mb-3">About this Service</h2>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </CardContent>
        </Card>

        {/* Tags */}
        {service.tags.length > 0 && (
          <Card className="mb-4 bg-card border-border/50">
            <CardContent className="p-5">
              <h2 className="font-semibold mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Provider Info */}
        <Card className="mb-4 bg-card border-border/50">
          <CardContent className="p-5">
            <h2 className="font-semibold mb-4">Service Provider</h2>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                }}
              >
                {service.provider.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{service.provider.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {service.provider.verified && (
                    <div className="flex items-center gap-1 text-green-500">
                      <Shield className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Experience</p>
                <p className="font-semibold">{service.provider.experience} years</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Jobs Completed</p>
                <p className="font-semibold">{service.provider.completedJobs}+</p>
              </div>
            </div>
            {service.provider.languages.length > 0 && (
              <div className="mt-3 p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Languages</p>
                <p className="font-semibold">{service.provider.languages.join(", ")}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inclusions */}
        <Card className="mb-4 bg-card border-border/50">
          <CardContent className="p-5">
            <h2 className="font-semibold mb-4">What&apos;s Included</h2>
            <ul className="space-y-3">
              {service.inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Actions */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-xl border-t border-border/50"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-12 w-12 rounded-xl bg-transparent border-border/50",
              isInComparison && "border-primary bg-primary/10",
            )}
            onClick={() => service && addToComparison(service)}
            disabled={isInComparison || comparison.length >= 3}
          >
            {isInComparison ? <Check className="w-5 h-5 text-primary" /> : <Phone className="w-5 h-5" />}
          </Button>
          <Sheet open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <SheetTrigger asChild>
              <Button
                className="flex-1 h-12 rounded-xl text-base font-medium"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">Book Appointment</SheetTitle>
              </SheetHeader>

              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
                  <p className="text-muted-foreground">Redirecting to your bookings...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Select Date
                    </h3>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-4 rounded-xl bg-muted border border-border/50 focus:border-primary focus:outline-none"
                      min={minDate}
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Select Time
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={cn("rounded-xl h-11", selectedTime === time && "bg-primary")}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  {selectedDate && selectedTime && (
                    <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                      <p className="text-sm text-muted-foreground mb-1">Booking Summary</p>
                      <p className="font-medium">
                        {new Date(selectedDate).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at {selectedTime}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full h-12 rounded-xl text-base font-medium"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
                    }}
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
