"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useServices } from "@/context/service-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Search, SlidersHorizontal, Star, MapPin, X, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const allCategories = ["Plumber", "Electrician", "Tutor", "Mechanic", "Carpenter", "Cleaner", "Painter", "Gardener"]

const allLocations = [
  "Andheri",
  "Bandra",
  "Borivali",
  "Malad",
  "Goregaon",
  "Powai",
  "Kandivali",
  "Kurla",
  "Jogeshwari",
  "Dadar",
  "Thane",
  "Santa Cruz",
]

export function MobileDiscoverContent() {
  const { filteredServices, searchQuery, setSearchQuery, filters, setFilters, clearFilters, hasActiveFilters } =
    useServices()

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [filteredServices])

  
  const toggleCategory = (cat: string) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat]
    setFilters({ ...filters, categories: updated })
  }

  const toggleLocation = (loc: string) => {
    const updated = filters.locations.includes(loc)
      ? filters.locations.filter((l) => l !== loc)
      : [...filters.locations, loc]
    setFilters({ ...filters, locations: updated })
  }

  return (
    <div ref={containerRef} className="px-4 pt-4 pb-24">
      {/* Header */}
      <header className="py-4">
        <h1 className="text-2xl font-bold">Discover</h1>
        <p className="text-muted-foreground text-sm">Find the perfect service provider</p>
      </header>

      {/* Search & Filter */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 rounded-xl h-11"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-11 w-11 rounded-xl border-border/50",
                hasActiveFilters && "border-primary bg-primary/10",
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl h-[70vh]">
            <SheetHeader className="mb-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 px-4">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <Button
                      key={cat}
                      variant={filters.categories.includes(cat) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCategory(cat)}
                      className="rounded-full"
                    >
                      {filters.categories.includes(cat) && <Check className="w-3 h-3 mr-1" />}
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div>
                <h3 className="text-sm font-medium mb-3">Location</h3>
                <div className="flex flex-wrap gap-2">
                  {allLocations.map((loc) => (
                    <Button
                      key={loc}
                      variant={filters.locations.includes(loc) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleLocation(loc)}
                      className="rounded-full"
                    >
                      {filters.locations.includes(loc) && <Check className="w-3 h-3 mr-1" />}
                      {loc}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                  Show {filteredServices.length} Results
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="gap-1 pr-1">
              {cat}
              <button onClick={() => toggleCategory(cat)} className="ml-1 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.locations.map((loc) => (
            <Badge key={loc} variant="secondary" className="gap-1 pr-1">
              {loc}
              <button onClick={() => toggleLocation(loc)} className="ml-1 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="space-y-3">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found</p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear filters
            </Button>
          </div>
        ) : (
          filteredServices.map((service) => (
            <Link key={service.id} href={`/mobile/service/?id=${service.id}`}>
              <Card className="service-card overflow-hidden bg-card border-border/50 active:scale-[0.98] transition-transform mb-4">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <div className="w-24 h-24 rounded-xl bg-muted flex-shrink-0 overflow-hidden">
                      <Image
                        src={
    service.images?.[1] && service.images[1].trim() !== ""
      ? service.images[1]
      : "/placeholder-service.jpg"
  } 
                        alt={service.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary" className="text-[10px] mb-1">
                          {service.category}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px]",
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
                      <h3 className="font-medium line-clamp-2">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.provider.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-medium">{service.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="text-xs">{service.distance}km</span>
                        </div>
                        <span className="text-xs font-medium text-primary">
                          {service.pricing.type === "fixed"
                            ? `₹${service.pricing.amount}`
                            : `₹${service.pricing.min}-${service.pricing.max}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
