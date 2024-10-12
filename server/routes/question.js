const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get a random question
router.get('/random', async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 1 } }]);
    res.json(questions[0]);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
