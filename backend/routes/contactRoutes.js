import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitContactMessage,
  getContactMessages,
  getMessageStats,
  getContactMessageById,
  updateMessageStatus,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { validateContactInput } from '../middleware/validationMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rate limiter for contact submissions: max 10 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many contact inquiries from this IP. Please wait 15 minutes before submitting again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public submission route
router.post('/', contactLimiter, validateContactInput, submitContactMessage);

// Protected admin routes
router.get('/', protect, getContactMessages);
router.get('/stats', protect, getMessageStats);
router.get('/:id', protect, getContactMessageById);
router.patch('/:id', protect, updateMessageStatus);
router.delete('/:id', protect, deleteContactMessage);

export default router;

