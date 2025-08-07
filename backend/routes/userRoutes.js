import express from 'express'
const router = express.Router();
import UserController from '../controllers/userController.js'
import passport from 'passport'
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", UserController.userRegistration)

/**
 * @swagger
 * /api/user/verify-email:
 *   post:
 *     summary: Verify user's email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Email verified
 */
router.post('/verify-email', UserController.verifyEmail)

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in user and return access + refresh tokens
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', UserController.userLogin)

/**
 * @swagger
 * /api/user/refresh-token:
 *   post:
 *     summary: Get new access token using refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.post('/refresh-token', UserController.getNewAccessToken)

/**
 * @swagger
 * /api/user/reset-password-link:
 *   post:
 *     summary: Send password reset email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Password reset link sent
 */
router.post('/reset-password-link', UserController.sendUserPasswordResetEmail)

/**
 * @swagger
 * /api/user/reset-password/{id}/{token}:
 *   post:
 *     summary: Reset user password using token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// ─── Protected Routes ───────────────────────────────────────────────

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched
 */
router.get('/me', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.userProfile)

/**
 * @swagger
 * /api/user/change-password:
 *   post:
 *     summary: Change user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.post('/change-password', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.changeUserPassword)

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout the user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.userLogout)

export default router;
