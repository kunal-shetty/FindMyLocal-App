export type Pricing =
  | {
    type: "fixed"
    amount: number
    unit: string
  }
  | {
    type: "range"
    min: number
    max: number
    unit: string
  }

export interface Service {
  id: string
  name: string
  category: string
  location: string
  availability: "Available" | "Busy" | "Offline"
  status: "Pending" | "Approved" | "Rejected"
  rating: number
  distance: number
  tags: string[]
  description: string
  images: string[]
  pricing: Pricing
  provider: {
    name: string
    experience: number
    completedJobs: number
    verified: boolean
    languages: string[]
    phone: string
    whatsapp: string
    delete:boolean
  }
  inclusions: string[]
}

export const services: Service[] = [
  {
    id: "1",
    name: "Professional Plumbing & Leak Repair",
    category: "Plumber",
    location: "Andheri West, Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.6,
    distance: 2.3,
    tags: ["Emergency", "24x7", "Home Service"],
    description:
      "Expert plumbing services for homes and offices including leak repair, pipe installation, and bathroom fittings. We use high-quality materials and provide warranty on all work.",
    images: ["/services/plumber-2.webp", "/services/plumber-1.jpg"],
    pricing: {
      type: "range",
      min: 300,
      max: 1200,
      unit: "per visit",
    },
    provider: {
      name: "Ramesh Patil",
      experience: 8,
      completedJobs: 430,
      verified: true,
      languages: ["Hindi", "English", "Marathi"],
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      delete:false
    },
    inclusions: ["Initial inspection", "Basic tools & equipment", "Minor repairs", "Post-service cleanup"],
  },
  {
    id: "2",
    name: "Mathematics Home Tuition (Class 8–12)",
    category: "Tutor",
    location: "Goregaon East, Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.9,
    distance: 3.1,
    tags: ["CBSE", "ICSE", "1-on-1"],
    description:
      "Personalized mathematics tuition with weekly assessments and doubt-solving sessions. Experienced in both CBSE and ICSE boards with proven track record of improving grades.",
    images: ["/services/tutor-1.png", "/services/tutor-2.png"],
    pricing: {
      type: "fixed",
      amount: 4000,
      unit: "per month",
    },
    provider: {
      name: "Anita Sharma",
      experience: 6,
      completedJobs: 120,
      verified: true,
      languages: ["English", "Hindi"],
      phone: "+91 98765 43211",
      whatsapp: "+91 98765 43211",
      delete:false
    },
    inclusions: ["Weekly assessments", "Study material", "Doubt-solving sessions", "Progress reports"],
  },
  {
    id: "3",
    name: "Home Electrical Repairs & Installation",
    category: "Electrician",
    location: "Bandra, Mumbai",
    availability: "Available",
    status: "Rejected",
    rating: 4.7,
    distance: 1.8,
    tags: ["Licensed", "Same Day", "Commercial"],
    description:
      "Licensed electrician providing safe and reliable electrical services including wiring, fixture installation, and troubleshooting for residential and commercial properties.",
    images: ["/services/electrician-1.jpg", "/services/electrician-2.webp"],
    pricing: {
      type: "range",
      min: 250,
      max: 800,
      unit: "per hour",
    },
    provider: {
      name: "Suresh Kumar",
      experience: 12,
      completedJobs: 890,
      verified: true,
      languages: ["Hindi", "English"],
      phone: "+91 98765 43212",
      whatsapp: "+91 98765 43212",
      delete:false
    },
    inclusions: ["Safety inspection", "Quality materials", "Warranty on work", "Emergency support"],
  },
  {
    id: "4",
    name: "Car Service & Maintenance",
    category: "Mechanic",
    location: "Powai, Mumbai",
    availability: "Busy",
    status: "Approved",
    rating: 4.5,
    distance: 4.2,
    tags: ["All Brands", "Doorstep", "Genuine Parts"],
    description:
      "Complete car servicing including oil change, brake inspection, AC service, and general maintenance. We use genuine parts and provide doorstep service.",
    images: ["/services/mechanic-1.webp", "/services/mechanic-2.jpg"],
    pricing: {
      type: "range",
      min: 1500,
      max: 5000,
      unit: "per service",
    },
    provider: {
      name: "AutoCare Solutions",
      experience: 10,
      completedJobs: 650,
      verified: true,
      languages: ["Hindi", "English", "Marathi"],
      phone: "+91 98765 43213",
      whatsapp: "+91 98765 43213",
      delete:false
    },
    inclusions: ["Multi-point inspection", "Oil & filter change", "Brake check", "AC inspection"],
  },
  {
    id: "5",
    name: "Interior Painting Services",
    category: "Painter",
    location: "Malad West, Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.8,
    distance: 2.9,
    tags: ["Premium Paints", "Texture", "Waterproofing"],
    description:
      "Professional interior and exterior painting services with premium quality paints. We offer texture painting, waterproofing, and wood polishing services.",
    images: ["/services/painter-1.jpeg", "/services/painter-2.webp"],
    pricing: {
      type: "range",
      min: 18,
      max: 35,
      unit: "per sq.ft",
    },
    provider: {
      name: "ColorCraft Studios",
      experience: 15,
      completedJobs: 340,
      verified: true,
      languages: ["Hindi", "English"],
      phone: "+91 98765 43214",
      whatsapp: "+91 98765 43214",
      delete:false
    },
    inclusions: ["Color consultation", "Surface preparation", "Premium paints", "Furniture covering"],
  },
  {
    id: "6",
    name: "Carpentry & Furniture Repair",
    category: "Carpenter",
    location: "Kandivali, Mumbai",
    availability: "Available",
    status: "Rejected",
    rating: 4.6,
    distance: 3.5,
    tags: ["Custom Furniture", "Modular", "Repair"],
    description:
      "Expert carpentry services for custom furniture, modular kitchens, wardrobes, and all types of wood work repairs. Quality craftsmanship guaranteed.",
    images: ["/services/carpenter-1.jpg", "/services/carpenter-2.jpg"],
    pricing: {
      type: "range",
      min: 400,
      max: 1000,
      unit: "per day",
    },
    provider: {
      name: "Vijay Woodworks",
      experience: 20,
      completedJobs: 520,
      verified: true,
      languages: ["Hindi", "Marathi"],
      phone: "+91 98765 43215",
      whatsapp: "+91 98765 43215",
      delete:true
    },
    inclusions: ["Free consultation", "Quality materials", "Custom designs", "Installation"],
  },
  {
    id: "7",
    name: "Physics & Chemistry Coaching",
    category: "Tutor",
    location: "Thane West, Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.8,
    distance: 5.2,
    tags: ["JEE", "NEET", "Board Exams"],
    description:
      "Specialized coaching for Physics and Chemistry for JEE/NEET preparation and board exams. Small batch sizes ensure personalized attention.",
    images: ["/services/tutor-3.png", "/services/tutor-4.jpg"],
    pricing: {
      type: "fixed",
      amount: 6000,
      unit: "per month",
    },
    provider: {
      name: "Dr. Rahul Roy",
      experience: 8,
      completedJobs: 200,
      verified: true,
      languages: ["English", "Hindi", "Malayalam"],
      phone: "+91 98765 43216",
      whatsapp: "+91 98765 43216",
      delete:false
    },
    inclusions: ["Study material", "Mock tests", "Doubt sessions", "Performance tracking"],
  },
  {
    id: "8",
    name: "AC Repair & Servicing",
    category: "Electrician",
    location: "Vashi, Navi Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.4,
    distance: 6.1,
    tags: ["All Brands", "Gas Refill", "Installation"],
    description:
      "Complete AC services including repair, gas refilling, installation, and annual maintenance. We service all major brands.",
    images: ["/services/ac-repair-1.webp", "/services/ac-repair-2.png"],
    pricing: {
      type: "range",
      min: 400,
      max: 2500,
      unit: "per service",
    },
    provider: {
      name: "CoolTech Services",
      experience: 7,
      completedJobs: 380,
      verified: true,
      languages: ["Hindi", "English"],
      phone: "+91 98765 43217",
      whatsapp: "+91 98765 43217",
      delete:false
    },
    inclusions: ["Deep cleaning", "Gas check", "Filter cleaning", "Performance check"],
  },
  {
    id: "9",
    name: "Two-Wheeler Repair",
    category: "Mechanic",
    location: "Dadar, Mumbai",
    availability: "Offline",
    status: "Rejected",
    rating: 4.3,
    distance: 2.1,
    tags: ["Bikes", "Scooters", "Doorstep"],
    description:
      "Comprehensive two-wheeler repair and maintenance services. We handle all brands of motorcycles and scooters with doorstep service Available.",
    images: ["/services/two-wheeler-1.webp", "/services/two-wheeler-2.jpg"],
    pricing: {
      type: "range",
      min: 200,
      max: 1500,
      unit: "per service",
    },
    provider: {
      name: "QuickFix Garage",
      experience: 5,
      completedJobs: 290,
      verified: true,
      languages: ["Hindi", "Marathi"],
      phone: "+91 98765 43218",
      whatsapp: "+91 98765 43218",
      delete:false
    },
    inclusions: ["Oil change", "Brake service", "Chain adjustment", "General checkup"],
  },
  {
    id: "10",
    name: "Bathroom Renovation",
    category: "Plumber",
    location: "Chembur, Mumbai",
    availability: "Busy",
    status: "Approved",
    rating: 4.7,
    distance: 4.5,
    tags: ["Complete Renovation", "Premium Fittings", "Waterproofing"],
    description:
      "Complete bathroom renovation services including plumbing, tiling, waterproofing, and fitting installation. Transform your bathroom with our expert team.",
    images: ["/services/bathroom-1.jpg", "/services/bathroom-2.jpg"],
    pricing: {
      type: "range",
      min: 25000,
      max: 80000,
      unit: "per bathroom",
    },
    provider: {
      name: "HomeStyle Renovations",
      experience: 12,
      completedJobs: 180,
      verified: true,
      languages: ["Hindi", "English", "Marathi"],
      phone: "+91 98765 43219",
      whatsapp: "+91 98765 43219",
      delete:false
    },
    inclusions: ["Design consultation", "Demolition", "Waterproofing", "Premium fittings", "Tiling"],
  },
  {
    id: "11",
    name: "Deep Home Cleaning Services",
    category: "Cleaner",
    location: "Borivali West, Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.5,
    distance: 3.8,
    tags: ["Deep Cleaning", "Sanitization", "Eco-Friendly"],
    description:
      "Professional deep cleaning services for homes including kitchen, bathroom, sofa, and floor cleaning using safe and eco-friendly products.",
    images: ["/services/cleaner-1.png", "/services/cleaner-2.jpg"],
    pricing: {
      type: "range",
      min: 2000,
      max: 6000,
      unit: "per visit",
    },
    provider: {
      name: "SparkleClean Team",
      experience: 6,
      completedJobs: 410,
      verified: true,
      languages: ["Hindi", "English"],
      phone: "+91 98765 43220",
      whatsapp: "+91 98765 43220",
      delete:false
    },
    inclusions: ["Kitchen cleaning", "Bathroom sanitization", "Floor mopping", "Waste disposal"],
  },
  
  {
    id: "12",
    name: "Gardening & Lawn Maintenance",
    category: "Gardener",
    location: "Powai, Mumbai",
    availability: "Available",
    status: "Rejected",
    rating: 4.5,
    distance: 4.0,
    tags: ["Lawn Care", "Plant Maintenance", "Seasonal"],
    description:
      "Professional gardening services for homes and societies including lawn maintenance, pruning, and plant care.",
    images: [ "/services/gardener-2.webp", "/services/gardener-1.avif"],
    pricing: {
      type: "range",
      min: 800,
      max: 2500,
      unit: "per visit",
    },
    provider: {
      name: "GreenGrow Services",
      experience: 10,
      completedJobs: 280,
      verified: true,
      languages: ["Hindi", "Marathi"],
      phone: "+91 98765 43221",
      whatsapp: "+91 98765 43221",
      delete:true
    },
    inclusions: ["Pruning", "Watering", "Soil treatment", "Waste removal"],
  },
  {
    id: "13",
    name: "Home Cleaning & Deep Cleaning Services",
    category: "Cleaner",
    location: "Bandra, Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.7,
    distance: 2.8,
    tags: ["Deep Clean", "Regular Service", "Eco-friendly"],
    description:
      "Professional home cleaning services including deep cleaning, carpet shampooing, and kitchen deep cleaning. We use eco-friendly products safe for families and pets.",
    images: ["/services/cleaner-1.png", "/services/cleaner-2.jpg"],
    pricing: {
      type: "range",
      min: 500,
      max: 1800,
      unit: "per session",
    },
    provider: {
      name: "Clean Home Services",
      experience: 7,
      completedJobs: 520,
      verified: true,
      languages: ["Hindi", "English", "Gujarati"],
      phone: "+91 98765 43222",
      whatsapp: "+91 98765 43222",
      delete: false
    },
    inclusions: ["Vacuuming", "Mopping", "Dusting", "Bathroom cleaning", "Kitchen sanitization"],
  },
  {
    id: "14",
    name: "Electrical Repair & Installation",
    category: "Electrician",
    location: "Dadar East, Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.8,
    distance: 3.5,
    tags: ["24x7", "Emergency", "Certified"],
    description:
      "Licensed electrician providing electrical repairs, maintenance, wiring, and LED lighting installation. All work done with safety certificates and guarantees.",
    images: ["/services/electrician-1.jpg", "/services/electrician-2.webp"],
    pricing: {
      type: "range",
      min: 400,
      max: 1500,
      unit: "per visit",
    },
    provider: {
      name: "Rajesh Electrical Works",
      experience: 12,
      completedJobs: 650,
      verified: true,
      languages: ["Hindi", "Marathi", "English"],
      phone: "+91 98765 43223",
      whatsapp: "+91 98765 43223",
      delete: false
    },
    inclusions: ["Troubleshooting", "Safety inspection", "Wire & cable supply", "Labor & installation"],
  },
  {
    id: "15",
    name: "Car Repair & Maintenance Services",
    category: "Mechanic",
    location: "Mahim, Mumbai",
    availability: "Available",
    status: "Approved",
    rating: 4.6,
    distance: 4.2,
    tags: ["Engine Repair", "Servicing", "Quick Fix"],
    description:
      "Professional car mechanic offering engine repairs, general maintenance, brake servicing, and battery replacement. We use genuine spare parts and provide warranty on all repairs.",
    images: ["/services/mechanic-1.webp", "/services/mechanic-2.jpg"],
    pricing: {
      type: "range",
      min: 500,
      max: 3000,
      unit: "per job",
    },
    provider: {
      name: "AutoCare Solutions",
      experience: 11,
      completedJobs: 720,
      verified: true,
      languages: ["Hindi", "Marathi", "English"],
      phone: "+91 98765 43225",
      whatsapp: "+91 98765 43225",
      delete: false
    },
    inclusions: ["Free diagnostics", "Genuine parts", "Labor & installation", "Warranty card"],
  },
  
]
