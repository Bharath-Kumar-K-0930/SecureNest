import { Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { AuthRequest } from './auth.middleware';

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError(403, 'Forbidden: You do not have permission to perform this action'));
        }
        next();
    };
};
