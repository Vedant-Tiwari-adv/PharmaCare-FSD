const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Medicine = require('../models/Medicine');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  return null;
};

const medicineValidation = [
  body('name').trim().notEmpty().withMessage('Medicine name is required').isLength({ max: 200 }),
  body('dosageTime')
    .isIn(['Morning', 'Afternoon', 'Evening', 'Night', 'As Needed'])
    .withMessage('Invalid dosage time'),
  body('specificTime')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Time must be in HH:MM format'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('expiryDate').isISO8601().withMessage('Valid expiry date is required'),
  body('notes').optional().isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters'),
];

// ─── GET /api/medicines ───────────────────────────────────────────────────────
// Get all medicines for logged-in user
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    // Reset takenToday at midnight (simple approach)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const processed = medicines.map(m => {
      const obj = m.toJSON();
      // Check if last taken date was today
      const lastTaken = m.takenDates.length > 0
        ? new Date(m.takenDates[m.takenDates.length - 1])
        : null;
      if (lastTaken) {
        lastTaken.setHours(0, 0, 0, 0);
        obj.takenToday = lastTaken.getTime() === today.getTime();
      } else {
        obj.takenToday = false;
      }
      return obj;
    });

    res.json(processed);
  } catch (err) {
    console.error('Get medicines error:', err);
    res.status(500).json({ message: 'Server error fetching medicines' });
  }
});

// ─── GET /api/medicines/:id ───────────────────────────────────────────────────
// Get single medicine
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json(medicine);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid medicine ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── POST /api/medicines ──────────────────────────────────────────────────────
// Add new medicine
router.post('/', medicineValidation, async (req, res) => {
  const validErr = handleValidationErrors(req, res);
  if (validErr) return;

  try {
    const { name, dosageTime, specificTime, startDate, endDate, expiryDate, notes } = req.body;

    // Validate date logic
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const medicine = await Medicine.create({
      user: req.user._id,
      name,
      dosageTime,
      specificTime,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      expiryDate: new Date(expiryDate),
      notes: notes || '',
    });

    res.status(201).json(medicine);
  } catch (err) {
    console.error('Create medicine error:', err);
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors)[0].message;
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: 'Server error creating medicine' });
  }
});

// ─── PUT /api/medicines/:id ───────────────────────────────────────────────────
// Update medicine
router.put('/:id', medicineValidation, async (req, res) => {
  const validErr = handleValidationErrors(req, res);
  if (validErr) return;

  try {
    const { name, dosageTime, specificTime, startDate, endDate, expiryDate, notes } = req.body;

    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        name,
        dosageTime,
        specificTime,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        expiryDate: new Date(expiryDate),
        notes: notes || '',
      },
      { new: true, runValidators: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json(medicine);
  } catch (err) {
    console.error('Update medicine error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid medicine ID' });
    }
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors)[0].message;
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: 'Server error updating medicine' });
  }
});

// ─── DELETE /api/medicines/:id ────────────────────────────────────────────────
// Delete medicine
router.delete('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json({ message: 'Medicine deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('Delete medicine error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid medicine ID' });
    }
    res.status(500).json({ message: 'Server error deleting medicine' });
  }
});

// ─── POST /api/medicines/:id/taken ───────────────────────────────────────────
// Mark medicine as taken today
router.post('/:id/taken', async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Add today's date to takenDates
    const now = new Date();
    medicine.takenDates.push(now);
    medicine.takenToday = true;
    await medicine.save();

    res.json({ message: 'Medicine marked as taken', medicine });
  } catch (err) {
    console.error('Mark taken error:', err);
    res.status(500).json({ message: 'Server error marking medicine as taken' });
  }
});

// ─── GET /api/medicines/stats/summary ────────────────────────────────────────
// Get stats summary for dashboard
router.get('/stats/summary', async (req, res) => {
  try {
    const medicines = await Medicine.find({ user: req.user._id });
    const now = new Date();

    const total = medicines.length;
    const activeToday = medicines.filter(
      m => new Date(m.startDate) <= now && new Date(m.endDate) >= now
    ).length;
    const expiringSoon = medicines.filter(m => {
      const days = Math.ceil((new Date(m.expiryDate) - now) / (1000 * 60 * 60 * 24));
      return days >= 0 && days <= 30;
    }).length;

    // Simple adherence: % taken today out of active
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const takenToday = medicines.filter(m => {
      const lastTaken = m.takenDates.length > 0
        ? new Date(m.takenDates[m.takenDates.length - 1])
        : null;
      if (!lastTaken) return false;
      lastTaken.setHours(0, 0, 0, 0);
      return lastTaken.getTime() === today.getTime();
    }).length;

    res.json({ total, activeToday, expiringSoon, takenToday });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching stats' });
  }
});

module.exports = router;
