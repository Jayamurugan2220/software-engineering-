const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// create task
router.post('/', async (req, res) => {
  try { const t = new Task(req.body); await t.save(); res.status(201).json(t); } catch (err) { res.status(500).json({ message: err.message }); }
});

// get tasks
router.get('/', async (req, res) => {
  try { const list = await Task.find(); res.json(list); } catch (err) { res.status(500).json({ message: err.message }); }
});

// update task status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['todo','inprogress','done'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const t = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json(t);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// delete task
router.delete('/:id', async (req, res) => {
  try { const t = await Task.findByIdAndDelete(req.params.id); if (!t) return res.status(404).json({ message: 'Not found' }); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
