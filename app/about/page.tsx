"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { LandingNav } from "@/components/landing/nav"
import { LandingFooter } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Users, Shield, Zap, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <LandingNav />
        
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About FindMyLocal</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting communities with trusted local service providers. We're on a mission to make finding quality services easier, faster, and more reliable.
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-12 bg-card border-border/50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At FindMyLocal, we believe that everyone deserves access to reliable, professional services in their community. 
                We're building a platform that connects customers with verified local service providers, making it easier than 
                ever to find the right professional for any job.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you need a plumber, tutor, electrician, or any other service provider, we help you find trusted 
                professionals with verified credentials, transparent pricing, and excellent reviews.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
                  <p className="text-muted-foreground">
                    Every provider on our platform is verified through background checks and ID verification. 
                    Your safety is our top priority.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Convenience</h3>
                  <p className="text-muted-foreground">
                    Find, compare, and book services in minutes. Our platform is designed to save you time 
                    and make the process as smooth as possible.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community First</h3>
                  <p className="text-muted-foreground">
                    We're building a platform that supports local businesses and helps communities thrive. 
                    Every booking supports a local professional.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                  <p className="text-muted-foreground">
                    Clear pricing, honest reviews, and upfront information. We believe in transparency 
                    at every step of the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-8 text-center">By The Numbers</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold mb-2">500+</p>
                  <p className="text-muted-foreground">Service Providers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">10K+</p>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">50+</p>
                  <p className="text-muted-foreground">Service Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Join Us</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Whether you're looking for services or offering them, we'd love to have you as part of the FindMyLocal community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/discover">
                <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                  Browse Services
                </button>
              </a>
              <a href="/auth/login">
                <button className="px-6 py-3 rounded-xl border border-border bg-transparent font-medium hover:bg-muted transition-colors">
                  Become a Provider
                </button>
              </a>
            </div>
          </div>
        </main>

        <LandingFooter />
      </div>
    </ThemeProvider>
  )
}

