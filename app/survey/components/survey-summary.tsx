import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";

export type SurveyFormData = {
  stageReached: string;
  dossierNumber: string;
  city: string;
  procedureType: string;
  startYear: string;
  age: string;
  gender: string;
  nationality: string;
  legalEntity: string;
  email: string;
  satisfaction1: number[];
  delays1: string;
  courtesy1: number[];
  difficulties1: string;
  suggestions1: string;
  recommendation: string;
  reason: string;
  generalSuggestions: string;
};

type SurveySummaryProps = {
  formData: SurveyFormData;
  currentStep: number;
};

export function SurveySummary({ formData, currentStep }: SurveySummaryProps) {
  const steps = [
    { id: 0, label: "Étape atteinte" },
    { id: 1, label: "Profil de l'usager" },
    { id: 2, label: "Dépôt de dossier" },
    { id: 3, label: "Enquête foncière" },
    { id: 4, label: "Avis d'affichage" },
    { id: 5, label: "PV et plan de bornage" },
    { id: 6, label: "Rapport d'évaluation" },
    { id: 7, label: "Décision finale" },
    { id: 8, label: "Évaluation globale" },
  ];

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const isStepCompleted = (stepId: number) => {
    switch (stepId) {
      case 0:
        return !!formData.stageReached;
      case 1:
        return !!(
          formData.city &&
          formData.procedureType &&
          formData.startYear &&
          formData.age &&
          formData.gender &&
          formData.legalEntity &&
          formData.email
        );
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return !!(formData.satisfaction1[0] && formData.delays1 && formData.courtesy1[0]);
      case 8:
        return !!formData.satisfaction1[0];
      default:
        return false;
    }
  };

  const renderStepIcon = (stepId: number) => {
    const status = getStepStatus(stepId);
    const isCompleted = isStepCompleted(stepId);

    if (isCompleted || status === "completed") {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }

    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  const renderStepContent = (stepId: number) => {
    switch (stepId) {
      case 0:
        return formData.stageReached ? (
          <p className="text-sm text-gray-600">{formData.stageReached}</p>
        ) : null;
      case 1:
        return (
          <div className="space-y-1 text-sm text-gray-600">
            {formData.city && <p>{formData.city}</p>}
            {formData.email && <p className="truncate">{formData.email}</p>}
          </div>
        );
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return formData.satisfaction1[0] ? (
          <p className="text-sm text-gray-600">Satisfaction: {formData.satisfaction1[0]}/5</p>
        ) : null;
      default:
        return null;
    }
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
            const isCompleted = isStepCompleted(step.id);

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
                  {renderStepIcon(step.id)}
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
                    {renderStepContent(step.id)}
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

