"use client"

import { Zap, Shield, Clock, Star, MapPin, Smartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Book services in seconds with real-time availability and instant confirmation.",
    color: "from-yellow-500/20 to-orange-500/20 text-yellow-500",
  },
  {
    icon: Shield,
    title: "Verified Providers",
    description: "All service providers are vetted, insured, and background-checked for your safety.",
    color: "from-green-500/20 to-emerald-500/20 text-green-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get help anytime with our dedicated customer support team ready to assist.",
    color: "from-blue-500/20 to-cyan-500/20 text-blue-500",
  },
  {
    icon: Star,
    title: "Trusted Reviews",
    description: "Read authentic reviews from real customers to make informed decisions.",
    color: "from-purple-500/20 to-pink-500/20 text-purple-500",
  },
  {
    icon: MapPin,
    title: "Local Focus",
    description: "Find professionals in your neighborhood for quick and convenient service.",
    color: "from-red-500/20 to-rose-500/20 text-red-500",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Access all features on the go with our progressive web app experience.",
    color: "from-primary/20 to-accent/20 text-primary",
  },
]

export function LandingFeatures() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".features-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: ".features-title", start: "top 80%" },
        },
      )

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              scrollTrigger: { trigger: card, start: "top 85%" },
            },
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="px-4 py-20 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl float-element" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl float-element" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-chart-3/10 rounded-full blur-3xl float-element" />
      </div>
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center space-y-4 mb-16 features-title">
          <h2 className="text-4xl md:text-5xl font-bold">Why Choose FindMyLocal</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Everything you need to find and hire the best local service providers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6 space-y-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
