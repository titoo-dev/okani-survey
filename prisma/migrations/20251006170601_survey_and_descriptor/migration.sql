/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "survey" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "stageReached" TEXT NOT NULL,
    "dossierId" TEXT NOT NULL,
    "depositCity" TEXT NOT NULL,
    "regularizationCity" TEXT NOT NULL,
    "residenceCity" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "legalEntity" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "depotEvaluation" TEXT,
    "depotPaymentMode" TEXT,
    "depotOtherPaymentMode" TEXT,
    "depotAmountPaid" TEXT,
    "depotHasReceipt" BOOLEAN,
    "depotHasAcknowledgment" BOOLEAN,
    "enqueteDelayPerceived" TEXT,
    "enquetePaymentMode" TEXT,
    "enqueteOtherPaymentMode" TEXT,
    "enqueteHasReceipt" BOOLEAN,
    "enqueteSatisfaction" TEXT,
    "etatLieuxDelayPerceived" TEXT,
    "etatLieuxPaymentMode" TEXT,
    "etatLieuxOtherPaymentMode" TEXT,
    "etatLieuxHasReceipt" BOOLEAN,
    "etatLieuxSatisfaction" TEXT,
    "affichageInTime" BOOLEAN,
    "affichageWasInformed" BOOLEAN,
    "affichageInformationChannel" TEXT,
    "affichageSufficientDelay" BOOLEAN,
    "affichageHasOpposition" BOOLEAN,
    "affichageFees" TEXT,
    "affichageHasReceipt" BOOLEAN,
    "affichageSatisfaction" TEXT,
    "bornageDelayPerceived" TEXT,
    "bornagePaymentMode" TEXT,
    "bornageOtherPaymentMode" TEXT,
    "bornageHasReceipt" BOOLEAN,
    "bornageSatisfaction" TEXT,
    "evaluationPriceUnderstanding" TEXT,
    "evaluationPaymentMode" TEXT,
    "evaluationOtherPaymentMode" TEXT,
    "evaluationHasReceipt" BOOLEAN,
    "evaluationSatisfaction" TEXT,
    "decisionDelay" TEXT,
    "decisionPaymentMode" TEXT,
    "decisionOtherPaymentMode" TEXT,
    "decisionHasReceipt" BOOLEAN,
    "wasTransmitted" BOOLEAN,
    "hasActeCession" BOOLEAN,
    "hasTitrePropriete" BOOLEAN,
    "decisionSatisfaction" TEXT,
    "hasUnofficialPayment" BOOLEAN,
    "hasFavoritism" BOOLEAN,
    "trustTransparency" TEXT,
    "hadOpposition" BOOLEAN,
    "oppositionDate" TEXT,
    "oppositionNature" TEXT,
    "oppositionNatureOther" TEXT,
    "litigeDelay" TEXT,
    "paidLitigeFees" BOOLEAN,
    "litigePaymentMode" TEXT,
    "litigePaymentAmount" TEXT,
    "litigeHasReceipt" BOOLEAN,
    "wasInformedProcedure" BOOLEAN,
    "sentFormalLetter" BOOLEAN,
    "letterReference" TEXT,
    "litigeCause" TEXT,
    "litigeCauseOther" TEXT,
    "litigeSatisfaction" TEXT,
    "litigeOutcome" TEXT,
    "litigeOutcomeOther" TEXT,
    "litigeComments" TEXT,
    "totalDelay" TEXT,
    "transmissionDate" TEXT,
    "totalCost" TEXT,
    "globalSatisfaction" TEXT,
    "generalSuggestions" TEXT,

    CONSTRAINT "survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descriptor" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "descriptor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "descriptor_type_value_key" ON "descriptor"("type", "value");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
