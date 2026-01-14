"use client"

import { createContext, useContext, useState, type ReactNode, useMemo } from "react"
import { services, type Service } from "@/data/services"

interface Filters {
  categories: string[]
  locations: string[]
  availability: string[]
}

interface ServiceContextType {
  services: Service[]
  filteredServices: Service[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: Filters
  setFilters: (filters: Filters) => void
  clearFilters: () => void
  hasActiveFilters: boolean
  comparison: Service[]
  addToComparison: (service: Service) => void
  removeFromComparison: (id: string) => void
  clearComparison: () => void
  addBooking: (booking: Booking) => void
}

type Booking = {
  serviceId: string
  date: string
  time: string
}


const ServiceContext = createContext<ServiceContextType | undefined>(undefined)

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    locations: [],
    availability: [],
  })
  const [comparison, setComparison] = useState<Service[]>([])

  const hasActiveFilters =
    filters.categories.length > 0 || filters.locations.length > 0 || filters.availability.length > 0

  const clearFilters = () => {
    setFilters({
      categories: [],
      locations: [],
      availability: [],
    })
  }

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(service.category)

      // Location filter
      const matchesLocation =
        filters.locations.length === 0 || filters.locations.some((loc) => service.location.includes(loc))

      // Availability filter
      const matchesAvailability =
        filters.availability.length === 0 || filters.availability.includes(service.availability)

      return matchesSearch && matchesCategory && matchesLocation && matchesAvailability
    })
  }, [searchQuery, filters])

  const addToComparison = (service: Service) => {
    if (comparison.length < 3 && !comparison.find((s) => s.id === service.id)) {
      setComparison([...comparison, service])
    }
  }

  const removeFromComparison = (id: string) => {
    setComparison(comparison.filter((s) => s.id !== id))
  }

  const clearComparison = () => {
    setComparison([])
  }

  const [bookings, setBookings] = useState<Booking[]>([])

const addBooking = (booking: Booking) => {
  setBookings((prev) => {
    const updated = [...prev, booking]
    localStorage.setItem("bookings", JSON.stringify(updated))
    return updated
  })
}

  return (
    <ServiceContext.Provider
      value={{
        services,
        filteredServices,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        clearFilters,
        hasActiveFilters,
        comparison,
        addToComparison,
        removeFromComparison,
        clearComparison,
        addBooking,
      }}
    >
      {children}
    </ServiceContext.Provider>
  )
}

export function useServices() {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error("useServices must be used within ServiceProvider")
  }
  return context
}
