import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const hasReadTime = !!globalForPrisma.prisma?.insight?.fields?.readTime;
const hasSecurityModels = !!globalForPrisma.prisma?.blockedIp;

export const prisma = (globalForPrisma.prisma && hasReadTime && hasSecurityModels) 
  ? globalForPrisma.prisma 
  : new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
