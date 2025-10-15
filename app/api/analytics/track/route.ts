import { NextRequest, NextResponse } from "next/server";
import { track } from "@/lib/analytics";
import { analyticsEventSchema } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the incoming data
    const validatedData = analyticsEventSchema.parse(body);
    
    // Track the event
    await track(validatedData.event, validatedData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in analytics track API:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
