const express = require('express');
const path = require('path');
const fs = require('fs');
const Prescription = require('../models/Prescription');
const { protect } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// All routes require authentication
router.use(protect);

// ─── GET /api/prescriptions ───────────────────────────────────────────────────
// Get all prescriptions for user
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user: req.user._id })
      .sort({ uploadDate: -1 });
    res.json(prescriptions);
  } catch (err) {
    console.error('Get prescriptions error:', err);
    res.status(500).json({ message: 'Server error fetching prescriptions' });
  }
});

// ─── GET /api/prescriptions/:id ──────────────────────────────────────────────
// Get single prescription metadata
router.get('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json(prescription);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid prescription ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── POST /api/prescriptions ──────────────────────────────────────────────────
// Upload new prescription
router.post('/', upload.single('prescription'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { doctor, prescriptionDate } = req.body;

    const prescription = await Prescription.create({
      user: req.user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      doctor: doctor || '',
      prescriptionDate: prescriptionDate ? new Date(prescriptionDate) : null,
      uploadDate: new Date(),
    });

    res.status(201).json(prescription);
  } catch (err) {
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Upload prescription error:', err);
    res.status(500).json({ message: 'Server error uploading prescription' });
  }
});

// ─── GET /api/prescriptions/:id/view ─────────────────────────────────────────
// View/stream prescription file
router.get('/:id/view', async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    const filePath = path.resolve(prescription.filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    res.setHeader('Content-Type', prescription.mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${prescription.originalName}"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error('View prescription error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid prescription ID' });
    }
    res.status(500).json({ message: 'Server error viewing file' });
  }
});

// ─── GET /api/prescriptions/:id/download ─────────────────────────────────────
// Download prescription file
router.get('/:id/download', async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    const filePath = path.resolve(prescription.filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    res.setHeader('Content-Type', prescription.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${prescription.originalName}"`);
    res.setHeader('Content-Length', prescription.size);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error('Download prescription error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid prescription ID' });
    }
    res.status(500).json({ message: 'Server error downloading file' });
  }
});

// ─── DELETE /api/prescriptions/:id ───────────────────────────────────────────
// Delete prescription
router.delete('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    // Delete file from disk
    const filePath = path.resolve(prescription.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Prescription.deleteOne({ _id: prescription._id });

    res.json({ message: 'Prescription deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('Delete prescription error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid prescription ID' });
    }
    res.status(500).json({ message: 'Server error deleting prescription' });
  }
});

module.exports = router;
