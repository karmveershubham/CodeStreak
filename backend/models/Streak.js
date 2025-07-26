import mongoose from 'mongoose';

const streakSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActivityDate: {
    type: Date
  },
  streakHistory: [{
    date: {
      type: Date,
      required: true
    },
    questionsCompleted: {
      type: Number,
      default: 0
    },
    studyTime: {
      type: Number, // in minutes
      default: 0
    },
    topics: [{
      type: String,
      trim: true
    }]
  }],
  totalQuestionsCompleted: {
    type: Number,
    default: 0
  },
  totalStudyTime: {
    type: Number, // in minutes
    default: 0
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
streakSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to update streak
streakSchema.methods.updateStreak = function(questionsCompleted = 0, studyTime = 0, topics = []) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActivity = this.lastActivityDate ? new Date(this.lastActivityDate) : null;
  if (lastActivity) {
    lastActivity.setHours(0, 0, 0, 0);
  }
  
  // Check if user already completed today's activity
  const todayEntry = this.streakHistory.find(entry => {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    return entryDate.getTime() === today.getTime();
  });
  
  if (todayEntry) {
    // Update today's entry
    todayEntry.questionsCompleted += questionsCompleted;
    todayEntry.studyTime += studyTime;
    todayEntry.topics = [...new Set([...todayEntry.topics, ...topics])];
  } else {
    // Add new entry for today
    this.streakHistory.push({
      date: today,
      questionsCompleted,
      studyTime,
      topics
    });
    
    // Update streak count
    if (!lastActivity || (today.getTime() - lastActivity.getTime()) === 86400000) {
      // Consecutive day
      this.currentStreak += 1;
    } else if ((today.getTime() - lastActivity.getTime()) > 86400000) {
      // Streak broken
      this.currentStreak = 1;
    }
    
    this.lastActivityDate = today;
  }
  
  // Update totals
  this.totalQuestionsCompleted += questionsCompleted;
  this.totalStudyTime += studyTime;
  
  // Update longest streak
  if (this.currentStreak > this.longestStreak) {
    this.longestStreak = this.currentStreak;
  }
  
  return this.save();
};

const StreakModel = mongoose.model('streak', streakSchema);

export default StreakModel; 