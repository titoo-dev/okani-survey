-- Add status field to survey table
ALTER TABLE "survey" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'SENT';
