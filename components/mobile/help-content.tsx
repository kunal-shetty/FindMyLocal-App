"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronRight, 
  ArrowLeft,
  BookOpen,
  Shield,
  CreditCard,
  Calendar,
  User,
  Search
} from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    icon: Search,
    title: "Finding Services",
    questions: [
      {
        q: "How do I search for services?",
        a: "Use the Discover tab to browse services by category, or use the search bar to find specific services. You can filter by location, price, and ratings."
      },
      {
        q: "Can I filter services by location?",
        a: "Yes! Use the location filter in the Discover page to find services near you. The app shows distance from your location."
      },
      {
        q: "How do I know if a provider is verified?",
        a: "Verified providers have a green checkmark badge next to their name. We verify all providers before they can offer services."
      }
    ]
  },
  {
    icon: Calendar,
    title: "Booking Services",
    questions: [
      {
        q: "How do I book a service?",
        a: "Tap on any service to view details, then click 'Book Service'. Choose your preferred date and time, and confirm your booking."
      },
      {
        q: "Can I cancel a booking?",
        a: "Yes, you can cancel bookings from the Bookings tab. Cancellations made 24 hours in advance are free."
      },
      {
        q: "How do I reschedule a booking?",
        a: "Go to your Bookings tab, tap on the booking you want to reschedule, and select 'Reschedule'. Choose a new date and time."
      }
    ]
  },
  {
    icon: CreditCard,
    title: "Payments & Pricing",
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept credit/debit cards, UPI, net banking, and digital wallets. Cash payments can be arranged directly with providers."
      },
      {
        q: "When do I pay for a service?",
        a: "Payment is typically made after the service is completed. Some providers may require a deposit for large jobs."
      },
      {
        q: "Are prices negotiable?",
        a: "Base prices are fixed, but you can discuss pricing directly with providers through chat or phone before booking."
      }
    ]
  },
  {
    icon: Shield,
    title: "Safety & Security",
    questions: [
      {
        q: "How do you verify providers?",
        a: "All providers undergo background checks, ID verification, and skill assessments before being approved on our platform."
      },
      {
        q: "What if I'm not satisfied with the service?",
        a: "Contact our support team immediately. We'll investigate and work with you and the provider to resolve the issue."
      },
      {
        q: "Is my personal information safe?",
        a: "Yes, we use industry-standard encryption and never share your personal information with third parties without consent."
      }
    ]
  }
]

export function MobileHelpContent() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const allQuestions = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({ ...q, category: cat.title }))
  )

  const filteredQuestions = searchQuery
    ? allQuestions.filter(q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

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
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-sm text-muted-foreground">Get answers to your questions</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Quick Actions */}
      {!searchQuery && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-card border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Chat Support</p>
                <p className="text-xs text-muted-foreground mt-1">24/7 Available</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                  <Phone className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-sm font-medium">Call Us</p>
                <p className="text-xs text-muted-foreground mt-1">+91 1800-XXX-XXXX</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && filteredQuestions.length > 0 && (
        <div className="space-y-3 mb-6">
          <h2 className="text-lg font-semibold">Search Results</h2>
          {filteredQuestions.map((item, idx) => (
            <Card key={idx} className="bg-card border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                <h3 className="font-medium mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* FAQ Categories */}
      {!searchQuery && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          {faqCategories.map((category, catIdx) => (
            <Card key={catIdx} className="bg-card border-border/50">
              <CardContent className="p-0">
                <button
                  onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                  className="w-full p-4 flex items-center justify-between active:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      selectedCategory === category.title ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {selectedCategory === category.title && (
                  <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-4">
                    {category.questions.map((faq, idx) => (
                      <div key={idx} className="space-y-1">
                        <h3 className="font-medium text-sm">{faq.q}</h3>
                        <p className="text-sm text-muted-foreground">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Contact Support */}
      <Card className="mt-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Still need help?</h3>
              <p className="text-sm text-muted-foreground">Our support team is here for you</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full h-12 rounded-xl" asChild>
              <Link href="mailto:support@findmylocal.com">
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Link>
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl bg-transparent" asChild>
              <Link href="tel:+911800XXXXXX">
                <Phone className="w-5 h-5 mr-2" />
                Call Support
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

