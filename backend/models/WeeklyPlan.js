import mongoose from 'mongoose';

const weeklyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'goal',
    required: true
  },
  weekStartDate: {
    type: Date,
    required: true
  },
  weekEndDate: {
    type: Date,
    required: true
  },
  dailyPlans: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    topics: [{
      type: String,
      trim: true
    }],
    questions: [{
      title: {
        type: String,
        required: true
      },
      platform: {
        type: String,
        enum: ['leetcode', 'geeksforgeeks', 'codeforces', 'hackerrank', 'atcoder'],
        required: true
      },
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
      },
      topic: {
        type: String,
        required: true
      },
      url: {
        type: String
      },
      estimatedTime: {
        type: Number, // in minutes
        default: 30
      },
      isCompleted: {
        type: Boolean,
        default: false
      },
      completedAt: {
        type: Date
      }
    }],
    studyTime: {
      type: Number, // in minutes
      default: 60
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  }],
  totalQuestions: {
    type: Number,
    default: 0
  },
  completedQuestions: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number, // percentage
    default: 0
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
weeklyPlanSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Calculate progress before saving
weeklyPlanSchema.pre('save', function(next) {
  if (this.dailyPlans && this.dailyPlans.length > 0) {
    this.totalQuestions = this.dailyPlans.reduce((total, day) => {
      return total + day.questions.length;
    }, 0);
    
    this.completedQuestions = this.dailyPlans.reduce((total, day) => {
      return total + day.questions.filter(q => q.isCompleted).length;
    }, 0);
    
    this.progress = this.totalQuestions > 0 ? Math.round((this.completedQuestions / this.totalQuestions) * 100) : 0;
  }
  next();
});

const WeeklyPlanModel = mongoose.model('weeklyPlan', weeklyPlanSchema);

export default WeeklyPlanModel; 