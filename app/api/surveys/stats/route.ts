import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/surveys/stats - Get survey statistics
export async function GET() {
  try {
    // Total surveys
    const total = await prisma.survey.count();

    // Surveys by stage
    const byStage = await prisma.survey.groupBy({
      by: ["stageReached"],
      _count: true,
      orderBy: {
        stageReached: "asc",
      },
    });

    // Surveys by user type
    const byUserType = await prisma.survey.groupBy({
      by: ["userType"],
      _count: true,
      orderBy: {
        userType: "asc",
      },
    });

    // Surveys by legal entity
    const byLegalEntity = await prisma.survey.groupBy({
      by: ["legalEntity"],
      _count: true,
      orderBy: {
        legalEntity: "asc",
      },
    });

    // Recent surveys (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentCount = await prisma.survey.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Surveys with oppositions
    const withOppositions = await prisma.survey.count({
      where: {
        hadOpposition: true,
      },
    });

    // Surveys with unofficial payments
    const withUnofficialPayments = await prisma.survey.count({
      where: {
        hasUnofficialPayment: true,
      },
    });

    // Surveys reporting favoritism
    const withFavoritism = await prisma.survey.count({
      where: {
        hasFavoritism: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        total,
        recent30Days: recentCount,
        byStage: byStage.map((item) => ({
          stage: item.stageReached,
          count: item._count,
        })),
        byUserType: byUserType.map((item) => ({
          userType: item.userType,
          count: item._count,
        })),
        byLegalEntity: byLegalEntity.map((item) => ({
          legalEntity: item.legalEntity,
          count: item._count,
        })),
        governanceMetrics: {
          withOppositions,
          withUnofficialPayments,
          withFavoritism,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching survey statistics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch survey statistics",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
