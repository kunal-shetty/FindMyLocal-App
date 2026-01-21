"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, ArrowRight, Star, Users, MapPin, Smartphone } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function LandingHero() {
  const ref = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      // Hero content animation
      gsap.fromTo(
        ".hero-content > *",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out" },
      )

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.8, ease: "back.out(1.7)" },
      )

      // Floating animation for decorative elements
      gsap.to(".float-element", {
        y: -15,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl float-element" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl float-element" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-chart-3/10 rounded-full blur-3xl float-element" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="hero-content text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary font-medium">Now available as a mobile app</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-balance">
            Find trusted{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-transparent">
              local services
            </span>
            <br className="hidden sm:block" /> in minutes
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Compare verified professionals, check real-time availability, and book instantly. Your one-stop platform for
            all local services.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
  <Button
    size="sm"
    className="h-11 px-4 text-sm rounded-lg shadow-md shadow-primary/20 sm:h-14 sm:px-8 sm:text-base sm:rounded-xl"
    asChild
  >
    <Link href="/discover">
      <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
      Find Services
    </Link>
  </Button>

  <Button
    size="sm"
    variant="outline"
    className="h-11 px-4 text-sm rounded-lg bg-transparent sm:h-14 sm:px-8 sm:text-base sm:rounded-xl"
    asChild
  >
    <Link href="/mobile">
      <Smartphone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
      Try Mobile App
    </Link>
  </Button>

  <Button
    size="sm"
    variant="pink"
    className="h-11 px-4 text-sm rounded-lg sm:h-14 sm:px-8 sm:text-base sm:rounded-xl"
    asChild
  >
    <Link href="/provider/dashboard">
      Join as Provider
      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
    </Link>
  </Button>
</div>

        </div>

        {/* Stats section */}
        <div
  ref={statsRef}
  className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
>
  <div className="stat-item text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
    <div className="text-3xl font-bold text-foreground">10K+</div>
    <div className="text-sm text-muted-foreground">Active Users</div>
  </div>

  <div className="stat-item text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
    <Star className="w-8 h-8 text-accent mx-auto mb-2" />
    <div className="text-3xl font-bold text-foreground">4.7</div>
    <div className="text-sm text-muted-foreground">Average Rating</div>
  </div>

  <div className="stat-item text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
    <MapPin className="w-8 h-8 text-chart-3 mx-auto mb-2" />
    <div className="text-3xl font-bold text-foreground">12</div>
    <div className="text-sm text-muted-foreground">Cities Served</div>
  </div>

  <div className="stat-item text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
    <Search className="w-8 h-8 text-chart-4 mx-auto mb-2" />
    <div className="text-3xl font-bold text-foreground">340+</div>
    <div className="text-sm text-muted-foreground">Verified Professionals</div>
  </div>
</div>

      </div>
    </section>
  )
}
