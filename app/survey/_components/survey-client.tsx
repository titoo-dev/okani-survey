"use client";

import {
  BarChart,
  Eye,
  FileCheck,
  FolderOpen,
  Gavel,
  Loader2,
  Map,
  Phone,
  Scale,
  Search,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submitSurvey } from "@/app/actions/survey";
import { getStageLabel } from "@/lib/descriptors";
import { StepIndicator } from "@/components/step-indicator";
import {
  DecisionStep,
  validateDecisionStep,
} from "@/components/steps/decision-step";
import {
  DisputesStep,
  validateDisputesStep,
} from "@/components/steps/disputes-step";
import {
  EvaluationStep,
  validateEvaluationStep,
} from "@/components/steps/evaluation-step";
import {
  GlobalEvaluationStep,
  validateGlobalEvaluationStep,
} from "@/components/steps/global-evaluation-step";
import {
  GovernanceStep,
  validateGovernanceStep,
} from "@/components/steps/governance-step";
import {
  UserProfileStep,
  validateUserProfileStep,
} from "@/components/steps/user-profile-step";
import {
  type SurveyFormData,
  SurveySummary,
} from "@/components/survey-summary";

type Descriptor = {
  id: string;
  type: string;
  value: string;
  label: string;
};

type DescriptorGroups = Record<string, Descriptor[]>;

type SurveyClientProps = {
  descriptors: DescriptorGroups;
};

