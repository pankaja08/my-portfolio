import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  // If maintenance mode is enabled and the request is not already for the maintenance page
  if (isMaintenanceMode && request.nextUrl.pathname !== '/maintenance') {
    // Rewrite all requests to the maintenance page
    return NextResponse.rewrite(new URL('/maintenance', request.url));
  }
  
  // If maintenance mode is disabled but user tries to access /maintenance directly,
  // we might want to redirect them to home page (optional)
  if (!isMaintenanceMode && request.nextUrl.pathname === '/maintenance') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
  ],
};
