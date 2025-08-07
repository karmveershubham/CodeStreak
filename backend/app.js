import logger from '../logger.js';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import goalRouter from './routes/goalRoutes.js'
import leaderboardRouter from './routes/leaderboard.routes.js';
import weeklyPlanRouter from './routes/weeklyPlanRoutes.js'
import streakRouter from './routes/streakRoutes.js'
import connectDB from './config/connectDb.js'
import passport from 'passport'
import './config/passportJwt.js'
import './config/googleStrategy.js'
import setTokensCookies from './utils/setTokensCookies.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app=express()
const port=process.env.PORT 
const DATABASE_URL=process.env.DATABASE_URL

const allowedOrigins = [
  process.env.FRONTEND_HOST,
  'http://localhost:3000',
];

const corsOptions={
    origin: allowedOrigins,
    credentials:true,
    optionSuccessStatus:200,
};

// resolve CORS policy erros
app.use(cors(corsOptions))   //midddleware


//DB connection
connectDB(DATABASE_URL)


//JSON
app.use(express.json())

//passport middlewaare
app.use(passport.initialize())

//Cookie Parser
app.use(cookieParser())

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
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_HOST}/login` }),
  (req, res) => {

    // Access user object and tokens from req.user
    const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user;
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp)

    // Successful authentication, redirect to profile page
    res.redirect(`${process.env.FRONTEND_HOST}/profile`);
  });

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`)
})