export function SurveyClient({ descriptors }: SurveyClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<SurveyFormData>({
    stageReached: "",
    depositCity: "",
    regularizationCity: "",
    residenceCity: "",
    userType: "",
    nationality: "",
    legalEntity: "",
    depotEvaluation: "",
    depotPaymentMode: "",
    depotOtherPaymentMode: "",
    depotAmountPaid: "",
    depotHasReceipt: undefined,
    depotHasAcknowledgment: undefined,
    enqueteDelayPerceived: "",
    enquetePaymentMode: "",
    enqueteOtherPaymentMode: "",
    enqueteHasReceipt: undefined,
    enqueteSatisfaction: [],
    etatLieuxDelayPerceived: "",
    etatLieuxPaymentMode: "",
    etatLieuxOtherPaymentMode: "",
    etatLieuxHasReceipt: undefined,
    etatLieuxSatisfaction: [],
    affichageInTime: undefined,
    affichageWasInformed: undefined,
    affichageInformationChannel: "",
    affichageSufficientDelay: undefined,
    affichageHasOpposition: undefined,
    affichageFees: "",
    affichageHasReceipt: undefined,
    affichageSatisfaction: [],
    bornageDelayPerceived: "",
    bornagePaymentMode: "",
    bornageOtherPaymentMode: "",
    bornageHasReceipt: undefined,
    bornageSatisfaction: [],
    evaluationPriceUnderstanding: undefined,
    evaluationPaymentMode: "",
    evaluationOtherPaymentMode: "",
    evaluationHasReceipt: undefined,
    evaluationSatisfaction: [],
    decisionDelay: "",
    decisionPaymentMode: "",
    decisionOtherPaymentMode: "",
    decisionHasReceipt: undefined,
    wasTransmitted: undefined,
    hasActeCession: undefined,
    hasTitrePropriete: undefined,
    decisionSatisfaction: [],
    hasUnofficialPayment: undefined,
    hasFavoritism: undefined,
    trustTransparency: [2],
    hadOpposition: undefined,
    oppositionDate: "",
    oppositionNature: "",
    oppositionNatureOther: "",
    litigeDelay: "",
    paidLitigeFees: undefined,
    litigePaymentMode: "",
    litigePaymentAmount: "",
    litigeHasReceipt: undefined,
    wasInformedProcedure: undefined,
    sentFormalLetter: undefined,
    letterReference: "",
    litigeCause: "",
    litigeCauseOther: "",
    litigeSatisfaction: [],
    litigeOutcome: "",
    litigeOutcomeOther: "",
    litigeComments: "",
    totalDelay: "",
    transmissionDate: "",
    totalCost: "",
    globalSatisfaction: [],
    generalSuggestions: "",
  });

  useEffect(() => {
    // Try to get stageReached from localStorage first, then sessionStorage
    const stageReached =
      localStorage.getItem("stageReached") ||
      sessionStorage.getItem("stageReached");

    if (!stageReached) {
      router.push("/stage-selection");
      return;
    }

    const savedFormData = localStorage.getItem("surveyFormData");
    const savedCurrentStep = localStorage.getItem("surveyCurrentStep");

    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData({ ...parsedData, stageReached });
      } catch (error) {
        console.error("Error loading saved form data:", error);
        setFormData((prev) => ({ ...prev, stageReached }));
      }
    } else {
      setFormData((prev) => ({ ...prev, stageReached }));
    }

    if (savedCurrentStep) {
      setCurrentStep(Number.parseInt(savedCurrentStep, 10));
    }
  }, [router]);

  useEffect(() => {
    if (formData.stageReached) {
      localStorage.setItem("surveyFormData", JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("surveyCurrentStep", currentStep.toString());
  }, [currentStep]);

  const stepColors = [
    "text-step-title-1",
    "text-step-title-2",
    "text-step-title-3",
    "text-step-title-4",
    "text-step-title-5",
    "text-step-title-6",
    "text-step-title-7",
    "text-step-title-8",
    "text-step-title-9",
    "text-step-title-10",
    "text-step-title-11",
  ];

  const allSteps = [
    {
      id: 0,
      key: "profile",
      title: "Identification",
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 1,
      key: "depot",
      title: "Dépôt",
      icon: <FolderOpen className="w-4 h-4" />,
    },
    {
      id: 2,
      key: "enquete",
      title: "Enquête",
      icon: <Search className="w-4 h-4" />,
    },
    {
      id: 3,
      key: "etat-lieux",
      title: "État des lieux",
      icon: <FileCheck className="w-4 h-4" />,
    },
    {
      id: 4,
      key: "affichage",
      title: "Affichage",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: 5,
      key: "bornage",
      title: "Bornage",
      icon: <Map className="w-4 h-4" />,
    },
    {
      id: 6,
      key: "evaluation",
      title: "Évaluation",
      icon: <FileCheck className="w-4 h-4" />,
    },
    {
      id: 7,
      key: "decision",
      title: "Décision",
      icon: <Gavel className="w-4 h-4" />,
    },
    {
      id: 8,
      key: "governance",
      title: "Gouvernance",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: 9,
      key: "disputes",
      title: "Litiges",
      icon: <Scale className="w-4 h-4" />,
    },
    {
      id: 10,
      key: "global",
      title: "Global",
      icon: <BarChart className="w-4 h-4" />,
    },
  ];

  const allStepDetails = [
    {
      key: "profile",
      title: "Identification du dossier",
      description: "Informations de base",
      estimatedTime: "2 min",
    },
    {
      key: "depot",
      title: "Dépôt de dossier",
      description: "Étape 2",
      estimatedTime: "2 min",
    },
    {
      key: "enquete",
      title: "Enquête foncière",
      description: "Étape 3",
      estimatedTime: "2 min",
    },
    {
      key: "etat-lieux",
      title: "État des lieux",
      description: "Étape 4",
      estimatedTime: "2 min",
    },
    {
      key: "affichage",
      title: "Avis d'affichage",
      description: "Étape 5",
      estimatedTime: "3 min",
    },
    {
      key: "bornage",
      title: "PV et plan de bornage",
      description: "Étape 6",
      estimatedTime: "2 min",
    },
    {
      key: "evaluation",
      title: "Rapport d'évaluation",
      description: "Étape 7",
      estimatedTime: "2 min",
    },
    {
      key: "decision",
      title: "Décision et transmission",
      description: "Étape 8",
      estimatedTime: "3 min",
    },
    {
      key: "governance",
      title: "Gouvernance et probité",
      description: "Questions sur la transparence et l'intégrité du processus",
      estimatedTime: "2 min",
    },
    {
      key: "disputes",
      title: "Litiges et oppositions",
      description: "Si vous avez fait l'objet d'une opposition ou d'un litige",
      estimatedTime: "3 min",
    },
    {
      key: "global",
      title: "Évaluation globale",
      description: "Impressions générales sur l'ensemble du processus",
      estimatedTime: "2 min",
    },
  ];

  const getVisibleSteps = (stageReached: string) => {
    if (!stageReached) {
      return [];
    }

    const stageOrder = [
      "depot",
      "enquete",
      "etat-lieux",
      "affichage",
      "bornage",
      "evaluation",
      "decision",
    ];
    const stageIndex = stageOrder.indexOf(stageReached);

    if (stageIndex === -1) {
      return allSteps;
    }

    const visibleKeys = [
      "profile",
      ...stageOrder.slice(0, stageIndex + 1),
      "governance",
      "disputes",
      "global",
    ];
    return allSteps
      .filter((step) => visibleKeys.includes(step.key))
      .map((step, index) => ({
        ...step,
        id: index,
      }));
  };

  const steps = getVisibleSteps(formData.stageReached);
  const stepDetails = allStepDetails.filter((detail) =>
    steps.some((step) => step.key === detail.key),
  );

  if (steps.length === 0) {
    return null;
  }

  const handleNext = () => {
    startTransition(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const handlePrevious = () => {
    startTransition(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Soumission de l'enquête en cours...");

    try {
      // Get email from localStorage first, then sessionStorage
      const email =
        localStorage.getItem("userEmail") ||
        sessionStorage.getItem("userEmail");

      if (!email) {
        toast.error(
          "Email non trouvé. Veuillez recommencer depuis la sélection d'étape.",
          {
            id: loadingToast,
          },
        );
        router.push("/stage-selection");
        return;
      }

      // Submit using server action
      startTransition(async () => {
        const result = await submitSurvey({
          ...formData,
          email,
        });

        setIsSubmitting(false);

        if (!result.success) {
          if (result.errors) {
            setValidationErrors(result.errors);
            setShowErrorDialog(true);
            toast.error("Veuillez corriger les erreurs dans le formulaire", {
              id: loadingToast,
            });
          } else {
            toast.error("Une erreur est survenue lors de la soumission", {
              id: loadingToast,
            });
          }
          return;
        }

        // Success!
        toast.success(
          result.message ||
            "Enquête soumise avec succès! Merci pour votre participation.",
          {
            id: loadingToast,
            duration: 5000,
          },
        );

        // Clear local storage and session storage
        localStorage.removeItem("surveyFormData");
        localStorage.removeItem("surveyCurrentStep");
        localStorage.removeItem("stageReached");
        localStorage.removeItem("userEmail");
        sessionStorage.removeItem("stageReached");
        sessionStorage.removeItem("userEmail");

        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push("/survey/success");
        }, 1500);
      });
    } catch (error) {
      console.error("Error submitting survey:", error);
      setIsSubmitting(false);
      toast.error("Une erreur est survenue lors de la soumission", {
        id: loadingToast,
      });
    }
  };

  const handleResetForm = () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir réinitialiser le formulaire? Toutes vos données seront perdues.",
      )
    ) {
      localStorage.removeItem("surveyFormData");
      localStorage.removeItem("surveyCurrentStep");
      localStorage.removeItem("stageReached");
      localStorage.removeItem("userEmail");
      sessionStorage.removeItem("stageReached");
      sessionStorage.removeItem("userEmail");
      router.push("/stage-selection");
    }
  };

  const updateFormData = (updates: Partial<SurveyFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const isCurrentStepValid = (): boolean => {
    const currentStepKey = steps[currentStep]?.key;

    if (currentStepKey === "profile") {
      return validateUserProfileStep(formData);
    }
    if (currentStepKey === "decision") {
      return validateDecisionStep(formData);
    }
    if (currentStepKey === "governance") {
      return validateGovernanceStep(formData);
    }
    if (currentStepKey === "disputes") {
      return validateDisputesStep(formData);
    }
    if (currentStepKey === "global") {
      return validateGlobalEvaluationStep(formData);
    }
    return validateEvaluationStep(formData, currentStepKey);
  };

  const renderStepContent = () => {
    const currentStepKey = steps[currentStep]?.key;
    const currentStepDetail = stepDetails[currentStep];

    if (currentStepKey === "profile") {
      return (
        <UserProfileStep
          formData={formData}
          updateFormData={updateFormData}
          descriptors={descriptors}
        />
      );
    }

    if (currentStepKey === "decision") {
      return (
        <DecisionStep
          formData={formData}
          updateFormData={updateFormData}
          descriptors={descriptors}
        />
      );
    }

    if (currentStepKey === "governance") {
      return (
        <GovernanceStep formData={formData} updateFormData={updateFormData} />
      );
    }

    if (currentStepKey === "disputes") {
      return (
        <DisputesStep
          formData={formData}
          updateFormData={updateFormData}
          descriptors={descriptors}
        />
      );
    }

    if (currentStepKey === "global") {
      return (
        <GlobalEvaluationStep
          formData={formData}
          updateFormData={updateFormData}
        />
      );
    }

    return (
      <EvaluationStep
        formData={formData}
        updateFormData={updateFormData}
        stepTitle={currentStepDetail?.title || ""}
        stepKey={currentStepKey || ""}
        descriptors={descriptors}
      />
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Enquête de satisfaction</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetForm}
              className="text-destructive hover:text-destructive"
            >
              Réinitialiser
            </Button>
          </div>

          {formData.stageReached && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Étape sélectionnée:
                </span>{" "}
                {getStageLabel(formData.stageReached)}
              </p>
              <Link
                href="/stage-selection"
                className="text-xs text-primary hover:underline whitespace-nowrap ml-4"
              >
                Modifier
              </Link>
            </div>
          )}

          <StepIndicator steps={steps} currentStepIndex={currentStep} />
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <Card className="mb-8 shadow-none">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle
                      className={`text-2xl ${stepColors[currentStep] || "text-step-title-1"}`}
                    >
                      {stepDetails[currentStep].title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {stepDetails[currentStep].description}
                    </CardDescription>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {stepDetails[currentStep].estimatedTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>

            <div className="flex justify-between mb-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                Précédent
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isCurrentStepValid() || isSubmitting}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Soumission en cours...
                    </>
                  ) : (
                    <>
                      Soumettre l'enquête
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isPending}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    "Suivant"
                  )}
                </Button>
              )}
            </div>

            <Card className="bg-muted/30 shadow-none">
              <CardContent>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">
                      Support technique WhatsApp
                    </p>
                    <div className="flex flex-col gap-1 mt-2">
                      <a
                        href="https://wa.me/24165164085"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +241 65 16 40 85
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block">
            <SurveySummary formData={formData} currentStep={currentStep} />
          </div>
        </div>

        <div className="lg:hidden mt-8">
          <SurveySummary formData={formData} currentStep={currentStep} />
        </div>
      </div>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Données invalides</AlertDialogTitle>
            <AlertDialogDescription>
              Veuillez corriger les erreurs suivantes avant de soumettre le
              formulaire:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 max-h-96 overflow-y-auto">
            <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              Compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

