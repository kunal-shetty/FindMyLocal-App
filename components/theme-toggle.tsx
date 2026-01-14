"use client"

import { Sun, Moon, Laptop } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl p-1 shadow-lg">
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
            theme === "light"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          aria-label="Light theme"
        >
          <Sun className="h-4 w-4" />
        </button>

        <button
          onClick={() => setTheme("system")}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
            theme === "system"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          aria-label="System theme"
        >
          <Laptop className="h-4 w-4" />
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
            theme === "dark"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          aria-label="Dark theme"
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
