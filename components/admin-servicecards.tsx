"use client"

import React, { useState } from "react"
import type { Service } from "@/data/services"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Navigation, Plus, Check, X } from "lucide-react"
import { getCategoryIcon } from "@/lib/icons"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ServiceCardProps {
  service: Service
}

export function AdminServiceCard({ service }: ServiceCardProps) {
  const Icon = getCategoryIcon(service.category)
  const router = useRouter()

  const [loadingApprove, setLoadingApprove] = useState(false)
  const [loadingReject, setLoadingReject] = useState(false)
  const [localStatus, setLocalStatus] = useState<"approved" | "rejected" | null>(() => {
    // Try to infer initial status if the service object contains it.
    const s = service as any
    if (typeof s.status === "string") {
      if (s.status === "approved") return "approved"
      if (s.status === "rejected") return "rejected"
    }
    if (typeof s.approved === "boolean") {
      return s.approved ? "approved" : null
    }
    return null
  })

  const handleApprove = async () => {

    if (loadingApprove) return
    setLoadingApprove(true)
    
      setLocalStatus("approved")
      router.refresh()
     
      setLoadingApprove(false)
    
  }

  const handleReject = async () => {
    if (loadingReject) return
    // optional confirmation
    
    setLoadingReject(true)
    
      setLocalStatus("rejected")
      router.refresh()
    
      setLoadingReject(false)
    
  }

  return (
    <Link href={`admin/view?id=${service.id}`}>
      <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="p-6 space-y-4 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {service.category}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant={localStatus === "approved" ? "default" : "outline"}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleApprove()
                }}
                disabled={loadingApprove || localStatus === "approved"}
                className="shrink-0"
                title="Approve service"
              >
                <Check className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant={localStatus === "rejected" ? "destructive" : "outline"}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleReject()
                }}
                disabled={loadingReject || localStatus === "rejected"}
                className="shrink-0"
                title="Reject service"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{service.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Navigation className="h-4 w-4" />
              <span>{service.distance} km</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {service.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{service.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
