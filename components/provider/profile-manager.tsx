"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"

export function ProfileManager() {
  const { user } = useAuth()

  // Mock provider profile data
  const [profile, setProfile] = useState({
    businessName: "Quick Fix Plumbing",
    category: "Plumber",
    location: "Downtown, Central Ave",
    description:
      "Professional plumbing services for residential and commercial properties. Fast response time and quality work guaranteed.",
    availability: "available" as "available" | "busy" | "offline",
    tags: ["Emergency", "24/7", "Licensed"],
  })

  const [newTag, setNewTag] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const addTag = () => {
    if (newTag && !profile.tags.includes(newTag) && profile.tags.length < 6) {
      setProfile({ ...profile, tags: [...profile.tags, newTag] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setProfile({ ...profile, tags: profile.tags.filter((tag) => tag !== tagToRemove) })
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-8 mt-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Manage Your Profile</h1>
        <p className="text-muted-foreground">Update your service information and availability</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle>Service Information</CardTitle>
            <CardDescription>Edit your business details and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={profile.businessName}
                onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={profile.category}
                onChange={(e) => setProfile({ ...profile, category: e.target.value })}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="e.g., Downtown, Central Ave"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                rows={4}
                placeholder="Describe your services..."
              />
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label>Service Tags</Label>
              <div className="flex gap-2 flex-wrap">
                {profile.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  maxLength={20}
                />
                <Button type="button" variant="secondary" onClick={addTag}>
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Max 6 tags. Press Enter or click Add.</p>
            </div>

            {/* Save Button */}
            <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Availability Card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Availability Status</CardTitle>
              <CardDescription>Let customers know your availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Available</Label>
                  <p className="text-sm text-muted-foreground">Accepting new requests</p>
                </div>
                <Switch
                  checked={profile.availability === "available"}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, availability: checked ? "available" : "offline" })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Busy</Label>
                  <p className="text-sm text-muted-foreground">Limited availability</p>
                </div>
                <Switch
                  checked={profile.availability === "busy"}
                  onCheckedChange={(checked) => setProfile({ ...profile, availability: checked ? "busy" : "offline" })}
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(profile.availability)}`} />
                  <span className="text-sm font-medium capitalize">{profile.availability}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="text-sm font-medium">{user?.email}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Account Type</Label>
                <p className="text-sm font-medium capitalize">Service Provider</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
