"use client"

import { useEffect, useState } from "react"

export function useServiceWorker() {
  const [isReady, setIsReady] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [hasUpdate, setHasUpdate] = useState(false)

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => setIsOffline(!navigator.onLine)
    updateOnlineStatus()

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          setIsReady(true)

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  setHasUpdate(true)
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error)
        })
    }

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  const updateApp = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" })
          window.location.reload()
        }
      })
    }
  }

  return { isReady, isOffline, hasUpdate, updateApp }
}
