import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/descriptors/types - Get all unique descriptor types
export async function GET() {
  try {
    const descriptors = await prisma.descriptor.findMany({
      select: { type: true },
      distinct: ["type"],
      orderBy: { type: "asc" },
    });

    const types = descriptors.map((d) => d.type);

    return NextResponse.json({
      success: true,
      data: types,
      count: types.length,
    });
  } catch (error) {
    console.error("Error fetching descriptor types:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch descriptor types",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
