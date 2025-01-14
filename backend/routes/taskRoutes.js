const express = require('express');
const Task = require('../schema/Task');
const router = express.Router();

router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const { status } = req.query;
        const tasks = status
            ? await Task.find({ status })
            : await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updated_at: new Date(),
    };
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Wrong task name" });
    }

    res.json(task);
  } catch (err) {
    console.error("Couldn't update task", err);
    res.status(400).json({ error: err.message });
  }
});


router.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

