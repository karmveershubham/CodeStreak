import express from 'express';
const router = express.Router();
import WeeklyPlanController from '../controllers/weeklyPlanController.js';
import passport from 'passport';
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

// All routes are protected
router.use(accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }));

// Weekly plan operations
router.post('/generate/:goalId', WeeklyPlanController.generateWeeklyPlan);
router.get('/', WeeklyPlanController.getUserWeeklyPlans);
router.get('/current', WeeklyPlanController.getCurrentWeeklyPlan);
router.get('/:planId', WeeklyPlanController.getWeeklyPlan);
router.put('/:planId/deactivate', WeeklyPlanController.deactivateWeeklyPlan);
router.get('/:planId/feedback', WeeklyPlanController.getWeeklyFeedback);

// Progress tracking
router.put('/:planId/days/:dayIndex/complete', WeeklyPlanController.markDayCompleted);
router.put('/:planId/days/:dayIndex/questions/:questionIndex/complete', WeeklyPlanController.markQuestionCompleted);

export default router; 