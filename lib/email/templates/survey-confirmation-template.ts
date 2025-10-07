/**
 * Survey Confirmation Email Template
 * Sent after users complete the survey
 */

import type { EmailTemplateContent } from "../types";

export const surveyConfirmationTemplate = (
  userName: string,
  dossierId?: string
): EmailTemplateContent => ({
  subject: "Confirmation de participation - Enquête ANUTTC",
  htmlContent: `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de participation</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; }
          .message { font-size: 16px; color: #555; margin-bottom: 20px; line-height: 1.8; }
          .info-box { margin: 30px 0; padding: 20px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px; }
          .info-box p { margin: 10px 0; font-size: 14px; color: #666; }
          .footer { background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
          .footer p { margin: 5px 0; font-size: 14px; color: #6c757d; }
          .footer a { color: #667eea; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Merci pour votre participation !</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Okani Survey - DGCBF</p>
          </div>
          <div class="content">
            <p class="greeting">Bonjour ${userName}!</p>
            <p class="message">
              Nous vous confirmons la bonne réception de vos réponses à l'enquête de satisfaction concernant les services de l'ANUTTC.
            </p>
            ${dossierId ? `
            <div class="info-box">
              <p><strong>📄 Informations de votre participation :</strong></p>
              <p>Numéro de dossier : <strong>${dossierId}</strong></p>
              <p>Date de soumission : <strong>${new Date().toLocaleDateString("fr-FR", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}</strong></p>
            </div>
            ` : ""}
            <p class="message">
              Vos réponses aideront la Direction Générale du Contrôle Budgétaire et Financier (DGCBF) à améliorer la qualité des services fonciers au Gabon.
            </p>
            <p class="message" style="font-style: italic; font-size: 14px;">
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
Merci pour votre participation !

Bonjour ${userName}!

Nous vous confirmons la bonne réception de vos réponses à l'enquête de satisfaction concernant les services de l'ANUTTC.

${dossierId ? `Informations de votre participation :
- Numéro de dossier : ${dossierId}
- Date de soumission : ${new Date().toLocaleDateString("fr-FR")}
` : ""}

Vos réponses aideront la DGCBF à améliorer la qualité des services fonciers au Gabon.

Votre opinion compte et contribue à l'amélioration continue des services publics.

Besoin d'aide ? Contactez-nous via WhatsApp au +241 76 00 00 00 ou +241 66 00 00 00.

© 2024 OKANI Survey - DGCBF. Tous droits réservés.
  `,
});

