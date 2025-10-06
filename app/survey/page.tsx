"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  FolderOpen, 
  Search, 
  Eye, 
  Map, 
  FileCheck, 
  BarChart,
  Shield,
  Scale,
  Gavel
} from "lucide-react";

import { StepIndicator } from "../../components/step-indicator";
import { SurveySummary, type SurveyFormData } from "../../components/survey-summary";
import { UserProfileStep, validateUserProfileStep } from "../../components/steps/user-profile-step";
import { EvaluationStep, validateEvaluationStep } from "../../components/steps/evaluation-step";
import { DecisionStep, validateDecisionStep } from "../../components/steps/decision-step";
import { GovernanceStep, validateGovernanceStep } from "../../components/steps/governance-step";
import { DisputesStep, validateDisputesStep } from "../../components/steps/disputes-step";
import { GlobalEvaluationStep, validateGlobalEvaluationStep } from "../../components/steps/global-evaluation-step";

export default function SurveyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SurveyFormData>({
    stageReached: "",
    userType: "",
    nationality: "",
    legalEntity: "",
    hasCompletedStep: "",
    evaluation: "",
    paymentMode: "",
    paymentDate: "",
    paymentRecipient: "",
    hasReceipt: "",
    otherPaymentMode: "",
    amountPaid: "",
    hasAcknowledgment: "",
    delayPerceived: "",
    satisfaction: [3],
    priceUnderstanding: "",
    affichageInTime: "",
    wasInformed: "",
    informationChannel: "",
    sufficientDelay: "",
    hasOpposition: "",
    affichageFees: "",
    decisionDelay: "",
    decisionPaymentMode: "",
    decisionOtherPaymentMode: "",
    decisionHasReceipt: "",
    wasTransmitted: "",
    hasActeCession: "",
    hasTitrePropriete: "",
    decisionSatisfaction: [5],
    hasUnofficialPayment: "",
    hasFavoritism: "",
    trustTransparency: [3],
    hadOpposition: "",
    oppositionDate: "",
    oppositionNature: "",
    oppositionNatureOther: "",
    litigeDelay: "",
    paidLitigeFees: "",
    litigePaymentMode: "",
    litigePaymentAmount: "",
    litigeHasReceipt: "",
    wasInformedProcedure: "",
    sentFormalLetter: "",
    letterReference: "",
    litigeCause: "",
    litigeCauseOther: "",
    litigeSatisfaction: [3],
    litigeOutcome: "",
    litigeOutcomeOther: "",
    litigeComments: "",
    totalDelay: "",
    totalCost: "",
    globalSatisfaction: [5],
    generalSuggestions: "",
  });

  useEffect(() => {
    const stageReached = sessionStorage.getItem("stageReached");
    if (!stageReached) {
      router.push("/stage-selection");
    } else {
      setFormData((prev) => ({ ...prev, stageReached }));
    }
  }, [router]);

  const allSteps = [
    { id: 0, key: "profile", title: "Profil", icon: <User className="w-4 h-4" /> },
    { id: 1, key: "depot", title: "Dépôt", icon: <FolderOpen className="w-4 h-4" /> },
    { id: 2, key: "enquete", title: "Enquête", icon: <Search className="w-4 h-4" /> },
    { id: 3, key: "etat-lieux", title: "État des lieux", icon: <FileCheck className="w-4 h-4" /> },
    { id: 4, key: "affichage", title: "Affichage", icon: <Eye className="w-4 h-4" /> },
    { id: 5, key: "bornage", title: "Bornage", icon: <Map className="w-4 h-4" /> },
    { id: 6, key: "evaluation", title: "Évaluation", icon: <FileCheck className="w-4 h-4" /> },
    { id: 7, key: "decision", title: "Décision", icon: <Gavel className="w-4 h-4" /> },
    { id: 8, key: "governance", title: "Gouvernance", icon: <Shield className="w-4 h-4" /> },
    { id: 9, key: "disputes", title: "Litiges", icon: <Scale className="w-4 h-4" /> },
    { id: 10, key: "global", title: "Global", icon: <BarChart className="w-4 h-4" /> },
  ];

  const allStepDetails = [
    { key: "profile", title: "Profil de l'usager", description: "Informations de base", estimatedTime: "1 min" },
    { key: "depot", title: "Dépôt de dossier", description: "Étape 2", estimatedTime: "2 min" },
    { key: "enquete", title: "Enquête foncière", description: "Étape 3", estimatedTime: "2 min" },
    { key: "etat-lieux", title: "État des lieux", description: "Étape 4", estimatedTime: "2 min" },
    { key: "affichage", title: "Avis d'affichage", description: "Étape 5", estimatedTime: "3 min" },
    { key: "bornage", title: "PV et plan de bornage", description: "Étape 6", estimatedTime: "2 min" },
    { key: "evaluation", title: "Rapport d'évaluation", description: "Étape 7", estimatedTime: "2 min" },
    { key: "decision", title: "Décision et transmission", description: "Étape 8", estimatedTime: "3 min" },
    { key: "governance", title: "Gouvernance et probité", description: "Transparence du processus", estimatedTime: "2 min" },
    { key: "disputes", title: "Litiges et oppositions", description: "Si applicable", estimatedTime: "3 min" },
    { key: "global", title: "Évaluation globale", description: "Impressions générales", estimatedTime: "2 min" },
  ];

  const getVisibleSteps = (stageReached: string) => {
    if (!stageReached) {
      return [];
    }

    const stageOrder = ["depot", "enquete", "etat-lieux", "affichage", "bornage", "evaluation", "decision"];
    const stageIndex = stageOrder.indexOf(stageReached);
    
    if (stageIndex === -1) {
      return allSteps;
    }

    const visibleKeys = ["profile", ...stageOrder.slice(0, stageIndex + 1), "governance", "disputes", "global"];
    return allSteps.filter(step => visibleKeys.includes(step.key)).map((step, index) => ({
      ...step,
      id: index
    }));
  };

  const steps = getVisibleSteps(formData.stageReached);
  const stepDetails = allStepDetails.filter(detail => 
    steps.some(step => step.key === detail.key)
  );

  if (steps.length === 0) {
    return null;
  }

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
      return <UserProfileStep formData={formData} updateFormData={updateFormData} />;
    }
    
    if (currentStepKey === "decision") {
      return <DecisionStep formData={formData} updateFormData={updateFormData} />;
    }
    
    if (currentStepKey === "governance") {
      return <GovernanceStep formData={formData} updateFormData={updateFormData} />;
    }
    
    if (currentStepKey === "disputes") {
      return <DisputesStep formData={formData} updateFormData={updateFormData} />;
    }
    
    if (currentStepKey === "global") {
      return <GlobalEvaluationStep formData={formData} updateFormData={updateFormData} />;
    }

    return (
      <EvaluationStep
        formData={formData}
        updateFormData={updateFormData}
        stepTitle={currentStepDetail?.title || ""}
        stepKey={currentStepKey || ""}
      />
    );
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
          
          {formData.stageReached && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Étape sélectionnée:</span>{" "}
                {formData.stageReached === "depot" && "Dépôt de dossier"}
                {formData.stageReached === "enquete" && "Enquête foncière"}
                {formData.stageReached === "etat-lieux" && "État des lieux"}
                {formData.stageReached === "affichage" && "Avis d'affichage"}
                {formData.stageReached === "bornage" && "PV et plan de bornage"}
                {formData.stageReached === "evaluation" && "Rapport d'évaluation"}
                {formData.stageReached === "decision" && "Décision et transmission"}
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
