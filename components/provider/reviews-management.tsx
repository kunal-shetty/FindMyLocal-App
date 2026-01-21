"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Shield, MessageSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  serviceName: string
  helpful: number
}

export function ReviewsManagement() {
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      customerName: "John Doe",
      rating: 5,
      comment: "Excellent service! Ramesh arrived on time and fixed the leak quickly. Very professional and courteous.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      serviceName: "Professional Plumbing & Leak Repair",
      helpful: 12,
    },
    {
      id: "2",
      customerName: "Sarah Smith",
      rating: 5,
      comment: "Great work! The bathroom renovation looks amazing. Highly recommend.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      serviceName: "Bathroom Renovation",
      helpful: 8,
    },
    {
      id: "3",
      customerName: "Mike Johnson",
      rating: 4,
      comment: "Good service overall. Minor delay but work quality was excellent.",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      serviceName: "Professional Plumbing & Leak Repair",
      helpful: 5,
    },
    {
      id: "4",
      customerName: "Emma Wilson",
      rating: 5,
      comment: "Outstanding! Very knowledgeable and provided great advice. Will definitely book again.",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      serviceName: "Professional Plumbing & Leak Repair",
      helpful: 15,
    },
    {
      id: "5",
      customerName: "David Brown",
      rating: 4,
      comment: "Professional service. Completed the job as promised. Happy with the results.",
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      serviceName: "Professional Plumbing & Leak Repair",
      helpful: 3,
    },
  ])

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }))

  const topReviews = reviews
    .filter((r) => r.rating === 5)
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, 3)

  const trustScore = Math.round(
    (avgRating * 20 + (reviews.length / 10) * 10 + (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 70)
  )

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-8 mt-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Reviews & Ratings</h1>
        <p className="text-muted-foreground">Manage your reputation and customer feedback</p>
      </div>

      {/* Overview Stats */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl font-bold">{avgRating.toFixed(1)}</div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(avgRating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+0.2 from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{trustScore}</div>
                <p className="text-sm text-muted-foreground">Trust Score</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${trustScore > 100 ? 100 : trustScore}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="
      w-full 
      grid grid-cols-3 
      sm:inline-flex sm:w-auto
    ">
          <TabsTrigger value="all" className="w-full">All Reviews</TabsTrigger>
          <TabsTrigger value="top" className="w-full">Top Reviews</TabsTrigger>
          <TabsTrigger value="distribution" className="w-full">Ratings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>All Reviews ({reviews.length})</CardTitle>
              <CardDescription>Customer feedback and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{review.customerName}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {review.serviceName}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-3">{review.comment}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {review.helpful} found helpful
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Top Reviews</CardTitle>
              <CardDescription>Your most helpful 5-star reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topReviews.map((review) => (
                  <div key={review.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{review.customerName}</h3>
                          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">
                            Top Review
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{review.comment}</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      {review.helpful} customers found this helpful
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Breakdown of your ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ratingDistribution.map((dist) => (
                  <div key={dist.rating} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{dist.rating}</span>
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">({dist.count})</span>
                      </div>
                      <span className="text-sm font-medium">{dist.percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${dist.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle>Review Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">💬 Most Common Feedback</p>
                <p className="text-xs text-muted-foreground">
                  Customers frequently mention: "Professional", "On-time", "Quality work"
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">⭐ Rating Trend</p>
                <p className="text-xs text-muted-foreground">
                  Your average rating has improved by 0.2 points over the last month
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">📈 Response Rate</p>
                <p className="text-xs text-muted-foreground">
                  Consider responding to reviews to improve engagement and trust
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

