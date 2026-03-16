import cron from 'node-cron';
import logger from '../utils/logger.js';
import UserModel from '../models/User.js';
import githubService from '../services/github.service.js';

// Run every day at 23:50 (11:50 PM) to ensure today's commits are captured
const syncGitHubActivity = async () => {
    try {
        logger.info('Starting daily GitHub activity sync...');
        
        // Find users who have connected their GitHub account
        const users = await UserModel.find({ githubUsername: { $exists: true, $ne: null } });
        
        logger.info(`Found ${users.length} users with connected GitHub accounts.`);

        for (const user of users) {
             try {
                 await githubService.syncUserActivity(user);
             } catch (err) {
                 logger.error(`Failed to sync activity for user ${user._id} (${user.githubUsername}): ${err.message}`);
             }
        }

        logger.info('Finished daily GitHub activity sync.');
    } catch (error) {
        logger.error('Critical error in githubSync cron job:', error);
    }
};

// Schedule it
cron.schedule('50 23 * * *', syncGitHubActivity, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Adjust timezone as needed based on where the app runs most primarily
});

export default syncGitHubActivity;
