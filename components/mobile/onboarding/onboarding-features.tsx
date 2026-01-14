"use client"

import { motion } from "framer-motion"
import { MapPin, Star, CalendarCheck, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Discover Nearby Services",
    description: "Find trusted service providers near your location",
    color: "bg-accent",
    iconColor: "text-accent-foreground",
  },
  {
    icon: Star,
    title: "Compare & Choose",
    description: "Check ratings, reviews, and pricing before booking",
    color: "bg-primary",
    iconColor: "text-primary-foreground",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Schedule services at a time that works for you",
    color: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Verified Providers",
    description: "Work only with trusted and verified professionals",
    color: "bg-accent/30",
    iconColor: "text-accent-foreground",
  },
]

export function OnboardingFeatures() {
  return (
    <div className="flex h-full flex-col justify-center px-2">
      <motion.h2
        className="mb-2 text-center text-2xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Why FindMyLocal?
      </motion.h2>

      <motion.p
        className="mb-8 text-center text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Everything you need to find the right local help
      </motion.p>

      <div className="grid gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className={`flex h-12 w-18 items-center justify-center rounded-xl ${feature.color}`}>
              <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
