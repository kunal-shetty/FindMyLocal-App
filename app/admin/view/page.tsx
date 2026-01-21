"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ServiceProvider, useServices } from "@/context/service-context"
import { ServiceDetailAdmin } from "./service-detail"




export default function ServicesPage() {
  return (
    <ThemeProvider>
      <ServiceProvider>
        <div className="min-h-screen bg-background">
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <ServiceDetailAdmin/>
          </main>
        </div>
      </ServiceProvider>
    </ThemeProvider>
  )
}
