"use server";

import prisma from "@/lib/prisma";

export type DashboardFilters = {
  city?: string;
  stage?: string;
  page?: number;
  limit?: number;
};

export type CityStats = {
  city: string;
  count: number;
};

export type StageStats = {
  stage: string;
  count: number;
};

export type SatisfactionStats = {
  stage: string;
  average: number;
  count: number;
};

export type DailyVisits = {
  date: string;
  visits: number;
  uniqueVisitors: number;
};

export type DashboardData = {
  totalSurveys: number;
  citiesStats: CityStats[];
  stagesStats: StageStats[];
  satisfactionByStage: SatisfactionStats[];
  recentSurveys: Array<{
    id: string;
    email: string;
    depositCity: string;
    stageReached: string;
    createdAt: Date;
  }>;
  dailyVisits: DailyVisits[];
};

export async function getDashboardStats(
  filters: DashboardFilters = {}
): Promise<DashboardData> {
  const { city, stage } = filters;

  // Build where clause
  const where: Record<string, unknown> = {};
  if (city) {
    where.depositCity = city;
  }
  if (stage) {
    where.stageReached = stage;
  }

  // Get total count
  const totalSurveys = await prisma.survey.count({ where });

  // Get stats by city
  const citiesStatsRaw = await prisma.survey.groupBy({
    by: ["depositCity"],
    where: stage ? { stageReached: stage } : undefined,
    _count: {
      id: true,
    },
  });

  const citiesStats: CityStats[] = citiesStatsRaw.map((item) => ({
    city: item.depositCity,
    count: item._count.id,
  }));

  // Get stats by stage
  const stagesStatsRaw = await prisma.survey.groupBy({
    by: ["stageReached"],
    where: city ? { depositCity: city } : undefined,
    _count: {
      id: true,
    },
  });

  const stagesStats: StageStats[] = stagesStatsRaw.map((item) => ({
    stage: item.stageReached,
    count: item._count.id,
  }));

  // Calculate satisfaction by stage
  const satisfactionData = await prisma.survey.findMany({
    where,
    select: {
      stageReached: true,
      depotEvaluation: true,
      enqueteSatisfaction: true,
      etatLieuxSatisfaction: true,
      affichageSatisfaction: true,
      bornageSatisfaction: true,
      evaluationSatisfaction: true,
      decisionSatisfaction: true,
      globalSatisfaction: true,
    },
  });

  // Map stage names to satisfaction fields
  const stageToSatisfactionField: Record<string, string[]> = {
    "Dépôt de dossier": ["depotEvaluation"],
    "Enquête foncière": ["enqueteSatisfaction"],
    "État des lieux": ["etatLieuxSatisfaction"],
    "Avis d'affichage": ["affichageSatisfaction"],
    "PV et plan de bornage": ["bornageSatisfaction"],
    "Rapport d'évaluation": ["evaluationSatisfaction"],
    Décision: ["decisionSatisfaction"],
  };

  const satisfactionByStage: SatisfactionStats[] = Object.entries(
    stageToSatisfactionField
  ).map(([stage, fields]) => {
    const relevantData = satisfactionData.filter((item) =>
      fields.some((field) => {
        const value = item[field as keyof typeof item];
        return value !== null && value !== undefined;
      })
    );

    const scores = relevantData
      .map((item) => {
        const field = fields[0];
        const value = item[field as keyof typeof item];
        return value ? Number.parseFloat(value as string) : null;
      })
      .filter((score): score is number => score !== null && !Number.isNaN(score));

    const average = scores.length > 0 
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
      : 0;

    return {
      stage,
      average: Math.round(average * 10) / 10,
      count: scores.length,
    };
  });

  // Get recent surveys
  const recentSurveys = await prisma.survey.findMany({
    where,
    select: {
      id: true,
      email: true,
      depositCity: true,
      stageReached: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  // Get daily visits data (mock data for now - replace with actual Vercel Analytics API)
  const dailyVisits = await getDailyVisitsData();

  return {
    totalSurveys,
    citiesStats,
    stagesStats,
    satisfactionByStage,
    recentSurveys,
    dailyVisits,
  };
}

export async function exportSurveysToCSV(
  filters: DashboardFilters = {}
): Promise<string> {
  const { city, stage } = filters;

  const where: Record<string, unknown> = {};
  if (city) {
    where.depositCity = city;
  }
  if (stage) {
    where.stageReached = stage;
  }

  const surveys = await prisma.survey.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  // CSV Headers
  const headers = [
    "ID",
    "Email",
    "Ville de dépôt",
    "Étape atteinte",
    "Type de procédure",
    "Satisfaction globale",
    "Date de création",
  ];

  // Convert surveys to CSV rows
  const rows = surveys.map((survey) => [
    survey.id,
    survey.email,
    survey.depositCity,
    survey.stageReached,
    survey.userType,
    survey.globalSatisfaction || "N/A",
    survey.createdAt.toISOString().split("T")[0],
  ]);

  // Build CSV content
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  return csvContent;
}

export async function getSurveyById(id: string) {
  const survey = await prisma.survey.findUnique({
    where: { id },
  });

  return survey;
}

export type PaginatedSurveysData = {
  surveys: Array<{
    id: string;
    email: string;
    depositCity: string;
    stageReached: string;
    createdAt: Date;
  }>;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export async function getSurveysPaginated(
  filters: DashboardFilters = {}
): Promise<PaginatedSurveysData> {
  const { city, stage, page = 1, limit = 10 } = filters;

  // Build where clause
  const where: Record<string, unknown> = {};
  if (city) {
    where.depositCity = city;
  }
  if (stage) {
    where.stageReached = stage;
  }

  // Get total count for pagination
  const total = await prisma.survey.count({ where });

  // Calculate pagination
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  // Get paginated surveys
  const surveys = await prisma.survey.findMany({
    where,
    select: {
      id: true,
      email: true,
      depositCity: true,
      stageReached: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  return {
    surveys,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}

async function getDailyVisitsData(): Promise<DailyVisits[]> {
  try {
    // TODO: Uncomment when Prisma client is regenerated with analytics tables
    
    const today = new Date();
    const last30Days: DailyVisits[] = [];
    
    // Get analytics data from our custom analytics system
    const analyticsData = await prisma.analyticsEvent.groupBy({
      by: ["createdAt"],
      where: {
        event: "page_view",
        createdAt: {
          gte: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        },
      },
      _count: {
        id: true,
      },
    });
    
    // Get unique visitors per day
    const uniqueVisitorsData = await prisma.analyticsEvent.groupBy({
      by: ["createdAt", "sessionId"],
      where: {
        event: "page_view",
        createdAt: {
          gte: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      _count: {
        sessionId: true,
      },
    });
    
    // Process data by date
    const visitsByDate = new Map<string, number>();
    const uniqueVisitorsByDate = new Map<string, Set<string>>();
    
    // Count total visits per day
    analyticsData.forEach((item: any) => {
      const date = item.createdAt.toISOString().split('T')[0];
      visitsByDate.set(date, (visitsByDate.get(date) || 0) + item._count.id);
    });
    
    // Count unique visitors per day
    uniqueVisitorsData.forEach((item: any) => {
      const date = item.createdAt.toISOString().split('T')[0];
      if (!uniqueVisitorsByDate.has(date)) {
        uniqueVisitorsByDate.set(date, new Set());
      }
      uniqueVisitorsByDate.get(date)?.add(item.sessionId);
    });
    
    // Generate data for last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const visits = visitsByDate.get(dateString) || 0;
      const uniqueVisitors = uniqueVisitorsByDate.get(dateString)?.size || 0;
      
      last30Days.push({
        date: dateString,
        visits,
        uniqueVisitors,
      });
    }
    
    return last30Days;
    
  } catch (error) {
    console.error("Error fetching daily visits data:", error);
    
    // Fallback to mock data if analytics data is not available
    const today = new Date();
    const last30Days: DailyVisits[] = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate minimal mock data
      const baseVisits = Math.floor(Math.random() * 10) + 1;
      const uniqueVisitors = Math.floor(baseVisits * (0.6 + Math.random() * 0.3));
      
      last30Days.push({
        date: date.toISOString().split('T')[0],
        visits: baseVisits,
        uniqueVisitors: uniqueVisitors,
      });
    }
    
    return last30Days;
  }
}

