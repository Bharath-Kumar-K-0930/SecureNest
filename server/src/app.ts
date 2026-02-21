import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { ApiError } from './utils/apiError';
import specs from './docs/swagger';
import logger from './utils/logger';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

if (process.env.NODE_ENV === 'production') {
    app.use('/api', limiter);
}

// Request logging middleware
app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
});

// Health check route for Render/deployment
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'SecureNest API is running' });
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// v1 api routes
app.use('/api/v1', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(404, 'Not found'));
});

// Global error handler
app.use(errorMiddleware);

export default app;
