import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Schema for descriptor validation
const descriptorSchema = z.object({
  type: z.string().min(1, "Type is required"),
  value: z.string().min(1, "Value is required"),
  label: z.string().min(1, "Label is required"),
});

// GET /api/descriptors - Get all descriptors or filter by type
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const where = type ? { type } : {};

    const descriptors = await prisma.descriptor.findMany({
      where,
      orderBy: [{ type: "asc" }, { label: "asc" }],
    });

    return NextResponse.json({
      success: true,
      data: descriptors,
      count: descriptors.length,
    });
  } catch (error) {
    console.error("Error fetching descriptors:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch descriptors",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST /api/descriptors - Create a new descriptor
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = descriptorSchema.parse(body);

    // Check if descriptor with same type and value already exists
    const existing = await prisma.descriptor.findUnique({
      where: {
        type_value: {
          type: validatedData.type,
          value: validatedData.value,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Descriptor already exists",
          message: `A descriptor with type "${validatedData.type}" and value "${validatedData.value}" already exists`,
        },
        { status: 409 },
      );
    }

    const descriptor = await prisma.descriptor.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        data: descriptor,
        message: "Descriptor created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating descriptor:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create descriptor",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
