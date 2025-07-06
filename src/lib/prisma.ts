import { PrismaClient } from '@prisma/client';

declare global {
  // Tu dois étendre l'interface de globalThis, pas juste "var"
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

const globalForPrisma = globalThis as unknown as NodeJS.Global;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;