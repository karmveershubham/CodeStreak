import logger from '../../logger.js';
import StreakModel from '../models/Streak.js';
import { generateDailyQuestion } from '../utils/gemini.js';

class StreakController {
  // Get user's streak
  static getUserStreak = async (req, res) => {
    try {
      let streak = await StreakModel.findOne({ userId: req.user._id });

      if (!streak) {
        // Create new streak record if doesn't exist
        streak = new StreakModel({
          userId: req.user._id,
          currentStreak: 0,
          longestStreak: 0
        });
        await streak.save();
      }

      res.status(200).json({
        status: "success",
        streak
      });

    } catch (error) {
      logger.error('Error fetching streak:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch streak, please try again later"
      });
    }
  };

  // Update streak (called when user completes questions)
  static updateStreak = async (req, res) => {
    try {
      const { questionsCompleted, studyTime, topics } = req.body;

      let streak = await StreakModel.findOne({ userId: req.user._id });

      if (!streak) {
        streak = new StreakModel({
          userId: req.user._id,
          currentStreak: 0,
          longestStreak: 0
        });
      }

      // Update streak using the model method
      await streak.updateStreak(
        questionsCompleted || 0,
        studyTime || 0,
        topics || []
      );

      res.status(200).json({
        status: "success",
        message: "Streak updated successfully",
        streak
      });

    } catch (error) {
      logger.error('Error updating streak:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to update streak, please try again later"
      });
    }
  };

  // Get streak history
  static getStreakHistory = async (req, res) => {
    try {
      const streak = await StreakModel.findOne({ userId: req.user._id });

      if (!streak) {
        return res.status(404).json({
          status: "failed",
          message: "No streak data found"
        });
      }

      // Get last 30 days of streak history
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentHistory = streak.streakHistory
        .filter(entry => new Date(entry.date) >= thirtyDaysAgo)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      res.status(200).json({
        status: "success",
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        totalQuestionsCompleted: streak.totalQuestionsCompleted,
        totalStudyTime: streak.totalStudyTime,
        recentHistory
      });

    } catch (error) {
      logger.error('Error fetching streak history:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch streak history, please try again later"
      });
    }
  };

  // Get daily motivation and question recommendation
  static getDailyMotivation = async (req, res) => {
    try {
      const streak = await StreakModel.findOne({ userId: req.user._id });

      if (!streak) {
        return res.status(404).json({
          status: "failed",
          message: "No streak data found"
        });
      }

      // Get user profile for AI recommendation
      const UserModel = (await import('../models/User.js')).default;
      const user = await UserModel.findById(req.user._id).populate('currentGoal');

      // Get recently completed topics from streak history
      const recentTopics = [];
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      streak.streakHistory
        .filter(entry => new Date(entry.date) >= lastWeek)
        .forEach(entry => {
          recentTopics.push(...entry.topics);
        });

      const uniqueTopics = [...new Set(recentTopics)];

      // Generate daily question recommendation using AI
      const recommendation = await generateDailyQuestion(
        user,
        uniqueTopics,
        streak
      );

      res.status(200).json({
        status: "success",
        streak: {
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak
        },
        recommendation
      });

    } catch (error) {
      logger.error('Error getting daily motivation:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to get daily motivation, please try again later"
      });
    }
  };

  // Get streak statistics
  static getStreakStats = async (req, res) => {
    try {
      const streak = await StreakModel.findOne({ userId: req.user._id });

      if (!streak) {
        return res.status(404).json({
          status: "failed",
          message: "No streak data found"
        });
      }

      // Calculate additional statistics
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayEntry = streak.streakHistory.find(entry => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime();
      });

      const thisWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - 7);

      const thisWeekEntries = streak.streakHistory.filter(entry => {
        return new Date(entry.date) >= thisWeek;
      });

      const weeklyStats = {
        daysActive: thisWeekEntries.length,
        questionsCompleted: thisWeekEntries.reduce((total, entry) => total + entry.questionsCompleted, 0),
        studyTime: thisWeekEntries.reduce((total, entry) => total + entry.studyTime, 0)
      };

      const stats = {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        totalQuestionsCompleted: streak.totalQuestionsCompleted,
        totalStudyTime: streak.totalStudyTime,
        todayCompleted: !!todayEntry,
        weeklyStats
      };

      res.status(200).json({
        status: "success",
        stats
      });

    } catch (error) {
      logger.error('Error fetching streak stats:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch streak statistics, please try again later"
      });
    }
  };

  // Reset streak (for testing purposes)
  static resetStreak = async (req, res) => {
    try {
      const streak = await StreakModel.findOne({ userId: req.user._id });

      if (!streak) {
        return res.status(404).json({
          status: "failed",
          message: "No streak data found"
        });
      }

      // Reset streak data
      streak.currentStreak = 0;
      streak.longestStreak = 0;
      streak.lastActivityDate = null;
      streak.streakHistory = [];
      streak.totalQuestionsCompleted = 0;
      streak.totalStudyTime = 0;

      await streak.save();

      res.status(200).json({
        status: "success",
        message: "Streak reset successfully",
        streak
      });

    } catch (error) {
      logger.error('Error resetting streak:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to reset streak, please try again later"
      });
    }
  };
}

export default StreakController; 