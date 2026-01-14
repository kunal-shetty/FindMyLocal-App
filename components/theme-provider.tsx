"use client"

import * as React from "react"

type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState("dark")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") || "dark"
    setThemeState(stored)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(stored)
  }, [])

  const setTheme = React.useCallback((newTheme: string) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)
  }, [])

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }, [theme, setTheme])

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return <div className="bg-background text-foreground min-h-screen">{children}</div>
  }

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    // Return defaults when used outside provider (shouldn't happen but safe fallback)
    return {
      theme: "dark",
      setTheme: () => {},
      toggleTheme: () => {},
    }
  }
  return context
}
