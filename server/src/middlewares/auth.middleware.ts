import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';
import catchAsync from '../utils/catchAsync';
import prisma from '../config/db';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const auth = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ApiError(401, 'Please authenticate'));
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, role: true },
        });

        if (!user) {
            return next(new ApiError(401, 'User not found'));
        }

        req.user = {
            id: user.id,
            role: user.role,
        };
        next();
    } catch (error) {
        return next(new ApiError(401, 'Invalid token'));
    }
});
