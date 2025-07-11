import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/booking',
  '/chat',
  '/admin',
]

// Define routes that are only accessible when NOT authenticated
const authRoutes = [
  '/login',
  '/register',
]

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

export async function middleware(req: NextRequest) {
  // For client-side auth, we'll check the auth state via localStorage
  // This is a simplified version - in production you might want to use
  // a more robust solution like Next.js middleware with edge functions
  
  const path = req.nextUrl.pathname
  
  // Check if the path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  // Check if the path exactly matches any auth route
  const isAuthRoute = authRoutes.includes(path)

  // We'll handle auth redirects on the client side instead
  // This simplifies the middleware and removes cookie dependencies
  
  return NextResponse.next()
}