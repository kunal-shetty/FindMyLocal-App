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
import { Card, CardContent } from "@/components/ui/card"
import { BadgeCheck, Calendar, CheckCircle, Clock } from "lucide-react"
import { services } from "@/data/services"

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
            <div className="space-y-6">
                {/* Dashboard Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
                        <p className="text-sm text-muted-foreground">
                            Overview of service requests and recent activity
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm shadow-sm"
                        >
                            <Calendar className="h-4 w-4" />
                            Today
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm"
                        >
                            Export
                        </button>
                    </div>
                </div>

                {/* Top summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-border/50">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-yellow-50 text-yellow-600 p-2 rounded-md">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Pending
                                </p>
                                <div className="text-2xl font-bold">{pendingBookings.length}</div>
                                <p className="text-sm text-muted-foreground">Requests awaiting review</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-green-50 text-green-600 p-2 rounded-md">
                                <CheckCircle className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Approved
                                </p>
                                <div className="text-2xl font-bold">{confirmedBookings.length}</div>
                                <p className="text-sm text-muted-foreground">Active and confirmed</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-red-50 text-red-600 p-2 rounded-md">
                                <BadgeCheck className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Rejected
                                </p>
                                <div className="text-2xl font-bold">{completedBookings.length}</div>
                                <p className="text-sm text-muted-foreground">Declined requests</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-slate-50 text-slate-600 p-2 rounded-md">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Total Services
                                </p>
                                <div className="text-2xl font-bold">{services.length}</div>
                                <p className="text-sm text-muted-foreground">All listed services</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main content: chart + recent activity */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Activity chart placeholder (span 2 cols on large screens) */}
                   
                    {/* Recent activity / quick actions */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Recent Requests</h3>
                                <p className="text-sm text-muted-foreground">Latest 5</p>
                            </div>

                            <ul className="space-y-3">
                                {services.slice(0, 5).map((b, idx) => {
                                    const status = b.status ?? "Unknown"
                                    const color =
                                        status === "Pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : status === "Approved"
                                            ? "bg-green-100 text-green-800"
                                            : status === "Rejected"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-slate-100 text-slate-800"

                                    return (
                                        <li key={b.id ?? idx} className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-md bg-muted/10 flex items-center justify-center text-sm font-medium">
                                                    {b.name?.charAt(0) ?? "S"}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium">{b.name ?? "Unnamed service"}</div>
                                                    <div className="text-xs text-muted-foreground">{b.category ?? "—"}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs px-2 py-1 rounded-full ${color}`}>{status}</span>
                                                <button className="text-sm text-primary">View</button>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                            <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                                <button className="text-sm text-muted-foreground">View all requests</button>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm">
                                        New Request
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
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
