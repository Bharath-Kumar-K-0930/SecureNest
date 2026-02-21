import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { auth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createTaskSchema, updateTaskSchema, taskIdSchema } from '../validations/task.validation';

const router = Router();

router.use(auth);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, example: "Buy groceries" }
 *               description: { type: string, example: "Milk, eggs, and bread" }
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', validate(createTaskSchema), taskController.createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve all tasks belonging to the user. Admins can see all user tasks.
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', taskController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Task details
 */
router.get('/:id', validate(taskIdSchema), taskController.getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [PENDING, COMPLETED] }
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     description: Delete a task. Admins can delete any task. Users can only delete their own.
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete('/:id', validate(taskIdSchema), taskController.deleteTask);

export default router;
