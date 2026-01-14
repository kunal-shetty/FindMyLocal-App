"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/mobile/home", icon: Home, label: "Home" },
  { href: "/mobile/discover", icon: Search, label: "Discover" },
  { href: "/mobile/bookings", icon: Calendar, label: "Bookings" },
  { href: "/mobile/profile", icon: User, label: "Profile" },
]

export function MobileNavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground active:text-foreground",
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && <div className="absolute -bottom-0.5 w-8 h-0.5 rounded-full bg-primary" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
