import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Helper function to convert arrays to JSON strings for storage
function prepareSurveyData(data: any) {
  const prepared = { ...data };

  const arrayFields = [
    "enqueteSatisfaction",
    "etatLieuxSatisfaction",
    "affichageSatisfaction",
    "bornageSatisfaction",
    "evaluationSatisfaction",
    "decisionSatisfaction",
    "trustTransparency",
    "litigeSatisfaction",
    "globalSatisfaction",
  ];

  for (const field of arrayFields) {
    if (Array.isArray(prepared[field])) {
      prepared[field] = JSON.stringify(prepared[field]);
    }
  }

  return prepared;
}

// Helper function to parse JSON strings back to arrays
function parseSurveyData(data: any) {
  const parsed = { ...data };

  const arrayFields = [
    "enqueteSatisfaction",
    "etatLieuxSatisfaction",
    "affichageSatisfaction",
    "bornageSatisfaction",
    "evaluationSatisfaction",
    "decisionSatisfaction",
    "trustTransparency",
    "litigeSatisfaction",
    "globalSatisfaction",
  ];

  for (const field of arrayFields) {
    if (typeof parsed[field] === "string") {
      try {
        parsed[field] = JSON.parse(parsed[field]);
      } catch {
        parsed[field] = [];
      }
    }
  }

  return parsed;
}

// GET /api/surveys/[id] - Get a single survey by ID
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const survey = await prisma.survey.findUnique({
      where: { id: params.id },
    });

    if (!survey) {
      return NextResponse.json(
        {
          success: false,
          error: "Survey not found",
        },
        { status: 404 },
      );
    }

    // Parse JSON strings back to arrays
    const parsedSurvey = parseSurveyData(survey);

    return NextResponse.json({
      success: true,
      data: parsedSurvey,
    });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch survey",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// PATCH /api/surveys/[id] - Update a survey
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    // Check if survey exists
    const existing = await prisma.survey.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Survey not found",
        },
        { status: 404 },
      );
    }

    // Prepare data for database (convert arrays to JSON strings)
    const preparedData = prepareSurveyData(body);

    const survey = await prisma.survey.update({
      where: { id: params.id },
      data: preparedData,
    });

    // Parse back to return with arrays
    const parsedSurvey = parseSurveyData(survey);

    return NextResponse.json({
      success: true,
      data: parsedSurvey,
      message: "Survey updated successfully",
    });
  } catch (error) {
    console.error("Error updating survey:", error);

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
        error: "Failed to update survey",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/surveys/[id] - Delete a survey
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Check if survey exists
    const existing = await prisma.survey.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Survey not found",
        },
        { status: 404 },
      );
    }

    await prisma.survey.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Survey deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting survey:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete survey",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
