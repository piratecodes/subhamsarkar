import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const targetUrl = searchParams.get('url') || '/';

  if (id) {
    try {
      // Log the click for telemetry
      await prisma.pushNotificationQueue.update({
        where: { id },
        data: { clickedAt: new Date() }
      });
    } catch (e) {
      console.error("Click track error:", e);
    }
  }

  // Immediately redirect user to destination
  return NextResponse.redirect(new URL(targetUrl, request.url));
}
