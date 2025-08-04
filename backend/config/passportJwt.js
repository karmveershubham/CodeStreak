import logger from '../../logger.js';
import UserModel from '../models/User.js'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY
}

console.log('DEBUG JWT_ACCESS_TOKEN_SECRET_KEY:', process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
// logger.info("JWT Access Token Secret Key:", opts.secretOrKey); // Log the secret key for debugging purposes

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await UserModel.findOne({ _id: jwt_payload._id }).select('-password')
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }

  } catch (error) {
    return done(err, false);
  }
}));

