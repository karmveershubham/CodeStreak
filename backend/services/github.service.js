import axios from 'axios';
import logger from '../utils/logger.js';
import StreakModel from '../models/Streak.js';

class GitHubService {
  /**
   * Fetches the number of commits a user made today by parsing their public PushEvents.
   * @param {string} username GitHub username
   * @param {string} accessToken Optional GitHub Personal Access Token or OAuth Token for higher rate limits
   * @returns {Promise<number>} Number of commits made today
   */
  async getTodaysCommits(username, accessToken = null) {
    try {
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
      };
      
      if (accessToken) {
        headers['Authorization'] = `token ${accessToken}`;
      }

      const response = await axios.get(`https://api.github.com/users/${username}/events/public`, { headers });
      const events = response.data;

      // Filter events to only include push events from today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const commitCount = events.reduce((count, event) => {
        if (event.type === 'PushEvent') {
          const eventDate = new Date(event.created_at);
          eventDate.setHours(0, 0, 0, 0);
          
          if (eventDate.getTime() === today.getTime()) {
            return count + (event.payload.commits ? event.payload.commits.length : 0);
          }
        }
        return count;
      }, 0);

      return commitCount;
    } catch (error) {
      logger.error(`Error fetching GitHub events for ${username}: ${error.message}`);
      // Don't throw the error, just return 0 to prevent the sync from crashing entirely
      return 0;
    }
  }

  /**
   * Syncs GitHub activity for a single user and updates their streak
   * @param {Object} user Mongoose user document 
   */
  async syncUserActivity(user) {
    if (!user.githubUsername) return;
    
    const commitsToday = await this.getTodaysCommits(user.githubUsername, user.githubAccessToken);
    
    // Update user's DB record for today
    user.dailyCommitCount = commitsToday;
    user.githubLastSync = new Date();
    await user.save();

    if (commitsToday > 0) {
      // Find or create streak record
      let streak = await StreakModel.findOne({ userId: user._id });
      if (!streak) {
        streak = new StreakModel({ userId: user._id });
      }

      // Update streak (we use 0 for questions/study and pass the topic 'github')
      // Custom logic needed because updateStreak method doesn't accept githubCommits directly,
      // We will enhance the existing updateStreak method.
      await streak.updateStreak(0, 0, ['github-commit'], commitsToday);
      
      logger.info(`Synced Github activity for ${user.githubUsername}: ${commitsToday} commits.`);
    }
  }
}

export default new GitHubService();
