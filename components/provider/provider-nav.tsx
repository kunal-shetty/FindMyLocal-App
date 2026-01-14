"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, LayoutDashboard, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProviderNavProps {
  activeTab: "dashboard" | "profile"
  onTabChange: (tab: "dashboard" | "profile") => void
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
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
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
    className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur md:hidden"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="flex justify-around py-2">
      <button
        onClick={() => onTabChange("dashboard")}
        className={cn(
          "flex flex-col items-center gap-1 text-xs",
          activeTab === "dashboard"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </button>

      <button
        onClick={() => onTabChange("profile")}
        className={cn(
          "flex flex-col items-center gap-1 text-xs",
          activeTab === "profile"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        <User className="w-5 h-5" />
        Profile
      </button>

      <button
        onClick={handleLogout}
        className="flex flex-col items-center gap-1 text-xs text-destructive"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  </div>
</>

  )
}
