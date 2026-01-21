"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Download, Calendar, CreditCard, Wallet } from "lucide-react"

interface Payment {
  id: string
  bookingId: string
  customerName: string
  serviceName: string
  amount: number
  commission: number
  netEarnings: number
  status: "pending" | "completed" | "processing"
  date: string
  paymentMethod: string
}

export function PaymentsEarnings() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  const payments: Payment[] = [
    {
      id: "1",
      bookingId: "BK-001",
      customerName: "John Doe",
      serviceName: "Professional Plumbing & Leak Repair",
      amount: 1200,
      commission: 120,
      netEarnings: 1080,
      status: "completed",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "UPI",
    },
    {
      id: "2",
      bookingId: "BK-002",
      customerName: "Sarah Smith",
      serviceName: "Bathroom Renovation",
      amount: 5000,
      commission: 500,
      netEarnings: 4500,
      status: "completed",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "Credit Card",
    },
    {
      id: "3",
      bookingId: "BK-003",
      customerName: "Mike Johnson",
      serviceName: "Professional Plumbing & Leak Repair",
      amount: 800,
      commission: 80,
      netEarnings: 720,
      status: "pending",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "Cash",
    },
    {
      id: "4",
      bookingId: "BK-004",
      customerName: "Emma Wilson",
      serviceName: "Professional Plumbing & Leak Repair",
      amount: 1500,
      commission: 150,
      netEarnings: 1350,
      status: "processing",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "UPI",
    },
  ]

  const totalEarnings = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.netEarnings, 0)
  const pendingEarnings = payments
    .filter((p) => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + p.netEarnings, 0)
  const totalCommission = payments.reduce((sum, p) => sum + p.commission, 0)
  const completedPayments = payments.filter((p) => p.status === "completed").length

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-600 dark:text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      case "processing":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-8 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Payments & Earnings</h1>
          <p className="text-muted-foreground">Track your earnings and payment history</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground mt-1">From {completedPayments} completed bookings</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingEarnings)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter((p) => p.status === "pending" || p.status === "processing").length} payments
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Commission</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCommission)}</div>
            <p className="text-xs text-muted-foreground mt-1">10% commission rate</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                payments
                  .filter((p) => {
                    const paymentDate = new Date(p.date)
                    const now = new Date()
                    return (
                      paymentDate.getMonth() === now.getMonth() &&
                      paymentDate.getFullYear() === now.getFullYear() &&
                      p.status === "completed"
                    )
                  })
                  .reduce((sum, p) => sum + p.netEarnings, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Current month earnings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="
      w-full 
      grid grid-cols-3 
      sm:inline-flex sm:w-auto
    ">
          <TabsTrigger value="transactions" className="w-full">Transactions</TabsTrigger>
          <TabsTrigger value="breakdown" className="w-full">Earnings</TabsTrigger>
          <TabsTrigger value="settings" className="w-full">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>All your transactions and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{payment.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{payment.serviceName}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(payment.date)} • {payment.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{formatCurrency(payment.netEarnings)}</div>
                      <div className="text-xs text-muted-foreground">
                        Gross: {formatCurrency(payment.amount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Commission: -{formatCurrency(payment.commission)}
                      </div>
                      <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Breakdown of your earnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Gross Revenue</span>
                    <span className="font-semibold">
                      {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Platform Commission (10%)</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(totalCommission)}
                    </span>
                  </div>
                  <div className="pt-2 border-t flex items-center justify-between">
                    <span className="font-semibold">Net Earnings</span>
                    <span className="font-bold text-lg text-green-600">
                      {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0) - totalCommission)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>How customers pay you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["UPI", "Credit Card", "Cash"].map((method) => {
                    const methodPayments = payments.filter((p) => p.paymentMethod === method)
                    const methodTotal = methodPayments
                      .filter((p) => p.status === "completed")
                      .reduce((sum, p) => sum + p.netEarnings, 0)
                    return (
                      <div key={method} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{method}</span>
                          <span className="text-sm font-medium">{formatCurrency(methodTotal)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(methodTotal / totalEarnings) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">💰 Commission Rate</p>
                <p className="text-xs text-muted-foreground">
                  Platform charges 10% commission on all bookings. This covers payment processing,
                  platform maintenance, and customer support.
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">💳 Payment Processing</p>
                <p className="text-xs text-muted-foreground">
                  Payments are processed securely. Completed bookings are paid out within 2-3 business
                  days.
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">📊 Earnings Growth</p>
                <p className="text-xs text-muted-foreground">
                  Your earnings have grown by 12% this month. Keep up the great work!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Manage your payment preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bank Account</label>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">Account ending in •••• 1234</p>
                  <p className="text-xs text-muted-foreground">HDFC Bank</p>
                </div>
                <Button variant="outline" size="sm">
                  Update Bank Details
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Schedule</label>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">Automatic payouts every week</p>
                  <p className="text-xs text-muted-foreground">
                    Payments are automatically transferred to your bank account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Change Schedule
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tax Information</label>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">PAN: ABCDE1234F</p>
                  <p className="text-xs text-muted-foreground">
                    Tax documents are generated automatically
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Update Tax Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

