const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignee: { type: String },
  sprintId: { type: String },
  status: { type: String, enum: ['todo','inprogress','done'], default: 'todo' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
