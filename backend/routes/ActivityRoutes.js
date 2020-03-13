const express = require('express');
const activityModel = require('../models/ActivitityModel');
const router = express.Router();

// Get all activities
router.get('/list', async (req, res) => {
  const activities = await activityModel.find({})

  try {
    res.send(activities);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Create one activity
router.post('/', async (req, res) => {
  const activity = new activityModel(req.body);

  try {
    await activity.save();
    res.send(activity);
  } catch (error) {
    res.status(500).send(err);
  }
})

// Update one activity
router.patch('/:id', async (req, res) => {
  try {
    const activity = await activityModel.findByIdAndUpdate(req.params.id, req.body);
    await activity.save()
    res.send(activity)
  } catch (error) {
    res.status(500).send(arr);
  }
})

// Delete one activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await activityModel.findByIdAndDelete(req.params.id);

    if (!activity) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router;