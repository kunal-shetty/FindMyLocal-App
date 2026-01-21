"use client"

import { useSearchParams, notFound, useRouter } from "next/navigation"
import { services } from "@/data/services"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Navigation,
  Star,
  User,
  CheckCircle,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
} from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function AdminServiceDetailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get("id")

  if (!id) notFound()

  const service = services.find((s) => s.id === id)
  if (!service) notFound()

    const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  const [activeImage, setActiveImage] = useState(service.images[0])
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  return (
    <>
      <div className="container max-w-7xl py-10 space-y-10">
        {/* ===== TITLE ===== */}
        <section className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            {service.name}
          </h1>
          <p className="text-muted-foreground">{service.category}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {service.location}
            </span>
            <span className="flex items-center gap-1">
              <Navigation className="h-4 w-4" />
              {service.distance} km away
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              {service.rating}
            </span>
          </div>
        </section>

        {/* ===== IMAGE GALLERY ===== */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-hidden rounded-2xl border">
            <img
              src={activeImage}
              alt={service.name}
              className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-cover"
            />
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            {service.images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`relative overflow-hidden rounded-xl border aspect-[6/3] ${activeImage === img
                  ? "ring-2 ring-primary border-primary"
                  : "hover:border-primary/50"
                  }`}
              >
                <img
                  src={img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <section className="grid gap-10 lg:grid-cols-3">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-semibold text-lg">About this service</h3>
              <p className="text-muted-foreground mt-2">
                {service.description}
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold mb-2">Pricing</h3>
              {service.pricing.type === "fixed" ? (
                <p className="text-xl font-medium">
                  ₹{service.pricing.amount}
                  <span className="text-sm text-muted-foreground ml-1">
                    {service.pricing.unit}
                  </span>
                </p>
              ) : (
                <p className="text-xl font-medium">
                  ₹{service.pricing.min} – ₹{service.pricing.max}
                  <span className="text-sm text-muted-foreground ml-1">
                    {service.pricing.unit}
                  </span>
                </p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">
                What’s included
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                {service.inclusions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 bg-primary rounded-full" />
                    <span className="text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <aside className="rounded-2xl border bg-card p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">
                  {service.provider.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {service.provider.experience}+ years experience
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">
                  {service.provider.completedJobs}+
                </p>
                <p className="text-muted-foreground">
                  Jobs done
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {service.rating} ★
                </p>
                <p className="text-muted-foreground">
                  Rating
                </p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Languages:{" "}
              <span className="text-foreground">
                {service.provider.languages.join(", ")}
              </span>
            </div>

            {service.provider.verified && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                Verified provider
              </div>
            )}

            {/* Contact Info */}
            <div className="pt-4 border-t space-y-3">
              <div className="text-sm">
                <p className="text-muted-foreground mb-2">Contact Provider</p>
                <p className="font-medium">{service.provider.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="w-full border-green-500/30 hover:bg-green-500/10"
                  asChild
                >
                  <a
                    href={`https://wa.me/${service.provider.whatsapp.replace(/[^0-9]/g, "")}?text=Hi ${encodeURIComponent(service.provider.name)}, I'm interested in your ${encodeURIComponent(service.name)} service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a href={`tel:${service.provider.phone.replace(/[^0-9+]/g, "")}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </a>
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => setIsBookingOpen(true)}
            >
              Book Service
            </Button>
          </aside>
        </section>
      </div>

      {/* ===== BOOKING MODAL ===== */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Service</DialogTitle>
          </DialogHeader>

          <div>
  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
    <Clock className="w-4 h-4" />
    Select Time
  </h3>

  <div className="grid grid-cols-4 gap-2">
    {timeSlots.map((slot) => (
      <Button
        key={slot}
        variant={slot === time ? "default" : "outline"}
        size="sm"
        onClick={() => setTime(slot)}
        className={cn(
          "rounded-xl h-11",
          slot === time && "bg-primary text-primary-foreground"
        )}
      >
        {slot}
      </Button>
    ))}
  </div>
  
</div>



        </DialogContent>
      </Dialog>

    </>
  )
}
