import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getClientIp, getClientCountry, isIpBlocked, blockIp, HONEYPOT_PATHS, isSearchEngineBot } from '@/lib/security';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super_secret_key_change_me_in_production");

export async function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;
  const clientIp = getClientIp(request);
  const country = getClientCountry(request);

  // 1. Automated Scanner Honeypot Traps: Instant 24h quarantine for malicious bots & scanners
  const isHoneypot = HONEYPOT_PATHS.some(
    (trap) => pathname === trap || pathname.startsWith(`${trap}/`) || pathname.endsWith(trap)
  );

  if (isHoneypot) {
    // Legitimate SEO crawlers (Googlebot, Bingbot, Applebot, etc.) never get banned.
    // If a crawler encounters a dead link to a honeypot path, return a standard 404.
    if (isSearchEngineBot(request)) {
      return new NextResponse('Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    await blockIp(clientIp, `Automated Scanner Trap Triggered: ${pathname}`, 24, country);
    return new NextResponse('Access Denied: Vulnerability scan probe detected and quarantined.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // 2. Sensitive API Perimeter: Block banned IPs from accessing /api endpoints
  if (pathname.startsWith('/api')) {
    const isPublicAnalytics = pathname === '/api/track' || pathname === '/api/push/track';
    if (!isPublicAnalytics) {
      const blockStatus = await isIpBlocked(clientIp);
      if (blockStatus.isBlocked) {
        return NextResponse.json(
          { error: 'Perimeter Access Suspended: Your IP is quarantined.' },
          { status: 403 }
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
            'Cache-Control': 'no-store, max-age=0'
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
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        isValidSession = true;
      } catch (error) {
        isValidSession = false;
      }
    } else if (refreshToken) {
      isValidSession = true;
    }

    if (!isValidSession && !isLoginPage) {
      const loginUrl = new URL('/sudo/login', request.url);
      return NextResponse.redirect(loginUrl);
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
    '/.env',
    '/phpmyadmin/:path*',
    '/.git/:path*',
    '/xmlrpc.php',
    '/admin.php',
    '/shell.php'
  ],
};
