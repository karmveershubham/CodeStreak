import express from 'express'
const router = express.Router();
import UserController from '../controllers/userController.js'
import passport from 'passport'
// import setAuthHeader from '../middlewares/setAuthHeaders.js';
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

//public routes

router.post("/register", UserController.userRegistration)
router.post('/verify-email', UserController.verifyEmail)
router.post('/login', UserController.userLogin)
router.post('/refresh-token', UserController.getNewAccessToken)
router.post('/reset-password-link', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

//protected route

router.get('/me', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.userProfile)
router.post('/change-password', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.changeUserPassword)
router.post('/logout', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.userLogout)
export default router;