"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { 
  FileText, 
  User, 
  FolderOpen, 
  Search, 
  Eye, 
  Map, 
  FileCheck, 
  CheckCircle, 
  BarChart 
} from "lucide-react";

import { StepIndicator } from "./components/step-indicator";
import { SurveySummary, type SurveyFormData } from "./components/survey-summary";
import { StageReachedStep, validateStageReachedStep } from "./steps/stage-reached-step";
import { UserProfileStep, validateUserProfileStep } from "./steps/user-profile-step";
import { EvaluationStep, validateEvaluationStep } from "./steps/evaluation-step";
import { GlobalEvaluationStep, validateGlobalEvaluationStep } from "./steps/global-evaluation-step";

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SurveyFormData>({
    stageReached: "",
    dossierNumber: "",
    city: "",
    procedureType: "",
    startYear: "",
    age: "",
    gender: "",
    nationality: "Gabonaise",
    legalEntity: "",
    email: "",
    satisfaction1: [3],
    delays1: "",
    courtesy1: [4],
    difficulties1: "",
    suggestions1: "",
    recommendation: "",
    reason: "",
    generalSuggestions: "",
  });

  const steps = [
    { id: 0, title: "Étape atteinte", icon: <FileText className="w-4 h-4" /> },
    { id: 1, title: "Profil", icon: <User className="w-4 h-4" /> },
    { id: 2, title: "Dépôt", icon: <FolderOpen className="w-4 h-4" /> },
    { id: 3, title: "Enquête", icon: <Search className="w-4 h-4" /> },
    { id: 4, title: "Affichage", icon: <Eye className="w-4 h-4" /> },
    { id: 5, title: "Bornage", icon: <Map className="w-4 h-4" /> },
    { id: 6, title: "Évaluation", icon: <FileCheck className="w-4 h-4" /> },
    { id: 7, title: "Décision", icon: <CheckCircle className="w-4 h-4" /> },
    { id: 8, title: "Global", icon: <BarChart className="w-4 h-4" /> },
  ];

  const stepDetails = [
    { title: "Étape atteinte", description: "Identification de votre situation", estimatedTime: "30 sec" },
    { title: "Profil de l'usager", description: "Informations de base", estimatedTime: "1 min" },
    { title: "Dépôt de dossier", description: "Évaluation étape 1", estimatedTime: "2 min" },
    { title: "Enquête foncière", description: "Évaluation étape 2", estimatedTime: "2 min" },
    { title: "Avis d'affichage", description: "Évaluation étape 3", estimatedTime: "2 min" },
    { title: "PV et plan de bornage", description: "Évaluation étape 4", estimatedTime: "2 min" },
    { title: "Rapport d'évaluation", description: "Évaluation étape 5", estimatedTime: "2 min" },
    { title: "Décision finale", description: "Évaluation étape 6", estimatedTime: "2 min" },
    { title: "Évaluation globale", description: "Impressions générales", estimatedTime: "1 min" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const updateFormData = (updates: Partial<SurveyFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const isCurrentStepValid = (): boolean => {
    switch (currentStep) {
      case 0:
        return validateStageReachedStep(formData);
      case 1:
        return validateUserProfileStep(formData);
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return validateEvaluationStep(formData);
      case 8:
        return validateGlobalEvaluationStep(formData);
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StageReachedStep formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <UserProfileStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return (
          <EvaluationStep
            formData={formData}
            updateFormData={updateFormData}
            stepTitle="Dépôt de dossier"
            stepDescription="Évaluez votre expérience lors du dépôt de dossier"
          />
        );
      case 3:
        return (
          <EvaluationStep
            formData={formData}
            updateFormData={updateFormData}
            stepTitle="Enquête foncière"
            stepDescription="Évaluez votre expérience lors de l'enquête foncière"
          />
        );
      case 4:
        return (
          <EvaluationStep
            formData={formData}
            updateFormData={updateFormData}
            stepTitle="Avis d'affichage"
            stepDescription="Évaluez votre expérience lors de l'avis d'affichage"
          />
        );
      case 5:
        return (
          <EvaluationStep
            formData={formData}
            updateFormData={updateFormData}
            stepTitle="PV et plan de bornage"
            stepDescription="Évaluez votre expérience lors du PV et plan de bornage"
          />
        );
      case 6:
        return (
          <EvaluationStep
            formData={formData}
            updateFormData={updateFormData}
            stepTitle="Rapport d'évaluation"
            stepDescription="Évaluez votre expérience lors du rapport d'évaluation"
          />
        );
      case 7:
        return (
          <EvaluationStep
            formData={formData}
            updateFormData={updateFormData}
            stepTitle="Décision finale"
            stepDescription="Évaluez votre expérience lors de la décision finale"
          />
        );
      case 8:
        return <GlobalEvaluationStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Enquête de satisfaction</h1>
          </div>
          
          <StepIndicator steps={steps} currentStepIndex={currentStep} />
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
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
                  disabled={!isCurrentStepValid()}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Soumettre l'enquête
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </Button>
              )}
            </div>

            <Card className="mb-8 shadow-none">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{stepDetails[currentStep].title}</CardTitle>
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

            <Card className="bg-muted/30 shadow-none">
              <CardContent>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Besoin d'aide ?</p>
                    <p className="mt-1">
                      Si vous rencontrez des difficultés, contactez-nous à{" "}
                      <a href="mailto:support@okanisurvey.com" className="text-primary hover:underline">
                        support@okanisurvey.com
                      </a>
                    </p>
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
    </main>
  );
}
