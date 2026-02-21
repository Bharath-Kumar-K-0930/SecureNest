import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import logger from '../utils/logger';

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { statusCode, message } = err;

    if (!(err instanceof ApiError)) {
        statusCode = statusCode || 500;
        message = message || 'Internal Server Error';
    }

    res.locals.errorMessage = err.message;

    const response = {
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    if (process.env.NODE_ENV === 'development') {
        logger.error(err);
    }

    res.status(statusCode).json(response);
};
