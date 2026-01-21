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
import { X, Plus, Phone, MessageCircle, Upload, Image as ImageIcon, Sparkles } from "lucide-react"

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
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    experience: 8,
    completedJobs: 430,
    languages: ["Hindi", "English", "Marathi"],
    pricingType: "range" as "fixed" | "range",
    pricingFixed: 500,
    pricingMin: 300,
    pricingMax: 1200,
    pricingUnit: "per visit",
    inclusions: ["Initial inspection", "Basic tools & equipment", "Minor repairs", "Post-service cleanup"],
  })

  const [newTag, setNewTag] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [serviceImages, setServiceImages] = useState<string[]>([
    "/services/plumber-1.jpg",
    "/services/plumber-2.webp",
  ])
  

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
            {/* Service Images */}
            <div className="space-y-3">
              <Label>Service Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {serviceImages.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-border/50">
                    <img
                      src={img}
                      alt={`Service ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setServiceImages(serviceImages.filter((_, i) => i !== idx))
                      }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {serviceImages.length < 6 && (
                  <label className="aspect-square border-2 border-dashed border-border/50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            if (reader.result) {
                              setServiceImages([...serviceImages, reader.result as string])
                            }
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Upload up to 6 images. Recommended: 1200x800px</p>
            </div>

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

            {/* Contact Information */}
            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-semibold">Contact Information</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Number
                  </Label>
                  <Input
                    id="whatsapp"
                    value={profile.whatsapp}
                    onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Experience & Stats */}
            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-semibold">Experience & Stats</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completedJobs">Completed Jobs</Label>
                  <Input
                    id="completedJobs"
                    type="number"
                    min="0"
                    value={profile.completedJobs}
                    onChange={(e) => setProfile({ ...profile, completedJobs: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-3 pt-4 border-t">
              <Label>Languages Spoken</Label>
              <div className="flex gap-2 flex-wrap">
                {profile.languages.map((lang) => (
                  <Badge key={lang} variant="secondary" className="gap-1">
                    {lang}
                    <button
                      type="button"
                      onClick={() =>
                        setProfile({
                          ...profile,
                          languages: profile.languages.filter((l) => l !== lang),
                        })
                      }
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add language..."
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const lang = newLanguage.trim()
                      if (lang && !profile.languages.includes(lang)) {
                        setProfile({ ...profile, languages: [...profile.languages, lang] })
                        setNewLanguage("")
                      }
                    }
                  }}
                  maxLength={20}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    const lang = newLanguage.trim()
                    if (lang && !profile.languages.includes(lang)) {
                      setProfile({ ...profile, languages: [...profile.languages, lang] })
                      setNewLanguage("")
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-semibold">Pricing</Label>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={profile.pricingType === "fixed"}
                      onChange={() => setProfile({ ...profile, pricingType: "fixed" })}
                      className="w-4 h-4"
                    />
                    Fixed Price
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={profile.pricingType === "range"}
                      onChange={() => setProfile({ ...profile, pricingType: "range" })}
                      className="w-4 h-4"
                    />
                    Price Range
                  </label>
                </div>
                {profile.pricingType === "fixed" ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pricingFixed">Amount</Label>
                      <Input
                        id="pricingFixed"
                        type="number"
                        min="0"
                        value={profile.pricingFixed}
                        onChange={(e) =>
                          setProfile({ ...profile, pricingFixed: parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pricingUnit">Unit</Label>
                      <Input
                        id="pricingUnit"
                        value={profile.pricingUnit}
                        onChange={(e) => setProfile({ ...profile, pricingUnit: e.target.value })}
                        placeholder="per visit"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pricingMin">Min Amount</Label>
                      <Input
                        id="pricingMin"
                        type="number"
                        min="0"
                        value={profile.pricingMin}
                        onChange={(e) =>
                          setProfile({ ...profile, pricingMin: parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pricingMax">Max Amount</Label>
                      <Input
                        id="pricingMax"
                        type="number"
                        min="0"
                        value={profile.pricingMax}
                        onChange={(e) =>
                          setProfile({ ...profile, pricingMax: parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pricingUnitRange">Unit</Label>
                      <Input
                        id="pricingUnitRange"
                        value={profile.pricingUnit}
                        onChange={(e) => setProfile({ ...profile, pricingUnit: e.target.value })}
                        placeholder="per visit"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Inclusions */}
            <div className="space-y-3 pt-4 border-t">
              <Label>Service Inclusions</Label>
              <div className="space-y-2">
                {profile.inclusions.map((inclusion, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      value={inclusion}
                      onChange={(e) => {
                        const updated = [...profile.inclusions]
                        updated[idx] = e.target.value
                        setProfile({ ...profile, inclusions: updated })
                      }}
                      placeholder="Inclusion item"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setProfile({
                          ...profile,
                          inclusions: profile.inclusions.filter((_, i) => i !== idx),
                        })
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      inclusions: [...profile.inclusions, ""],
                    })
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Inclusion
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3 pt-4 border-t">
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

          {/* AI Suggestions */}
          <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Profile Tips
              </CardTitle>
              <CardDescription>Optimize your profile for better visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">📝 Description Enhancement</p>
                <p className="text-xs text-muted-foreground">
                  Your description is good! Consider adding more specific details about your expertise
                  and unique selling points.
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">🏷️ Tag Optimization</p>
                <p className="text-xs text-muted-foreground">
                  Add tags like "24/7", "Emergency", or "Licensed" to improve search visibility.
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">💰 Pricing Suggestion</p>
                <p className="text-xs text-muted-foreground">
                  Your pricing is competitive. Consider offering package deals for repeat customers.
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <p className="text-sm font-medium mb-1">📸 Image Quality</p>
                <p className="text-xs text-muted-foreground">
                  {serviceImages.length < 3
                    ? "Add more high-quality images to showcase your work. Customers prefer profiles with 3+ images."
                    : "Great! You have enough images. Keep them updated with your latest work."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
