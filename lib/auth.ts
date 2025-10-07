import { betterAuth, type User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import { sendVerificationEmail as sendVerificationEmailService } from "./email/send-email";

const prisma = new PrismaClient();

/**
 * Send verification email handler for Better Auth
 */
const sendVerificationEmailHandler = async ({ 
  user, 
  url 
}: { 
  user: User; 
  url: string;
}): Promise<void> => {
  try {
    const response = await sendVerificationEmailService(
      user.email,
      url,
      user.name || undefined
    );
    console.log("Verification email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    disableSignUp: false,
  },
  trustedOrigins: [
    `${process.env.NEXT_PUBLIC_APP_URL}`,
  ],
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: sendVerificationEmailHandler,
  },
  plugins: [
    nextCookies(),
    openAPI(),
  ],
});
