const express = require('express');
const router = express.Router();
const Sprint = require('../models/Sprint');

// create sprint
router.post('/', async (req, res) => {
  try {
    const s = new Sprint(req.body);
    await s.save();
    res.status(201).json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// get sprints
router.get('/', async (req, res) => {
  try { const list = await Sprint.find(); res.json(list); } catch (err) { res.status(500).json({ message: err.message }); }
});

// update sprint
router.put('/:id', async (req, res) => {
  try {
    const s = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// delete sprint
router.delete('/:id', async (req, res) => {
  try {
    const s = await Sprint.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
