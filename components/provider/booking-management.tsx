"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, User, CheckCircle, XCircle, MessageSquare, MapPin, Phone, BadgeCheck} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type BookingStatus = "pending" | "confirmed" | "completed" | "rejected" | "cancelled"

interface Booking {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  serviceName: string
  date: string
  time: string
  status: BookingStatus
  notes?: string
  address?: string
  createdAt: string
}

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [newBlockDate, setNewBlockDate] = useState("")
  const [newSlot, setNewSlot] = useState("")

  useEffect(() => {
    // Load bookings from localStorage
    const stored = localStorage.getItem("providerBookings")
    if (stored) {
      try {
        setBookings(JSON.parse(stored))
      } catch {
        setBookings([])
      }
    } else {
      // Initialize with sample bookings
      const sampleBookings: Booking[] = [
        {
          id: "1",
          customerName: "John Doe",
          customerPhone: "+91 98765 43210",
          customerEmail: "john@example.com",
          serviceName: "Professional Plumbing & Leak Repair",
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          time: "10:00",
          status: "pending",
          notes: "Need urgent leak repair in kitchen",
          address: "123 Main St, Mumbai",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          customerName: "Sarah Smith",
          customerPhone: "+91 98765 43211",
          customerEmail: "sarah@example.com",
          serviceName: "Professional Plumbing & Leak Repair",
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          time: "14:00",
          status: "confirmed",
          notes: "Bathroom renovation consultation",
          address: "456 Park Ave, Mumbai",
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "3",
          customerName: "Mike Johnson",
          customerPhone: "+91 98765 43212",
          customerEmail: "mike@example.com",
          serviceName: "Professional Plumbing & Leak Repair",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          time: "11:00",
          status: "completed",
          notes: "Pipe installation completed successfully",
          address: "789 Oak St, Mumbai",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]
      setBookings(sampleBookings)
      localStorage.setItem("providerBookings", JSON.stringify(sampleBookings))
    }

    // Load available slots
    const storedSlots = localStorage.getItem("providerSlots")
    if (storedSlots) {
      setAvailableSlots(JSON.parse(storedSlots))
    } else {
      const defaultSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]
      setAvailableSlots(defaultSlots)
      localStorage.setItem("providerSlots", JSON.stringify(defaultSlots))
    }

    // Load blocked dates
    const storedBlocked = localStorage.getItem("providerBlockedDates")
    if (storedBlocked) {
      setBlockedDates(JSON.parse(storedBlocked))
    }
  }, [])

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b))
    setBookings(updated)
    localStorage.setItem("providerBookings", JSON.stringify(updated))
  }

  const addBlockedDate = () => {
    if (newBlockDate && !blockedDates.includes(newBlockDate)) {
      const updated = [...blockedDates, newBlockDate]
      setBlockedDates(updated)
      localStorage.setItem("providerBlockedDates", JSON.stringify(updated))
      setNewBlockDate("")
    }
  }

  const removeBlockedDate = (date: string) => {
    const updated = blockedDates.filter((d) => d !== date)
    setBlockedDates(updated)
    localStorage.setItem("providerBlockedDates", JSON.stringify(updated))
  }

  const addSlot = () => {
    if (newSlot && !availableSlots.includes(newSlot)) {
      const updated = [...availableSlots, newSlot].sort()
      setAvailableSlots(updated)
      localStorage.setItem("providerSlots", JSON.stringify(updated))
      setNewSlot("")
    }
  }

  const removeSlot = (slot: string) => {
    const updated = availableSlots.filter((s) => s !== slot)
    setAvailableSlots(updated)
    localStorage.setItem("providerSlots", JSON.stringify(updated))
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      case "confirmed":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400"
      case "completed":
        return "bg-green-500/20 text-green-600 dark:text-green-400"
      case "rejected":
      case "cancelled":
        return "bg-red-500/20 text-red-600 dark:text-red-400"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    }
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed")
  const completedBookings = bookings.filter((b) => b.status === "completed")
  const upcomingBookings = [...pendingBookings, ...confirmedBookings].filter(
    (b) => new Date(b.date) >= new Date()
  )

  return (
    <div className="space-y-8 mt-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Management</h1>
        <p className="text-muted-foreground">Manage your bookings, schedule, and availability</p>
      </div>

      {/* Quick Stats */}
  
<div className="grid grid-cols-4 gap-2 sm:gap-4">
  {/* Pending */}
  <Card className="border-border/50 aspect-square sm:aspect-auto">
    <CardContent className="p-0 sm:p-4 h-full grid place-items-center">
      <div className="flex flex-col items-center leading-none">
        <Clock className="h-5 w-5 sm:hidden text-muted-foreground" />
        <div className="text-base sm:text-2xl font-bold mt-1 sm:mt-0">
          {pendingBookings.length}
        </div>
        <p className="hidden sm:block text-sm text-muted-foreground mt-1">
          Pending Requests
        </p>
      </div>
    </CardContent>
  </Card>

  {/* Confirmed */}
  <Card className="border-border/50 aspect-square sm:aspect-auto">
    <CardContent className="p-0 sm:p-4 h-full grid place-items-center">
      <div className="flex flex-col items-center leading-none">
        <CheckCircle className="h-5 w-5 sm:hidden text-muted-foreground" />
        <div className="text-base sm:text-2xl font-bold mt-1 sm:mt-0">
          {confirmedBookings.length}
        </div>
        <p className="hidden sm:block text-sm text-muted-foreground mt-1">
          Confirmed
        </p>
      </div>
    </CardContent>
  </Card>

  {/* Upcoming */}
  <Card className="border-border/50 aspect-square sm:aspect-auto">
    <CardContent className="p-0 sm:p-4 h-full grid place-items-center">
      <div className="flex flex-col items-center leading-none">
        <Calendar className="h-5 w-5 sm:hidden text-muted-foreground" />
        <div className="text-base sm:text-2xl font-bold mt-1 sm:mt-0">
          {upcomingBookings.length}
        </div>
        <p className="hidden sm:block text-sm text-muted-foreground mt-1">
          Upcoming
        </p>
      </div>
    </CardContent>
  </Card>

  {/* Completed */}
  <Card className="border-border/50 aspect-square sm:aspect-auto">
    <CardContent className="p-0 sm:p-4 h-full grid place-items-center">
      <div className="flex flex-col items-center leading-none">
        <BadgeCheck className="h-5 w-5 sm:hidden text-muted-foreground" />
        <div className="text-base sm:text-2xl font-bold mt-1 sm:mt-0">
          {completedBookings.length}
        </div>
        <p className="hidden sm:block text-sm text-muted-foreground mt-1">
          Completed
        </p>
      </div>
    </CardContent>
  </Card>
</div>



      <Tabs defaultValue="bookings" className="space-y-4">
  <TabsList
    className="
      w-full 
      grid grid-cols-3 
      sm:inline-flex sm:w-auto
    "
  >
    <TabsTrigger
      value="bookings"
      className="w-full"
    >
      Bookings
    </TabsTrigger>

    <TabsTrigger
      value="schedule"
      className="w-full"
    >
      Schedule
    </TabsTrigger>

    <TabsTrigger
      value="availability"
      className="w-full"
    >
      Availability
    </TabsTrigger>
  </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {/* Pending Bookings */}
          {pendingBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Pending Requests ({pendingBookings.length})</h2>
              <div className="space-y-3">
                {pendingBookings.map((booking) => (
                  <Card key={booking.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{booking.customerName}</h3>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{booking.serviceName}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(booking.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </div>
                          </div>
                          {booking.notes && (
                            <div className="mt-2 p-2 bg-muted/50 rounded-lg">
                              <p className="text-sm">
                                <span className="font-medium">Notes: </span>
                                {booking.notes}
                              </p>
                            </div>
                          )}
                          {booking.address && (
                            <div className="mt-2 flex items-start gap-1 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mt-0.5" />
                              {booking.address}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          onClick={() => {
                            updateBookingStatus(booking.id, "confirmed")
                          }}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateBookingStatus(booking.id, "rejected")
                          }}
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedBooking(booking)
                            setIsDialogOpen(true)
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Confirmed Bookings */}
          {confirmedBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Confirmed Bookings ({confirmedBookings.length})</h2>
              <div className="space-y-3">
                {confirmedBookings.map((booking) => (
                  <Card key={booking.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{booking.customerName}</h3>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{booking.serviceName}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(booking.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              updateBookingStatus(booking.id, "completed")
                            }}
                          >
                            Mark Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a href={`tel:${booking.customerPhone}`}>
                              <Phone className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Completed Bookings */}
          {completedBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Completed ({completedBookings.length})</h2>
              <div className="space-y-3">
                {completedBookings.slice(0, 5).map((booking) => (
                  <Card key={booking.id} className="border-border/50 opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{booking.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.serviceName}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(booking.date)} at {booking.time}
                          </p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {bookings.length === 0 && (
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground">Your booking requests will appear here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Available Time Slots</CardTitle>
              <CardDescription>Set your daily available time slots</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {availableSlots.map((slot) => (
                  <Badge key={slot} variant="secondary" className="gap-1">
                    {slot}
                    <button
                      type="button"
                      onClick={() => removeSlot(slot)}
                      className="hover:text-destructive"
                    >
                      <XCircle className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button onClick={addSlot}>Add Slot</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Blocked Dates</CardTitle>
              <CardDescription>Mark dates when you're unavailable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {blockedDates.map((date) => (
                  <Badge key={date} variant="destructive" className="gap-1">
                    {formatDate(date)}
                    <button
                      type="button"
                      onClick={() => removeBlockedDate(date)}
                      className="hover:text-destructive-foreground"
                    >
                      <XCircle className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={newBlockDate}
                  onChange={(e) => setNewBlockDate(e.target.value)}
                  className="max-w-[200px]"
                  min={new Date().toISOString().split("T")[0]}
                />
                <Button onClick={addBlockedDate}>Block Date</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Auto-Mark Busy</CardTitle>
              <CardDescription>Automatically mark yourself as busy when slots are full</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-mark busy when all slots filled</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically change status to "Busy" when no slots available
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Current Status:</strong> Available
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You have {availableSlots.length} time slots available today
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Customer information and booking notes</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <Label>Customer</Label>
                <p className="font-medium">{selectedBooking.customerName}</p>
                <p className="text-sm text-muted-foreground">{selectedBooking.customerEmail}</p>
                <p className="text-sm text-muted-foreground">{selectedBooking.customerPhone}</p>
              </div>
              <div>
                <Label>Service</Label>
                <p className="font-medium">{selectedBooking.serviceName}</p>
              </div>
              <div>
                <Label>Date & Time</Label>
                <p className="font-medium">
                  {formatDate(selectedBooking.date)} at {selectedBooking.time}
                </p>
              </div>
              {selectedBooking.address && (
                <div>
                  <Label>Address</Label>
                  <p className="font-medium">{selectedBooking.address}</p>
                </div>
              )}
              {selectedBooking.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="text-sm">{selectedBooking.notes}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    if (selectedBooking) {
                      updateBookingStatus(selectedBooking.id, "confirmed")
                      setIsDialogOpen(false)
                    }
                  }}
                >
                  Accept Booking
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (selectedBooking) {
                      updateBookingStatus(selectedBooking.id, "rejected")
                      setIsDialogOpen(false)
                    }
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

