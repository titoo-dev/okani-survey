import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/prisma";

// Type for PrismaClient with or without extensions
type ExtendedPrismaClient = ReturnType<PrismaClient["$extends"]>;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | ExtendedPrismaClient;
};

// Use Accelerate only in production or when explicitly enabled
const useAccelerate = process.env.NODE_ENV === "production" || process.env.USE_ACCELERATE === "true";

const createPrismaClient = () => {
  const client = new PrismaClient();
  if (useAccelerate) {
    return client.$extends(withAccelerate());
  }
  return client;
};

const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma as PrismaClient;
