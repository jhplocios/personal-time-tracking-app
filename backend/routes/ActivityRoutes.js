const express = require('express');
const activityModel = require('../models/ActivitityModel');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all activities
router.get('/list', auth, async (req, res) => {
  try {
    const activities = await activityModel.find({})
    res.status(201).send(activities);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Create one activity
router.post('/', auth, async (req, res) => {
  try {
    console.log(req.body)
    const activity = new activityModel(req.body);
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
router.delete('/:id', auth, async (req, res) => {
  try {
    const activity = await activityModel.findByIdAndDelete(req.params.id);
    if (!activity) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router;