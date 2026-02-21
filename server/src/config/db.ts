import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
    ],
});

prisma.$on('query' as any, (e: any) => {
    logger.debug(`Query: ${e.query}`);
    logger.debug(`Params: ${e.params}`);
    logger.debug(`Duration: ${e.duration}ms`);
});

prisma.$on('error' as any, (e: any) => {
    logger.error(`Prisma Error: ${e.message}`);
});

export default prisma;
