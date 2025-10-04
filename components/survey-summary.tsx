import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";

export type SurveyFormData = {
  stageReached: string;
  userType: string;
  nationality: string;
  legalEntity: string;
  hasCompletedStep: string;
  evaluation: string;
  paymentMode: string;
  paymentDate: string;
  paymentRecipient: string;
  hasReceipt: string;
  otherPaymentMode: string;
  globalSatisfaction: number[];
  recommendation: string;
  reason: string;
  generalSuggestions: string;
};

type SurveySummaryProps = {
  formData: SurveyFormData;
  currentStep: number;
};

export function SurveySummary({ formData, currentStep }: SurveySummaryProps) {
  const allSteps = [
    { id: 0, key: "profile", label: "Profil de l'usager" },
    { id: 1, key: "depot", label: "Dépôt de dossier" },
    { id: 2, key: "enquete", label: "Enquête foncière" },
    { id: 3, key: "etat-lieux", label: "État des lieux" },
    { id: 4, key: "affichage", label: "Avis d'affichage" },
    { id: 5, key: "bornage", label: "PV et plan de bornage" },
    { id: 6, key: "evaluation", label: "Rapport d'évaluation" },
    { id: 7, key: "global", label: "Évaluation globale" },
  ];

  const getVisibleSteps = (stageReached: string) => {
    if (!stageReached) {
      return [];
    }

    const stageOrder = ["depot", "enquete", "etat-lieux", "affichage", "bornage", "evaluation"];
    const stageIndex = stageOrder.indexOf(stageReached);
    
    if (stageIndex === -1) {
      return allSteps;
    }

    const visibleKeys = ["profile", ...stageOrder.slice(0, stageIndex + 1), "global"];
    return allSteps.filter(step => visibleKeys.includes(step.key)).map((step, index) => ({
      ...step,
      id: index
    }));
  };

  const steps = getVisibleSteps(formData.stageReached);

  if (steps.length === 0) {
    return null;
  }

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const isStepCompleted = (step: { key: string }) => {
    if (step.key === "profile") {
      return !!(
        formData.userType &&
        formData.nationality &&
        formData.legalEntity
      );
    }
    if (step.key === "global") {
      return !!(formData.globalSatisfaction[0] && formData.recommendation);
    }
    return !!formData.hasCompletedStep;
  };

  const renderStepIcon = (step: { id: number; key: string }) => {
    const status = getStepStatus(step.id);
    const isCompleted = isStepCompleted(step);

    if (isCompleted || status === "completed") {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }

    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  const renderStepContent = (step: { key: string }) => {
    if (step.key === "profile") {
      return (
        <div className="space-y-1 text-sm text-gray-600">
          {formData.userType && <p>{formData.userType === "usager" ? "Usager" : "Partenaire anonyme"}</p>}
          {formData.nationality && <p className="truncate">{formData.nationality}</p>}
        </div>
      );
    }
    
    if (step.key === "global" && formData.globalSatisfaction[0]) {
      return <p className="text-sm text-gray-600">Satisfaction: {formData.globalSatisfaction[0]}/5</p>;
    }
    
    if (step.key !== "global" && formData.hasCompletedStep) {
      return <p className="text-sm text-gray-600">{formData.hasCompletedStep === "oui" ? "Complété" : "Non complété"}</p>;
    }
    
    return null;
  };

  return (
    <div className="w-full lg:w-80 lg:flex-shrink-0">
      <Card className="lg:sticky lg:top-8 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">Résumé</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            const isCompleted = isStepCompleted(step);

            return (
              <div
                key={step.id}
                className={`p-3 lg:p-3 rounded-lg border transition-colors ${
                  status === "current"
                    ? "border-primary/30 bg-primary/10"
                    : isCompleted || status === "completed"
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {renderStepIcon(step)}
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-sm font-medium ${
                        status === "current"
                          ? "text-primary"
                          : isCompleted || status === "completed"
                            ? "text-green-700"
                            : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </h4>
                    {renderStepContent(step)}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

