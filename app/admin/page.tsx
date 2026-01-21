"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ServiceProvider } from "@/context/service-context"
import { DiscoverHeader } from "@/components/discover/header"
import { SearchBar } from "@/components/search-bar"
import { Filters } from "@/components/filters"
import { ServiceGrid } from "@/components/service-grid"
import { ComparisonDrawer } from "@/components/comparison-drawer"
import { LoadingState } from "@/components/loading-state"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { redirect } from "next/navigation"
import { AdminFilters } from "@/components/admin-filters"

export default function DiscoverPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, isLoading: authLoading } = useAuth()

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
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-balance">Find Local Services Near You</h1>
                <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
                  Connect with trusted service providers in your area. Compare ratings, availability, and find the
                  perfect match for your needs.
                </p>
              </div>

              {/* Search Bar */}
              <SearchBar />

              {/* Filters */}
              <AdminFilters />

              {/* Content */}
              {isLoading ? <LoadingState /> : <ServiceGrid />}
            </div>
          </main>

          <ComparisonDrawer />
        </div>
      </ServiceProvider>
    </ThemeProvider>
  )
}
