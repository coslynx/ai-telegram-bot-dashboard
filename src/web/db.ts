import { PrismaClient } from '@prisma/client';
import { DATABASE_URL } from '../config/env';
import { logger } from '../utils/logger';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  });
} else {
  // Use a separate Prisma instance for development to avoid conflicts
  prisma = new PrismaClient();
}

export const db = {
  async connect() {
    try {
      await prisma.$connect();
      logger.info('Database connected successfully.');
    } catch (error) {
      logger.error('Error connecting to database:', error);
      throw new Error('Failed to connect to the database.');
    }
  },
  async disconnect() {
    await prisma.$disconnect();
    logger.info('Database disconnected successfully.');
  },
  prisma,
};