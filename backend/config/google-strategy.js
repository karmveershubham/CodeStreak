import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import UserModel from '../models/User.js';
import generateTokens from '../utils/generatetokens.js';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    // console.log("Profile", profile);
    try {
      // Check if user already exists in the database
      let user = await UserModel.findOne({ email: profile._json.email });
      if (!user) {
        const lastSixDigitsID = profile.id.substring(profile.id.length - 6);
        const lastTwoDigitsName = profile._json.name.substring(profile._json.name.length - 2);
        const newPass = lastTwoDigitsName + lastSixDigitsID
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(newPass, salt);
        user = await UserModel.create({
          name: profile._json.name,
          email: profile._json.email,
          is_verified: true,
          password: hashedPassword,
        })
      } 
      // Generate JWT tokens
      const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);
      return done(null, { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp });

    } catch (error) {
      return done(error);
    }
  }
));