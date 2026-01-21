"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ServiceProvider } from "@/context/service-context"
import { DiscoverHeader } from "@/components/discover/header"
import { SearchBar } from "@/components/search-bar"
import { Filters } from "@/components/filters"

import { ComparisonDrawer } from "@/components/comparison-drawer"
import { LoadingState } from "@/components/loading-state"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { redirect } from "next/navigation"
import { AdminFilters } from "@/components/admin-filters"
import { Card, CardContent } from "@/components/ui/card"
import { BadgeCheck, Calendar, CheckCircle, Clock } from "lucide-react"
import { services } from "@/data/services"
import { AdminServiceGrid } from "@/components/admin-servicegrid"

export default function DiscoverPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, isLoading: authLoading } = useAuth()

  const pendingBookings = services.filter((b) => b.status === "Pending")
  const confirmedBookings = services.filter((b) => b.status === "Approved")
  const completedBookings = services.filter((b) => b.status === "Rejected")

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      redirect("/auth/login")
    }
  }, [isAuthenticated, authLoading])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <ServiceProvider>
        <div className="min-h-screen bg-background">
          <DiscoverHeader />

          <main className="container mx-auto px-4 py-8 max-w-7xl">      
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
  {/* Pending */}
  <Card className="border-border/50 aspect-square sm:aspect-auto">
    <CardContent className="p-0 sm:p-4 h-full grid place-items-center">
      <div className="flex flex-col items-center leading-none">
        <Clock className="h-5 w-5 sm:hidden text-muted-foreground" />
        <div className="text-base text-yellow-500 sm:text-2xl font-bold mt-1 sm:mt-0">
          {pendingBookings.length}
        </div>
        <p className="hidden sm:block text-sm text-muted-foreground mt-1">
          Pending Requests
        </p>
      </div>
    </CardContent>
  </Card>

  {/* Confirmed */}
  <Card className="border-border/50 aspect-square sm:aspect-auto">
    <CardContent className="p-0 sm:p-4 h-full grid place-items-center">
      <div className="flex flex-col items-center leading-none">
        <CheckCircle className="h-5 w-5 sm:hidden text-muted-foreground" />
        <div className="text-base text-green-500 sm:text-2xl font-bold mt-1 sm:mt-0">
          {confirmedBookings.length}
        </div>
        <p className="hidden sm:block text-sm text-muted-foreground mt-1">
          Approved 
        </p>
      </div>
    </CardContent>
  </Card>


  {/* Completed */}
  <Card className="border-border/50 aspect-square sm:aspect-auto">
    <CardContent className="p-0 sm:p-4 h-full grid place-items-center">
      <div className="flex flex-col items-center leading-none">
        <BadgeCheck className="h-5 w-5 sm:hidden text-muted-foreground" />
        <div className="text-base text-red-500 sm:text-2xl font-bold mt-1 sm:mt-0">
          {completedBookings.length}
        </div>
        <p className="hidden sm:block text-sm text-muted-foreground mt-1">
          Rejected
        </p>
      </div>
    </CardContent>
  </Card>
</div> 

              {/* Search Bar */}
              <SearchBar />

              {/* Filters */}
              <AdminFilters />

              {/* Content */}
              {isLoading ? <LoadingState /> : <AdminServiceGrid/>}
            </div>
          </main>

          <ComparisonDrawer />
        </div>
      </ServiceProvider>
    </ThemeProvider>
  )
}
