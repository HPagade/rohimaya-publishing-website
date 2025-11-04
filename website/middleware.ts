import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Middleware logic can be added here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
)

// Protect all routes except public marketing pages
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/app/:path*',
    '/formatter/:path*',
    '/covers/:path*',
    '/images/:path*',
    '/audiobook/:path*',
    '/api/writer/:path*',
    '/api/audio/:path*',
    '/api/proxy/:path*',
  ],
}
