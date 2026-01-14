"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, GitCompare, Star, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  // Mock analytics data
  const stats = [
    {
      title: "Profile Views",
      value: "1,234",
      change: "+12%",
      icon: Eye,
      description: "Total views this month",
    },
    {
      title: "Times Compared",
      value: "87",
      change: "+5%",
      icon: GitCompare,
      description: "Added to comparisons",
    },
    {
      title: "Times Shortlisted",
      value: "156",
      change: "+18%",
      icon: Star,
      description: "Saved by users",
    },
    {
      title: "Engagement Rate",
      value: "24%",
      change: "+3%",
      icon: TrendingUp,
      description: "Average engagement",
    },
  ]

  const recentActivity = [
    { action: "Profile viewed", time: "2 minutes ago", user: "John D." },
    { action: "Added to comparison", time: "15 minutes ago", user: "Sarah M." },
    { action: "Shortlisted", time: "1 hour ago", user: "Mike R." },
    { action: "Profile viewed", time: "2 hours ago", user: "Emma L." },
    { action: "Added to comparison", time: "3 hours ago", user: "David K." },
  ]

  return (
    <div className="space-y-8 mt-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your service profile</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-medium text-green-600 dark:text-green-400">{stat.change}</span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest interactions with your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
