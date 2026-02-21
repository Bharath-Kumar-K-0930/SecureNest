import { z } from 'zod';

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required').max(100),
        description: z.string().optional(),
        status: z.enum(['PENDING', 'COMPLETED']).optional(),
    }),
});

export const updateTaskSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid task ID'),
    }),
    body: z.object({
        title: z.string().min(1).max(100).optional(),
        description: z.string().optional(),
        status: z.enum(['PENDING', 'COMPLETED']).optional(),
    }),
});

export const taskIdSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid task ID'),
    }),
});
