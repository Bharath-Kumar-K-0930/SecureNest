import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../utils/apiResponse';
import catchAsync from '../utils/catchAsync';

const authService = new AuthService();

export const register = catchAsync(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    res.status(201).json(ApiResponse.success('User registered successfully', user));
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.status(200).json(ApiResponse.success('Login successful', result));
});
