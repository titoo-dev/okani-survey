import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get real-time statistics
    const [
      currentHourVisits,
      todayVisits,
      todayUniqueVisitors,
      activeSessions,
      recentEvents
    ] = await Promise.all([
      // Visits in the last hour
      prisma.analyticsEvent.count({
        where: {
          event: "page_view",
          createdAt: { gte: oneHourAgo },
        },
      }),
      
      // Today's visits
      prisma.analyticsEvent.count({
        where: {
          event: "page_view",
          createdAt: { gte: today },
        },
      }),
      
      // Today's unique visitors
      prisma.analyticsEvent.groupBy({
        by: ["sessionId"],
        where: {
          event: "page_view",
          createdAt: { gte: today },
        },
        _count: { sessionId: true },
      }).then(result => result.length),
      
      // Active sessions (sessions that started in the last 30 minutes)
      prisma.analyticsSession.count({
        where: {
          startedAt: { gte: new Date(now.getTime() - 30 * 60 * 1000) },
        },
      }),
      
      // Recent events (last 10 events)
      prisma.analyticsEvent.findMany({
        where: {
          createdAt: { gte: oneHourAgo },
        },
        select: {
          event: true,
          page: true,
          createdAt: true,
          device: true,
          browser: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    // Get hourly breakdown for today
    const hourlyBreakdown = await getHourlyBreakdown(today);

    // Get top pages today
    const topPagesToday = await prisma.analyticsEvent.groupBy({
      by: ["page"],
      where: {
        event: "page_view",
        createdAt: { gte: today },
        page: { not: null },
      },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    });

    // Get device breakdown for today
    const deviceBreakdown = await prisma.analyticsEvent.groupBy({
      by: ["device"],
      where: {
        event: "page_view",
        createdAt: { gte: today },
        device: { not: null },
      },
      _count: { id: true },
    });

    const response = {
      success: true,
      data: {
        timestamp: now.toISOString(),
        realtime: {
          currentHourVisits,
          todayVisits,
          todayUniqueVisitors,
          activeSessions,
        },
        hourlyBreakdown,
        topPagesToday: topPagesToday.map(page => ({
          page: page.page || "Unknown",
          visits: page._count.id,
        })),
        deviceBreakdown: deviceBreakdown.map(device => ({
          device: device.device || "Unknown",
          visits: device._count.id,
        })),
        recentEvents: recentEvents.map(event => ({
          event: event.event,
          page: event.page,
          device: event.device,
          browser: event.browser,
          timestamp: event.createdAt.toISOString(),
        })),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching realtime analytics:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch realtime analytics" 
      },
      { status: 500 }
    );
  }
}

async function getHourlyBreakdown(startOfDay: Date) {
  try {
    const hourlyData = await prisma.analyticsEvent.groupBy({
      by: ["createdAt"],
      where: {
        event: "page_view",
        createdAt: { gte: startOfDay },
      },
      _count: { id: true },
    });
    
    // Initialize hourly array (0-23)
    const hourlyStats = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      visits: 0,
    }));
    
    // Process hourly data
    hourlyData.forEach((item: any) => {
      const hour = new Date(item.createdAt).getHours();
      const index = hourlyStats.findIndex(stat => stat.hour === hour);
      if (index !== -1) {
        hourlyStats[index].visits += item._count.id;
      }
    });
    
    return hourlyStats;
  } catch (error) {
    console.error("Error fetching hourly breakdown:", error);
    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      visits: 0,
    }));
  }
}
