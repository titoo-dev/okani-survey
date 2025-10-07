/**
 * Example usage of the Brevo email service
 * 
 * This file demonstrates how to integrate the email service
 * into various parts of your application.
 * 
 * DO NOT import this file in production code - it's for reference only.
 * 
 * Templates are now separated into individual files in lib/email/templates/
 * Main email functions are in lib/email/send-email.ts
 */

import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendSurveyConfirmationEmail,
  sendAdminNotificationEmail,
} from "./send-email";

// ============================================================================
// Example 1: Send verification email during sign-up
// ============================================================================

export const exampleSignUpFlow = async (
  email: string,
  name: string,
  verificationToken: string
) => {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationLink = `${appUrl}/auth/verify-email?token=${verificationToken}`;

    // Send verification email
    const result = await sendVerificationEmail(email, verificationLink, name);

    console.log("Verification email sent successfully:", result.messageId);

    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, error: "Failed to send verification email" };
  }
};

// ============================================================================
// Example 2: Send welcome email after email verification
// ============================================================================

export const exampleWelcomeFlow = async (email: string, name: string) => {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const surveyLink = `${appUrl}/stage-selection`;

    // Send welcome email
    const result = await sendWelcomeEmail(email, name, surveyLink);

    console.log("Welcome email sent successfully:", result.messageId);

    return { success: true };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    // Don't fail the verification process if email fails
    return { success: false };
  }
};

// ============================================================================
// Example 3: Send confirmation and notification after survey submission
// ============================================================================

export const exampleSurveySubmissionFlow = async (surveyData: {
  userEmail: string;
  userName: string;
  dossierId?: string;
  city: string;
  procedureType: string;
  stageReached: string;
}) => {
  try {
    // Send confirmation to user
    const userEmailResult = await sendSurveyConfirmationEmail(
      surveyData.userEmail,
      surveyData.userName,
      surveyData.dossierId
    );

    console.log(
      "Survey confirmation sent to user:",
      userEmailResult.messageId
    );

    // Send notification to admin (non-blocking)
    sendAdminNotificationEmail("admin@okanisurvey.com", {
      userName: surveyData.userName,
      userEmail: surveyData.userEmail,
      city: surveyData.city,
      procedureType: surveyData.procedureType,
      stageReached: surveyData.stageReached,
      dossierId: surveyData.dossierId,
      submittedAt: new Date(),
    }).catch((error) => {
      // Log but don't fail the survey submission
      console.error("Failed to send admin notification:", error);
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send survey confirmation:", error);
    // Log the error but don't fail the survey submission
    return { success: false };
  }
};

// ============================================================================
// Example 4: Batch send welcome emails (with rate limiting)
// ============================================================================

export const exampleBatchSendWelcome = async (
  users: Array<{ email: string; name: string }>
) => {
  const results = [];
  const DELAY_MS = 100; // Delay between emails to avoid rate limiting

  for (const user of users) {
    try {
      const result = await sendWelcomeEmail(user.email, user.name);
      results.push({ email: user.email, success: true, messageId: result.messageId });
      
      // Wait before sending next email
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    } catch (error) {
      console.error(`Failed to send welcome email to ${user.email}:`, error);
      results.push({ email: user.email, success: false, error });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const failureCount = results.filter((r) => !r.success).length;

  console.log(`Batch send complete: ${successCount} succeeded, ${failureCount} failed`);

  return { results, successCount, failureCount };
};

// ============================================================================
// Example 5: Error handling patterns
// ============================================================================

export const exampleErrorHandling = async (email: string) => {
  try {
    const result = await sendVerificationEmail(
      email,
      "https://example.com/verify",
      "Test User"
    );

    return { success: true, messageId: result.messageId };
  } catch (error) {
    // Check if it's a validation error
    if (error instanceof Error && error.message.includes("Invalid email")) {
      return {
        success: false,
        error: "Invalid email address format",
        code: "INVALID_EMAIL",
      };
    }

    // Check if it's an API error
    if (error instanceof Error && error.message.includes("Brevo API error")) {
      return {
        success: false,
        error: "Email service temporarily unavailable",
        code: "API_ERROR",
      };
    }

    // Check for missing configuration
    if (
      error instanceof Error &&
      error.message.includes("environment variable")
    ) {
      return {
        success: false,
        error: "Email service not configured",
        code: "CONFIG_ERROR",
      };
    }

    // Generic error
    return {
      success: false,
      error: "Failed to send email",
      code: "UNKNOWN_ERROR",
    };
  }
};

// ============================================================================
// Example 6: Integration with Server Actions
// ============================================================================

/**
 * Example server action that sends a verification email
 * Use in app/actions/send-verification.ts
 */
export const exampleServerAction = async (email: string, token: string) => {
  "use server";

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationLink = `${appUrl}/auth/verify-email?token=${token}`;

    await sendVerificationEmail(email, verificationLink);

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
};

// ============================================================================
// Example 7: Testing email service (for API routes)
// ============================================================================

/**
 * Example API route for testing emails
 * Create this at app/api/test-email/route.ts
 */
export const exampleTestEmailRoute = async (request: Request) => {
  try {
    const { email, type } = await request.json();

    if (!email) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case "verification":
        result = await sendVerificationEmail(
          email,
          "http://localhost:3000/auth/verify-email?token=test",
          "Test User"
        );
        break;

      case "welcome":
        result = await sendWelcomeEmail(
          email,
          "Test User",
          "http://localhost:3000/stage-selection"
        );
        break;

      default:
        return Response.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }

    return Response.json({
      success: true,
      messageId: result.messageId,
      message: `${type} email sent successfully`,
    });
  } catch (error) {
    console.error("Test email error:", error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

