import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { surveyFormSchema } from "@/lib/schema";

// Helper function to convert arrays to JSON strings for storage
function prepareSurveyData(data: any) {
  const prepared = { ...data };

  // Convert array fields to JSON strings for database storage
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

// GET /api/surveys - Get all surveys with optional filtering and pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Filter parameters
    const email = searchParams.get("email");
    const stageReached = searchParams.get("stageReached");
    const dossierId = searchParams.get("dossierId");
    const userType = searchParams.get("userType");

    // Build where clause
    const where: any = {};
    if (email) where.email = { contains: email, mode: "insensitive" };
    if (stageReached) where.stageReached = stageReached;
    if (dossierId)
      where.dossierId = { contains: dossierId, mode: "insensitive" };
    if (userType) where.userType = userType;

    // Get total count for pagination
    const total = await prisma.survey.count({ where });

    // Fetch surveys
    const surveys = await prisma.survey.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Parse JSON strings back to arrays
    const parsedSurveys = surveys.map(parseSurveyData);

    return NextResponse.json({
      success: true,
      data: parsedSurveys,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch surveys",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST /api/surveys - Create a new survey
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = surveyFormSchema.parse(body);

    // Prepare data for database (convert arrays to JSON strings)
    const preparedData = prepareSurveyData(validatedData);

    const survey = await prisma.survey.create({
      data: preparedData,
    });

    // Parse back to return with arrays
    const parsedSurvey = parseSurveyData(survey);

    return NextResponse.json(
      {
        success: true,
        data: parsedSurvey,
        message: "Survey created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating survey:", error);

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
        error: "Failed to create survey",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
