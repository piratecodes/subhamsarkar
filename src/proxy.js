import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super_secret_key_change_me_in_production");

export async function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;
  
  // If we are instructed to clear cookies (e.g. from a layout redirecting due to invalid DB session)
  if (searchParams.get('clear') === '1') {
    const response = NextResponse.redirect(new URL('/sudo/login', request.url));
    response.cookies.delete('opt_access');
    response.cookies.delete('opt_refresh');
    return response;
  }
  
  // Only protect /sudo routes
  if (pathname.startsWith('/sudo')) {
    const isLoginPage = pathname === '/sudo/login' || pathname.startsWith('/sudo/reset-password');
    const token = request.cookies.get('opt_access')?.value;
    const refreshToken = request.cookies.get('opt_refresh')?.value;

    // Verify token
    let isValidSession = false;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        isValidSession = true;
      } catch (error) {
        isValidSession = false;
      }
    } else if (refreshToken) {
      // If access token is expired/missing but refresh token exists,
      // allow the request through. The verifySession() in the server action
      // will handle the actual validation and issuing of a new access token.
      isValidSession = true;
    }

    if (!isValidSession && !isLoginPage) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/sudo/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (isValidSession && isLoginPage) {
      // Redirect to dashboard if already authenticated
      const dashboardUrl = new URL('/sudo', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sudo/:path*', '/sudo'],
};
