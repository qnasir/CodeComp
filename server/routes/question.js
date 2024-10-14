const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route to get a random question based on difficulty
router.post('/get-question', questionController.getQuestion);

// Route to evaluate the user's code
router.post('/submit-code', questionController.evaluateCode);

// Route to post a new question (admin access)
router.post('/add-question', questionController.addQuestion);

module.exports = router;
