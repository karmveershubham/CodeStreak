import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type:String, required:true, trim:true},
    email: {type:String, required:true, trim:true, unique:true, lowercase:true},
    password: {type:String, required:true, trim:true},
    is_verified:{type:Boolean, default:false},
    overallScore: { type: Number, default: 0 },
    roles: {type: [String], enum:["user", "admin"], default:["user"]},
    // New fields for goal-based learning
    currentGoal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goal'
    },
    preferences: {
        dailyStudyTime: {
            type: Number, // in minutes
            default: 60
        },
        preferredPlatforms: [{
            type: String,
            enum: ['leetcode', 'geeksforgeeks', 'codeforces', 'hackerrank', 'atcoder']
        }],
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'intermediate'
        },
        notificationPreference: {
            type: String,
            enum: ['email', 'whatsapp', 'sms'],
            default: 'email'
        }
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
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;

