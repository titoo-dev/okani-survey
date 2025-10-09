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

export const surveyConfirmationTemplate = (
  survey: Survey
): EmailTemplateContent => {
  const stageKey = getStageKey(survey.stageReached);
  const stageOrder = ["depot", "enquete", "etat-lieux", "affichage", "bornage", "evaluation", "decision"];
  const stageIndex = stageOrder.indexOf(stageKey);
  
  const visibleSections = stageIndex !== -1 
    ? stageOrder.slice(0, stageIndex + 1)
    : stageOrder;

  const shouldShowSection = (sectionKey: string) => visibleSections.includes(sectionKey);

  // Build stage-specific sections HTML
  let stageSectionsHtml = "";

  if (shouldShowSection("depot")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>📋 Dépôt de dossier</h3>
        <div class="section-content">
          <p><strong>Évaluation :</strong> ${formatValue(survey.depotEvaluation)}</p>
          <p><strong>Mode de paiement :</strong> ${formatValue(survey.depotPaymentMode)}</p>
          ${survey.depotOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> ${survey.depotOtherPaymentMode}</p>` : ""}
          <p><strong>Montant payé :</strong> ${formatValue(survey.depotAmountPaid)}</p>
          <p><strong>Reçu obtenu :</strong> ${formatBoolean(survey.depotHasReceipt)}</p>
          <p><strong>Accusé de réception :</strong> ${formatBoolean(survey.depotHasAcknowledgment)}</p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("enquete")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>🔍 Enquête foncière</h3>
        <div class="section-content">
          <p><strong>Délai perçu :</strong> ${formatValue(survey.enqueteDelayPerceived)}</p>
          <p><strong>Mode de paiement :</strong> ${formatValue(survey.enquetePaymentMode)}</p>
          ${survey.enqueteOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> ${survey.enqueteOtherPaymentMode}</p>` : ""}
          <p><strong>Reçu obtenu :</strong> ${formatBoolean(survey.enqueteHasReceipt)}</p>
          <p><strong>Satisfaction :</strong> ${formatValue(survey.enqueteSatisfaction)}</p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("etat-lieux")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>🏠 État des lieux</h3>
        <div class="section-content">
          <p><strong>Délai perçu :</strong> ${formatValue(survey.etatLieuxDelayPerceived)}</p>
          <p><strong>Mode de paiement :</strong> ${formatValue(survey.etatLieuxPaymentMode)}</p>
          ${survey.etatLieuxOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> ${survey.etatLieuxOtherPaymentMode}</p>` : ""}
          <p><strong>Reçu obtenu :</strong> ${formatBoolean(survey.etatLieuxHasReceipt)}</p>
          <p><strong>Satisfaction :</strong> ${formatValue(survey.etatLieuxSatisfaction)}</p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("affichage")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>📌 Avis d'affichage</h3>
        <div class="section-content">
          <p><strong>Affiché dans les délais :</strong> ${formatBoolean(survey.affichageInTime)}</p>
          <p><strong>Informé de l'affichage :</strong> ${formatBoolean(survey.affichageWasInformed)}</p>
          ${survey.affichageInformationChannel ? `<p><strong>Canal d'information :</strong> ${survey.affichageInformationChannel}</p>` : ""}
          <p><strong>Délai suffisant :</strong> ${formatBoolean(survey.affichageSufficientDelay)}</p>
          <p><strong>Opposition :</strong> ${formatBoolean(survey.affichageHasOpposition)}</p>
          <p><strong>Frais :</strong> ${formatValue(survey.affichageFees)}</p>
          <p><strong>Reçu obtenu :</strong> ${formatBoolean(survey.affichageHasReceipt)}</p>
          <p><strong>Satisfaction :</strong> ${formatValue(survey.affichageSatisfaction)}</p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("bornage")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>📐 PV et plan de bornage</h3>
        <div class="section-content">
          <p><strong>Délai perçu :</strong> ${formatValue(survey.bornageDelayPerceived)}</p>
          <p><strong>Mode de paiement :</strong> ${formatValue(survey.bornagePaymentMode)}</p>
          ${survey.bornageOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> ${survey.bornageOtherPaymentMode}</p>` : ""}
          <p><strong>Reçu obtenu :</strong> ${formatBoolean(survey.bornageHasReceipt)}</p>
          <p><strong>Satisfaction :</strong> ${formatValue(survey.bornageSatisfaction)}</p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("evaluation")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>📊 Rapport d'évaluation</h3>
        <div class="section-content">
          <p><strong>Compréhension du prix :</strong> ${formatValue(survey.evaluationPriceUnderstanding)}</p>
          <p><strong>Mode de paiement :</strong> ${formatValue(survey.evaluationPaymentMode)}</p>
          ${survey.evaluationOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> ${survey.evaluationOtherPaymentMode}</p>` : ""}
          <p><strong>Reçu obtenu :</strong> ${formatBoolean(survey.evaluationHasReceipt)}</p>
          <p><strong>Satisfaction :</strong> ${formatValue(survey.evaluationSatisfaction)}</p>
        </div>
      </div>
    `;
  }

  if (shouldShowSection("decision")) {
    stageSectionsHtml += `
      <div class="section">
        <h3>✅ Décision</h3>
        <div class="section-content">
          <p><strong>Délai :</strong> ${formatValue(survey.decisionDelay)}</p>
          <p><strong>Mode de paiement :</strong> ${formatValue(survey.decisionPaymentMode)}</p>
          ${survey.decisionOtherPaymentMode ? `<p><strong>Autre mode de paiement :</strong> ${survey.decisionOtherPaymentMode}</p>` : ""}
          <p><strong>Reçu obtenu :</strong> ${formatBoolean(survey.decisionHasReceipt)}</p>
          <p><strong>Transmis :</strong> ${formatBoolean(survey.wasTransmitted)}</p>
          <p><strong>Acte de cession :</strong> ${formatBoolean(survey.hasActeCession)}</p>
          <p><strong>Titre de propriété :</strong> ${formatBoolean(survey.hasTitrePropriete)}</p>
          <p><strong>Satisfaction :</strong> ${formatValue(survey.decisionSatisfaction)}</p>
        </div>
      </div>
    `;
  }

  // Governance section (always shown)
  const governanceHtml = `
    <div class="section">
      <h3>⚖️ Gouvernance et transparence</h3>
      <div class="section-content">
        <p><strong>Paiement non officiel :</strong> ${formatBoolean(survey.hasUnofficialPayment)}</p>
        <p><strong>Favoritisme :</strong> ${formatBoolean(survey.hasFavoritism)}</p>
        <p><strong>Confiance en la transparence :</strong> ${formatValue(survey.trustTransparency)}</p>
      </div>
    </div>
  `;

  // Disputes section (if applicable)
  let disputesHtml = "";
  if (survey.hadOpposition === true) {
    disputesHtml = `
      <div class="section">
        <h3>⚠️ Litiges</h3>
        <div class="section-content">
          <p><strong>Opposition :</strong> ${formatBoolean(survey.hadOpposition)}</p>
          <p><strong>Date d'opposition :</strong> ${formatValue(survey.oppositionDate)}</p>
          <p><strong>Nature de l'opposition :</strong> ${formatValue(survey.oppositionNature)}</p>
          ${survey.oppositionNatureOther ? `<p><strong>Autre nature :</strong> ${survey.oppositionNatureOther}</p>` : ""}
          <p><strong>Délai du litige :</strong> ${formatValue(survey.litigeDelay)}</p>
          <p><strong>Frais payés :</strong> ${formatBoolean(survey.paidLitigeFees)}</p>
          ${survey.litigePaymentMode ? `<p><strong>Mode de paiement :</strong> ${survey.litigePaymentMode}</p>` : ""}
          ${survey.litigePaymentAmount ? `<p><strong>Montant payé :</strong> ${survey.litigePaymentAmount}</p>` : ""}
          <p><strong>Reçu obtenu :</strong> ${formatBoolean(survey.litigeHasReceipt)}</p>
          <p><strong>Informé de la procédure :</strong> ${formatBoolean(survey.wasInformedProcedure)}</p>
          <p><strong>Lettre formelle envoyée :</strong> ${formatBoolean(survey.sentFormalLetter)}</p>
          ${survey.letterReference ? `<p><strong>Référence de la lettre :</strong> ${survey.letterReference}</p>` : ""}
          <p><strong>Cause du litige :</strong> ${formatValue(survey.litigeCause)}</p>
          ${survey.litigeCauseOther ? `<p><strong>Autre cause :</strong> ${survey.litigeCauseOther}</p>` : ""}
          <p><strong>Satisfaction :</strong> ${formatValue(survey.litigeSatisfaction)}</p>
          <p><strong>Issue du litige :</strong> ${formatValue(survey.litigeOutcome)}</p>
          ${survey.litigeOutcomeOther ? `<p><strong>Autre issue :</strong> ${survey.litigeOutcomeOther}</p>` : ""}
          ${survey.litigeComments ? `<p><strong>Commentaires :</strong> ${survey.litigeComments}</p>` : ""}
        </div>
      </div>
    `;
  }

  // Global evaluation (always shown)
  const globalHtml = `
    <div class="section">
      <h3>🌐 Évaluation globale</h3>
      <div class="section-content">
        <p><strong>Délai total :</strong> ${formatValue(survey.totalDelay)}</p>
        <p><strong>Date de transmission :</strong> ${formatValue(survey.transmissionDate)}</p>
        <p><strong>Coût total :</strong> ${formatValue(survey.totalCost)}</p>
        <p><strong>Satisfaction globale :</strong> ${formatValue(survey.globalSatisfaction)}</p>
        ${survey.generalSuggestions ? `<p><strong>Suggestions générales :</strong> ${survey.generalSuggestions}</p>` : ""}
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
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .content { padding: 30px 30px; }
          .greeting { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; }
          .message { font-size: 16px; color: #555; margin-bottom: 20px; line-height: 1.8; }
          .info-box { margin: 25px 0; padding: 20px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px; }
          .info-box p { margin: 8px 0; font-size: 14px; color: #666; }
          .info-box strong { color: #333; }
          .section { margin: 25px 0; padding: 20px; background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb; }
          .section h3 { margin: 0 0 15px 0; font-size: 18px; color: #059669; border-bottom: 2px solid #10b981; padding-bottom: 8px; }
          .section-content p { margin: 10px 0; font-size: 14px; color: #555; }
          .section-content strong { color: #333; font-weight: 600; }
          .divider { height: 1px; background-color: #e5e7eb; margin: 30px 0; }
          .footer { background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
          .footer p { margin: 5px 0; font-size: 14px; color: #6c757d; }
          .footer a { color: #667eea; text-decoration: none; }
          .badge { display: inline-block; padding: 4px 12px; background-color: #10b981; color: white; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Merci pour votre participation !</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Okani Survey - DGCBF</p>
          </div>
          <div class="content">
            <p class="greeting">Bonjour!</p>
            <p class="message">
              Nous vous confirmons la bonne réception de vos réponses à l'enquête de satisfaction concernant les services de l'ANUTTC.
            </p>
            
            <div class="info-box">
              <p><strong>📄 Informations générales</strong></p>
              <p><strong>Email :</strong> ${survey.email}</p>
              ${survey.dossierId ? `<p><strong>Numéro de dossier :</strong> ${survey.dossierId}</p>` : ""}
              <p><strong>Ville de dépôt :</strong> ${survey.depositCity}</p>
              <p><strong>Type d'utilisateur :</strong> ${survey.userType}</p>
              <p><strong>Étape atteinte :</strong> <span class="badge">${survey.stageReached}</span></p>
              <p><strong>Date de soumission :</strong> ${new Date(survey.createdAt).toLocaleDateString("fr-FR", { 
                year: "numeric", 
                month: "long", 
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}</p>
            </div>

            <div class="divider"></div>
            
            <h2 style="font-size: 22px; color: #059669; margin-bottom: 20px;">📋 Résumé de vos réponses</h2>
            
            ${stageSectionsHtml}
            
            ${governanceHtml}
            
            ${disputesHtml}
            
            ${globalHtml}

            <div class="divider"></div>

            <p class="message">
              Vos réponses aideront la Direction Générale du Contrôle Budgétaire et Financier (DGCBF) à améliorer la qualité des services fonciers au Gabon.
            </p>
            <p class="message" style="font-style: italic; font-size: 14px; color: #666;">
              Votre opinion compte et contribue à l'amélioration continue des services publics.
            </p>
          </div>
          <div class="footer">
            <p>Besoin d'aide ? Contactez-nous :</p>
            <p>
              WhatsApp: <a href="https://wa.me/24176000000">+241 76 00 00 00</a> | 
              <a href="https://wa.me/24166000000">+241 66 00 00 00</a>
            </p>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              © 2024 OKANI Survey - DGCBF. Tous droits réservés.
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

Besoin d'aide ? Contactez-nous via WhatsApp au +241 76 00 00 00 ou +241 66 00 00 00.

© 2024 OKANI Survey - DGCBF. Tous droits réservés.
  `,
  };
};

