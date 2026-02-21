import prisma from '../config/db';
import { Prisma, Role } from '@prisma/client';

export class UserRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    async create(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    }
}
