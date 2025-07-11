import { authRateLimit, validate } from '@/core/middleware';
import { Router } from 'express';
import {
  forgotPasswordHandler,
  getProfileHandler,
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  registerHandler,
  resendEmailVerificationHandler,
  resetPasswordHandler,
  verifyEmailHandler
} from '../controllers/auth.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resendEmailVerificationSchema,
  resetPasswordSchema,
  verifyEmailSchema
} from '../validators/auth.validator';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization endpoints
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Create a new user account with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/register', validate(registerSchema), registerHandler);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login user
 *     description: Authenticate user and return JWT tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validate(loginSchema), loginHandler);

router.post('/refresh-token', validate(refreshTokenSchema), refreshTokenHandler);
router.post('/forgot-password', authRateLimit, validate(forgotPasswordSchema), forgotPasswordHandler);
router.post('/reset-password', validate(resetPasswordSchema), resetPasswordHandler);
router.get('/verify-email/:token', validate(verifyEmailSchema), verifyEmailHandler);
router.post('/resend-verification', authRateLimit, validate(resendEmailVerificationSchema), resendEmailVerificationHandler);

/**
 * @swagger
 * /api/v1/auth/profile:
 *   get:
 *     tags: [Authentication]
 *     summary: Get user profile
 *     description: Retrieve the authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authenticate, getProfileHandler);
router.post('/logout', authenticate, logoutHandler);

// Admin only routes
router.get('/admin/users', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

export default router;