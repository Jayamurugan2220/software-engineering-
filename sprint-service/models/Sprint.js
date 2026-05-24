const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['planned','active','completed'], default: 'planned' }
}, { timestamps: true });

module.exports = mongoose.model('Sprint', SprintSchema);
