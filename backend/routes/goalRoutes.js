/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Goal management and operations
 */

import express from 'express';
const router = express.Router();
import GoalController from '../controllers/goalController.js';

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn React
 *     responses:
 *       201:
 *         description: Goal created successfully
 */
router.post('/', GoalController.createGoal);

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all goals for the logged-in user
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's goals
 */
router.get('/', GoalController.getUserGoals);

/**
 * @swagger
 * /api/goals/current:
 *   get:
 *     summary: Get the current active goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current goal data
 */
router.get('/current', GoalController.getCurrentGoal);

/**
 * @swagger
 * /api/goals/{goalId}:
 *   get:
 *     summary: Get a specific goal by ID
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the goal
 *     responses:
 *       200:
 *         description: Goal found
 */
router.get('/:goalId', GoalController.getGoal);

/**
 * @swagger
 * /api/goals/{goalId}:
 *   put:
 *     summary: Update a specific goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the goal to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Node.js
 *     responses:
 *       200:
 *         description: Goal updated successfully
 */
router.put('/:goalId', GoalController.updateGoal);

/**
 * @swagger
 * /api/goals/{goalId}:
 *   delete:
 *     summary: Delete a specific goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the goal to delete
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 */
router.delete('/:goalId', GoalController.deleteGoal);

/**
 * @swagger
 * /api/goals/{goalId}/set-current:
 *   post:
 *     summary: Set a specific goal as current
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the goal to set as current
 *     responses:
 *       200:
 *         description: Goal set as current
 */
router.post('/:goalId/set-current', GoalController.setCurrentGoal);

export default router;
