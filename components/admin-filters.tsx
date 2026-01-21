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

const statuses = ["Pending", "Approved", "Rejected"]

export function AdminFilters() {
  const { filters, setFilters, clearFilters, hasActiveFilters } = useServices()

  const togglestatus = (status: string) => {
    const newstatus = filters.status.includes(status)
      ? filters.status.filter((a) => a !== status)
      : [...filters.status, status]
    setFilters({ ...filters, status: newstatus })
  }

  const removeFilter = (type: string, value: string) => {
      setFilters({
        ...filters,
        status: filters.status.filter((a) => a !== value),
      })
  }

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
       
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Status
              {filters.status.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.status.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={filters.status.includes(status)}
                onCheckedChange={() => togglestatus(status)}
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
          {filters.status.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1 pr-1 capitalize animate-in fade-in zoom-in">
              {status}
              <Button
                variant="outline"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter("status", status)}
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
