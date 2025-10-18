import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Schema for step update request
const stepUpdateSchema = z.object({
  email: z.string().email("Email invalide"),
  currentStep: z.string().min(1, "L'étape actuelle est requise"),
});

// PATCH /api/surveys/update-step - Update survey step progress
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const { email, currentStep } = stepUpdateSchema.parse(body);

    // Check if survey exists for this email
    const existingSurvey = await prisma.survey.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' }, // Get the most recent survey
    });

    if (existingSurvey) {
      // Update existing survey
      const updatedSurvey = await prisma.survey.update({
        where: { id: existingSurvey.id },
        data: {
          stageReached: currentStep,
          status: "PENDING", // Keep as PENDING during step updates
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(
        {
          success: true,
          data: updatedSurvey,
          message: "Survey step updated successfully",
        },
        { status: 200 },
      );
    } else {
      // No existing survey found
      return NextResponse.json(
        {
          success: false,
          error: "Survey not found",
          message: "No survey found for this email address",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error updating survey step:", error);

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
        error: "Failed to update survey step",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
