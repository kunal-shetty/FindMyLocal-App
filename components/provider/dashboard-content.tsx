"use client"

import { ProviderNav } from "./provider-nav"
import { DashboardOverview } from "./dashboard-overview"
import { ProfileManager } from "./profile-manager"
import { BookingManagement } from "./booking-management"
import { AnalyticsInsights } from "./analytics-insights"
import { ReviewsManagement } from "./reviews-management"
import { PaymentsEarnings } from "./payments-earnings"
import { useState } from "react"
// import { AIChatbot } from "../ai-chatbot"

export function ProviderDashboardContent() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "analytics" | "reviews" | "payments" | "profile">("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "bookings":
        return <BookingManagement />
      case "analytics":
        return <AnalyticsInsights />
      case "reviews":
        return <ReviewsManagement />
      case "payments":
        return <PaymentsEarnings />
      case "profile":
        return <ProfileManager />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-2 max-w-7xl">
        <ProviderNav activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
        {/* <AIChatbot /> */}
      </main>
    </div>
  )
}
