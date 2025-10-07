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
 * Send an email using Brevo API
 */
export const sendEmail = async (params: SendEmailParams): Promise<BrevoResponse> => {
  // Validate parameters
  const validatedParams = sendEmailSchema.parse(params);

  // Check for required environment variables
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  const fromName = process.env.BREVO_FROM_NAME || "Okani Survey";

  if (!apiKey) {
    throw new Error("BREVO_API_KEY environment variable is not set");
  }

  if (!fromEmail) {
    throw new Error("BREVO_FROM_EMAIL environment variable is not set");
  }

  // Prepare request body
  const requestBody = {
    sender: {
      email: fromEmail,
      name: fromName,
    },
    to: validatedParams.to,
    subject: validatedParams.subject,
    htmlContent: validatedParams.htmlContent,
    textContent: validatedParams.textContent,
    replyTo: validatedParams.replyTo,
    cc: validatedParams.cc,
    bcc: validatedParams.bcc,
    headers: validatedParams.headers,
    tags: validatedParams.tags,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json() as BrevoError;
      throw new Error(`Brevo API error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json() as BrevoResponse;
    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
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
  
  return sendEmail({
    to: [{ email, name: userName }],
    subject: template.subject,
    htmlContent: template.htmlContent,
    textContent: template.textContent,
    tags: ["verification", "auth"],
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
  
  return sendEmail({
    to: [{ email, name: userName }],
    subject: template.subject,
    htmlContent: template.htmlContent,
    textContent: template.textContent,
    tags: ["password-reset", "auth"],
  });
};

/**
 * Send a survey confirmation email
 */
export const sendSurveyConfirmationEmail = async (
  email: string,
  userName: string,
  dossierId?: string
): Promise<BrevoResponse> => {
  const template = surveyConfirmationTemplate(userName, dossierId);
  
  return sendEmail({
    to: [{ email, name: userName }],
    subject: template.subject,
    htmlContent: template.htmlContent,
    textContent: template.textContent,
    tags: ["survey", "confirmation"],
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
  
  return sendEmail({
    to: [{ email: adminEmail, name: "Admin OKANI" }],
    subject: template.subject,
    htmlContent: template.htmlContent,
    textContent: template.textContent,
    tags: ["admin", "notification"],
  });
};
