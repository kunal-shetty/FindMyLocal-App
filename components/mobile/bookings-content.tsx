"use client"

import { useState, useEffect } from "react"
import { useServices } from "@/context/service-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Star, Trash2, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Booking = {
  serviceId: string
  date: string
  time: string
}

export function MobileBookingsContent() {
  const { services } = useServices()

  const [bookings, setBookings] = useState<Booking[]>([])

  // ⭐ rating states (NEW)
  const [openRating, setOpenRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [ratingServiceId, setRatingServiceId] = useState<string | null>(null)
  const [ratedServices, setRatedServices] = useState<Record<string, number>>({})

  useEffect(() => {
    const loadBookings = () => {
      const stored = localStorage.getItem("bookings")
      if (stored) {
        try {
          setBookings(JSON.parse(stored))
        } catch {
          setBookings([])
        }
      }
    }

    loadBookings()
    window.addEventListener("storage", loadBookings)
    return () => window.removeEventListener("storage", loadBookings)
  }, [])

  // Load ratings
  useEffect(() => {
    const storedRatings = localStorage.getItem("serviceRatings")
    if (storedRatings) {
      setRatedServices(JSON.parse(storedRatings))
    }
  }, [])

  const getServiceById = (id: string) => services.find((s) => s.id === id)

  const cancelBooking = (index: number) => {
    const updated = bookings.filter((_, i) => i !== index)
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })

  const isUpcoming = (dateStr: string) => new Date(dateStr) >= new Date()

  const upcomingBookings = bookings.filter((b) => isUpcoming(b.date))
  const pastBookings = bookings.filter((b) => !isUpcoming(b.date))

  return (
    <div className="px-4" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="py-4">
        <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="text-muted-foreground text-sm">Manage your appointments</p>
      </header>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No bookings yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
            Browse services and book your first appointment
          </p>
          <Button asChild>
            <Link href="/mobile/discover">Browse Services</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6 pb-4">
          {/* Upcoming */}
          {upcomingBookings.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Upcoming ({upcomingBookings.length})
              </h2>

              <div className="space-y-3">
                {upcomingBookings.map((booking, index) => {
                  const service = getServiceById(booking.serviceId)
                  if (!service) return null

                  return (
                    <Card key={index} className="bg-card border-border/50 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 relative">
  <Image
    src={
      service.images?.[1] && service.images[1].trim() !== ""
        ? service.images[1]
        : "/placeholder-service.jpg"
    }
    alt={service.name}
    width={96}
    height={96}
    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
  />

  {/* subtle overlay for better contrast */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
</div>


                          <div className="flex-1 p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-foreground line-clamp-2">
                                  {service.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {service.provider.name}
                                </p>
                              </div>
                              <Badge className="bg-green-500/20 text-green-400 border-0 ml-2">
                                Confirmed
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(booking.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="px-3 pb-3 space-y-2">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-9 rounded-lg bg-transparent"
                              asChild
                            >
                              <Link href={`/mobile/service/?id=${service.id}`}>
                                View Details
                              </Link>
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                              onClick={() => cancelBooking(bookings.indexOf(booking))}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          {/* Contact Provider */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-9 rounded-lg bg-transparent border-green-500/30 hover:bg-green-500/10"
                              asChild
                            >
                              <a
                                href={`https://wa.me/${service.provider.whatsapp.replace(/[^0-9]/g, "")}?text=Hi ${encodeURIComponent(service.provider.name)}, regarding my booking for ${encodeURIComponent(service.name)} on ${formatDate(booking.date)} at ${booking.time}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                                WhatsApp
                              </a>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-9 rounded-lg bg-transparent"
                              asChild
                            >
                              <a href={`tel:${service.provider.phone.replace(/[^0-9+]/g, "")}`}>
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                              </a>
                            </Button>
                          </div>
                          
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Past */}
          {pastBookings.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Past ({pastBookings.length})
              </h2>

              <div className="space-y-3">
                {pastBookings.map((booking, index) => {
                  const service = getServiceById(booking.serviceId)
                  if (!service) return null

                  const alreadyRated = ratedServices[service.id]

                  return (
                    <Card key={index} className="bg-card/50 border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="space-y-0.5">
  <h3 className="font-medium text-foreground line-clamp-2">
    {service.name}
  </h3>
  <p className="text-sm text-muted-foreground truncate">
    {service.provider.name}
  </p>
</div>

                          <Badge variant="secondary" className="bg-muted">
                            Completed
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(booking.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        {!alreadyRated ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-3 h-9 rounded-lg bg-transparent"
                            onClick={() => {
                              setRatingServiceId(service.id)
                              setRating(0)
                              setOpenRating(true)
                            }}
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Rate Service
                          </Button>
                        ) : (
                          <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
  <span>Your rating: </span>
  <div className="flex items-center gap-0.5">
    {Array.from({ length: alreadyRated }).map((_, i) => (
      <Star
        key={i}
        className="w-4 h-4 text-yellow-500 fill-yellow-500"
      />
    ))}
  </div>
</div>

                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ⭐ Rating Modal */}
      <Dialog open={openRating} onOpenChange={setOpenRating}>
        <DialogContent className="max-w-sm rounded-xl">
          <DialogHeader>
            <DialogTitle>Rate this service</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center gap-2 my-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star
                  className={cn(
                    "w-8 h-8",
                    star <= rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>

          <Button
            className="w-full"
            disabled={rating === 0}
            onClick={() => {
              if (!ratingServiceId) return

              const updated = {
                ...ratedServices,
                [ratingServiceId]: rating,
              }

              setRatedServices(updated)
              localStorage.setItem("serviceRatings", JSON.stringify(updated))

              setOpenRating(false)
              setRating(0)
              setRatingServiceId(null)
            }}
          >
            Submit Rating
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
