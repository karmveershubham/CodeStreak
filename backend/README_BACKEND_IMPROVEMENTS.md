# CodeStreak Backend Improvements

## Overview
This document outlines the comprehensive improvements made to the CodeStreak backend to support AI-driven personalized learning plans and goal-based coding challenges.

## 🚀 New Features Implemented

### 1. Goal Management System
- **Purpose**: Allow users to set and manage learning objectives
- **Features**:
  - Create, read, update, delete goals
  - Set current active goal
  - Support for different goal categories (interview prep, competitive programming, etc.)
  - Target company specification
  - Difficulty level preferences
  - Preferred coding platforms

### 2. AI-Powered Weekly Plan Generation
- **Purpose**: Generate personalized weekly learning plans using Gemini AI
- **Features**:
  - 7-day structured learning plans
  - Daily topic focus
  - Platform-specific question recommendations
  - Difficulty-appropriate challenges
  - Estimated completion times
  - Direct links to coding problems

### 3. Streak Management System
- **Purpose**: Track and motivate users through daily coding streaks
- **Features**:
  - Daily streak counting
  - Longest streak tracking
  - Activity history
  - Progress statistics
  - AI-generated daily motivation

### 4. Enhanced User Model
- **Purpose**: Support goal-based learning preferences
- **New Fields**:
  - Current goal reference
  - Learning preferences
  - Platform preferences
  - Notification preferences

## 📁 New File Structure

```
backend/
├── models/
│   ├── Goal.js              # Goal management
│   ├── WeeklyPlan.js        # AI-generated plans
│   ├── Streak.js            # Streak tracking
│   └── User.js              # Enhanced user model
├── controllers/
│   ├── goalController.js    # Goal CRUD operations
│   ├── weeklyPlanController.js # Plan generation & management
│   └── streakController.js  # Streak operations
├── routes/
│   ├── goalRoutes.js        # Goal endpoints
│   ├── weeklyPlanRoutes.js  # Plan endpoints
│   └── streakRoutes.js      # Streak endpoints
├── utils/
│   └── gemini.js            # Enhanced AI integration
└── ai/
    └── prompts.js           # AI prompt templates
```

## 🔧 API Endpoints

### Goal Management
```
POST   /api/goals/                    # Create new goal
GET    /api/goals/                    # Get user's goals
GET    /api/goals/current             # Get current goal
GET    /api/goals/:goalId             # Get specific goal
PUT    /api/goals/:goalId             # Update goal
DELETE /api/goals/:goalId             # Delete goal
POST   /api/goals/:goalId/set-current # Set current goal
```

### Weekly Plans
```
POST   /api/weekly-plans/generate/:goalId           # Generate new plan
GET    /api/weekly-plans/                           # Get user's plans
GET    /api/weekly-plans/current                    # Get active plan
GET    /api/weekly-plans/:planId                    # Get specific plan
PUT    /api/weekly-plans/:planId/deactivate         # Deactivate plan
GET    /api/weekly-plans/:planId/feedback           # Get AI feedback
PUT    /api/weekly-plans/:planId/days/:dayIndex/complete                    # Mark day complete
PUT    /api/weekly-plans/:planId/days/:dayIndex/questions/:questionIndex/complete # Mark question complete
```

### Streak Management
```
GET    /api/streaks/                 # Get user's streak
POST   /api/streaks/update           # Update streak
GET    /api/streaks/history          # Get streak history
GET    /api/streaks/motivation       # Get daily motivation
GET    /api/streaks/stats            # Get streak statistics
POST   /api/streaks/reset            # Reset streak (testing)
```

## 🤖 AI Integration

### Enhanced Gemini Integration
- **Structured Prompts**: Pre-defined templates for consistent AI responses
- **JSON Response Parsing**: Automatic parsing and validation of AI responses
- **Error Handling**: Robust error handling for AI API failures
- **Multiple AI Functions**:
  - Weekly plan generation
  - Daily question recommendations
  - Progress feedback generation

### AI Prompt Templates
- **Goal-based prompts**: Personalized based on user's learning objectives
- **Platform-specific**: Recommendations from preferred coding platforms
- **Difficulty-aware**: Matches user's skill level
- **Streak-motivated**: Considers user's current streak for motivation

