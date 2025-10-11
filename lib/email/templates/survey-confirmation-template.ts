/**
 * Survey Confirmation Email Template
 * Sent after users complete the survey
 */

import type { EmailTemplateContent } from "../types";
import type { Survey } from "@/lib/generated/prisma";

// Helper function to format boolean values
const formatBoolean = (value: boolean | null | undefined): string => {
  if (value === null || value === undefined) return "N/A";
  return value ? "Oui" : "Non";
};

// Helper function to format any value
const formatValue = (value: string | boolean | null | undefined): string => {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "boolean") return formatBoolean(value);
  return String(value);
};

// Helper function to determine which sections to show based on stage reached
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

// Helper function to format dates
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return String(dateString);
  }
};

// Determine visible sections based on stage reached (matches survey-detail-client.tsx logic)
const getVisibleSections = (survey: Survey): string[] => {
  const stageKey = getStageKey(survey.stageReached);
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

export const surveyConfirmationTemplate = (
  survey: Survey
): EmailTemplateContent => {
  const visibleSections = getVisibleSections(survey);
  const shouldShowSection = (sectionKey: string) => visibleSections.includes(sectionKey);

  // Build stage-specific sections HTML
  let stageSectionsHtml = "";

  if (shouldShowSection("depot")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>📋 Dépôt de dossier</h3>
        <div class="section-content">
          <p><strong>Évaluation :</strong> <span class="value">${formatValue(survey.depotEvaluation)}</span></p>
          <p><strong>Mode de paiement :</strong> <span class="value">${formatValue(survey.depotPaymentMode)}</span></p>
          ${survey.depotOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> <span class="value">${survey.depotOtherPaymentMode}</span></p>` : ""}
          <p><strong>Montant payé :</strong> <span class="value">${formatValue(survey.depotAmountPaid)}</span></p>
          <p><strong>Reçu obtenu :</strong> <span class="${survey.depotHasReceipt ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.depotHasReceipt)}</span></p>
          <p><strong>Accusé de réception :</strong> <span class="${survey.depotHasAcknowledgment ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.depotHasAcknowledgment)}</span></p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("enquete")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>🔍 Enquête foncière</h3>
        <div class="section-content">
          <p><strong>Délai perçu :</strong> <span class="value">${formatValue(survey.enqueteDelayPerceived)}</span></p>
          <p><strong>Mode de paiement :</strong> <span class="value">${formatValue(survey.enquetePaymentMode)}</span></p>
          ${survey.enqueteOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> <span class="value">${survey.enqueteOtherPaymentMode}</span></p>` : ""}
          <p><strong>Reçu obtenu :</strong> <span class="${survey.enqueteHasReceipt ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.enqueteHasReceipt)}</span></p>
          <p><strong>Satisfaction :</strong> <span class="value">${formatValue(survey.enqueteSatisfaction)}/5 ⭐</span></p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("etat-lieux")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>🏠 État des lieux</h3>
        <div class="section-content">
          <p><strong>Délai perçu :</strong> <span class="value">${formatValue(survey.etatLieuxDelayPerceived)}</span></p>
          <p><strong>Mode de paiement :</strong> <span class="value">${formatValue(survey.etatLieuxPaymentMode)}</span></p>
          ${survey.etatLieuxOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> <span class="value">${survey.etatLieuxOtherPaymentMode}</span></p>` : ""}
          <p><strong>Reçu obtenu :</strong> <span class="${survey.etatLieuxHasReceipt ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.etatLieuxHasReceipt)}</span></p>
          <p><strong>Satisfaction :</strong> <span class="value">${formatValue(survey.etatLieuxSatisfaction)}/5 ⭐</span></p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("affichage")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>📌 Avis d'affichage</h3>
        <div class="section-content">
          <p><strong>Affiché dans les délais :</strong> <span class="${survey.affichageInTime ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.affichageInTime)}</span></p>
          <p><strong>Informé de l'affichage :</strong> <span class="${survey.affichageWasInformed ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.affichageWasInformed)}</span></p>
          ${survey.affichageInformationChannel ? `<p><strong>Canal d'information :</strong> <span class="value">${survey.affichageInformationChannel}</span></p>` : ""}
          <p><strong>Délai suffisant :</strong> <span class="${survey.affichageSufficientDelay ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.affichageSufficientDelay)}</span></p>
          <p><strong>Opposition :</strong> <span class="${survey.affichageHasOpposition ? 'boolean-no' : 'boolean-yes'}">${formatBoolean(survey.affichageHasOpposition)}</span></p>
          <p><strong>Frais :</strong> <span class="value">${formatValue(survey.affichageFees)}</span></p>
          <p><strong>Reçu obtenu :</strong> <span class="${survey.affichageHasReceipt ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.affichageHasReceipt)}</span></p>
          <p><strong>Satisfaction :</strong> <span class="value">${formatValue(survey.affichageSatisfaction)}/5 ⭐</span></p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("bornage")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>📐 PV et plan de bornage</h3>
        <div class="section-content">
          <p><strong>Délai perçu :</strong> <span class="value">${formatValue(survey.bornageDelayPerceived)}</span></p>
          <p><strong>Mode de paiement :</strong> <span class="value">${formatValue(survey.bornagePaymentMode)}</span></p>
          ${survey.bornageOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> <span class="value">${survey.bornageOtherPaymentMode}</span></p>` : ""}
          <p><strong>Reçu obtenu :</strong> <span class="${survey.bornageHasReceipt ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.bornageHasReceipt)}</span></p>
          <p><strong>Satisfaction :</strong> <span class="value">${formatValue(survey.bornageSatisfaction)}/5 ⭐</span></p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("evaluation")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>📊 Rapport d'évaluation</h3>
        <div class="section-content">
          <p><strong>Compréhension du prix :</strong> <span class="value">${formatValue(survey.evaluationPriceUnderstanding)}</span></p>
          <p><strong>Mode de paiement :</strong> <span class="value">${formatValue(survey.evaluationPaymentMode)}</span></p>
          ${survey.evaluationOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> <span class="value">${survey.evaluationOtherPaymentMode}</span></p>` : ""}
          <p><strong>Reçu obtenu :</strong> <span class="${survey.evaluationHasReceipt ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.evaluationHasReceipt)}</span></p>
          <p><strong>Satisfaction :</strong> <span class="value">${formatValue(survey.evaluationSatisfaction)}/5 ⭐</span></p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("decision")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>✅ Décision</h3>
        <div class="section-content">
          <p><strong>Délai :</strong> <span class="value">${formatValue(survey.decisionDelay)}</span></p>
          <p><strong>Mode de paiement :</strong> <span class="value">${formatValue(survey.decisionPaymentMode)}</span></p>
          ${survey.decisionOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> <span class="value">${survey.decisionOtherPaymentMode}</span></p>` : ""}
          <p><strong>Reçu obtenu :</strong> <span class="${survey.decisionHasReceipt ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.decisionHasReceipt)}</span></p>
          <p><strong>Transmis :</strong> <span class="${survey.wasTransmitted ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.wasTransmitted)}</span></p>
          <p><strong>Acte de cession :</strong> <span class="${survey.hasActeCession ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.hasActeCession)}</span></p>
          <p><strong>Titre de propriété :</strong> <span class="${survey.hasTitrePropriete ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.hasTitrePropriete)}</span></p>
          <p><strong>Satisfaction :</strong> <span class="value">${formatValue(survey.decisionSatisfaction)}/5 ⭐</span></p>
        </div>
      </div>
    `;
  }

  // Governance section (always shown)
  const governanceHtml = `
    <div class="section">
      <h3>⚖️ Gouvernance et transparence</h3>
      <div class="section-content">
        <p><strong>Paiement non officiel :</strong> <span class="${survey.hasUnofficialPayment ? 'boolean-no' : 'boolean-yes'}">${formatBoolean(survey.hasUnofficialPayment)}</span></p>
        <p><strong>Favoritisme :</strong> <span class="${survey.hasFavoritism ? 'boolean-no' : 'boolean-yes'}">${formatBoolean(survey.hasFavoritism)}</span></p>
        <p><strong>Confiance en la transparence :</strong> <span class="value">${formatValue(survey.trustTransparency)}/5 ⭐</span></p>
      </div>
    </div>
  `;

  // Disputes section (if applicable)
  let disputesHtml = "";
  if (survey.hadOpposition === true) {
    disputesHtml = `
      <div class="section" style="border-left: 5px solid #ef4444;">
        <h3 style="color: #dc2626; border-bottom-color: #ef4444;">⚠️ Litiges et oppositions</h3>
        <div class="section-content">
          <p><strong>Opposition :</strong> <span class="boolean-no">${formatBoolean(survey.hadOpposition)}</span></p>
          <p><strong>Date d'opposition :</strong> <span class="value">${formatDate(survey.oppositionDate)}</span></p>
          <p><strong>Nature de l'opposition :</strong> <span class="value">${formatValue(survey.oppositionNature)}</span></p>
          ${survey.oppositionNatureOther ? `<p><strong>Autre nature :</strong> <span class="value">${survey.oppositionNatureOther}</span></p>` : ""}
          <p><strong>Délai du litige :</strong> <span class="value">${formatValue(survey.litigeDelay)}</span></p>
          <p><strong>Frais payés :</strong> <span class="${survey.paidLitigeFees ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.paidLitigeFees)}</span></p>
          ${survey.litigePaymentMode ? `<p><strong>Mode de paiement :</strong> <span class="value">${survey.litigePaymentMode}</span></p>` : ""}
          ${survey.litigePaymentAmount ? `<p><strong>Montant payé :</strong> <span class="value">${survey.litigePaymentAmount}</span></p>` : ""}
          <p><strong>Reçu obtenu :</strong> <span class="${survey.litigeHasReceipt ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.litigeHasReceipt)}</span></p>
          <p><strong>Informé de la procédure :</strong> <span class="${survey.wasInformedProcedure ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.wasInformedProcedure)}</span></p>
          <p><strong>Lettre formelle envoyée :</strong> <span class="${survey.sentFormalLetter ? 'boolean-yes' : 'boolean-no'}">${formatBoolean(survey.sentFormalLetter)}</span></p>
          ${survey.letterReference ? `<p><strong>Référence de la lettre :</strong> <span class="value">${survey.letterReference}</span></p>` : ""}
          <p><strong>Cause du litige :</strong> <span class="value">${formatValue(survey.litigeCause)}</span></p>
          ${survey.litigeCauseOther ? `<p><strong>Autre cause :</strong> <span class="value">${survey.litigeCauseOther}</span></p>` : ""}
          <p><strong>Satisfaction :</strong> <span class="value">${formatValue(survey.litigeSatisfaction)}/5 ⭐</span></p>
          <p><strong>Issue du litige :</strong> <span class="value">${formatValue(survey.litigeOutcome)}</span></p>
          ${survey.litigeOutcomeOther ? `<p><strong>Autre issue :</strong> <span class="value">${survey.litigeOutcomeOther}</span></p>` : ""}
          ${survey.litigeComments ? `<p style="margin-top: 16px; padding: 12px; background: #fef2f2; border-radius: 6px; border: 1px solid #fecaca;"><strong>💬 Commentaires :</strong><br><span style="color: #991b1b; font-style: italic;">${survey.litigeComments}</span></p>` : ""}
        </div>
      </div>
    `;
  }

  // Global evaluation (always shown)
  const globalHtml = `
    <div class="section" style="background: linear-gradient(to bottom, #eff6ff, #dbeafe); border-left: 5px solid #3b82f6;">
      <h3 style="color: #1d4ed8; border-bottom-color: #3b82f6;">🌐 Évaluation globale du processus</h3>
      <div class="section-content">
        <p><strong>Délai total :</strong> <span class="value">${formatValue(survey.totalDelay)}</span></p>
        <p><strong>Date de transmission :</strong> <span class="value">${formatDate(survey.transmissionDate)}</span></p>
        <p><strong>Coût total :</strong> <span class="value">${formatValue(survey.totalCost)}</span></p>
        <p><strong>Satisfaction globale :</strong> <span class="value" style="font-size: 16px; font-weight: 700; color: #1d4ed8;">${formatValue(survey.globalSatisfaction)}/5 ⭐</span></p>
        ${survey.generalSuggestions ? `<p style="margin-top: 16px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;"><strong>💡 Suggestions générales :</strong><br><span style="color: #1e40af; font-style: italic;">${survey.generalSuggestions}</span></p>` : ""}
      </div>
    </div>
  `;

  return {
    subject: "Résumé de votre participation - Enquête ANUTTC",
  htmlContent: `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Résumé de votre enquête</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 20px 0; }
          .container { max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06); }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 48px 30px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0 0 8px 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; }
          .header-subtitle { margin: 0; font-size: 15px; opacity: 0.95; font-weight: 500; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 16px; }
          .message { font-size: 16px; color: #4b5563; margin-bottom: 24px; line-height: 1.7; }
          .info-box { margin: 32px 0; padding: 24px; background: linear-gradient(to bottom, #ecfdf5, #f0fdf4); border-left: 5px solid #10b981; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }
          .info-box-title { font-size: 16px; font-weight: 700; color: #059669; margin-bottom: 16px; display: flex; align-items: center; }
          .info-box p { margin: 10px 0; font-size: 14px; color: #374151; line-height: 1.6; }
          .info-box strong { color: #1f2937; font-weight: 600; display: inline-block; min-width: 180px; }
          .section { margin: 28px 0; padding: 24px; background-color: #fafafa; border-radius: 10px; border: 1px solid #e5e7eb; transition: all 0.2s ease; }
          .section:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
          .section h3 { margin: 0 0 20px 0; font-size: 19px; color: #059669; border-bottom: 3px solid #10b981; padding-bottom: 10px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
          .section-content { display: grid; gap: 12px; }
          .section-content p { margin: 0; font-size: 14px; color: #4b5563; line-height: 1.7; padding: 8px 0; }
          .section-content strong { color: #1f2937; font-weight: 600; display: inline-block; min-width: 180px; }
          .section-content .value { color: #374151; }
          .divider { height: 2px; background: linear-gradient(to right, transparent, #e5e7eb, transparent); margin: 36px 0; }
          .footer { background: linear-gradient(to bottom, #f9fafb, #f3f4f6); padding: 36px 30px; text-align: center; border-top: 2px solid #e5e7eb; }
          .footer-title { font-size: 15px; font-weight: 600; color: #374151; margin-bottom: 12px; }
          .footer p { margin: 8px 0; font-size: 14px; color: #6b7280; }
          .footer a { color: #10b981; text-decoration: none; font-weight: 600; }
          .footer a:hover { text-decoration: underline; }
          .footer-copyright { margin-top: 24px; font-size: 12px; color: #9ca3af; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          .badge { display: inline-block; padding: 6px 14px; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 14px; font-size: 13px; font-weight: 700; letter-spacing: 0.3px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3); }
          .boolean-yes { color: #059669; font-weight: 600; }
          .boolean-no { color: #dc2626; font-weight: 600; }
          .summary-title { font-size: 24px; color: #059669; margin: 32px 0 24px 0; font-weight: 700; padding-bottom: 12px; border-bottom: 3px solid #10b981; }
          @media only screen and (max-width: 600px) {
            .container { border-radius: 0; margin: 0; }
            .content { padding: 24px 20px; }
            .header { padding: 32px 20px; }
            .info-box strong, .section-content strong { min-width: 140px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Merci pour votre participation !</h1>
            <p class="header-subtitle">Okani Survey - Direction Générale du Contrôle Budgétaire et Financier</p>
          </div>
          <div class="content">
            <p class="greeting">Bonjour,</p>
            <p class="message">
              Nous vous confirmons la bonne réception de vos réponses à l'enquête de satisfaction concernant les procédures foncières gérées par l'<strong>ANUTTC</strong> (Agence Nationale de l'Urbanisme, des Travaux Topographiques et du Cadastre).
            </p>
            <p class="message">
              Vos retours sont précieux et contribueront directement à l'amélioration de la qualité des services fonciers au Gabon.
            </p>
            
            <div class="info-box">
              <div class="info-box-title">📄 Informations générales</div>
              <p><strong>Email :</strong> <span class="value">${survey.email}</span></p>
              ${survey.dossierId ? `<p><strong>N° de dossier :</strong> <span class="value">${survey.dossierId}</span></p>` : ""}
              <p><strong>Ville de dépôt :</strong> <span class="value">${survey.depositCity}</span></p>
              ${survey.regularizationCity ? `<p><strong>Ville de régularisation :</strong> <span class="value">${survey.regularizationCity}</span></p>` : ""}
              ${survey.residenceCity ? `<p><strong>Ville de résidence :</strong> <span class="value">${survey.residenceCity}</span></p>` : ""}
              <p><strong>Type d'utilisateur :</strong> <span class="value">${survey.userType}</span></p>
              ${survey.legalEntity ? `<p><strong>Entité juridique :</strong> <span class="value">${survey.legalEntity}</span></p>` : ""}
              ${survey.nationality ? `<p><strong>Nationalité :</strong> <span class="value">${survey.nationality}</span></p>` : ""}
              <p><strong>Étape atteinte :</strong> <span class="badge">${survey.stageReached}</span></p>
              <p><strong>Date de soumission :</strong> <span class="value">${new Date(survey.createdAt).toLocaleDateString("fr-FR", { 
                year: "numeric", 
                month: "long", 
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}</span></p>
            </div>

            <div class="divider"></div>
            
            <h2 class="summary-title">📋 Résumé détaillé de vos réponses</h2>
            
            ${stageSectionsHtml}
            
            ${governanceHtml}
            
            ${disputesHtml}
            
            ${globalHtml}

            <div class="divider"></div>

            <div class="section" style="background: linear-gradient(to bottom, #fef3c7, #fef9e5); border-left: 5px solid #f59e0b;">
              <h3 style="color: #d97706; border-bottom-color: #f59e0b;">💡 Impact de votre contribution</h3>
              <div class="section-content">
                <p style="color: #78350f; font-size: 15px;">
                  Vos réponses seront analysées par la <strong>Direction Générale du Contrôle Budgétaire et Financier (DGCBF)</strong> dans le cadre de l'évaluation des services de l'ANUTTC.
                </p>
                <p style="color: #78350f; font-size: 15px;">
                  Cette enquête contribue directement à l'amélioration de la transparence et de l'efficacité des procédures foncières au Gabon.
                </p>
              </div>
            </div>

            <p class="message" style="text-align: center; font-style: italic; font-size: 15px; color: #6b7280; margin-top: 32px;">
              🙏 Merci d'avoir pris le temps de partager votre expérience avec nous.
            </p>
          </div>
          <div class="footer">
            <p class="footer-title">📞 Besoin d'aide ou d'informations ?</p>
            <p>Notre équipe est à votre disposition</p>
            <p>
              <strong>WhatsApp :</strong> <a href="https://wa.me/24165164085">+241 65 16 40 85</a>
            </p>
            <p class="footer-copyright">
              © ${new Date().getFullYear()} OKANI Survey - Direction Générale du Contrôle Budgétaire et Financier<br>
              Tous droits réservés.
            </p>
          </div>
        </div>
      </body>
    </html>
  `,
  textContent: `
RÉSUMÉ DE VOTRE PARTICIPATION - ENQUÊTE ANUTTC
===============================================

Bonjour!

Nous vous confirmons la bonne réception de vos réponses à l'enquête de satisfaction concernant les services de l'ANUTTC.

📄 INFORMATIONS GÉNÉRALES
-------------------------
Email : ${survey.email}
${survey.dossierId ? `Numéro de dossier : ${survey.dossierId}\n` : ""}Ville de dépôt : ${survey.depositCity}
Type d'utilisateur : ${survey.userType}
Étape atteinte : ${survey.stageReached}
Date de soumission : ${new Date(survey.createdAt).toLocaleDateString("fr-FR")}

${shouldShowSection("depot") ? `
📋 DÉPÔT DE DOSSIER
-------------------
Évaluation : ${formatValue(survey.depotEvaluation)}
Mode de paiement : ${formatValue(survey.depotPaymentMode)}
${survey.depotOtherPaymentMode ? `Autre mode de paiement : ${survey.depotOtherPaymentMode}\n` : ""}Montant payé : ${formatValue(survey.depotAmountPaid)}
Reçu obtenu : ${formatBoolean(survey.depotHasReceipt)}
Accusé de réception : ${formatBoolean(survey.depotHasAcknowledgment)}
` : ""}

${shouldShowSection("enquete") ? `
🔍 ENQUÊTE FONCIÈRE
-------------------
Délai perçu : ${formatValue(survey.enqueteDelayPerceived)}
Mode de paiement : ${formatValue(survey.enquetePaymentMode)}
${survey.enqueteOtherPaymentMode ? `Autre mode de paiement : ${survey.enqueteOtherPaymentMode}\n` : ""}Reçu obtenu : ${formatBoolean(survey.enqueteHasReceipt)}
Satisfaction : ${formatValue(survey.enqueteSatisfaction)}
` : ""}

${shouldShowSection("etat-lieux") ? `
🏠 ÉTAT DES LIEUX
-----------------
Délai perçu : ${formatValue(survey.etatLieuxDelayPerceived)}
Mode de paiement : ${formatValue(survey.etatLieuxPaymentMode)}
${survey.etatLieuxOtherPaymentMode ? `Autre mode de paiement : ${survey.etatLieuxOtherPaymentMode}\n` : ""}Reçu obtenu : ${formatBoolean(survey.etatLieuxHasReceipt)}
Satisfaction : ${formatValue(survey.etatLieuxSatisfaction)}
` : ""}

${shouldShowSection("affichage") ? `
📌 AVIS D'AFFICHAGE
-------------------
Affiché dans les délais : ${formatBoolean(survey.affichageInTime)}
Informé de l'affichage : ${formatBoolean(survey.affichageWasInformed)}
${survey.affichageInformationChannel ? `Canal d'information : ${survey.affichageInformationChannel}\n` : ""}Délai suffisant : ${formatBoolean(survey.affichageSufficientDelay)}
Opposition : ${formatBoolean(survey.affichageHasOpposition)}
Frais : ${formatValue(survey.affichageFees)}
Reçu obtenu : ${formatBoolean(survey.affichageHasReceipt)}
Satisfaction : ${formatValue(survey.affichageSatisfaction)}
` : ""}

${shouldShowSection("bornage") ? `
📐 PV ET PLAN DE BORNAGE
------------------------
Délai perçu : ${formatValue(survey.bornageDelayPerceived)}
Mode de paiement : ${formatValue(survey.bornagePaymentMode)}
${survey.bornageOtherPaymentMode ? `Autre mode de paiement : ${survey.bornageOtherPaymentMode}\n` : ""}Reçu obtenu : ${formatBoolean(survey.bornageHasReceipt)}
Satisfaction : ${formatValue(survey.bornageSatisfaction)}
` : ""}

${shouldShowSection("evaluation") ? `
📊 RAPPORT D'ÉVALUATION
-----------------------
Compréhension du prix : ${formatValue(survey.evaluationPriceUnderstanding)}
Mode de paiement : ${formatValue(survey.evaluationPaymentMode)}
${survey.evaluationOtherPaymentMode ? `Autre mode de paiement : ${survey.evaluationOtherPaymentMode}\n` : ""}Reçu obtenu : ${formatBoolean(survey.evaluationHasReceipt)}
Satisfaction : ${formatValue(survey.evaluationSatisfaction)}
` : ""}

${shouldShowSection("decision") ? `
✅ DÉCISION
-----------
Délai : ${formatValue(survey.decisionDelay)}
Mode de paiement : ${formatValue(survey.decisionPaymentMode)}
${survey.decisionOtherPaymentMode ? `Autre mode de paiement : ${survey.decisionOtherPaymentMode}\n` : ""}Reçu obtenu : ${formatBoolean(survey.decisionHasReceipt)}
Transmis : ${formatBoolean(survey.wasTransmitted)}
Acte de cession : ${formatBoolean(survey.hasActeCession)}
Titre de propriété : ${formatBoolean(survey.hasTitrePropriete)}
Satisfaction : ${formatValue(survey.decisionSatisfaction)}
` : ""}

⚖️ GOUVERNANCE ET TRANSPARENCE
-------------------------------
Paiement non officiel : ${formatBoolean(survey.hasUnofficialPayment)}
Favoritisme : ${formatBoolean(survey.hasFavoritism)}
Confiance en la transparence : ${formatValue(survey.trustTransparency)}

${survey.hadOpposition === true ? `
⚠️ LITIGES
----------
Opposition : ${formatBoolean(survey.hadOpposition)}
Date d'opposition : ${formatValue(survey.oppositionDate)}
Nature de l'opposition : ${formatValue(survey.oppositionNature)}
${survey.oppositionNatureOther ? `Autre nature : ${survey.oppositionNatureOther}\n` : ""}Délai du litige : ${formatValue(survey.litigeDelay)}
Frais payés : ${formatBoolean(survey.paidLitigeFees)}
${survey.litigePaymentMode ? `Mode de paiement : ${survey.litigePaymentMode}\n` : ""}${survey.litigePaymentAmount ? `Montant payé : ${survey.litigePaymentAmount}\n` : ""}Reçu obtenu : ${formatBoolean(survey.litigeHasReceipt)}
Informé de la procédure : ${formatBoolean(survey.wasInformedProcedure)}
Lettre formelle envoyée : ${formatBoolean(survey.sentFormalLetter)}
${survey.letterReference ? `Référence de la lettre : ${survey.letterReference}\n` : ""}Cause du litige : ${formatValue(survey.litigeCause)}
${survey.litigeCauseOther ? `Autre cause : ${survey.litigeCauseOther}\n` : ""}Satisfaction : ${formatValue(survey.litigeSatisfaction)}
Issue du litige : ${formatValue(survey.litigeOutcome)}
${survey.litigeOutcomeOther ? `Autre issue : ${survey.litigeOutcomeOther}\n` : ""}${survey.litigeComments ? `Commentaires : ${survey.litigeComments}\n` : ""}
` : ""}

🌐 ÉVALUATION GLOBALE
---------------------
Délai total : ${formatValue(survey.totalDelay)}
Date de transmission : ${formatValue(survey.transmissionDate)}
Coût total : ${formatValue(survey.totalCost)}
Satisfaction globale : ${formatValue(survey.globalSatisfaction)}
${survey.generalSuggestions ? `Suggestions générales : ${survey.generalSuggestions}\n` : ""}

===============================================

Vos réponses aideront la DGCBF à améliorer la qualité des services fonciers au Gabon.

Votre opinion compte et contribue à l'amélioration continue des services publics.

Besoin d'aide ? Contactez-nous via WhatsApp au +241 65 16 40 85.

© 2024 OKANI Survey - DGCBF. Tous droits réservés.
  `,
  };
};

