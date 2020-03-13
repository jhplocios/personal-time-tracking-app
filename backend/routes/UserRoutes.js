const express = require('express');
const userModel = require('../models/UserModel');
const router = express.Router();

// Get all users
router.get('/list', async (req, res) => {
  const users = await userModel.find({})

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Create one user
router.post('/', async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(err);
  }
})

// Update one user
router.patch('/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(500).send(arr);
  }
})

// Delete one user
router.delete('/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) res.status(404).send("No user found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router;