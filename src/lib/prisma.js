import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const hasReadTime = !!globalForPrisma.prisma?.insight?.fields?.readTime;

export const prisma = (globalForPrisma.prisma && hasReadTime) 
  ? globalForPrisma.prisma 
  : new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
