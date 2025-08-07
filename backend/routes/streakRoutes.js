import express from 'express';
const router = express.Router();
import StreakController from '../controllers/streakController.js';
import passport from 'passport';
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

// All routes are protected
router.use(accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }));

/**
 * @swagger
 * tags:
 *   name: Streaks
 *   description: Streak Tracking APIs
 */

/**
 * @swagger
 * /api/streak:
 *   get:
 *     summary: Get user's current streak
 *     tags: [Streaks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current streak retrieved successfully
 */
router.get('/', StreakController.getUserStreak);

/**
 * @swagger
 * /api/streak/update:
 *   post:
 *     summary: Update user's streak
 *     tags: [Streaks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Streak updated successfully
 */
router.post('/update', StreakController.updateStreak);

/**
 * @swagger
 * /api/streak/history:
 *   get:
 *     summary: Get user's streak history
 *     tags: [Streaks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Streak history retrieved successfully
 */
router.get('/history', StreakController.getStreakHistory);

/**
 * @swagger
 * /api/streak/motivation:
 *   get:
 *     summary: Get daily motivational quote
 *     tags: [Streaks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily motivation retrieved successfully
 */
router.get('/motivation', StreakController.getDailyMotivation);

/**
 * @swagger
 * /api/streak/stats:
 *   get:
 *     summary: Get user's streak statistics
 *     tags: [Streaks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Streak statistics retrieved successfully
 */
router.get('/stats', StreakController.getStreakStats);

/**
 * @swagger
 * /api/streak/reset:
 *   post:
 *     summary: Reset user's streak (For testing only)
 *     tags: [Streaks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Streak reset successfully
 */
router.post('/reset', StreakController.resetStreak);

export default router;
