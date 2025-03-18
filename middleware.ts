import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For simplicity in this demo, we'll just check if the dashboard route is accessed
  // In a real app, you would verify the JWT token here

  const path = request.nextUrl.pathname

  // If trying to access dashboard routes, check for authentication
  if (path.startsWith("/dashboard")) {
    // Check for authentication cookie or token
    // For this demo, we'll just redirect to login if needed

    // This is a simplified check - in a real app you'd verify the JWT
    const authCookie = request.cookies.get("auth")
    const isAuthenticated = !!authCookie?.value

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

