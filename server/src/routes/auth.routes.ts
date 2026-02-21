import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema } from '../validations/auth.validation';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with hashed password and role.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: John Doe }
 *               email: { type: string, format: email, example: john@example.com }
 *               password: { type: string, minLength: 6, example: "password123" }
 *               role: { type: string, enum: [USER, ADMIN], example: USER }
 *     responses:
 *       201:
 *         description: Registered successfully
 *       400:
 *         description: Bad request (validation error or email exists)
 */
router.post('/register', validate(registerSchema), authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Log in with email and password to receive a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: john@example.com }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', validate(loginSchema), authController.login);

export default router;
