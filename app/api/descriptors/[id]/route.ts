import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Schema for descriptor update validation
const descriptorUpdateSchema = z.object({
  type: z.string().min(1).optional(),
  value: z.string().min(1).optional(),
  label: z.string().min(1).optional(),
});

// GET /api/descriptors/[id] - Get a single descriptor by ID
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const descriptor = await prisma.descriptor.findUnique({
      where: { id: params.id },
    });

    if (!descriptor) {
      return NextResponse.json(
        {
          success: false,
          error: "Descriptor not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: descriptor,
    });
  } catch (error) {
    console.error("Error fetching descriptor:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch descriptor",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// PATCH /api/descriptors/[id] - Update a descriptor
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = descriptorUpdateSchema.parse(body);

    // Check if descriptor exists
    const existing = await prisma.descriptor.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Descriptor not found",
        },
        { status: 404 },
      );
    }

    // If type or value is being updated, check for conflicts
    if (validatedData.type || validatedData.value) {
      const newType = validatedData.type || existing.type;
      const newValue = validatedData.value || existing.value;

      // Only check conflict if type or value actually changed
      if (newType !== existing.type || newValue !== existing.value) {
        const conflict = await prisma.descriptor.findFirst({
          where: {
            type: newType,
            value: newValue,
            id: { not: params.id },
          },
        });

        if (conflict) {
          return NextResponse.json(
            {
              success: false,
              error: "Descriptor conflict",
              message: `A descriptor with type "${newType}" and value "${newValue}" already exists`,
            },
            { status: 409 },
          );
        }
      }
    }

    const descriptor = await prisma.descriptor.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: descriptor,
      message: "Descriptor updated successfully",
    });
  } catch (error) {
    console.error("Error updating descriptor:", error);

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
        error: "Failed to update descriptor",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/descriptors/[id] - Delete a descriptor
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Check if descriptor exists
    const existing = await prisma.descriptor.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Descriptor not found",
        },
        { status: 404 },
      );
    }

    await prisma.descriptor.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Descriptor deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting descriptor:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete descriptor",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
