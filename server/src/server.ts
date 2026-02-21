import dotenv from 'dotenv';
import app from './app';
import logger from './utils/logger';
import prisma from './config/db';

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        // Test database connection
        await prisma.$connect();
        logger.info('Connected to the database');

        const server = app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
            logger.info(`API Documentation available at http://localhost:${port}/api-docs`);
        });

        // Handle graceful shutdown
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    logger.info('Server closed');
                    process.exit(1);
                });
            } else {
                process.exit(1);
            }
        };

        const unexpectedErrorHandler = (error: any) => {
            logger.error(error);
            exitHandler();
        };

        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);

        process.on('SIGTERM', () => {
            logger.info('SIGTERM received');
            if (server) {
                server.close();
            }
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
