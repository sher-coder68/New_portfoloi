import mongoose from 'mongoose';
import Message from '../models/Message.js';
import { sendContactNotification } from '../utils/emailService.js';

/**
 * @desc    Submit a new contact message (Public)
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContactMessage = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently unavailable. Please verify MONGODB_URI in backend/.env.',
      });
    }

    const { name, email, subject, message } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // 1. Create and save new message record in MongoDB
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
      ipAddress,
      userAgent,
    });

    // 2. Dispatch email notification asynchronously
    sendContactNotification({
      name,
      email,
      subject,
      message,
      id: newMessage._id,
    }).catch((err) => console.error('[Notification dispatch error]', err.message));

    // 3. Return clean response
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received and saved successfully.',
      data: {
        id: newMessage._id,
        name: newMessage.name,
        subject: newMessage.subject,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all messages with pagination & filtering (Admin only)
 * @route   GET /api/contact
 * @access  Private (Admin)
 */
export const getContactMessages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const skip = (page - 1) * limit;

    const filter = {};
    if (
      req.query.isRead !== undefined &&
      req.query.isRead !== 'undefined' &&
      req.query.isRead !== 'null' &&
      req.query.isRead !== ''
    ) {
      filter.isRead = req.query.isRead === 'true';
    }
    if (
      req.query.isStarred !== undefined &&
      req.query.isStarred !== 'undefined' &&
      req.query.isStarred !== 'null' &&
      req.query.isStarred !== ''
    ) {
      filter.isStarred = req.query.isStarred === 'true';
    }
    if (
      req.query.search &&
      req.query.search !== 'undefined' &&
      req.query.search !== 'null' &&
      req.query.search.trim() !== ''
    ) {
      const escapedSearch = req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(escapedSearch, 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { subject: searchRegex },
        { message: searchRegex },
      ];
    }

    const total = await Message.countDocuments(filter);
    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: messages,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get message statistics (Admin only)
 * @route   GET /api/contact/stats
 * @access  Private (Admin)
 */
export const getMessageStats = async (req, res, next) => {
  try {
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ isRead: false });
    const starredMessages = await Message.countDocuments({ isStarred: true });

    // Today's count
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayMessages = await Message.countDocuments({ createdAt: { $gte: startOfToday } });

    return res.status(200).json({
      success: true,
      data: {
        total: totalMessages,
        unread: unreadMessages,
        starred: starredMessages,
        today: todayMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single contact message by ID (Admin only)
 * @route   GET /api/contact/:id
 * @access  Private (Admin)
 */
export const getContactMessageById = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update message status (isRead, isStarred) (Admin only)
 * @route   PATCH /api/contact/:id
 * @access  Private (Admin)
 */
export const updateMessageStatus = async (req, res, next) => {
  try {
    const { isRead, isStarred } = req.body;
    const updates = {};
    if (typeof isRead === 'boolean') updates.isRead = isRead;
    if (typeof isStarred === 'boolean') updates.isStarred = isStarred;

    const message = await Message.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message status updated successfully',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a message (Admin only)
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin)
 */
export const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};
