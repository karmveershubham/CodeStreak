import express from 'express';
const router = express.Router();
import WeeklyPlanController from '../controllers/weeklyPlanController.js';
import passport from 'passport';
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

/**
 * @swagger
 * tags:
 *   name: Weekly Plans
 *   description: Weekly Plan and Progress Tracking APIs
 */

// All routes protected with JWT
router.use(accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }));

/**
 * @swagger
 * /api/weekly-plan/generate/{goalId}:
 *   post:
 *     summary: Generate a weekly plan for a goal
 *     tags: [Weekly Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Weekly plan generated
 */
router.post('/generate/:goalId', WeeklyPlanController.generateWeeklyPlan);

/**
 * @swagger
 * /api/weekly-plan:
 *   get:
 *     summary: Get all weekly plans for the user
 *     tags: [Weekly Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of weekly plans
 */
router.get('/', WeeklyPlanController.getUserWeeklyPlans);

/**
 * @swagger
 * /api/weekly-plan/current:
 *   get:
 *     summary: Get current active weekly plan
 *     tags: [Weekly Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current weekly plan
 */
router.get('/current', WeeklyPlanController.getCurrentWeeklyPlan);

/**
 * @swagger
 * /api/weekly-plan/{planId}:
 *   get:
 *     summary: Get specific weekly plan by ID
 *     tags: [Weekly Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weekly plan details
 */
router.get('/:planId', WeeklyPlanController.getWeeklyPlan);

/**
 * @swagger
 * /api/weekly-plan/{planId}/deactivate:
 *   put:
 *     summary: Deactivate a weekly plan
 *     tags: [Weekly Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan deactivated
 */
router.put('/:planId/deactivate', WeeklyPlanController.deactivateWeeklyPlan);

/**
 * @swagger
 * /api/weekly-plan/{planId}/feedback:
 *   get:
 *     summary: Get feedback for a completed weekly plan
 *     tags: [Weekly Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback returned
 */
router.get('/:planId/feedback', WeeklyPlanController.getWeeklyFeedback);

/**
 * @swagger
 * /api/weekly-plan/{planId}/days/{dayIndex}/complete:
 *   put:
 *     summary: Mark a day as completed in a weekly plan
 *     tags: [Weekly Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: dayIndex
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Day marked as completed
 */
router.put('/:planId/days/:dayIndex/complete', WeeklyPlanController.markDayCompleted);

/**
 * @swagger
 * /api/weekly-plan/{planId}/days/{dayIndex}/questions/{questionIndex}/complete:
 *   put:
 *     summary: Mark a specific question as completed
 *     tags: [Weekly Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: dayIndex
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: questionIndex
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question marked as completed
 */
router.put('/:planId/days/:dayIndex/questions/:questionIndex/complete', WeeklyPlanController.markQuestionCompleted);

export default router;
