import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

// GET /api/surveys/export - Export all surveys as JSON
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";

    // Filter parameters
    const stageReached = searchParams.get("stageReached");
    const userType = searchParams.get("userType");

    // Build where clause
    const where: any = {};
    if (stageReached) where.stageReached = stageReached;
    if (userType) where.userType = userType;

    const surveys = await prisma.survey.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Parse JSON strings back to arrays
    const parsedSurveys = surveys.map(parseSurveyData);

    if (format === "csv") {
      // Generate CSV
      if (parsedSurveys.length === 0) {
        return new NextResponse("No data to export", {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      // Get all keys from the first survey
      const headers = Object.keys(parsedSurveys[0]);
      const csvRows = [headers.join(",")];

      for (const survey of parsedSurveys) {
        const values = headers.map((header) => {
          const value = survey[header];
          if (value === null || value === undefined) return "";
          if (Array.isArray(value)) return JSON.stringify(value);
          if (typeof value === "string" && value.includes(",")) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csvRows.push(values.join(","));
      }

      const csv = csvRows.join("\n");

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="surveys_${new Date().toISOString()}.csv"`,
        },
      });
    }

    // Default to JSON
    return NextResponse.json({
      success: true,
      data: parsedSurveys,
      count: parsedSurveys.length,
      exportedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error exporting surveys:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to export surveys",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
