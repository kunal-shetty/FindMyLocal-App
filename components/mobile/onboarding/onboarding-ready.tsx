"use client"

import { motion } from "framer-motion"
import { MapPinCheck } from "lucide-react"

export function OnboardingReady() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center px-4">
      {/* Floating icon */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="flex aspect-square w-28 items-center justify-center rounded-3xl bg-primary shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MapPinCheck className="h-14 w-14 text-primary-foreground" />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="mb-4 text-3xl font-bold tracking-tight text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        You&apos;re all set!
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mb-2 max-w-xs text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Start discovering trusted local service providers and book help whenever you need it.
      </motion.p>

      {/* Visual progress */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >

      </motion.div>
    </div>
  )
}
