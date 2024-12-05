const express = require('express');
const { registerUser, loginUser, uploadImage, profileInfo } = require('../controllers/authController');
const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// Description Route
router.post('/description', uploadImage);

// Profile-Info Route
router.get('/profile/:id', profileInfo);

module.exports = router;
