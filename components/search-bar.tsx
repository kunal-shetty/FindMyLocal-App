"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useServices } from "@/context/service-context"
import { useState, useEffect } from "react"

export function SearchBar() {
  const { setSearchQuery } = useServices()
  const [value, setValue] = useState("")

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, setSearchQuery])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search services, categories, or locations..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-10 h-12 text-base"
      />
    </div>
  )
}
