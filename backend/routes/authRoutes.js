import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  loginAdmin,
  getAdminProfile,
  setupInitialAdmin,
} from '../controllers/authController.js';
import { validateLoginInput } from '../middleware/validationMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rate limiter for login: max 10 login attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, validateLoginInput, loginAdmin);
router.get('/me', protect, getAdminProfile);
router.post('/setup', setupInitialAdmin);

export default router;

