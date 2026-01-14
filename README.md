# FindMyLocal - Local Service Discovery Platform

A production-grade SaaS web application for connecting service seekers with local service providers. Built with Next.js 16, React 19, GSAP animations, and OTP-based authentication.

## Features

### For Service Seekers (Users)
- Browse 20+ verified service providers across multiple categories
- Advanced search and filtering (category, location, availability)
- Compare up to 3 providers side-by-side
- Real-time availability indicators
- Responsive design optimized for all devices

### For Service Providers
- Dedicated provider dashboard with analytics
- Manage service profile and availability status
- Track engagement metrics (views, comparisons, shortlists)
- Real-time activity feed
- Tag management and description editing

### Authentication
- Email-based OTP authentication via Resend
- No passwords required
- Role-based access (User vs Provider)
- Secure session management

### UI/UX
- Premium animated landing page with GSAP
- Scroll-triggered animations
- Light/dark mode support
- Skeleton loading states
- Empty state handling

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animations:** GSAP, Framer Motion
- **Email:** Resend
- **Icons:** Lucide React
- **State Management:** React Context API

## Project Structure

\`\`\`
app/
├── page.tsx                    # Landing page with GSAP animations
├── discover/page.tsx           # Service discovery (User role)
├── provider/dashboard/page.tsx # Provider dashboard
├── auth/
│   ├── login/page.tsx         # Email entry
│   └── verify-otp/page.tsx    # OTP verification + role selection
└── api/auth/
    ├── send-otp/route.ts      # OTP generation & email
    └── verify-otp/route.ts    # OTP verification

components/
├── landing/                    # Landing page sections
├── discover/                   # Discovery page components
├── provider/                   # Provider dashboard components
└── ui/                        # shadcn/ui components

context/
├── auth-context.tsx           # Authentication state
└── service-context.tsx        # Service discovery state

data/
└── services.ts                # Mock service data (22+ providers)
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd service-discovery-platform
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:

Create a `.env.local` file in the root directory:

\`\`\`env
# Resend API Key (for OTP emails)
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxx
\`\`\`

**Important:** To use email functionality, you need to:
1. Sign up at [Resend.com](https://resend.com)
2. Verify your domain (or use the testing domain)
3. Get your API key and add it to `.env.local`

### Running Locally

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Authentication Flow

1. **Login:** User enters email address
2. **OTP Generation:** 6-digit code is generated and sent via Resend
3. **Verification:** User enters OTP
4. **Role Selection:** New users choose between "User" or "Provider"
5. **Redirect:** Users go to `/discover`, Providers go to `/provider/dashboard`

### Testing OTP (Without Resend)

For development without Resend, the OTP will be logged to the console. Check your terminal after requesting an OTP.

## Route Protection

- `/`: Public landing page
- `/auth/*`: Public authentication routes
- `/discover`: Protected (Users only)
- `/provider/*`: Protected (Providers only)

Protection is handled client-side with redirects based on authentication state and user role.

## Data Persistence

Currently uses:
- **localStorage** for authentication state
- **In-memory storage** for OTPs (development only)

For production, replace with:
- Database for user accounts
- Redis for OTP storage
- JWT tokens for sessions

## Dummy Data

The app includes 22 pre-configured service providers across 8 categories:
- Plumbers
- Electricians
- Tutors
- Mechanics
- Carpenters
- Cleaners
- Painters
- Gardeners

Each provider has:
- Business name & category
- Location & distance
- Availability status
- Rating & tags
- Description

## Customization

### Adding More Services

Edit `data/services.ts` to add more service providers:

\`\`\`typescript
{
  id: "23",
  name: "Your Service Name",
  category: "Your Category",
  location: "Your Location",
  availability: "available", // or "busy" or "offline"
  rating: 4.8,
  distance: 2.5,
  tags: ["Tag1", "Tag2"],
  description: "Your service description..."
}
\`\`\`

### Changing Color Scheme

Edit `app/globals.css` to modify the color palette. The app uses CSS custom properties for theming.

### Modifying Animations

GSAP animations are in:
- `components/landing/hero.tsx`
- `components/landing/features.tsx`
- `components/landing/cta.tsx`

Adjust `duration`, `ease`, and `scrollTrigger` properties.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add `RESEND_API_KEY` environment variable
4. Deploy

### Other Platforms

Ensure your hosting supports:
- Next.js 16 App Router
- Node.js 18+
- Environment variables

## Known Limitations

- OTPs stored in memory (expires on server restart)
- No actual email delivery without Resend API key
- Mock analytics data in provider dashboard
- Client-side only state management
- No real-time updates

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Real-time chat between users and providers
- Payment integration (Stripe)
- Review and rating system
- Advanced analytics for providers
- Email notifications
- Mobile app (React Native)

## Contributing

This is a demonstration project. For production use, implement:
- Proper authentication (JWT, sessions)
- Database integration
- API rate limiting
- Error boundary handling
- Unit and integration tests
- Monitoring and logging

## License

MIT

## Support

For questions or issues, open an issue in the repository.

---

Built with Next.js, React, and GSAP. Designed for modern SaaS applications.
