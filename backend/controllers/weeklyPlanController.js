import logger from '../../logger.js';
import WeeklyPlanModel from '../models/WeeklyPlan.js';
import GoalModel from '../models/Goal.js';
import UserModel from '../models/User.js';
import { generateWeeklyPlan, generateProgressFeedback } from '../utils/gemini.js';

class WeeklyPlanController {
  // Generate new weekly plan
  static generateWeeklyPlan = async (req, res) => {
    try {
      const { goalId } = req.params;

      // Get user with preferences
      const user = await UserModel.findById(req.user._id).populate('currentGoal');
      
      // Get goal
      const goal = await GoalModel.findOne({
        _id: goalId,
        userId: req.user._id
      });

      if (!goal) {
        return res.status(404).json({
          status: "failed",
          message: "Goal not found"
        });
      }

      // Check if there's already an active weekly plan
      const existingPlan = await WeeklyPlanModel.findOne({
        userId: req.user._id,
        goalId: goalId,
        isActive: true
      });

      if (existingPlan) {
        return res.status(400).json({
          status: "failed",
          message: "You already have an active weekly plan. Complete it first or deactivate it."
        });
      }

      // Generate weekly plan using AI
      const aiPlan = await generateWeeklyPlan(goal, user.preferences);

      // Validate AI response
      if (!aiPlan || !aiPlan.dailyPlans || !Array.isArray(aiPlan.dailyPlans)) {
        throw new Error('Invalid AI response format');
      }

      // Create weekly plan
      const weeklyPlan = new WeeklyPlanModel({
        userId: req.user._id,
        goalId: goalId,
        weekStartDate: new Date(aiPlan.weekStartDate),
        weekEndDate: new Date(aiPlan.weekEndDate),
        dailyPlans: aiPlan.dailyPlans.map(day => ({
          day: day.day,
          date: new Date(day.date),
          topics: day.topics || [],
          questions: day.questions || [],
          studyTime: day.studyTime || 60,
          isCompleted: false
        }))
      });

      await weeklyPlan.save();

      res.status(201).json({
        status: "success",
        message: "Weekly plan generated successfully",
        weeklyPlan
      });

    } catch (error) {
      logger.error('Error generating weekly plan:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to generate weekly plan, please try again later"
      });
    }
  };

  // Get user's weekly plans
  static getUserWeeklyPlans = async (req, res) => {
    try {
      const weeklyPlans = await WeeklyPlanModel.find({ userId: req.user._id })
        .populate('goalId')
        .sort({ createdAt: -1 });

      res.status(200).json({
        status: "success",
        weeklyPlans
      });

    } catch (error) {
      logger.error('Error fetching weekly plans:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch weekly plans, please try again later"
      });
    }
  };

  // Get specific weekly plan
  static getWeeklyPlan = async (req, res) => {
    try {
      const { planId } = req.params;

      const weeklyPlan = await WeeklyPlanModel.findOne({
        _id: planId,
        userId: req.user._id
      }).populate('goalId');

      if (!weeklyPlan) {
        return res.status(404).json({
          status: "failed",
          message: "Weekly plan not found"
        });
      }

      res.status(200).json({
        status: "success",
        weeklyPlan
      });

    } catch (error) {
      logger.error('Error fetching weekly plan:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch weekly plan, please try again later"
      });
    }
  };

  // Get current active weekly plan
  static getCurrentWeeklyPlan = async (req, res) => {
    try {
      const weeklyPlan = await WeeklyPlanModel.findOne({
        userId: req.user._id,
        isActive: true
      }).populate('goalId');

      if (!weeklyPlan) {
        return res.status(404).json({
          status: "failed",
          message: "No active weekly plan found"
        });
      }

      res.status(200).json({
        status: "success",
        weeklyPlan
      });

    } catch (error) {
      logger.error('Error fetching current weekly plan:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch current weekly plan, please try again later"
      });
    }
  };

  // Mark question as completed
  static markQuestionCompleted = async (req, res) => {
    try {
      const { planId, dayIndex, questionIndex } = req.params;

      const weeklyPlan = await WeeklyPlanModel.findOne({
        _id: planId,
        userId: req.user._id
      });

      if (!weeklyPlan) {
        return res.status(404).json({
          status: "failed",
          message: "Weekly plan not found"
        });
      }

      if (!weeklyPlan.dailyPlans[dayIndex]) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid day index"
        });
      }

      if (!weeklyPlan.dailyPlans[dayIndex].questions[questionIndex]) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid question index"
        });
      }

      // Mark question as completed
      weeklyPlan.dailyPlans[dayIndex].questions[questionIndex].isCompleted = true;
      weeklyPlan.dailyPlans[dayIndex].questions[questionIndex].completedAt = new Date();

      // Check if all questions for the day are completed
      const allQuestionsCompleted = weeklyPlan.dailyPlans[dayIndex].questions.every(q => q.isCompleted);
      if (allQuestionsCompleted) {
        weeklyPlan.dailyPlans[dayIndex].isCompleted = true;
      }

      await weeklyPlan.save();

      res.status(200).json({
        status: "success",
        message: "Question marked as completed",
        weeklyPlan
      });

    } catch (error) {
      logger.error('Error marking question completed:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to mark question as completed, please try again later"
      });
    }
  };

  // Mark day as completed
  static markDayCompleted = async (req, res) => {
    try {
      const { planId, dayIndex } = req.params;

      const weeklyPlan = await WeeklyPlanModel.findOne({
        _id: planId,
        userId: req.user._id
      });

      if (!weeklyPlan) {
        return res.status(404).json({
          status: "failed",
          message: "Weekly plan not found"
        });
      }

      if (!weeklyPlan.dailyPlans[dayIndex]) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid day index"
        });
      }

      // Mark all questions for the day as completed
      weeklyPlan.dailyPlans[dayIndex].questions.forEach(question => {
        if (!question.isCompleted) {
          question.isCompleted = true;
          question.completedAt = new Date();
        }
      });

      weeklyPlan.dailyPlans[dayIndex].isCompleted = true;

      await weeklyPlan.save();

      res.status(200).json({
        status: "success",
        message: "Day marked as completed",
        weeklyPlan
      });

    } catch (error) {
      logger.error('Error marking day completed:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to mark day as completed, please try again later"
      });
    }
  };

  // Deactivate weekly plan
  static deactivateWeeklyPlan = async (req, res) => {
    try {
      const { planId } = req.params;

      const weeklyPlan = await WeeklyPlanModel.findOne({
        _id: planId,
        userId: req.user._id
      });

      if (!weeklyPlan) {
        return res.status(404).json({
          status: "failed",
          message: "Weekly plan not found"
        });
      }

      weeklyPlan.isActive = false;
      await weeklyPlan.save();

      res.status(200).json({
        status: "success",
        message: "Weekly plan deactivated successfully"
      });

    } catch (error) {
      logger.error('Error deactivating weekly plan:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to deactivate weekly plan, please try again later"
      });
    }
  };

  // Get weekly progress feedback
  static getWeeklyFeedback = async (req, res) => {
    try {
      const { planId } = req.params;

      const weeklyPlan = await WeeklyPlanModel.findOne({
        _id: planId,
        userId: req.user._id
      });

      if (!weeklyPlan) {
        return res.status(404).json({
          status: "failed",
          message: "Weekly plan not found"
        });
      }

      // Get user's streak
      const StreakModel = (await import('../models/Streak.js')).default;
      const streak = await StreakModel.findOne({ userId: req.user._id });

      // Calculate weekly progress
      const weeklyProgress = {
        completedQuestions: weeklyPlan.completedQuestions,
        totalQuestions: weeklyPlan.totalQuestions,
        progress: weeklyPlan.progress,
        totalStudyTime: weeklyPlan.dailyPlans.reduce((total, day) => {
          return total + day.questions.filter(q => q.isCompleted).reduce((dayTotal, q) => dayTotal + (q.estimatedTime || 30), 0);
        }, 0)
      };

      // Generate AI feedback
      const feedback = await generateProgressFeedback(weeklyProgress, streak || { currentStreak: 0, longestStreak: 0 });

      res.status(200).json({
        status: "success",
        weeklyProgress,
        feedback
      });

    } catch (error) {
      logger.error('Error getting weekly feedback:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to get weekly feedback, please try again later"
      });
    }
  };
}

export default WeeklyPlanController; 