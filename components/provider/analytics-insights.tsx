"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, GitCompare, Star, Calendar, MapPin, Clock, Sparkles } from "lucide-react"

export function AnalyticsInsights() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  // Mock analytics data
  const stats = {
    profileViews: { current: 1234, previous: 1100, change: 12.2 },
    comparisons: { current: 87, previous: 82, change: 6.1 },
    shortlists: { current: 156, previous: 132, change: 18.2 },
    bookings: { current: 24, previous: 18, change: 33.3 },
    conversionRate: { current: 1.95, previous: 1.64, change: 18.9 },
    avgRating: { current: 4.7, previous: 4.6, change: 2.2 },
  }

  const peakTimes = [
    { hour: "9 AM", bookings: 2 },
    { hour: "10 AM", bookings: 5 },
    { hour: "11 AM", bookings: 4 },
    { hour: "12 PM", bookings: 3 },
    { hour: "1 PM", bookings: 1 },
    { hour: "2 PM", bookings: 3 },
    { hour: "3 PM", bookings: 4 },
    { hour: "4 PM", bookings: 6 },
    { hour: "5 PM", bookings: 5 },
  ]

  const popularTags = [
    { tag: "Emergency", views: 450, bookings: 12 },
    { tag: "24/7", views: 380, bookings: 8 },
    { tag: "Licensed", views: 320, bookings: 6 },
    { tag: "Home Service", views: 280, bookings: 5 },
  ]

  const locationDemand = [
    { location: "Andheri West", demand: 45, bookings: 8 },
    { location: "Bandra", demand: 32, bookings: 6 },
    { location: "Powai", demand: 28, bookings: 5 },
    { location: "Goregaon", demand: 22, bookings: 4 },
  ]

  const servicePerformance = [
    { metric: "Views to Comparison", rate: "7.1%", trend: "up" },
    { metric: "Comparison to Shortlist", rate: "12.3%", trend: "up" },
    { metric: "Shortlist to Booking", rate: "15.4%", trend: "up" },
    { metric: "Overall Conversion", rate: "1.95%", trend: "up" },
  ]

  return (
    <div className="space-y-8 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track your performance and optimize your profile</p>
        </div>
        
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bookings.current}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-green-600">+{stats.bookings.change}%</span>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.current}%</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-green-600">+{stats.conversionRate.change}%</span>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating.current}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-green-600">+{stats.avgRating.change}%</span>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="
      w-full 
      grid grid-cols-3 
      sm:inline-flex sm:w-auto
    ">
          <TabsTrigger value="performance" className="w-full">Performance</TabsTrigger>
          <TabsTrigger value="insights" className="w-full">Insights</TabsTrigger>
          <TabsTrigger value="demand" className="w-full">Demand Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Track how users move through your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servicePerformance.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{item.rate}</span>
                        {item.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${parseFloat(item.rate)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Peak Booking Times</CardTitle>
              <CardDescription>When customers book your services most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {peakTimes.map((time, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium">{time.hour}</div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-6 relative">
                        <div
                          className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(time.bookings / 6) * 100}%` }}
                        >
                          <span className="text-xs text-primary-foreground font-medium">
                            {time.bookings}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Popular Service Tags</CardTitle>
              <CardDescription>Which tags drive the most engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularTags.map((tag, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{tag.tag}</Badge>
                      
                    </div>
                    <div className="text-sm font-medium">
                      {((tag.bookings / tag.views) * 100).toFixed(1)}% conversion
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Optimization Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">📈 Increase Availability</p>
                <p className="text-xs text-muted-foreground">
                  Adding more time slots between 4-5 PM could increase bookings by ~15%
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">🏷️ Tag Optimization</p>
                <p className="text-xs text-muted-foreground">
                  Your "Emergency" tag has the highest conversion rate. Consider highlighting it more.
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">📍 Location Focus</p>
                <p className="text-xs text-muted-foreground">
                  Andheri West shows highest demand. Consider expanding service area there.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demand" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Location-Based Demand</CardTitle>
              <CardDescription>Where customers are looking for your services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationDemand.map((loc, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{loc.location}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {loc.bookings} bookings • {loc.demand}% demand
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${loc.demand}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

