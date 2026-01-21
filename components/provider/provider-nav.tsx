"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, LayoutDashboard, User, LogOut, Calendar, BarChart3, Star, DollarSign } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProviderNavProps {
  activeTab: "dashboard" | "bookings" | "analytics" | "reviews" | "payments" | "profile"
  onTabChange: (tab: "dashboard" | "bookings" | "analytics" | "reviews" | "payments" | "profile") => void
}

export function ProviderNav({ activeTab, onTabChange }: ProviderNavProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <>
  {/* TOP BAR */}
  <nav className=" top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
    <div className="px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-lg">FindMyLocal</span>
        </Link>

        <div className="hidden md:block">
          <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as any)}>
            <TabsList className="grid grid-cols-6 w-full max-w-2xl">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden lg:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden lg:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="hidden lg:inline">Reviews</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="hidden lg:inline">Payments</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">Profile</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="hidden md:flex"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  </nav>

  {/* MOBILE BOTTOM NAV — OUTSIDE */}
  <div
    className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur md:hidden overflow-x-auto"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="flex justify-around py-2 min-w-max px-2">
      <button
        onClick={() => onTabChange("dashboard")}
        className={cn(
          "flex flex-col items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors",
          activeTab === "dashboard"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground"
        )}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Dashboard</span>
      </button>

      <button
        onClick={() => onTabChange("bookings")}
        className={cn(
          "flex flex-col items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors",
          activeTab === "bookings"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground"
        )}
      >
        <Calendar className="w-5 h-5" />
        <span>Bookings</span>
      </button>

      <button
        onClick={() => onTabChange("analytics")}
        className={cn(
          "flex flex-col items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors",
          activeTab === "analytics"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground"
        )}
      >
        <BarChart3 className="w-5 h-5" />
        <span>Analytics</span>
      </button>

      <button
        onClick={() => onTabChange("reviews")}
        className={cn(
          "flex flex-col items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors",
          activeTab === "reviews"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground"
        )}
      >
        <Star className="w-5 h-5" />
        <span>Reviews</span>
      </button>

      <button
        onClick={() => onTabChange("payments")}
        className={cn(
          "flex flex-col items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors",
          activeTab === "payments"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground"
        )}
      >
        <DollarSign className="w-5 h-5" />
        <span>Payments</span>
      </button>

      <button
        onClick={() => onTabChange("profile")}
        className={cn(
          "flex flex-col items-center gap-1 text-xs px-3 py-1 rounded-lg transition-colors",
          activeTab === "profile"
            ? "text-primary bg-primary/10"
            : "text-muted-foreground"
        )}
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </button>
    </div>
  </div>
</>

  )
}
