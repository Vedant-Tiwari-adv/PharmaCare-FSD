const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    dosageTime: {
      type: String,
      required: [true, 'Dosage time is required'],
      enum: {
        values: ['Morning', 'Afternoon', 'Evening', 'Night', 'As Needed'],
        message: 'Dosage time must be Morning, Afternoon, Evening, Night, or As Needed',
      },
    },
    specificTime: {
      type: String,
      required: [true, 'Specific time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'Expiry date is required'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      default: '',
    },
    takenToday: {
      type: Boolean,
      default: false,
    },
    takenDates: [
      {
        type: Date,
      },
    ],
  },
  { timestamps: true }
);

// Validate end date is after start date
medicineSchema.pre('save', function (next) {
  if (this.endDate <= this.startDate) {
    return next(new Error('End date must be after start date'));
  }
  next();
});

// Virtual: days until expiry
medicineSchema.virtual('daysUntilExpiry').get(function () {
  const diff = new Date(this.expiryDate) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Virtual: is active today
medicineSchema.virtual('isActiveToday').get(function () {
  const now = new Date();
  return new Date(this.startDate) <= now && new Date(this.endDate) >= now;
});

medicineSchema.set('toJSON', { virtuals: true });
medicineSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Medicine', medicineSchema);
