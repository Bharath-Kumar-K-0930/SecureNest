import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/apiError';

const userRepository = new UserRepository();

export class AuthService {
    async register(data: any) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ApiError(400, 'Email already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await userRepository.create({
            ...data,
            password: hashedPassword,
        });

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(data: any) {
        const user = await userRepository.findByEmail(data.email);
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new ApiError(401, 'Invalid email or password');
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h' }
        );

        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}
