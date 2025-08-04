import logger from '../../logger.js';
import GoalModel from '../models/Goal.js';
import UserModel from '../models/User.js';
import { generateWeeklyPlan } from '../utils/gemini.js';

class GoalController {
  // Create a new goal
  static createGoal = async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        targetCompany,
        difficulty,
        preferredPlatforms,
        topics,
        targetDate
      } = req.body;

      // Validate required fields
      if (!title || !category) {
        return res.status(400).json({
          status: "failed",
          message: "Title and category are required"
        });
      }

      // Validate category
      const validCategories = ['interview_prep', 'competitive_programming', 'skill_development', 'project_based'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid category"
        });
      }

      // Create new goal
      const newGoal = new GoalModel({
        userId: req.user._id,
        title,
        description,
        category,
        targetCompany,
        difficulty: difficulty || 'intermediate',
        preferredPlatforms: preferredPlatforms || ['leetcode'],
        topics: topics || [],
        targetDate: targetDate ? new Date(targetDate) : null
      });

      await newGoal.save();

      // Update user's current goal
      await UserModel.findByIdAndUpdate(req.user._id, {
        currentGoal: newGoal._id
      });

      res.status(201).json({
        status: "success",
        message: "Goal created successfully",
        goal: newGoal
      });

    } catch (error) {
      logger.error('Error creating goal:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to create goal, please try again later"
      });
    }
  };

  // Get user's goals
  static getUserGoals = async (req, res) => {
    try {
      const goals = await GoalModel.find({ userId: req.user._id })
        .sort({ createdAt: -1 });

      res.status(200).json({
        status: "success",
        goals
      });

    } catch (error) {
      logger.error('Error fetching goals:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch goals, please try again later"
      });
    }
  };

  // Get specific goal
  static getGoal = async (req, res) => {
    try {
      const { goalId } = req.params;

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

      res.status(200).json({
        status: "success",
        goal
      });

    } catch (error) {
      logger.error('Error fetching goal:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch goal, please try again later"
      });
    }
  };

  // Update goal
  static updateGoal = async (req, res) => {
    try {
      const { goalId } = req.params;
      const updateData = req.body;

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

      // Update goal
      const updatedGoal = await GoalModel.findByIdAndUpdate(
        goalId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        status: "success",
        message: "Goal updated successfully",
        goal: updatedGoal
      });

    } catch (error) {
      logger.error('Error updating goal:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to update goal, please try again later"
      });
    }
  };

  // Delete goal
  static deleteGoal = async (req, res) => {
    try {
      const { goalId } = req.params;

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

      await GoalModel.findByIdAndDelete(goalId);

      // If this was the current goal, clear it from user
      const user = await UserModel.findById(req.user._id);
      if (user.currentGoal && user.currentGoal.toString() === goalId) {
        await UserModel.findByIdAndUpdate(req.user._id, {
          $unset: { currentGoal: 1 }
        });
      }

      res.status(200).json({
        status: "success",
        message: "Goal deleted successfully"
      });

    } catch (error) {
      logger.error('Error deleting goal:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to delete goal, please try again later"
      });
    }
  };

  // Set current goal
  static setCurrentGoal = async (req, res) => {
    try {
      const { goalId } = req.params;

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

      await UserModel.findByIdAndUpdate(req.user._id, {
        currentGoal: goalId
      });

      res.status(200).json({
        status: "success",
        message: "Current goal set successfully",
        goal
      });

    } catch (error) {
      logger.error('Error setting current goal:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to set current goal, please try again later"
      });
    }
  };

  // Get current goal
  static getCurrentGoal = async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id).populate('currentGoal');

      if (!user.currentGoal) {
        return res.status(404).json({
          status: "failed",
          message: "No current goal set"
        });
      }

      res.status(200).json({
        status: "success",
        goal: user.currentGoal
      });

    } catch (error) {
      logger.error('Error fetching current goal:', error);
      res.status(500).json({
        status: "failed",
        message: "Unable to fetch current goal, please try again later"
      });
    }
  };
}

export default GoalController; 