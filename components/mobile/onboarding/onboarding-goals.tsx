"use client"

import { motion } from "framer-motion"
import { Wrench, Zap, GraduationCap, Paintbrush, Car, Home, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const suggestedServices = [
  {
    icon: Wrench,
    label: "Plumbing",
    color: "bg-blue-500",
    iconColor: "text-white",
  },
  {
    icon: Zap,
    label: "Electrician",
    color: "bg-yellow-500",
    iconColor: "text-white",
  },
  {
    icon: GraduationCap,
    label: "Home Tutor",
    color: "bg-purple-500",
    iconColor: "text-white",
  },
  {
    icon: Paintbrush,
    label: "Painter",
    color: "bg-pink-500",
    iconColor: "text-white",
  },
  {
    icon: Car,
    label: "Car Repair",
    color: "bg-emerald-500",
    iconColor: "text-white",
  },
  {
    icon: Home,
    label: "Home Services",
    color: "bg-orange-500",
    iconColor: "text-white",
  },
]

export function OnboardingGoals() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleService = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }

  return (
    <div className="flex h-full flex-col justify-center px-4">
      <motion.h2
        className="mb-2 text-center text-2xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        What are you looking for?
      </motion.h2>

      <motion.p
        className="mb-8 text-center text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Select one or more services you may need
      </motion.p>

      <div className="grid grid-cols-2 gap-3">
        {suggestedServices.map((service, index) => {
          const isSelected = selected.includes(service.label)

          return (
            <motion.button
              key={service.label}
              type="button"
              onClick={() => toggleService(service.label)}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-sm text-left",
                "transition-all",
                isSelected && "ring-2 ring-primary"
              )}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.08, type: "spring" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Selected check */}
              {isSelected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
              )}

              {/* Icon bubble */}
              <div
                className={cn(
                  "aspect-square w-12 flex items-center justify-center rounded-xl",
                  service.color
                )}
              >
                <service.icon className={cn("h-6 w-6", service.iconColor)} />
              </div>

              <span className="text-center text-sm font-medium text-foreground">
                {service.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
