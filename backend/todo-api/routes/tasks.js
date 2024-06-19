const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Task = require('../models/Task');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token.split(' ')[1], 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

// Get all tasks
router.get('/', verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Create a new task
router.post('/', verifyToken, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    category: req.body.category,
    dueDate: req.body.dueDate,
    completed: req.body.completed,
    userId: req.userId
  });
  await task.save();
  res.json(task);
});

// Update a task
router.put('/:id', verifyToken, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
