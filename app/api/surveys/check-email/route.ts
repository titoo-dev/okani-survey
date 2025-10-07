import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const checkEmailSchema = z.object({
  email: z.string().email("Email invalide"),
});

/**
 * POST /api/surveys/check-email
 * Check if an email has already submitted a survey
 *
 * Request body:
 * {
 *   "email": "user@example.com"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "hasSubmitted": boolean,
 *   "survey": { ... } | null
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = checkEmailSchema.parse(body);

    // Check if email exists in database
    const survey = await prisma.survey.findFirst({
      where: {
        email: {
          equals: validatedData.email,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        dossierId: true,
        createdAt: true,
        stageReached: true,
      },
    });

    return NextResponse.json({
      success: true,
      hasSubmitted: !!survey,
      survey: survey || null,
    });
  } catch (error) {
    console.error("Error checking email:", error);

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
        error: "Failed to check email",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/surveys/check-email?email=user@example.com
 * Alternative GET endpoint for checking email
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email parameter is required",
        },
        { status: 400 },
      );
    }

    // Validate email
    const validatedData = checkEmailSchema.parse({ email });

    // Check if email exists in database
    const survey = await prisma.survey.findFirst({
      where: {
        email: {
          equals: validatedData.email,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        dossierId: true,
        createdAt: true,
        stageReached: true,
      },
    });

    return NextResponse.json({
      success: true,
      hasSubmitted: !!survey,
      survey: survey || null,
    });
  } catch (error) {
    console.error("Error checking email:", error);

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
        error: "Failed to check email",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

