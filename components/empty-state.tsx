"use client"

import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useServices } from "@/context/service-context"

export function EmptyState() {
  const { clearFilters } = useServices()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No services found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn't find any services matching your criteria. Try adjusting your filters or search terms.
      </p>
      <Button onClick={clearFilters}>Reset Filters</Button>
    </div>
  )
}
