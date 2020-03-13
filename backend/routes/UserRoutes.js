const express = require('express');
const userModel = require('../models/UserModel');
const auth = require('../middleware/auth');
const router = express.Router();

// View logged in user profile
router.get('/me', auth, async(req, res) => {
  res.send(req.user)
})

// Create one user
router.post('/', async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(err);
  }
})

// Login a registered user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

// Log user out of the application
router.post('/me/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
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