import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async (DATABASE_URL) => {
    if (!DATABASE_URL || DATABASE_URL.includes("username:password") || DATABASE_URL.includes("cluster0.mongodb.net")) {
        logger.error('CRITICAL: Invalid DATABASE_URL detected in .env file.');
        logger.error('Please update DATABASE_URL in backend/.env with your actual MongoDB connection string.');
        logger.error('If you are using local MongoDB, use: DATABASE_URL=mongodb://127.0.0.1:27017/codestreak');
        return;
    }
    try {
        const DB_OPTIONS = {
            dbName: "codestreak",
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        logger.info('Connected successfully...')
    } catch (error) {
        logger.error('Error connecting to database:', error);
    }
}

export default connectDB
