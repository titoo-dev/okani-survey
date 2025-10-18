"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/ui/star-rating";
import { ArrowLeft, Calendar, Mail, MapPin, User, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import type { Survey } from "@/lib/generated/prisma";

type SurveyDetailClientProps = {
  survey: Survey;
};

export function SurveyDetailClient({ survey }: SurveyDetailClientProps) {
  const router = useRouter();

  // Map stage reached to stage key
  const getStageKey = (stageReached: string): string => {
    const stageMapping: Record<string, string> = {
      "Dépôt de dossier": "depot",
      "Enquête foncière": "enquete",
      "État des lieux": "etat-lieux",
      "Avis d'affichage": "affichage",
      "PV et plan de bornage": "bornage",
      "Rapport d'évaluation": "evaluation",
      "Décision": "decision",
    };
    return stageMapping[stageReached] || "";
  };

  // Determine which sections to show based on stage reached
  const getVisibleSections = (stageReached: string): string[] => {
    const stageKey = getStageKey(stageReached);
    const stageOrder = [
      "depot",
      "enquete",
      "etat-lieux",
      "affichage",
      "bornage",
      "evaluation",
      "decision",
    ];
    
    const stageIndex = stageOrder.indexOf(stageKey);
    
    if (stageIndex === -1) {
      // If stage not found, show all sections
      return [...stageOrder, "governance", "disputes", "global"];
    }
    
    // Show all sections up to the reached stage
    const visibleSections = stageOrder.slice(0, stageIndex + 1);
    
    // Always add governance and global
    visibleSections.push("governance", "global");
    
    // Add disputes if user had opposition
    if (survey.hadOpposition === true) {
      visibleSections.push("disputes");
    }
    
    return visibleSections;
  };

  const visibleSections = getVisibleSections(survey.stageReached);
  const shouldShowSection = (sectionKey: string) => visibleSections.includes(sectionKey);

  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case "Dépôt de dossier":
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
      case "Enquête foncière":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "Avis d'affichage":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "PV et plan de bornage":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      case "Rapport d'évaluation":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "Décision":
        return "bg-stat-warning/10 text-stat-warning border-stat-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatBoolean = (value: boolean | null | undefined) => {
    if (value === null || value === undefined) {
      return (
        <Badge variant="outline" className="bg-muted/30 text-muted-foreground border-muted">
          <MinusCircle className="h-3 w-3" />
          N/A
        </Badge>
      );
    }
    return value ? (
      <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
        <CheckCircle2 className="h-3 w-3" />
        Oui
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20">
        <XCircle className="h-3 w-3" />
        Non
      </Badge>
    );
  };

  const formatValue = (value: string | boolean | null | undefined) => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === "boolean") return formatBoolean(value);
    return value;
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };


  const getStatusBadgeText = (status: string | null | undefined) => {
    switch (status) {
      case "SENT":
        return "Soumis";
      case "PENDING":
        return "En cours";
      default:
        return "Soumis";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/dashboard/surveys")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Détails de l'enquête
            </h1>
            <p className="text-muted-foreground">
              ID: <span className="font-mono text-xs">{survey.id}</span>
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`${getStageBadgeColor(survey.stageReached)} text-sm`}
        >
          {survey.stageReached}
        </Badge>
      </div>

      {/* General Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>
            Informations de base sur l'enquête et l'utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{survey.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Date de soumission</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(survey.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Ville de dépôt</p>
                <p className="text-sm text-muted-foreground">
                  {survey.depositCity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Type d'utilisateur</p>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 mt-1">
                  {survey.userType}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 text-muted-foreground flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Statut</p>
                <Badge 
                  variant="outline" 
                  className={
                    survey.status === "SENT" 
                      ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 mt-1"
                      : survey.status === "PENDING"
                      ? "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20 mt-1"
                      : "bg-muted text-muted-foreground mt-1"
                  }
                >
                  {getStatusBadgeText(survey.status)}
                </Badge>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem label="N° de dossier" value={<span className="font-mono text-xs">{survey.dossierId}</span>} />
            <InfoItem
              label="Ville de régularisation"
              value={survey.regularizationCity}
            />
            <InfoItem label="Ville de résidence" value={survey.residenceCity} />
            <InfoItem label="Entité juridique" value={survey.legalEntity} />
            <InfoItem label="Nationalité" value={survey.nationality} />
            <InfoItem label="Étape atteinte" value={
              <Badge variant="outline" className={getStageBadgeColor(survey.stageReached)}>
                {survey.stageReached}
              </Badge>
            } />
          </div>
        </CardContent>
      </Card>

      {/* Stage-specific sections */}
      {shouldShowSection("depot") && (
        <Card>
          <CardHeader>
            <CardTitle>Dépôt de dossier</CardTitle>
            <CardDescription>
              Informations sur l'étape de dépôt de dossier
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Évaluation"
                value={formatValue(survey.depotEvaluation)}
              />
              <InfoItem
                label="Mode de paiement"
                value={formatValue(survey.depotPaymentMode)}
              />
              {survey.depotOtherPaymentMode && (
                <InfoItem
                  label="Autre mode de paiement"
                  value={survey.depotOtherPaymentMode}
                />
              )}
              <InfoItem
                label="Montant payé"
                value={formatValue(survey.depotAmountPaid)}
              />
              <InfoItem
                label="Reçu obtenu"
                value={formatBoolean(survey.depotHasReceipt)}
              />
              <InfoItem
                label="Accusé de réception"
                value={formatBoolean(survey.depotHasAcknowledgment)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {shouldShowSection("enquete") && (
        <Card>
          <CardHeader>
            <CardTitle>Enquête foncière</CardTitle>
            <CardDescription>
              Informations sur l'étape d'enquête foncière
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Délai perçu"
                value={formatValue(survey.enqueteDelayPerceived)}
              />
              <InfoItem
                label="Mode de paiement"
                value={formatValue(survey.enquetePaymentMode)}
              />
              {survey.enqueteOtherPaymentMode && (
                <InfoItem
                  label="Autre mode de paiement"
                  value={survey.enqueteOtherPaymentMode}
                />
              )}
              <InfoItem
                label="Reçu obtenu"
                value={formatBoolean(survey.enqueteHasReceipt)}
              />
              <InfoItemSatisfaction
                label="Satisfaction"
                value={survey.enqueteSatisfaction}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {shouldShowSection("etat-lieux") && (
        <Card>
          <CardHeader>
            <CardTitle>État des lieux</CardTitle>
            <CardDescription>
              Informations sur l'étape d'état des lieux
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Délai perçu"
                value={formatValue(survey.etatLieuxDelayPerceived)}
              />
              <InfoItem
                label="Mode de paiement"
                value={formatValue(survey.etatLieuxPaymentMode)}
              />
              {survey.etatLieuxOtherPaymentMode && (
                <InfoItem
                  label="Autre mode de paiement"
                  value={survey.etatLieuxOtherPaymentMode}
                />
              )}
              <InfoItem
                label="Reçu obtenu"
                value={formatBoolean(survey.etatLieuxHasReceipt)}
              />
              <InfoItemSatisfaction
                label="Satisfaction"
                value={survey.etatLieuxSatisfaction}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {shouldShowSection("affichage") && (
        <Card>
          <CardHeader>
            <CardTitle>Avis d'affichage</CardTitle>
            <CardDescription>
              Informations sur l'étape d'avis d'affichage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Affiché dans les délais"
                value={formatBoolean(survey.affichageInTime)}
              />
              <InfoItem
                label="Informé de l'affichage"
                value={formatBoolean(survey.affichageWasInformed)}
              />
              {survey.affichageInformationChannel && (
                <InfoItem
                  label="Canal d'information"
                  value={survey.affichageInformationChannel}
                />
              )}
              <InfoItem
                label="Délai suffisant"
                value={formatBoolean(survey.affichageSufficientDelay)}
              />
              <InfoItem
                label="Opposition"
                value={formatBoolean(survey.affichageHasOpposition)}
              />
              <InfoItem
                label="Frais"
                value={formatValue(survey.affichageFees)}
              />
              <InfoItem
                label="Reçu obtenu"
                value={formatBoolean(survey.affichageHasReceipt)}
              />
              <InfoItemSatisfaction
                label="Satisfaction"
                value={survey.affichageSatisfaction}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {shouldShowSection("bornage") && (
        <Card>
          <CardHeader>
            <CardTitle>PV et plan de bornage</CardTitle>
            <CardDescription>
              Informations sur l'étape de bornage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Délai perçu"
                value={formatValue(survey.bornageDelayPerceived)}
              />
              <InfoItem
                label="Mode de paiement"
                value={formatValue(survey.bornagePaymentMode)}
              />
              {survey.bornageOtherPaymentMode && (
                <InfoItem
                  label="Autre mode de paiement"
                  value={survey.bornageOtherPaymentMode}
                />
              )}
              <InfoItem
                label="Reçu obtenu"
                value={formatBoolean(survey.bornageHasReceipt)}
              />
              <InfoItemSatisfaction
                label="Satisfaction"
                value={survey.bornageSatisfaction}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {shouldShowSection("evaluation") && (
        <Card>
          <CardHeader>
            <CardTitle>Rapport d'évaluation</CardTitle>
            <CardDescription>
              Informations sur l'étape d'évaluation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Compréhension du prix"
                value={formatValue(survey.evaluationPriceUnderstanding)}
              />
              <InfoItem
                label="Mode de paiement"
                value={formatValue(survey.evaluationPaymentMode)}
              />
              {survey.evaluationOtherPaymentMode && (
                <InfoItem
                  label="Autre mode de paiement"
                  value={survey.evaluationOtherPaymentMode}
                />
              )}
              <InfoItem
                label="Reçu obtenu"
                value={formatBoolean(survey.evaluationHasReceipt)}
              />
              <InfoItemSatisfaction
                label="Satisfaction"
                value={survey.evaluationSatisfaction}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {shouldShowSection("decision") && (
        <Card>
          <CardHeader>
            <CardTitle>Décision</CardTitle>
            <CardDescription>
              Informations sur l'étape de décision
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Délai"
                value={formatValue(survey.decisionDelay)}
              />
              <InfoItem
                label="Mode de paiement"
                value={formatValue(survey.decisionPaymentMode)}
              />
              {survey.decisionOtherPaymentMode && (
                <InfoItem
                  label="Autre mode de paiement"
                  value={survey.decisionOtherPaymentMode}
                />
              )}
              <InfoItem
                label="Reçu obtenu"
                value={formatBoolean(survey.decisionHasReceipt)}
              />
              <InfoItem
                label="Transmis"
                value={formatBoolean(survey.wasTransmitted)}
              />
              <InfoItem
                label="Acte de cession"
                value={formatBoolean(survey.hasActeCession)}
              />
              <InfoItem
                label="Titre de propriété"
                value={formatBoolean(survey.hasTitrePropriete)}
              />
              <InfoItemSatisfaction
                label="Satisfaction"
                value={survey.decisionSatisfaction}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Governance */}
      {shouldShowSection("governance") && (
        <Card>
          <CardHeader>
            <CardTitle>Gouvernance</CardTitle>
            <CardDescription>
              Informations sur la gouvernance et la transparence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Paiement non officiel"
                value={formatBoolean(survey.hasUnofficialPayment)}
              />
              <InfoItem
                label="Favoritisme"
                value={formatBoolean(survey.hasFavoritism)}
              />
              <InfoItemSatisfaction
                label="Confiance en la transparence"
                value={survey.trustTransparency}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disputes */}
      {shouldShowSection("disputes") && survey.hadOpposition === true && (
        <Card>
          <CardHeader>
            <CardTitle>Litiges</CardTitle>
            <CardDescription>
              Informations sur les litiges et oppositions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Opposition"
                value={formatBoolean(survey.hadOpposition)}
              />
              <InfoItem
                label="Date d'opposition"
                value={formatDate(survey.oppositionDate)}
              />
              <InfoItem
                label="Nature de l'opposition"
                value={formatValue(survey.oppositionNature)}
              />
              {survey.oppositionNatureOther && (
                <InfoItem
                  label="Autre nature"
                  value={survey.oppositionNatureOther}
                />
              )}
              <InfoItem
                label="Délai du litige"
                value={formatValue(survey.litigeDelay)}
              />
              <InfoItem
                label="Frais payés"
                value={formatBoolean(survey.paidLitigeFees)}
              />
              {survey.litigePaymentMode && (
                <InfoItem
                  label="Mode de paiement"
                  value={survey.litigePaymentMode}
                />
              )}
              {survey.litigePaymentAmount && (
                <InfoItem
                  label="Montant payé"
                  value={survey.litigePaymentAmount}
                />
              )}
              <InfoItem
                label="Reçu obtenu"
                value={formatBoolean(survey.litigeHasReceipt)}
              />
              <InfoItem
                label="Informé de la procédure"
                value={formatBoolean(survey.wasInformedProcedure)}
              />
              <InfoItem
                label="Lettre formelle envoyée"
                value={formatBoolean(survey.sentFormalLetter)}
              />
              {survey.letterReference && (
                <InfoItem
                  label="Référence de la lettre"
                  value={survey.letterReference}
                />
              )}
              <InfoItem
                label="Cause du litige"
                value={formatValue(survey.litigeCause)}
              />
              {survey.litigeCauseOther && (
                <InfoItem
                  label="Autre cause"
                  value={survey.litigeCauseOther}
                />
              )}
              <InfoItemSatisfaction
                label="Satisfaction"
                value={survey.litigeSatisfaction}
              />
              <InfoItem
                label="Issue du litige"
                value={formatValue(survey.litigeOutcome)}
              />
              {survey.litigeOutcomeOther && (
                <InfoItem
                  label="Autre issue"
                  value={survey.litigeOutcomeOther}
                />
              )}
            </div>
            {survey.litigeComments && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-2">Commentaires</p>
                  <p className="text-sm text-muted-foreground">
                    {survey.litigeComments}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Global Evaluation */}
      {shouldShowSection("global") && (
        <Card>
          <CardHeader>
            <CardTitle>Évaluation globale</CardTitle>
            <CardDescription>
              Évaluation globale du processus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoItem
                label="Délai total"
                value={formatValue(survey.totalDelay)}
              />
              <InfoItem
                label="Date de transmission"
                value={formatDate(survey.transmissionDate)}
              />
              <InfoItem
                label="Coût total"
                value={formatValue(survey.totalCost)}
              />
              <InfoItemSatisfaction
                label="Satisfaction globale"
                value={survey.globalSatisfaction}
              />
            </div>
            {survey.generalSuggestions && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-2">Suggestions générales</p>
                  <p className="text-sm text-muted-foreground">
                    {survey.generalSuggestions}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="text-sm mt-1">{value}</div>
    </div>
  );
}

function InfoItemSatisfaction({ label, value }: { label: string; value: string | number | string[] | number[] | null | undefined }) {
  // Parse the value to extract a number
  let numValue: number | null = null;
  
  if (value !== null && value !== undefined) {
    if (typeof value === 'number') {
      numValue = value;
    } else if (typeof value === 'string') {
      // Try to parse string as JSON array first
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          numValue = Number(parsed[0]);
        } else {
          numValue = Number(value);
        }
      } catch {
        // If JSON parse fails, try direct number conversion
        numValue = Number(value);
      }
    } else if (Array.isArray(value) && value.length > 0) {
      numValue = Number(value[0]);
    }
  }
  
  const isValidSatisfaction = numValue !== null && !isNaN(numValue) && numValue >= 0 && numValue <= 5;

  return (
    <div className="col-span-2">
      <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
      {isValidSatisfaction ? (
        <StarRating value={numValue || 0} onChange={() => {}} max={5} readonly />
      ) : (
        <span className="text-sm text-muted-foreground">N/A</span>
      )}
    </div>
  );
}
