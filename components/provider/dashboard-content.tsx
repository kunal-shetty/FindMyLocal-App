"use client"

import { ProviderNav } from "./provider-nav"
import { DashboardOverview } from "./dashboard-overview"
import { ProfileManager } from "./profile-manager"
import { useState } from "react"

export function ProviderDashboardContent() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile">("dashboard")

  return (
    <div className="min-h-screen bg-background pb-20">
  <main className="container mx-auto px-4 py-2 max-w-7xl">
    <ProviderNav activeTab={activeTab} onTabChange={setActiveTab} />
    {activeTab === "dashboard" ? <DashboardOverview /> : <ProfileManager />}
  </main>
</div>

  )
}
