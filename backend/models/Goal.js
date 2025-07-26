import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['interview_prep', 'competitive_programming', 'skill_development', 'project_based'],
    required: true
  },
  targetCompany: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  preferredPlatforms: [{
    type: String,
    enum: ['leetcode', 'geeksforgeeks', 'codeforces', 'hackerrank', 'atcoder']
  }],
  topics: [{
    type: String,
    trim: true
  }],
  targetDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
goalSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const GoalModel = mongoose.model('goal', goalSchema);

export default GoalModel; 