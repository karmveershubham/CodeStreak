import mongoose from "mongoose";
import logger from "../../logger.js";

const connectDB =async (DATABASE_URL)=>{
    try{
        const DB_OPTIONS={
            dbName:"codestreak",
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        logger.info('Connected successfully...')
    }catch(error){
        logger.error('Error connecting to database:', error);
    }
}

export default connectDB
