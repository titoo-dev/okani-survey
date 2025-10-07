"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";

const stageSelectionSchema = z.object({
  hasFiledAtAnuttc: z.boolean({
    message: "Veuillez indiquer si vous avez introduit un dossier",
  }),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  stageReached: z.string().min(1, "Veuillez sélectionner l'étape atteinte"),
});

export type StageSelectionState = {
  success: boolean;
  errors?: string[];
  alreadySubmitted?: boolean;
  data?: {
    stageReached: string;
    email: string;
  };
};

/**
 * Fetch descriptors of a specific type from the database
 */
export async function getDescriptors(type: string) {
  try {
    const descriptors = await prisma.descriptor.findMany({
      where: { type },
      orderBy: { order: "asc" },
    });

    return {
      success: true,
      data: descriptors,
    };
  } catch (error) {
    console.error("Error fetching descriptors:", error);
    return {
      success: false,
      error: "Failed to fetch descriptors",
      data: [],
    };
  }
}

/**
 * Fetch all descriptors grouped by type
 */
export async function getAllDescriptors() {
  try {
    const descriptors = await prisma.descriptor.findMany({
      orderBy: [{ type: "asc" }, { order: "asc" }],
    });

    // Group descriptors by type
    const grouped = descriptors.reduce(
      (acc, descriptor) => {
        if (!acc[descriptor.type]) {
          acc[descriptor.type] = [];
        }
        acc[descriptor.type].push(descriptor);
        return acc;
      },
      {} as Record<string, typeof descriptors>,
    );

    return {
      success: true,
      data: grouped,
    };
  } catch (error) {
    console.error("Error fetching all descriptors:", error);
    return {
      success: false,
      error: "Failed to fetch descriptors",
      data: {},
    };
  }
}

/**
 * Check if an email has already submitted a survey
 */
export async function checkEmailSubmission(email: string) {
  try {
    const survey = await prisma.survey.findFirst({
      where: {
        email: {
          equals: email,
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

    return {
      success: true,
      hasSubmitted: !!survey,
      survey: survey || null,
    };
  } catch (error) {
    console.error("Error checking email submission:", error);
    return {
      success: false,
      hasSubmitted: false,
      survey: null,
      error: "Failed to check email",
    };
  }
}

/**
 * Validate stage selection data
 */
export async function validateStageSelection(
  prevState: StageSelectionState | null,
  formData: FormData,
): Promise<StageSelectionState> {
  const hasFiledAtAnuttc = formData.get("hasFiledAtAnuttc") === "true";
  const email = formData.get("email") as string;
  const stageReached = formData.get("stageReached") as string;

  // Check if user has filed at ANUTTC
  if (!hasFiledAtAnuttc) {
    return {
      success: false,
      errors: [
        "Ce sondage est réservé aux usagers ayant introduit un dossier à l'ANUTTC.",
      ],
    };
  }

  try {
    const validatedData = stageSelectionSchema.parse({
      hasFiledAtAnuttc,
      email,
      stageReached,
    });

    // Check if email has already submitted a survey
    const emailCheck = await checkEmailSubmission(validatedData.email);
    if (emailCheck.hasSubmitted) {
      return {
        success: false,
        errors: ["Cette adresse email a déjà soumis une enquête."],
        alreadySubmitted: true,
      };
    }

    return {
      success: true,
      data: {
        stageReached: validatedData.stageReached,
        email: validatedData.email,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => issue.message),
      };
    }

    return {
      success: false,
      errors: ["Une erreur est survenue lors de la validation"],
    };
  }
}

