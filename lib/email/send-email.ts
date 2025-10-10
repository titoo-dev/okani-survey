/**
 * Email service using Brevo API (formerly Sendinblue)
 * 
 * Required environment variables:
 * - BREVO_API_KEY: Your Brevo API key
 * - BREVO_FROM_EMAIL: Default sender email address
 * - BREVO_FROM_NAME: Default sender name
 * - NEXT_PUBLIC_APP_URL: Application URL for links
 */

import { z } from "zod";
import type { Survey } from "@/lib/generated/prisma";
import type { SurveyNotificationInfo } from "./types";
import {
  verificationTemplate,
  passwordResetTemplate,
  surveyConfirmationTemplate,
  adminNotificationTemplate,
} from "./templates";

// Validation schemas
const emailAddressSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().optional(),
});

const sendEmailSchema = z.object({
  to: z.array(emailAddressSchema).min(1, "At least one recipient is required"),
  subject: z.string().min(1, "Subject is required"),
  htmlContent: z.string().min(1, "HTML content is required"),
  textContent: z.string().optional(),
  replyTo: emailAddressSchema.optional(),
  cc: z.array(emailAddressSchema).optional(),
  bcc: z.array(emailAddressSchema).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

// Types
export type EmailAddress = z.infer<typeof emailAddressSchema>;
export type SendEmailParams = z.infer<typeof sendEmailSchema>;

export type EmailTemplate = 
  | "verification"
  | "welcome"
  | "password-reset"
  | "survey-confirmation"
  | "admin-notification";

interface BrevoResponse {
  messageId: string;
}

interface BrevoError {
  code: string;
  message: string;
}

/**
 * Load email template with context variables
 */
const loadTemplate = (template: string, context: Record<string, any>): string => {
  // This is a simple template loader - you can enhance it based on your needs
  let htmlContent = template;
  
  // Replace context variables in the template
  Object.keys(context).forEach(key => {
    const placeholder = `{{${key}}}`;
    const value = context[key] || '';
    htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return htmlContent;
};

/**
 * Send an email using Brevo API with the new payload structure
 */
export const sendEmailByApi = async ({
  to,
  subject,
  template,
  context,
}: {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}): Promise<BrevoResponse> => {
  const url = 'https://api.brevo.com/v3/smtp/email';
  const htmlContent = loadTemplate(template, context);

  const payload = {
    sender: { email: 'support@okanisurvey.com' },
    to: [{ email: to }],
    subject,
    htmlContent,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json() as BrevoError;
      throw new Error(`Brevo API error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json() as BrevoResponse;
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error);
    throw error;
  }
};

/**
 * Send a verification email
 */
export const sendVerificationEmail = async (
  email: string,
  verificationLink: string,
  userName?: string
): Promise<BrevoResponse> => {
  const template = verificationTemplate(verificationLink, userName);
  
  return sendEmailByApi({
    to: email,
    subject: template.subject,
    template: template.htmlContent,
    context: {
      verificationLink,
      userName: userName || "",
    },
  });
};


/**
 * Send a password reset email
 */
export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string,
  userName?: string
): Promise<BrevoResponse> => {
  const template = passwordResetTemplate(resetLink, userName);
  
  return sendEmailByApi({
    to: email,
    subject: template.subject,
    template: template.htmlContent,
    context: {
      resetLink,
      userName: userName || "",
    },
  });
};

/**
 * Send a survey confirmation email with survey details
 */
export const sendSurveyConfirmationEmail = async (
  survey: Survey
): Promise<BrevoResponse> => {
  const template = surveyConfirmationTemplate(survey);
  
  return sendEmailByApi({
    to: survey.email,
    subject: template.subject,
    template: template.htmlContent,
    context: {
      email: survey.email,
      dossierId: survey.dossierId || "",
      stageReached: survey.stageReached,
    },
  });
};

/**
 * Send an admin notification email
 */
export const sendAdminNotificationEmail = async (
  adminEmail: string,
  surveyInfo: SurveyNotificationInfo
): Promise<BrevoResponse> => {
  const template = adminNotificationTemplate(surveyInfo);
  
  return sendEmailByApi({
    to: adminEmail,
    subject: template.subject,
    template: template.htmlContent,
    context: {
      userName: surveyInfo.userName,
      userEmail: surveyInfo.userEmail,
      city: surveyInfo.city,
      procedureType: surveyInfo.procedureType,
      stageReached: surveyInfo.stageReached,
      dossierId: surveyInfo.dossierId || "",
      submittedAt: surveyInfo.submittedAt.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
    },
  });
};
