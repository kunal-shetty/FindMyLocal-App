"use client"

import { useServices } from "@/context/service-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const CATEGORIES = ["Plumber", "Electrician", "Tutor", "Mechanic", "Carpenter", "Cleaner", "Painter", "Gardener"]

const LOCATIONS = [
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

const AVAILABILITY = ["Available", "Busy", "Offline"]

export function Filters() {
  const { filters, setFilters, clearFilters, hasActiveFilters } = useServices()

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    setFilters({ ...filters, categories: newCategories })
  }

  const toggleLocation = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location]
    setFilters({ ...filters, locations: newLocations })
  }

  const toggleAvailability = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter((a) => a !== availability)
      : [...filters.availability, availability]
    setFilters({ ...filters, availability: newAvailability })
  }

  const removeFilter = (type: string, value: string) => {
    if (type === "category") {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== value),
      })
    } else if (type === "location") {
      setFilters({
        ...filters,
        locations: filters.locations.filter((l) => l !== value),
      })
    } else if (type === "availability") {
      setFilters({
        ...filters,
        availability: filters.availability.filter((a) => a !== value),
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Category
              {filters.categories.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.categories.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CATEGORIES.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Location
              {filters.locations.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.locations.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Location</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {LOCATIONS.map((location) => (
              <DropdownMenuCheckboxItem
                key={location}
                checked={filters.locations.includes(location)}
                onCheckedChange={() => toggleLocation(location)}
              >
                {location}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Availability
              {filters.availability.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.availability.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Availability</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {AVAILABILITY.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={filters.availability.includes(status)}
                onCheckedChange={() => toggleAvailability(status)}
                className="capitalize"
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="gap-2">
            Clear Filters
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1 pr-1 animate-in fade-in zoom-in">
              {category}
              <Button
                variant="outline"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter("category", category)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.locations.map((location) => (
            <Badge key={location} variant="secondary" className="gap-1 pr-1 animate-in fade-in zoom-in">
              {location}
              <Button
                variant="outline"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter("location", location)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.availability.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1 pr-1 capitalize animate-in fade-in zoom-in">
              {status}
              <Button
                variant="outline"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter("availability", status)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
