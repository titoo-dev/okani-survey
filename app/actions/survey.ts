"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { surveyFormSchema } from "@/lib/schema";

export type SurveySubmitState = {
  success: boolean;
  errors?: string[];
  message?: string;
};

/**
 * Generate a unique dossier ID in the format DOSS-YYYY-XXX
 * Example: DOSS-2025-001
 */
async function generateDossierId(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `DOSS-${year}-`;

  // Get the count of surveys created this year
  const startOfYear = new Date(year, 0, 1);
  const count = await prisma.survey.count({
    where: {
      createdAt: {
        gte: startOfYear,
      },
    },
  });

  // Increment and format with leading zeros (e.g., 001, 002, ...)
  const nextNumber = (count + 1).toString().padStart(3, "0");

  return `${prefix}${nextNumber}`;
}

/**
 * Helper function to convert arrays to JSON strings for storage
 */
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

/**
 * Submit survey data to the database
 */
export async function submitSurvey(
  formData: any,
): Promise<SurveySubmitState> {
  try {
    // Validate form data
    const validatedData = surveyFormSchema.parse(formData);

    // Generate dossierId if not provided
    if (!validatedData.dossierId) {
      validatedData.dossierId = await generateDossierId();
    }

    // Prepare data for database (convert arrays to JSON strings)
    const preparedData = prepareSurveyData(validatedData);

    // Create survey in database
    await prisma.survey.create({
      data: preparedData,
    });

    return {
      success: true,
      message: "Enquête soumise avec succès! Merci pour votre participation.",
    };
  } catch (error) {
    console.error("Error submitting survey:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((err: z.ZodIssue) => {
          const field = err.path.join(".");
          return `${field}: ${err.message}`;
        }),
      };
    }

    return {
      success: false,
      errors: ["Une erreur est survenue lors de la soumission"],
    };
  }
}

