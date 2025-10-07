import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const descriptorSchema = z.object({
  type: z.string().min(1),
  value: z.string().min(1),
  label: z.string().min(1),
});

const bulkCreateSchema = z.object({
  descriptors: z.array(descriptorSchema),
});

// POST /api/descriptors/bulk - Create multiple descriptors at once
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const { descriptors } = bulkCreateSchema.parse(body);

    // Check for duplicates in the request
    const uniqueKeys = new Set();
    for (const desc of descriptors) {
      const key = `${desc.type}:${desc.value}`;
      if (uniqueKeys.has(key)) {
        return NextResponse.json(
          {
            success: false,
            error: "Duplicate descriptors in request",
            message: `Duplicate found: type="${desc.type}", value="${desc.value}"`,
          },
          { status: 400 },
        );
      }
      uniqueKeys.add(key);
    }

    // Check for existing descriptors
    const existing = await prisma.descriptor.findMany({
      where: {
        OR: descriptors.map((d) => ({
          type: d.type,
          value: d.value,
        })),
      },
    });

    if (existing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Some descriptors already exist",
          existing: existing.map((d) => ({
            type: d.type,
            value: d.value,
            label: d.label,
          })),
        },
        { status: 409 },
      );
    }

    // Create all descriptors
    const created = await prisma.descriptor.createMany({
      data: descriptors,
      skipDuplicates: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: `${created.count} descriptors created successfully`,
        count: created.count,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating descriptors in bulk:", error);

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
        error: "Failed to create descriptors in bulk",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/descriptors/bulk - Delete multiple descriptors by type
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        {
          success: false,
          error: "Type parameter is required",
        },
        { status: 400 },
      );
    }

    const result = await prisma.descriptor.deleteMany({
      where: { type },
    });

    return NextResponse.json({
      success: true,
      message: `${result.count} descriptors deleted successfully`,
      count: result.count,
    });
  } catch (error) {
    console.error("Error deleting descriptors in bulk:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete descriptors in bulk",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
