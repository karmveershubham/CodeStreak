import express from 'express'
const router = express.Router();
import UserController from '../controllers/userController.js'
import passport from 'passport'
import accessTokenAutoRefresh from '../middlewares/accessTokenAutoRefresh.js';

// ─── Public Routes ───────────────────────────────────────────────
router.post("/register", UserController.userRegistration)
router.post('/verify-email', UserController.verifyEmail)
router.post('/login', UserController.userLogin) // NO MIDDLEWARE HERE
router.post('/refresh-token', UserController.getNewAccessToken)
router.post('/reset-password-link', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// ─── Protected Routes ───────────────────────────────────────────────
router.get('/me', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.userProfile)
router.post('/change-password', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.changeUserPassword)
router.post('/logout', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.userLogout)
router.post('/github/connect', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.connectGitHub)
router.post('/github/sync', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.syncGitHub)

export default router;