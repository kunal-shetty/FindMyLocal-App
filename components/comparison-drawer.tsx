"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { useServices } from "@/context/service-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Star,
  MapPin,
  Navigation,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { getCategoryIcon } from "@/lib/icons"

/* ------------------ Animation Variants ------------------ */

const drawerVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
}

const minimizedVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
}

/* ------------------ Component ------------------ */

export function ComparisonDrawer() {
  const { comparison, removeFromComparison, clearComparison } = useServices()

  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  const drawerRef = useRef<HTMLDivElement | null>(null)

  /* 🔁 Reopen drawer when items are added */
  useEffect(() => {
    if (comparison.length > 0) {
      setIsOpen(true)
      setIsMinimized(false)
    }
  }, [comparison.length])

  /* ✨ GSAP polish on open */
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
        {
          boxShadow: "0px -10px 40px rgba(0,0,0,0.15)",
          duration: 0.4,
          ease: "power2.out",
        }
      )
    }
  }, [isOpen])

  if (comparison.length === 0) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ------------------ Minimized Bar ------------------ */}
          {isMinimized && (
            <motion.div
              key="minimized"
              variants={minimizedVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border bg-background shadow-lg px-4 py-2 flex items-center gap-3"
            >
              <span className="text-sm font-medium">
                Compare ({comparison.length})
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsMinimized(false)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  clearComparison()
                  setIsOpen(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* ------------------ Expanded Drawer ------------------ */}
          {!isMinimized && (
            <motion.div
              ref={drawerRef}
              key="expanded"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background"
            >
              <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Compare Services</h3>
                    <p className="text-sm text-muted-foreground">
                      {comparison.length} of 3 services selected
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMinimized(true)}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        clearComparison()
                        setIsOpen(false)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Clear */}
                <div className="mb-4">
                  <Button variant="ghost" size="sm" onClick={clearComparison}>
                    Clear All
                  </Button>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {comparison.map((service) => {
                    const Icon = getCategoryIcon(service.category)

                    return (
                      <motion.div
                        key={service.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-lg border bg-card p-4 space-y-3"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeFromComparison(service.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>

                        <div className="pr-8">
                          <h4 className="font-semibold truncate">
                            {service.name}
                          </h4>
                          <Badge variant="outline" className="gap-1.5 mt-2">
                            <Icon className="h-3 w-3" />
                            {service.category}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Rating
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                              <span className="font-medium">
                                {service.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Status
                            </span>
                            <Badge
                              variant="outline"
                              className="capitalize text-xs"
                            >
                              {service.availability}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Distance
                            </span>
                            <div className="flex items-center gap-1">
                              <Navigation className="h-3.5 w-3.5" />
                              <span>{service.distance} km</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Location
                            </span>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="truncate max-w-[120px]">
                                {service.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {service.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
