"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ServiceProvider, useServices } from "@/context/service-context"
import ServiceDetailClient from "./service-detail-client"

export default function ServicesPage() {
  return (
    <ThemeProvider>
      <ServiceProvider>
        <div className="min-h-screen bg-background">
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <ServiceDetailClient />
          </main>
        </div>
      </ServiceProvider>
    </ThemeProvider>
  )
}
