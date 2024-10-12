const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { exec } = require('child_process');

// Submit code for evaluation
router.post('/submit', async (req, res) => {
  const { questionId, userCode } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    // Assuming userCode is JavaScript code as a string.
    const passed = question.testCases.every(test => {
      const { input, output } = test;
      // Replace this with sandboxed code execution in production
      const result = eval(`${userCode}(${input})`);
      return result == output;
    });

    if (passed) {
      return res.json({ message: 'Code passed all test cases!' });
    } else {
      return res.status(400).json({ message: 'Code failed some test cases' });
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
