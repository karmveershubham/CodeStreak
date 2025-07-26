import express from 'express';
const router = express.Router();
import GoalController from '../controllers/goalController.js';
import passport from 'passport';
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

// All routes are protected
router.use(accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }));

// Goal CRUD operations
router.post('/', GoalController.createGoal);
router.get('/', GoalController.getUserGoals);
router.get('/current', GoalController.getCurrentGoal);
router.get('/:goalId', GoalController.getGoal);
router.put('/:goalId', GoalController.updateGoal);
router.delete('/:goalId', GoalController.deleteGoal);
router.post('/:goalId/set-current', GoalController.setCurrentGoal);

export default router; 