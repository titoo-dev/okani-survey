/**
 * Admin Notification Email Template
 * Sent to administrators when a new survey is submitted
 */

import type { EmailTemplateContent, SurveyNotificationInfo } from "../types";

export const adminNotificationTemplate = (
  surveyInfo: SurveyNotificationInfo
): EmailTemplateContent => ({
  subject: `Nouvelle réponse enquête - ${surveyInfo.city}`,
  htmlContent: `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle réponse</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px 20px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
          .content { padding: 30px; }
          .info-row { padding: 15px; margin: 10px 0; background-color: #f8f9fa; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
          .info-label { font-weight: 600; color: #555; }
          .info-value { color: #333; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 Nouvelle Réponse Enquête</h1>
          </div>
          <div class="content">
            <h2 style="color: #333; margin-top: 0;">Détails de la soumission</h2>
            <div class="info-row">
              <span class="info-label">Participant :</span>
              <span class="info-value">${surveyInfo.userName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email :</span>
              <span class="info-value">${surveyInfo.userEmail}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Ville :</span>
              <span class="info-value">${surveyInfo.city}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Type de procédure :</span>
              <span class="info-value">${surveyInfo.procedureType}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Étape atteinte :</span>
              <span class="info-value">${surveyInfo.stageReached}</span>
            </div>
            ${surveyInfo.dossierId ? `
            <div class="info-row">
              <span class="info-label">Numéro de dossier :</span>
              <span class="info-value">${surveyInfo.dossierId}</span>
            </div>
            ` : ""}
            <div class="info-row">
              <span class="info-label">Date de soumission :</span>
              <span class="info-value">${surveyInfo.submittedAt.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}</span>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              <a href="${process.env.NEXT_PUBLIC_URL || "https://okanisurvey.com"}" style="color: #3b82f6; font-weight: 600; text-decoration: none;">Accéder au tableau de bord</a>
            </p>
            <p style="margin: 0; font-size: 12px; color: #999;">
              © 2024 OKANI Survey - DGCBF. Tous droits réservés.
            </p>
          </div>
        </div>
      </body>
    </html>
  `,
  textContent: `
Nouvelle Réponse Enquête

Détails de la soumission :
- Participant : ${surveyInfo.userName}
- Email : ${surveyInfo.userEmail}
- Ville : ${surveyInfo.city}
- Type de procédure : ${surveyInfo.procedureType}
- Étape atteinte : ${surveyInfo.stageReached}
${surveyInfo.dossierId ? `- Numéro de dossier : ${surveyInfo.dossierId}` : ""}
- Date de soumission : ${surveyInfo.submittedAt.toLocaleDateString("fr-FR")}

Accéder au tableau de bord : ${process.env.NEXT_PUBLIC_URL || "https://okanisurvey.com"}

© 2024 OKANI Survey - DGCBF. Tous droits réservés.
  `,
});

