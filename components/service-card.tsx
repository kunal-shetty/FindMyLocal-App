"use client"

import type { Service } from "@/data/services"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Navigation, Plus, Check } from "lucide-react"
import { useServices } from "@/context/service-context"
import { getCategoryIcon } from "@/lib/icons"
import { useRouter } from "next/navigation"

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { comparison, addToComparison, removeFromComparison } = useServices()
  const isInComparison = comparison.some((s) => s.id === service.id)
  const Icon = getCategoryIcon(service.category)
  const router = useRouter()

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
      case "Busy":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
      case "Offline":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
    }
  }


  const handleCompareClick = () => {
    isInComparison
      ? removeFromComparison(service.id)
      : addToComparison(service)
  }

  const handleOptService = () => {
    router.push(`services?id=${service.id}`)
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="p-6 space-y-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {service.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {service.category}
              </Badge>
            </div>
          </div>

          <Button
            size="icon"
            variant={isInComparison ? "default" : "outline"}
            onClick={handleCompareClick}
            disabled={!isInComparison && comparison.length >= 3}
            className="shrink-0"
          >
            {isInComparison ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Location & Distance */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{service.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Navigation className="h-4 w-4" />
            <span>{service.distance} km</span>
          </div>
        </div>

        {/* Rating & Availability */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="font-semibold">{service.rating.toFixed(1)}</span>
          </div>
          <Badge
            variant="outline"
            className={`capitalize ${getAvailabilityColor(service.availability)}`}
          >
            {service.availability}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-4">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {service.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {service.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{service.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>

      {/* 🔹 Opt for Service CTA */}
      {/* 🔹 Action Row */}
      <div className="flex items-center justify-between pt-3 border-t px-6">
        <span className="text-xs text-muted-foreground">
          Interested in this service?
        </span>

        <button
          onClick={handleOptService}
          disabled={service.availability === "Offline"}
          className="
      inline-flex items-center gap-1.5 rounded-full px-3 py-1.5
      text-xs font-medium
      bg-primary/10 text-primary
      hover:bg-primary/20
      transition-colors
      disabled:opacity-50 disabled:cursor-not-allowed
    "
        >
          Book Now →
        </button>
      </div>

    </Card>
  )
}
