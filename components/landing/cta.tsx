"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LandingCTA() {
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 75%",
          },
        },
      )
    }, ctaRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ctaRef} className="px-4 py-20 md:py-32">
      <div className="container mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent p-10 md:p-16">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
          </div>

          <div className="cta-content relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90">
              <Sparkles className="w-4 h-4" />
              <span>Join 50,000+ happy users</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Ready to find your perfect
              <br className="hidden sm:block" /> service provider?
            </h2>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Start discovering trusted professionals in your area. Available on web and mobile.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-xl bg-white text-primary hover:bg-white/90 shadow-xl"
                asChild
              >
                <Link href="/discover">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-xl border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/mobile">
                  <Smartphone className="mr-2 w-5 h-5" />
                  Try Mobile App
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
