import { TaskRepository } from '../repositories/task.repository';
import { ApiError } from '../utils/apiError';

const taskRepository = new TaskRepository();

export class TaskService {
    async createTask(userId: string, data: any) {
        return taskRepository.create({
            ...data,
            userId,
        });
    }

    async getTasks(userId: string, role: string) {
        // If ADMIN, get all tasks. If USER, get only their own.
        const where = role === 'ADMIN' ? {} : { userId };
        return taskRepository.findMany(where);
    }

    async getTaskById(taskId: string, userId: string, role: string) {
        const task = await taskRepository.findUnique(taskId);
        if (!task) {
            throw new ApiError(404, 'Task not found');
        }

        if (role !== 'ADMIN' && task.userId !== userId) {
            throw new ApiError(403, 'Forbidden');
        }

        return task;
    }

    async updateTask(taskId: string, userId: string, role: string, data: any) {
        const task = await taskRepository.findUnique(taskId);
        if (!task) {
            throw new ApiError(404, 'Task not found');
        }

        if (role !== 'ADMIN' && task.userId !== userId) {
            throw new ApiError(403, 'Forbidden');
        }

        return taskRepository.update(taskId, data);
    }

    async deleteTask(taskId: string, userId: string, role: string) {
        const task = await taskRepository.findUnique(taskId);
        if (!task) {
            throw new ApiError(404, 'Task not found');
        }

        // Role-based deletion logic: Only ADMIN can delete any task, or USER can delete their own
        // The requirement says "Only ADMIN can delete any task". 
        // Usually this means USER can still delete their OWN task, but ADMIN can delete ANY.
        // Let's stick to that.
        if (role !== 'ADMIN' && task.userId !== userId) {
            throw new ApiError(403, 'Forbidden');
        }

        return taskRepository.delete(taskId);
    }
}
