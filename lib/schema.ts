import { z } from "zod";

export const stageSelectionSchema = z.object({
  hasFiledAtAnuttc: z.boolean({
    message: "Veuillez indiquer si vous avez introduit un dossier",
  }),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  stageReached: z.enum(
    [
      "depot",
      "enquete",
      "etat-lieux",
      "affichage",
      "bornage",
      "evaluation",
      "decision",
    ],
    {
      message: "Veuillez sélectionner l'étape atteinte",
    },
  ),
});


export const surveyFormSchema = z
  .object({
    email: z.string().email("Email invalide").min(1, "L'email est requis"),
    stageReached: z.string().min(1, "L'étape atteinte est requise"),

    dossierId: z.string(),
    depositCity: z.string(),
    regularizationCity: z.string(),
    residenceCity: z.string(),
    userType: z.string(),
    legalEntity: z.string(),
    nationality: z.string(),

    depotEvaluation: z.string().optional(),
    depotPaymentMode: z.string().optional(),
    depotOtherPaymentMode: z.string().optional(),
    depotAmountPaid: z.string().optional(),
    depotHasReceipt: z.boolean().optional(),
    depotHasAcknowledgment: z.boolean().optional(),

    enqueteDelayPerceived: z.string().optional(),
    enquetePaymentMode: z.string().optional(),
    enqueteOtherPaymentMode: z.string().optional(),
    enqueteHasReceipt: z.boolean().optional(),
    enqueteSatisfaction: z.array(z.number()).optional(),

    etatLieuxDelayPerceived: z.string().optional(),
    etatLieuxPaymentMode: z.string().optional(),
    etatLieuxOtherPaymentMode: z.string().optional(),
    etatLieuxHasReceipt: z.boolean().optional(),
    etatLieuxSatisfaction: z.array(z.number()).optional(),

    affichageInTime: z.boolean().optional(),
    affichageWasInformed: z.boolean().optional(),
    affichageInformationChannel: z.string().optional(),
    affichageSufficientDelay: z.boolean().optional(),
    affichageHasOpposition: z.boolean().optional(),
    affichageFees: z.string().optional(),
    affichageHasReceipt: z.boolean().optional(),
    affichageSatisfaction: z.array(z.number()).optional(),

    bornageDelayPerceived: z.string().optional(),
    bornagePaymentMode: z.string().optional(),
    bornageOtherPaymentMode: z.string().optional(),
    bornageHasReceipt: z.boolean().optional(),
    bornageSatisfaction: z.array(z.number()).optional(),

    evaluationPriceUnderstanding: z.boolean().optional(),
    evaluationPaymentMode: z.string().optional(),
    evaluationOtherPaymentMode: z.string().optional(),
    evaluationHasReceipt: z.boolean().optional(),
    evaluationSatisfaction: z.array(z.number()).optional(),

    decisionDelay: z.string().optional(),
    decisionPaymentMode: z.string().optional(),
    decisionOtherPaymentMode: z.string().optional(),
    decisionHasReceipt: z.boolean().optional(),
    wasTransmitted: z.boolean().optional(),
    hasActeCession: z.boolean().optional(),
    hasTitrePropriete: z.boolean().optional(),
    decisionSatisfaction: z.array(z.number()).optional(),

    hasUnofficialPayment: z.boolean().optional(),
    hasFavoritism: z.boolean().optional(),
    trustTransparency: z.array(z.number()).optional(),

    hadOpposition: z.boolean().optional(),
    oppositionDate: z.string().optional(),
    oppositionNature: z.string().optional(),
    oppositionNatureOther: z.string().optional(),
    litigeDelay: z.string().optional(),
    paidLitigeFees: z.boolean().optional(),
    litigePaymentMode: z.string().optional(),
    litigePaymentAmount: z.string().optional(),
    litigeHasReceipt: z.boolean().optional(),
    wasInformedProcedure: z.boolean().optional(),
    sentFormalLetter: z.boolean().optional(),
    letterReference: z.string().optional(),
    litigeCause: z.string().optional(),
    litigeCauseOther: z.string().optional(),
    litigeSatisfaction: z.array(z.number()).optional(),
    litigeOutcome: z.string().optional(),
    litigeOutcomeOther: z.string().optional(),
    litigeComments: z.string().optional(),

    totalDelay: z.string().optional(),
    transmissionDate: z.string().optional(),
    totalCost: z.string().optional(),
    globalSatisfaction: z.array(z.number()).optional(),
    generalSuggestions: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const stageOrder = [
      "depot",
      "enquete",
      "etat-lieux",
      "affichage",
      "bornage",
      "evaluation",
      "decision",
    ];
    const stageIndex = stageOrder.indexOf(data.stageReached);

    if (
      !data.dossierId ||
      !data.depositCity ||
      !data.regularizationCity ||
      !data.residenceCity ||
      !data.userType ||
      !data.legalEntity ||
      !data.nationality
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les informations de profil sont requises",
        path: ["userProfile"],
      });
    }

    if (
      stageIndex >= 0 &&
      data.depotPaymentMode === "autre" &&
      !data.depotOtherPaymentMode
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez préciser le mode de paiement du dépôt",
        path: ["depotOtherPaymentMode"],
      });
    }

    if (
      stageIndex >= 1 &&
      data.enquetePaymentMode === "autre" &&
      !data.enqueteOtherPaymentMode
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez préciser le mode de paiement de l'enquête",
        path: ["enqueteOtherPaymentMode"],
      });
    }

    if (
      stageIndex >= 2 &&
      data.etatLieuxPaymentMode === "autre" &&
      !data.etatLieuxOtherPaymentMode
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez préciser le mode de paiement de l'état des lieux",
        path: ["etatLieuxOtherPaymentMode"],
      });
    }

    if (
      stageIndex >= 4 &&
      data.bornagePaymentMode === "autre" &&
      !data.bornageOtherPaymentMode
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez préciser le mode de paiement du bornage",
        path: ["bornageOtherPaymentMode"],
      });
    }

    if (
      stageIndex >= 5 &&
      data.evaluationPaymentMode === "autre" &&
      !data.evaluationOtherPaymentMode
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez préciser le mode de paiement de l'évaluation",
        path: ["evaluationOtherPaymentMode"],
      });
    }

    if (
      stageIndex >= 6 &&
      data.decisionPaymentMode === "autre" &&
      !data.decisionOtherPaymentMode
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez préciser le mode de paiement de la décision",
        path: ["decisionOtherPaymentMode"],
      });
    }

    if (
      stageIndex >= 3 &&
      data.affichageWasInformed === true &&
      !data.affichageInformationChannel
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez préciser le canal d'information",
        path: ["affichageInformationChannel"],
      });
    }

    if (data.hadOpposition === true) {
      if (!data.oppositionDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La date d'opposition est requise",
          path: ["oppositionDate"],
        });
      }
      if (!data.oppositionNature) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La nature de l'opposition est requise",
          path: ["oppositionNature"],
        });
      }
      if (data.oppositionNature === "autre" && !data.oppositionNatureOther) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Veuillez préciser la nature de l'opposition",
          path: ["oppositionNatureOther"],
        });
      }
      if (data.sentFormalLetter === true && !data.letterReference) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Veuillez fournir la référence du courrier",
          path: ["letterReference"],
        });
      }
      if (data.litigeCause === "autre" && !data.litigeCauseOther) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Veuillez préciser la cause du litige",
          path: ["litigeCauseOther"],
        });
      }
      if (data.litigeOutcome === "autre" && !data.litigeOutcomeOther) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Veuillez préciser l'issue du litige",
          path: ["litigeOutcomeOther"],
        });
      }
    }

    if (!data.totalCost) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le coût total est requis",
        path: ["totalCost"],
      });
    }

    if (!data.globalSatisfaction || data.globalSatisfaction.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La satisfaction globale est requise",
        path: ["globalSatisfaction"],
      });
    }

    if (data.hasUnofficialPayment === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La réponse sur les paiements non officiels est requise",
        path: ["hasUnofficialPayment"],
      });
    }

    if (data.hasFavoritism === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La réponse sur le favoritisme est requise",
        path: ["hasFavoritism"],
      });
    }

    if (!data.trustTransparency || data.trustTransparency.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "L'évaluation de la confiance est requise",
        path: ["trustTransparency"],
      });
    }

    if (data.hadOpposition === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez indiquer si vous avez fait l'objet d'une opposition",
        path: ["hadOpposition"],
      });
    }
  });

export type StageSelectionData = z.infer<typeof stageSelectionSchema>;
export type SurveyFormData = z.infer<typeof surveyFormSchema>;
