"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Moon, Shield, Globe, Trash2, Download, ArrowLeft } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

export function MobileSettingsContent() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [smsUpdates, setSmsUpdates] = useState(false)
  const [darkMode, setDarkMode] = useState(theme === "dark")

  useEffect(() => {
    setDarkMode(theme === "dark")
  }, [theme])

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked)
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="px-4 pt-8 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your preferences</p>
        </div>
      </div>

      {/* Notifications */}
      <Card className="mb-4 bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Control how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-base font-medium">
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive booking updates and reminders</p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-updates" className="text-base font-medium">
                Email Updates
              </Label>
              <p className="text-sm text-muted-foreground">Get updates via email</p>
            </div>
            <Switch
              id="email-updates"
              checked={emailUpdates}
              onCheckedChange={setEmailUpdates}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-updates" className="text-base font-medium">
                SMS Updates
              </Label>
              <p className="text-sm text-muted-foreground">Receive text message notifications</p>
            </div>
            <Switch
              id="sms-updates"
              checked={smsUpdates}
              onCheckedChange={setSmsUpdates}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="mb-4 bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Moon className="w-5 h-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode" className="text-base font-medium">
                Dark Mode
              </Label>
              <p className="text-sm text-muted-foreground">Switch to dark theme</p>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="mb-4 bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Manage your data and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start h-12 rounded-xl bg-transparent">
            <Shield className="w-5 h-5 mr-3" />
            Privacy Policy
          </Button>
          <Button variant="outline" className="w-full justify-start h-12 rounded-xl bg-transparent">
            <Shield className="w-5 h-5 mr-3" />
            Two-Factor Authentication
          </Button>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card className="mb-4 bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5" />
            Language & Region
          </CardTitle>
          <CardDescription>Set your preferred language</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full justify-start h-12 rounded-xl bg-transparent">
            <Globe className="w-5 h-5 mr-3" />
            English (US)
            <span className="ml-auto text-muted-foreground">›</span>
          </Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="mb-4 bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Download className="w-5 h-5" />
            Data Management
          </CardTitle>
          <CardDescription>Export or delete your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start h-12 rounded-xl bg-transparent">
            <Download className="w-5 h-5 mr-3" />
            Export My Data
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start h-12 rounded-xl bg-transparent text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-5 h-5 mr-3" />
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <div className="text-center py-6">
        <p className="text-sm text-muted-foreground">FindMyLocal App</p>
        <p className="text-xs text-muted-foreground mt-1">Version 1.0.0</p>
      </div>
    </div>
  )
}

