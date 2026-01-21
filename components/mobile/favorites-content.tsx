"use client"

import { useState, useEffect } from "react"
import { useServices } from "@/context/service-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Heart, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function MobileFavoritesContent() {
  const { services } = useServices()
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("favorites")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch {
        setFavorites([])
      }
    }
  }, [])

  const removeFavorite = (serviceId: string) => {
    const updated = favorites.filter((id) => id !== serviceId)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  const favoriteServices = services.filter((s) => favorites.includes(s.id))

  return (
    <div className="px-4 pt-4 pb-24" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
      <header className="py-4">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-muted-foreground text-sm">Your saved services</p>
      </header>

      {favoriteServices.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
            Save services you like to access them quickly later
          </p>
          <Button asChild>
            <Link href="/mobile/discover">Browse Services</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteServices.map((service) => (
            <Card key={service.id} className="bg-card border-border/50">
              <CardContent className="p-0">
                <Link href={`/mobile/service/?id=${service.id}`}>
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 relative">
                      <Image
                        src={service.images?.[0] || "/placeholder-service.jpg"}
                        alt={service.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground line-clamp-2 mb-1">
                            {service.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{service.provider.name}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                              <span>{service.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{service.distance}km</span>
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
                    </div>
                  </div>
                </Link>
                <div className="px-3 pb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-9 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                    onClick={() => removeFavorite(service.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove from Favorites
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

