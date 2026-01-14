"use client"

import { useServices } from "@/context/service-context"
import { ServiceCard } from "@/components/service-card"
import { EmptyState } from "@/components/empty-state"

export function ServiceGrid() {
  const { filteredServices } = useServices()

  if (filteredServices.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
