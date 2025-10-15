"use server";

import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { analyticsEventSchema, type AnalyticsEventData } from "@/lib/schema";

// Utility functions for parsing user agent and extracting device info
function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();
  
  // Detect device type
  let device: "desktop" | "mobile" | "tablet" = "desktop";
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    device = "mobile";
  } else if (/tablet|ipad|android(?!.*mobile)/i.test(ua)) {
    device = "tablet";
  }
  
  // Detect browser
  let browser = "unknown";
  if (ua.includes("chrome")) browser = "chrome";
  else if (ua.includes("firefox")) browser = "firefox";
  else if (ua.includes("safari")) browser = "safari";
  else if (ua.includes("edge")) browser = "edge";
  else if (ua.includes("opera")) browser = "opera";
  
  // Detect OS
  let os = "unknown";
  if (ua.includes("windows")) os = "windows";
  else if (ua.includes("mac")) os = "macos";
  else if (ua.includes("linux")) os = "linux";
  else if (ua.includes("android")) os = "android";
  else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad")) os = "ios";
  
  return { device, browser, os };
}

// Get client IP address
async function getClientIP(): Promise<string | undefined> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const cfConnectingIP = headersList.get("cf-connecting-ip");
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(",")[0]?.trim();
  
  return undefined;
}

// Generate session ID
function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Track analytics event (server-side)
export async function track(
  event: string,
  data: Partial<AnalyticsEventData> = {}
): Promise<void> {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const referrer = headersList.get("referer") || undefined;
    const ipAddress = await getClientIP();
    
    const { device, browser, os } = parseUserAgent(userAgent);
    
    // Generate session ID if not provided
    const sessionId = data.sessionId || generateSessionId();
    
    const eventData: AnalyticsEventData = {
      event,
      page: data.page,
      referrer: data.referrer || referrer,
      userAgent,
      ipAddress,
      country: data.country,
      city: data.city,
      device,
      browser,
      os,
      sessionId,
      userId: data.userId,
      metadata: data.metadata,
    };
    
    // Validate data
    const validatedData = analyticsEventSchema.parse(eventData);
    
    // Save to database
    await prisma.analyticsEvent.create({
      data: {
        ...validatedData,
        metadata: validatedData.metadata as any,
      },
    });
    
    // Update session if it exists
    await updateSession(sessionId, event);
    
  } catch (error) {
    console.error("Error tracking analytics event:", error);
    // Don't throw error to avoid breaking the user experience
  }
}

// Update session data
async function updateSession(sessionId: string, event: string): Promise<void> {
  try {
    const session = await prisma.analyticsSession.findUnique({
      where: { sessionId },
    });
    
    if (session) {
      // Update existing session
      await prisma.analyticsSession.update({
        where: { sessionId },
        data: {
          events: { increment: 1 },
          pageViews: event === "page_view" ? { increment: 1 } : undefined,
        },
      });
    } else {
      // Create new session
      const headersList = await headers();
      const userAgent = headersList.get("user-agent") || "";
      const referrer = headersList.get("referer") || undefined;
      const ipAddress = await getClientIP();
      
      const { device, browser, os } = parseUserAgent(userAgent);
      
      await prisma.analyticsSession.create({
        data: {
          sessionId,
          ipAddress,
          userAgent,
          referrer,
          device,
          browser,
          os,
          pageViews: event === "page_view" ? 1 : 0,
          events: 1,
        },
      });
    }
  } catch (error) {
    console.error("Error updating session:", error);
  }
}

// Track page view
export async function trackPageView(page: string, userId?: string): Promise<void> {
  await track("page_view", { page, userId });
}

// Track survey events
export async function trackSurveyStarted(userId?: string): Promise<void> {
  await track("survey_started", { userId });
}

export async function trackSurveyCompleted(userId?: string): Promise<void> {
  await track("survey_completed", { userId });
}

export async function trackSurveyAbandoned(userId?: string): Promise<void> {
  await track("survey_abandoned", { userId });
}

// Get analytics data for dashboard
export async function getAnalyticsData(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const [events, sessions, pageViews] = await Promise.all([
    // Get events by type
    prisma.analyticsEvent.groupBy({
      by: ["event"],
      where: {
        createdAt: { gte: startDate },
      },
      _count: { id: true },
    }),
    
    // Get daily sessions
    prisma.analyticsSession.findMany({
      where: {
        startedAt: { gte: startDate },
      },
      select: {
        startedAt: true,
        pageViews: true,
        events: true,
      },
    }),
    
    // Get daily page views
    prisma.analyticsEvent.findMany({
      where: {
        event: "page_view",
        createdAt: { gte: startDate },
      },
      select: {
        createdAt: true,
        sessionId: true,
      },
    }),
  ]);
  
  return {
    events,
    sessions,
    pageViews,
  };
}
