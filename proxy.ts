import { type NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  const publicRoutes = ["/", "/auth/login", "/auth/verify-otp"]
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // For API routes, allow them (they handle their own auth)
  if (pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // For protected routes, let client-side handle auth checks
  // This is a simplified version - in production you'd check cookies/tokens
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.*|apple-icon.png).*)"],
}
