/**
 * Password Reset Email Template
 * Sent when users request a password reset
 */

import type { EmailTemplateContent } from "../types";

export const passwordResetTemplate = (
  resetLink: string,
  userName?: string
): EmailTemplateContent => ({
  subject: "Réinitialisation de votre mot de passe - Okani Survey",
  htmlContent: `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Réinitialisation mot de passe</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; }
          .message { font-size: 16px; color: #555; margin-bottom: 30px; line-height: 1.8; }
          .cta-button { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; transition: transform 0.2s; }
          .cta-button:hover { transform: translateY(-2px); }
          .warning-box { margin: 30px 0; padding: 20px; background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 4px; }
          .warning-box p { margin: 0; font-size: 14px; color: #666; }
          .footer { background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
          .footer p { margin: 5px 0; font-size: 14px; color: #6c757d; }
          .footer a { color: #667eea; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔑 Réinitialisation</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Okani Survey - DGCBF</p>
          </div>
          <div class="content">
            <p class="greeting">Bonjour ${userName || ""}!</p>
            <p class="message">
              Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetLink}" class="cta-button">Réinitialiser mon mot de passe</a>
            </div>
            <div class="warning-box">
              <p><strong>⚠️ Important :</strong></p>
              <p>Ce lien est valable pendant 1 heure. Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et votre mot de passe restera inchangé.</p>
            </div>
          </div>
          <div class="footer">
            <p>Besoin d'aide ? Contactez-nous :</p>
            <p>
              WhatsApp: <a href="https://wa.me/24165164085">+241 65 16 40 85</a>
            </p>
            <p style="margin-top: 15px;">
              <a href="${process.env.NEXT_PUBLIC_URL || "https://okanisurvey.com"}" style="color: #667eea; font-weight: 600;">Visiter notre site web</a>
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
Réinitialisation de votre mot de passe

Bonjour ${userName || ""}!

Nous avons reçu une demande de réinitialisation de votre mot de passe. Utilisez le lien suivant pour créer un nouveau mot de passe :

${resetLink}

Ce lien est valable pendant 1 heure.

Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et votre mot de passe restera inchangé.

Besoin d'aide ? Contactez-nous via WhatsApp au +241 65 16 40 85.

Visitez notre site : ${process.env.NEXT_PUBLIC_URL || "https://okanisurvey.com"}

© 2024 OKANI Survey - DGCBF. Tous droits réservés.
  `,
});

