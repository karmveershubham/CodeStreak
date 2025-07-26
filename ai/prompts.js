// AI Prompt Templates for CodeStreak

export const PROMPTS = {
  // Generate weekly plan based on user goal
  generateWeeklyPlan: (goal, userPreferences) => `
You are an expert coding mentor creating a personalized weekly learning plan for a student.

STUDENT GOAL:
- Title: ${goal.title}
- Category: ${goal.category}
- Target Company: ${goal.targetCompany || 'Not specified'}
- Difficulty Level: ${goal.difficulty}
- Preferred Platforms: ${goal.preferredPlatforms.join(', ')}
- Topics to Focus On: ${goal.topics.join(', ')}
- Daily Study Time: ${userPreferences.dailyStudyTime} minutes

TASK:
Create a detailed 7-day weekly plan with the following structure for each day:

1. Day of the week
2. Date (starting from today)
3. Topics to cover (2–3 specific topics)
4. 2–3 coding questions with:
   - Question title
   - Platform (must be from preferred platforms)
   - Difficulty level (easy/medium/hard)
   - Topic category
   - Estimated time to solve (in minutes)
   - Direct link to the problem (if available)

REQUIREMENTS:
- Use only the preferred platforms: ${goal.preferredPlatforms.join(', ')}
- Match question difficulty with the user's level: ${goal.difficulty}
- Focus on these topics: ${goal.topics.join(', ')}
- Keep total daily study time close to ${userPreferences.dailyStudyTime} minutes
- Include a mix of easy, medium, and hard questions
- Ensure questions are relevant to ${goal.category} preparation
- If targeting ${goal.targetCompany}, include company-specific question types

OUTPUT FORMAT:
Return a valid JSON object with this exact structure:
{
  "weekStartDate": "YYYY-MM-DD",
  "weekEndDate": "YYYY-MM-DD", 
  "dailyPlans": [
    {
      "day": "monday",
      "date": "YYYY-MM-DD",
      "topics": ["topic1", "topic2", "topic3"],
      "questions": [
        {
          "title": "Question Title",
          "platform": "leetcode",
          "difficulty": "medium",
          "topic": "Arrays",
          "url": "https://leetcode.com/problems/question-slug",
          "estimatedTime": 30
        }
      ],
      "studyTime": 60
    }
  ]
}
`,

  // Generate daily question recommendation
  generateDailyQuestion: (userProfile, completedTopics, streak) => `
You are an AI coding mentor recommending today's coding challenge.

USER PROFILE:
- Current Goal: ${userProfile.currentGoal?.title || 'Not set'}
- Difficulty Level: ${userProfile.preferences.difficulty}
- Preferred Platforms: ${userProfile.preferences.preferredPlatforms.join(', ')}
- Daily Study Time: ${userProfile.preferences.dailyStudyTime} minutes
- Current Streak: ${streak.currentStreak} days
- Recently Completed Topics: ${completedTopics.join(', ')}

TASK:
Recommend 1–2 coding questions for today that will:
- Maintain the user's ${streak.currentStreak}-day streak
- Build upon recently completed topics: ${completedTopics.join(', ')}
- Match their difficulty level: ${userProfile.preferences.difficulty}
- Be from preferred platforms: ${userProfile.preferences.preferredPlatforms.join(', ')}

REQUIREMENTS:
- Total estimated time should be around ${userProfile.preferences.dailyStudyTime} minutes
- Include a mix of topics to keep learning engaging
- Encourage consistency by referencing the current streak
- Select questions that are interesting, achievable, and skill-building

OUTPUT FORMAT:
Return a JSON object with this structure:
{
  "questions": [
    {
      "title": "Question Title",
      "platform": "leetcode",
      "difficulty": "medium", 
      "topic": "Arrays",
      "url": "https://leetcode.com/problems/question-slug",
      "estimatedTime": 30,
      "motivation": "This question will help you practice array manipulation techniques"
    }
  ],
  "dailyMotivation": "Keep up your amazing ${streak.currentStreak}-day streak! Today's challenges will strengthen your foundation."
}
`,

  // Generate progress feedback
  generateProgressFeedback: (weeklyProgress, streak) => `
You are an encouraging coding mentor providing weekly progress feedback.

WEEKLY PROGRESS:
- Questions Completed: ${weeklyProgress.completedQuestions}/${weeklyProgress.totalQuestions}
- Progress Percentage: ${weeklyProgress.progress}%
- Current Streak: ${streak.currentStreak} days
- Longest Streak: ${streak.longestStreak} days
- Total Study Time: ${weeklyProgress.totalStudyTime} minutes

TASK:
Provide motivational and constructive feedback for the user's past week and offer goals for the next.

REQUIREMENTS:
- Celebrate achievements and consistency
- Suggest specific areas for improvement
- Recommend realistic goals for the next week
- Reinforce streak motivation

OUTPUT FORMAT:
Return a JSON object with this structure:
{
  "weeklyFeedback": "Your feedback message here",
  "achievements": ["achievement1", "achievement2"],
  "improvements": ["improvement1", "improvement2"],
  "nextWeekGoals": ["goal1", "goal2"],
  "motivation": "Motivational message for next week"
}
`
};

export const PLATFORM_URLS = {
  leetcode: 'https://leetcode.com/problems/',
  geeksforgeeks: 'https://practice.geeksforgeeks.org/problems/',
  codeforces: 'https://codeforces.com/problemset/problem/',
  hackerrank: 'https://www.hackerrank.com/challenges/',
  atcoder: 'https://atcoder.jp/contests/'
};

export const TOPIC_MAPPING = {
  'Arrays': ['array', 'arrays', 'list', 'lists'],
  'Strings': ['string', 'strings', 'text', 'substring'],
  'Linked Lists': ['linked list', 'linkedlist', 'node', 'pointer'],
  'Trees': ['tree', 'binary tree', 'bst', 'traversal'],
  'Graphs': ['graph', 'dfs', 'bfs', 'shortest path'],
  'Dynamic Programming': ['dp', 'dynamic programming', 'memoization'],
  'Greedy': ['greedy', 'optimization'],
  'Two Pointers': ['two pointer', 'two pointers', 'sliding window'],
  'Binary Search': ['binary search', 'search', 'sorted array'],
  'Stack': ['stack', 'lifo'],
  'Queue': ['queue', 'fifo'],
  'Heap': ['heap', 'priority queue', 'min heap', 'max heap'],
  'Hash Table': ['hash', 'hashmap', 'hash table', 'dictionary']
};
