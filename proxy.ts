import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const sessionId = request.cookies.get('sessionid')?.value;
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardPage && !sessionId) {
    // Si no hay sesión, mandamos al login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const isPublicPage = request.nextUrl.pathname === '/auth/login'

  if (isPublicPage && sessionId) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ['/auth/login', '/dashboard/:path*'],
}