import logger from './utils/logger.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import goalRouter from './routes/goalRoutes.js';
import leaderboardRouter from './routes/leaderboard.routes.js';
import weeklyPlanRouter from './routes/weeklyPlanRoutes.js';
import streakRouter from './routes/streakRoutes.js';
import connectDB from './config/connectDb.js';
import passport from 'passport';
import './config/passportJwt.js';
import './config/googleStrategy.js';
// import './config/linkedinStrategy.js';   // add this if you need LinkedIn strategy
import './config/githubStrategy.js';        // added github Strategy
import setTokensCookies from './utils/setTokensCookies.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import syncGitHubActivity from './cron/githubSync.js';

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const allowedOrigins = [
  process.env.FRONTEND_HOST,
  'http://localhost:3000',
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionSuccessStatus: 200,
};

// resolve CORS policy errors
app.use(cors(corsOptions));

// DB connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Temporary debug route - add this right after app.use(express.json());
app.post('/api/user/debug-login', (req, res) => {
  console.log('🟢 DEBUG LOGIN ROUTE HIT');
  console.log('🟢 Headers:', JSON.stringify(req.headers, null, 2));
  console.log('🟢 Body:', req.body);
  console.log('🟢 Cookies:', req.cookies);
  res.json({ message: 'Debug login endpoint reached', received: req.body });
});

// passport middleware
app.use(passport.initialize());

// Cookie Parser
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/user/', userRouter);
app.use('/api/goals/', goalRouter);
app.use('/api/weekly-plans/', weeklyPlanRouter);
app.use('/api/streaks/', streakRouter);
app.use('/api/leaderboard', leaderboardRouter);

// Health check route to test winston logging
app.get('/health', (req, res) => {
  logger.info('Health check endpoint accessed');
  logger.debug('Debug level log from health check');
  logger.warn('Warning level log from health check');
  
  res.json({ 
    status: 'OK', 
    message: 'Server is running and winston logging is working',
    timestamp: new Date().toISOString()
  });
});

// Google Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_HOST}/login` }),
  (req, res) => {
    const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user;
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);
    res.redirect(`${process.env.FRONTEND_HOST}/profile`);
  }
);

// GitHub Auth Routes
app.get('/auth/github',
  passport.authenticate('github', { session: false, scope: ['user:email'] })
);

app.get('/auth/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${process.env.FRONTEND_HOST}/login` }),
  (req, res) => {
    const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user;
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);
    res.redirect(`${process.env.FRONTEND_HOST}/profile`);
  }
);

// Add these if you want LinkedIn Auth(Routes)

// app.get('/auth/linkedin',
//   passport.authenticate('linkedin', { session: false, scope: ['r_liteprofile', 'r_emailaddress'] })
// );

// app.get('/auth/linkedin/callback',
//   passport.authenticate('linkedin', { session: false, failureRedirect: `${process.env.FRONTEND_HOST}/login` }),
//   (req, res) => {
//     const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user;
//     setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);
//     res.redirect(`${process.env.FRONTEND_HOST}/profile`);
//   }
// );

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
  
  // Initialize cron jobs
  syncGitHubActivity(); 
});