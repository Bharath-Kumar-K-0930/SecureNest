import prisma from '../config/db';
import { Prisma } from '@prisma/client';

export class TaskRepository {
    async create(data: Prisma.TaskUncheckedCreateInput) {
        return prisma.task.create({ data });
    }

    async findMany(where: Prisma.TaskWhereInput) {
        return prisma.task.findMany({ where, orderBy: { createdAt: 'desc' } });
    }

    async findUnique(id: string) {
        return prisma.task.findUnique({ where: { id } });
    }

    async update(id: string, data: Prisma.TaskUpdateInput) {
        return prisma.task.update({ where: { id }, data });
    }

    async delete(id: string) {
        return prisma.task.delete({ where: { id } });
    }
}
