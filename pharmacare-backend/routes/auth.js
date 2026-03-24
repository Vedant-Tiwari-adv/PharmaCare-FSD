const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect, generateToken } = require('../middleware/auth');

const router = express.Router();

// ─── Helper ───────────────────────────────────────────────────────────────────
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  return null;
};

// ─── POST /api/auth/register ──────────────────────────────────────────────────
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name too long'),
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const validErr = handleValidationErrors(req, res);
    if (validErr) return;

    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'An account with this email already exists' });
      }

      // Create user
      const user = await User.create({ name, email, password });
      const token = generateToken(user._id);

      res.status(201).json({
        message: 'Account created successfully',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          notifications: user.notifications,
        },
      });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const validErr = handleValidationErrors(req, res);
    if (validErr) return;

    try {
      const { email, password } = req.body;

      // Find user with password
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = generateToken(user._id);

      res.json({
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          notifications: user.notifications,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
);

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      notifications: user.notifications,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── PUT /api/auth/profile ────────────────────────────────────────────────────
router.put(
  '/profile',
  protect,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  ],
  async (req, res) => {
    const validErr = handleValidationErrors(req, res);
    if (validErr) return;

    try {
      const { name, email, phone } = req.body;

      // Check if email is taken by another user
      if (email !== req.user.email) {
        const existing = await User.findOne({ email });
        if (existing) {
          return res.status(400).json({ message: 'Email already in use' });
        }
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, email, phone: phone || '' },
        { new: true, runValidators: true }
      );

      res.json({
        message: 'Profile updated successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          notifications: user.notifications,
        },
      });
    } catch (err) {
      console.error('Profile update error:', err);
      res.status(500).json({ message: 'Server error updating profile' });
    }
  }
);

// ─── PUT /api/auth/password ───────────────────────────────────────────────────
router.put(
  '/password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  async (req, res) => {
    const validErr = handleValidationErrors(req, res);
    if (validErr) return;

    try {
      const { currentPassword, newPassword } = req.body;

      // Get user with password
      const user = await User.findById(req.user._id).select('+password');
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      user.password = newPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      console.error('Password update error:', err);
      res.status(500).json({ message: 'Server error updating password' });
    }
  }
);

// ─── PUT /api/auth/notifications ─────────────────────────────────────────────
router.put('/notifications', protect, async (req, res) => {
  try {
    const { medicineReminders, expiryAlerts, weeklyReport, emailNotifications } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        notifications: {
          medicineReminders: Boolean(medicineReminders),
          expiryAlerts: Boolean(expiryAlerts),
          weeklyReport: Boolean(weeklyReport),
          emailNotifications: Boolean(emailNotifications),
        },
      },
      { new: true }
    );

    res.json({ message: 'Notifications updated', notifications: user.notifications });
  } catch (err) {
    console.error('Notifications update error:', err);
    res.status(500).json({ message: 'Server error updating notifications' });
  }
});

module.exports = router;
