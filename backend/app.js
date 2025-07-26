import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import connectDB from './config/connectdb.js'
import passport from 'passport'
import './config/passport-jwt.js'
import './config/google-strategy.js'
import setTokensCookies from './utils/setTokenCookies.js'
const app=express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL

const corsOptions={
    origin: process.env.FRONTEND_HOST,
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

app.use('/api/user/', userRouter);

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
  console.log(`Server listening at http://localhost:${port}`)
})

