import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getClientIp, getClientCountry, isIpBlocked, blockIp, HONEYPOT_PATHS, isSearchEngineBot, recordHoneypotProbe } from '@/lib/security';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super_secret_key_change_me_in_production");

export async function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;
  const clientIp = getClientIp(request);
  const country = getClientCountry(request);

  // 1. Automated Scanner Honeypot Traps: 2-Strike Protection Policy
  const isHoneypot = HONEYPOT_PATHS.some(
    (trap) => pathname === trap || pathname.startsWith(`${trap}/`) || pathname.endsWith(trap)
  );

  if (isHoneypot) {
    // Legitimate SEO crawlers (Googlebot, Bingbot, Applebot, etc.) never get banned.
    // Return standard 404 immediately.
    if (isSearchEngineBot(request)) {
      return new NextResponse('Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const { shouldBan } = await recordHoneypotProbe(clientIp, pathname, country, { userAgent });

    if (shouldBan) {
      return new NextResponse('Access Denied: Vulnerability scan probe detected and quarantined.', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Strike 1 (accidental / curious visit): return standard 404 without banning
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // 2. Sensitive API Perimeter: Block banned IPs from accessing protected /api endpoints
  if (pathname.startsWith('/api')) {
    const isPublicApi = 
      pathname.startsWith('/api/media') || 
      pathname === '/api/track' || 
      pathname === '/api/push/track';

    if (!isPublicApi) {
      const blockStatus = await isIpBlocked(clientIp);
      if (blockStatus.isBlocked) {
        return NextResponse.json(
          { error: 'Perimeter Access Suspended: Your IP is quarantined.' },
          { 
            status: 403,
            headers: {
              'X-Content-Type-Options': 'nosniff',
              'Cache-Control': 'no-store, max-age=0'
            }
          }
        );
      }
    }
    return NextResponse.next();
  }

  // 3. Perimeter Gate: Check if client IP is blocked on /sudo routes
  if (pathname.startsWith('/sudo')) {
    const blockStatus = await isIpBlocked(clientIp);

    if (blockStatus.isBlocked) {
      const remainingMins = Math.max(1, Math.ceil((new Date(blockStatus.blockedUntil).getTime() - Date.now()) / (1000 * 60)));
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>403 - Perimeter Access Suspended</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #090a0f;
      color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .shield-box {
      background: rgba(18, 22, 34, 0.85);
      border: 1px solid rgba(239, 68, 68, 0.3);
      box-shadow: 0 0 50px rgba(239, 68, 68, 0.15);
      border-radius: 24px;
      padding: 48px;
      max-width: 480px;
      width: 90%;
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 9999px;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 0.05em;
      margin: 0 0 12px;
      color: #ffffff;
    }
    p {
      font-size: 13px;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 24px;
    }
    .info-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      padding: 16px;
      text-align: left;
      font-size: 12px;
      font-family: monospace;
      margin-bottom: 24px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .info-row:last-child {
      margin-bottom: 0;
    }
    .info-label {
      color: #64748b;
    }
    .info-val {
      color: #f1f5f9;
      font-weight: bold;
    }
    .footer-note {
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="shield-box">
    <div class="badge">Shield Triggered // 403</div>
    <h1>Perimeter Access Suspended</h1>
    <p>Multiple unauthorized access attempts or suspicious network behavior detected from your IP address. Administrative access has been temporarily blocked.</p>
    <div class="info-card">
      <div class="info-row"><span class="info-label">Client IP:</span><span class="info-val">${clientIp}</span></div>
      <div class="info-row"><span class="info-label">Country:</span><span class="info-val">${country || "Unknown"}</span></div>
      <div class="info-row"><span class="info-label">Reason:</span><span class="info-val">${blockStatus.reason || "Excessive Failed Attempts"}</span></div>
      <div class="info-row"><span class="info-label">Cooldown:</span><span class="info-val">${remainingMins} minute(s) remaining</span></div>
    </div>
    <div class="footer-note">Contact the system administrator or check back after the cooldown period.</div>
  </div>
</body>
</html>`,
        {
          status: 403,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store, max-age=0',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff'
          }
        }
      );
    }
  }

  // If instructed to clear cookies
  if (searchParams.get('clear') === '1') {
    const response = NextResponse.redirect(new URL('/sudo/login', request.url));
    response.cookies.delete('opt_access');
    response.cookies.delete('opt_refresh');
    return response;
  }
  
  // Protect /sudo routes
  if (pathname.startsWith('/sudo')) {
    const isLoginPage = pathname === '/sudo/login' || pathname.startsWith('/sudo/reset-password');
    const token = request.cookies.get('opt_access')?.value;
    const refreshToken = request.cookies.get('opt_refresh')?.value;

    let isValidSession = false;

    // 1. Check primary short-lived access token (15 mins)
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        isValidSession = true;
      } catch {
        isValidSession = false;
      }
    }

    // 2. Seamless Fallback: If access token is expired or missing, check long-lived refresh token (7 days)
    if (!isValidSession && refreshToken) {
      try {
        const { payload } = await jwtVerify(refreshToken, JWT_SECRET);
        if (payload?.userId) {
          isValidSession = true;
        }
      } catch {
        isValidSession = false;
      }
    }

    if (!isValidSession && !isLoginPage) {
      const loginUrl = new URL('/sudo/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      // Clean up stale cookies if tokens were invalid/expired
      if (token || refreshToken) {
        response.cookies.delete('opt_access');
        response.cookies.delete('opt_refresh');
      }
      return response;
    }

    if (isValidSession && isLoginPage) {
      const dashboardUrl = new URL('/sudo', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sudo/:path*',
    '/sudo',
    '/api/:path*',
    '/wp-login.php',
    '/wp-admin/:path*',
    '/wp-content/:path*',
    '/wp-includes/:path*',
    '/.env:path*',
    '/.git/:path*',
    '/.aws/:path*',
    '/phpmyadmin/:path*',
    '/cgi-bin/:path*',
    '/telescope/:path*',
    '/xmlrpc.php',
    '/admin.php',
    '/shell.php',
    '/config.json'
  ],
};
