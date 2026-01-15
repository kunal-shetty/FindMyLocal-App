# **FindMyLocal – Local Service Discovery Platform**

FindMyLocal is a modern, responsive web and app-based platform designed to simplify the process of discovering and managing local services. It connects normal people like us who need local services with nearby service providers, while also helping local vendors gain visibility beyond traditional word-of-mouth methods.

The platform focuses on strong UI/UX design, smooth client-side interactions, and a real-world product experience, while remaining frontend-centric as per the challenge requirements.

---

## **Key Features**

### **For People Looking for Services**

* Browse verified local service providers across multiple categories
* Real-time search and filtering (category, location, availability)
* Compare up to 3 service providers side-by-side
* View detailed service profiles with pricing and availability
* Fully responsive, app-like experience on all devices

### **For Service Providers**

* Dedicated provider dashboard
* View live bookings and service activity
* Track basic service statistics and engagement
* Manage service details and availability
* Designed to simulate real-world vendor management workflows

### **Authentication**

* Email-based OTP authentication
* No passwords required
* Role-based access (Service Seeker / Service Provider)
* Client-side session handling for prototype purposes

### **UI / UX**

* Animated landing page with GSAP
* Smooth transitions and interactive elements
* Light and dark mode support
* Loading states and empty states for better feedback
* Mobile-first, fully responsive design

---

## **Tech Stack Used**

### **Frontend**

* **Next.js (App Router)** – Main application framework
* **React.js** – Component-based UI development
* **Tailwind CSS** – Utility-first styling
* **shadcn/ui** – Accessible and modern UI components
* **GSAP** – Animations and transitions

### **Hosting & Deployment**

* **Firebase Hosting** – Static site hosting
* **GitHub Actions** – CI/CD for automated deployment

### **Data Handling**

* Static data for services and providers
* Local and session storage for temporary state handling

---

## **Project Structure**

```
app/
├── page.tsx                     # Landing page
├── discover/page.tsx            # Service discovery
├── services/page.tsx            # Service detail page
├── provider/dashboard/page.tsx  # Provider dashboard
├── mobile/page.tsx              # Mobile application
├── auth/
│   ├── login/page.tsx
│   └── verify-otp/page.tsx
components/
├── landing/
├── discover/
├── provider/
├── mobile/
├── ui/
context/
├── auth-context.tsx
├── service-context.tsx
data/
└── services.ts
```

---
## **Getting Started**
## **Prerequisites**

Node.js 18+

npm / yarn / pnpm

Installation
```
git clone <repository-url>
cd findmylocal-app
npm install
```


## **Environment Setup**

Create a .env.local file in the root directory and add your Resend API key:
```
RESEND_API_KEY=your_resend_api_key_here
```

This API key is used for email-based OTP authentication.
You can generate the key from: https://resend.com/api-keys

**Run Locally**
```npm run dev
```

Open http://localhost:3000 in your browser.

Firebase Hosting

The project is deployed using Firebase Hosting

Routing is handled using rewrite rules for SPA behavior

Authentication Flow (Prototype)

Email is entered on the login page

OTP is generated and sent via email (simulated for prototype)

OTP verification

Role selection for new users

Redirect based on selected role

## **Dummy Data**

The project includes multiple pre-configured local service providers such as:

* Tutors
* Plumbers
* Electricians
* Mechanics
* Home services

Each service includes:

* Name and category
* Location and distance
* Availability status
* Ratings and tags
* Pricing model (fixed or variable)

---

## **Limitations**

* Static data only (no database integration)
* OTP and authentication are prototype-level
* No real payment gateway integration
* No real-time backend updates

These limitations are intentional and align with the challenge scope.

---

## **Future Enhancements**

* Database integration (Firestore / SQL)
* Secure payment gateway integration
* Real provider onboarding
* Booking history and analytics
* Reviews and ratings system
* Mobile application version

---

## **Conclusion**

FindMyLocal demonstrates a complete, frontend-focused local service discovery platform with strong emphasis on UI/UX, responsiveness, and real-world workflows. The project successfully simulates a production-like experience while keeping the architecture simple and scalable for future enhancements.

