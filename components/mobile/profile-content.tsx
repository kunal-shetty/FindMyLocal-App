"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Settings, Heart, Bell, Shield, HelpCircle, LogOut, ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: Settings, label: "Settings", href: "/mobile/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/mobile/help" },
]

export function MobileProfileContent() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/mobile/home")
  }

  return (
    <div className="px-4 pt-4 pb-24">
      <header className="py-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>

      {/* User Card */}
      <Card className="mb-6 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 border-primary/20">
        <CardContent className="p-5">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{localStorage.getItem("name") || user?.email}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Sign in to continue</p>
                  <p className="text-sm text-muted-foreground">Access all features</p>
                </div>
              </div>
              <Button asChild size="sm">
                <Link href="/mobile/auth/login">Sign In</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card className="mb-6 bg-card/50 border-border/50">
        <CardContent className="p-2">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-xl active:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => router.push(item.href)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout */}
      {isAuthenticated && (
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl border-destructive/50 text-destructive bg-transparent active:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      )}
    </div>
  )
}
