"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function LandingNav() {
  const { theme, toggleTheme } = useTheme()
  const navRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
    }
  }, [])

  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span>FindMyLocal</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/discover"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse Services
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/auth/admin"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="outline" asChild className="hidden sm:inline-flex">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-xl">
                <Link href="/auth/login">Get Started</Link>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span>FindMyLocal</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 flex flex-col gap-1 p-4">
              <Link
                href="#features"
                className="px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/discover"
                className="px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Services
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/auth/admin"
                className="px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
            <div className="p-4 border-t border-border space-y-3">
              <Button variant="outline" className="w-full h-12 rounded-xl bg-transparent" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button className="w-full h-12 rounded-xl" asChild>
                <Link href="/auth/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
