import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recalculateSubscriberState } from "@/actions/push";

export async function POST(request) {
  try {
    const body = await request.json();
    const { eventType, page, scrollPercent, sessionId } = body;

    if (!eventType || !page || !sessionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Attempt to find an existing subscriber linked to this sessionId
    // We assume the PushSubscription will have the events linked when they subscribe.
    // However, before they subscribe, we just log the event with the sessionId.
    const subscriber = await prisma.pushSubscription.findFirst({
      where: {
        events: {
          some: { sessionId: sessionId }
        }
      }
    });

    const event = await prisma.visitorEvent.create({
      data: {
        eventType,
        page,
        scrollPercent: scrollPercent || null,
        sessionId,
        subscriberId: subscriber ? subscriber.id : null,
      }
    });

    // If they are a known subscriber, recalculate their state immediately
    if (subscriber) {
      await recalculateSubscriberState(subscriber.id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
