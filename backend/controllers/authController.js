import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback_development_secret_khan_sher_2026';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * @desc    Admin login & token generation
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginAdmin = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently unavailable. Please verify MONGODB_URI in backend/.env.',
      });
    }

    const { usernameOrEmail, password } = req.body;

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { username: usernameOrEmail.toLowerCase() },
        { email: usernameOrEmail.toLowerCase() },
      ],
    }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username/email and password.',
      });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username/email and password.',
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get currently authenticated admin profile
 * @route   GET /api/auth/me
 * @access  Private (Admin)
 */
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Setup / Seed initial admin account
 * @route   POST /api/auth/setup
 * @access  Public (Allowed only if zero admins exist in database)
 */
export const setupInitialAdmin = async (req, res, next) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) {
      return res.status(403).json({
        success: false,
        message: 'Admin account has already been initialized. Please log in using existing credentials.',
      });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Username, valid email, and a password of at least 6 characters are required.',
      });
    }

    const newAdmin = await Admin.create({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'superadmin',
    });

    const token = generateToken(newAdmin._id);

    return res.status(201).json({
      success: true,
      message: 'Initial admin account created successfully.',
      token,
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
