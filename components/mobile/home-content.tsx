"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useAuth } from "@/context/auth-context"
import { useServices } from "@/context/service-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Search, Sparkles, Star, MapPin, Wrench, GraduationCap, Zap, Car, ChevronRight, Bell, Heart, History, TrendingUp, Hammer, Paintbrush, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// import { AIChatbot } from "../ai-chatbot"

const categories = [
  { label: "Plumber", icon: Wrench, color: "bg-blue-500/20 text-blue-400" },
  { label: "Electrician", icon: Zap, color: "bg-yellow-500/20 text-yellow-400" },
  { label: "Tutor", icon: GraduationCap, color: "bg-green-500/20 text-green-400" },
  { label: "Mechanic", icon: Car, color: "bg-orange-500/20 text-orange-400" },
  { label: "Carpenter", icon: Hammer, color: "bg-indigo-500/20 text-indigo-400" },
  { label: "Cleaner", icon: Sparkles, color: "bg-cyan-500/20 text-cyan-400" },
  { label: "Painter", icon: Paintbrush, color: "bg-pink-500/20 text-pink-400" },
  { label: "Gardener", icon: Leaf, color: "bg-emerald-500/20 text-emerald-400" },
]

export function MobileHomeContent() {
  const { user } = useAuth()
  const userName = localStorage.getItem("name")
  const { services } = useServices()
  const containerRef = useRef<HTMLDivElement>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [favoritesCount, setFavoritesCount] = useState(0)

  const topServices = services.slice(0, 4)

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches")
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored).slice(0, 5))
      } catch {
        setRecentSearches([])
      }
    }

    const favs = localStorage.getItem("favorites")
    if (favs) {
      try {
        setFavoritesCount(JSON.parse(favs).length)
      } catch {
        setFavoritesCount(0)
      }
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mobile-section",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="px-4 pt-4 pb-24">
      {/* <AIChatbot/> */}

      {/* Header */}
      <header className="mobile-section flex items-center justify-between py-4">
        <div>
          <p className="text-muted-foreground text-sm">Good morning</p>
          <h1 className="text-2xl font-bold">{userName || "Welcome"}</h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="mobile-section mb-6">
        <Link href="/mobile/discover">
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-muted/50 border border-border/50">
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Search for services...</span>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="mobile-section mb-6 grid grid-cols-2 gap-3">
        <Link href="/mobile/favorites">
          <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Favorites</p>
                  <p className="text-xs text-muted-foreground">{favoritesCount} saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/mobile/discover?sort=trending">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Trending</p>
                  <p className="text-xs text-muted-foreground">Popular now</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mobile-section mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <History className="w-5 h-5" />
              Recent Searches
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                localStorage.removeItem("recentSearches")
                setRecentSearches([])
              }}
              className="text-xs"
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, idx) => (
              <Link key={idx} href={`/mobile/discover?q=${encodeURIComponent(search)}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10">
                  {search}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Hero Card */}
      <div className="mobile-section mb-6">

        <Card className="overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 border-primary/20">
          <CardContent className="px-5 ">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                  <Sparkles className="w-3 h-3 mr-1" /> New
                </Badge>
                <h2 className="text-xl font-bold">Find trusted local services
                  in minutes</h2>
                <p className="text-sm text-muted-foreground">Compare, book, and hire local experts instantly</p>
                <Button size="sm" className="mt-2" asChild>
                  <Link href="/mobile/discover">
                    Explore <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="mobile-section mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Link href="/mobile/discover" className="text-sm text-primary">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/mobile/discover?category=${cat.label}`}
              className="flex flex-col items-center gap-2"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", cat.color)}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Services */}
      <div className="mobile-section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Top Rated</h2>
          <Link href="/mobile/discover" className="text-sm text-primary">
            See all
          </Link>
        </div>
        <div className="flex flex-col space-y-3">
          {topServices.map((service) => (
            <Link key={service.id} href={`/mobile/service/?id=${service.id}`}>
              <Card className="overflow-hidden bg-card border-border/50 active:scale-[0.98] transition-transform">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-xl bg-muted flex-shrink-0 overflow-hidden">
                      <Image
                        src={
            service.images?.[0] && service.images[0].trim() !== ""
              ? service.images[0]
              : "/placeholder-service.jpg"
          } 
                        alt={service.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{service.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{service.provider.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-medium">{service.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="text-xs">{service.distance}km</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px] h-5",
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