## 📊 Data Models

### Goal Model
```javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  category: ['interview_prep', 'competitive_programming', 'skill_development', 'project_based'],
  targetCompany: String,
  difficulty: ['beginner', 'intermediate', 'advanced'],
  preferredPlatforms: ['leetcode', 'geeksforgeeks', 'codeforces', 'hackerrank', 'atcoder'],
  topics: [String],
  targetDate: Date,
  isActive: Boolean
}
```

### WeeklyPlan Model
```javascript
{
  userId: ObjectId,
  goalId: ObjectId,
  weekStartDate: Date,
  weekEndDate: Date,
  dailyPlans: [{
    day: String,
    date: Date,
    topics: [String],
    questions: [{
      title: String,
      platform: String,
      difficulty: String,
      topic: String,
      url: String,
      estimatedTime: Number,
      isCompleted: Boolean,
      completedAt: Date
    }],
    studyTime: Number,
    isCompleted: Boolean
  }],
  totalQuestions: Number,
  completedQuestions: Number,
  progress: Number,
  isActive: Boolean
}
```

### Streak Model
```javascript
{
  userId: ObjectId,
  currentStreak: Number,
  longestStreak: Number,
  lastActivityDate: Date,
  streakHistory: [{
    date: Date,
    questionsCompleted: Number,
    studyTime: Number,
    topics: [String]
  }],
  totalQuestionsCompleted: Number,
  totalStudyTime: Number
}
```

## 🔐 Security & Authentication

- **JWT Authentication**: All new endpoints are protected
- **User Authorization**: Users can only access their own data
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Proper error responses without exposing internals

## 🚀 Getting Started

### Prerequisites
1. MongoDB database
2. Gemini API key
3. Node.js environment

### Environment Variables
Add these to your `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

### Installation
```bash
cd backend
npm install
npm run dev
```

## 🧪 Testing the Features

### 1. Create a Goal
```bash
POST /api/goals/
{
  "title": "Crack Amazon Interviews",
  "category": "interview_prep",
  "targetCompany": "Amazon",
  "difficulty": "intermediate",
  "preferredPlatforms": ["leetcode", "geeksforgeeks"],
  "topics": ["Arrays", "Strings", "Dynamic Programming"]
}
```

### 2. Generate Weekly Plan
```bash
POST /api/weekly-plans/generate/:goalId
```

### 3. Update Streak
```bash
POST /api/streaks/update
{
  "questionsCompleted": 2,
  "studyTime": 60,
  "topics": ["Arrays", "Strings"]
}
```

## 🔄 Workflow

1. **User Registration/Login** → Existing auth system
2. **Create Goal** → Set learning objectives
3. **Generate Weekly Plan** → AI creates personalized plan
4. **Daily Progress** → Complete questions, update streak
5. **Weekly Feedback** → AI provides progress insights
6. **Repeat** → Generate new weekly plan

## 🎯 Benefits

### For Users
- **Personalized Learning**: AI-generated plans based on goals
- **Motivation**: Streak tracking and daily motivation
- **Progress Tracking**: Detailed progress analytics
- **Platform Integration**: Direct links to coding platforms

### For Developers
- **Scalable Architecture**: Modular design for easy expansion
- **AI Integration**: Structured approach to AI implementation
- **Data Integrity**: Comprehensive validation and error handling
- **API Consistency**: Standardized response formats

## 🔮 Future Enhancements

1. **Notification System**: Email/SMS reminders
2. **Social Features**: Leaderboards, friend challenges
3. **Advanced Analytics**: Learning pattern analysis
4. **Platform APIs**: Direct integration with coding platforms
5. **Mobile App**: React Native mobile application

## 🐛 Known Issues & Limitations

1. **AI Response Parsing**: JSON parsing may fail with malformed AI responses
2. **Rate Limiting**: Gemini API has rate limits
3. **Platform Links**: Manual URL generation (no direct API integration)
4. **Question Database**: No local question database (relies on AI recommendations)

## 📝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Update this documentation
5. Test thoroughly before submitting

---

**Note**: This implementation provides a solid foundation for AI-driven personalized learning. The modular design allows for easy expansion and modification as requirements evolve. 