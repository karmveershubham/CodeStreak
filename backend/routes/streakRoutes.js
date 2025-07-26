import express from 'express';
const router = express.Router();
import StreakController from '../controllers/streakController.js';
import passport from 'passport';
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

// All routes are protected
router.use(accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }));

// Streak operations
router.get('/', StreakController.getUserStreak);
router.post('/update', StreakController.updateStreak);
router.get('/history', StreakController.getStreakHistory);
router.get('/motivation', StreakController.getDailyMotivation);
router.get('/stats', StreakController.getStreakStats);

// Testing route (remove in production)
router.post('/reset', StreakController.resetStreak);

export default router; 