import { Response } from 'express';
import { TaskService } from '../services/task.service';
import { ApiResponse } from '../utils/apiResponse';
import catchAsync from '../utils/catchAsync';
import { AuthRequest } from '../middlewares/auth.middleware';

const taskService = new TaskService();

export const createTask = catchAsync(async (req: AuthRequest, res: Response) => {
    const task = await taskService.createTask(req.user!.id, req.body);
    res.status(201).json(ApiResponse.success('Task created successfully', task));
});

export const getTasks = catchAsync(async (req: AuthRequest, res: Response) => {
    const tasks = await taskService.getTasks(req.user!.id, req.user!.role);
    res.status(200).json(ApiResponse.success('Tasks retrieved successfully', tasks));
});

export const getTaskById = catchAsync(async (req: AuthRequest, res: Response) => {
    const task = await taskService.getTaskById(req.params.id as string, req.user!.id, req.user!.role);
    res.status(200).json(ApiResponse.success('Task retrieved successfully', task));
});

export const updateTask = catchAsync(async (req: AuthRequest, res: Response) => {
    const task = await taskService.updateTask(req.params.id as string, req.user!.id, req.user!.role, req.body);
    res.status(200).json(ApiResponse.success('Task updated successfully', task));
});

export const deleteTask = catchAsync(async (req: AuthRequest, res: Response) => {
    await taskService.deleteTask(req.params.id as string, req.user!.id, req.user!.role);
    res.status(200).json(ApiResponse.success('Task deleted successfully'));
});
