const Question = require('../models/Question');

// Controller to post a new question
exports.addQuestion = async (req, res) => {
  try {
    const { text, difficulty, testCases } = req.body;

    // Validate the input
    if (!text || !difficulty || !testCases || !Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ error: 'Invalid input. Please provide question text, difficulty, and test cases.' });
    }

    // Create a new question
    const newQuestion = new Question({
      text,
      difficulty,
      testCases,
    });

    // Save the question to the database
    await newQuestion.save();

    res.status(201).json({ message: 'Question added successfully', question: newQuestion });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to fetch a random question
exports.getQuestion = async (req, res) => {
  try {
    const { difficulty } = req.body;

    // Find a random question from the database with the specified difficulty level
    const questions = await Question.find({ difficulty });

    if (questions.length === 0) {
      return res.status(404).json({ error: 'No questions available for this difficulty level' });
    }

    // Pick a random question from the list
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];

    res.status(200).json({
      question: {
        id: selectedQuestion._id,
        text: selectedQuestion.text,
        difficulty: selectedQuestion.difficulty,
        testCases: selectedQuestion.testCases,
      },
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to evaluate the user's code
exports.evaluateCode = async (req, res) => {
  try {
    const { code, language, questionId, testCases } = req.body;

    // Simulate running the code and checking against test cases (you can replace this with a real evaluator)
    const results = testCases.map((testCase) => {
      // For each test case, we assume that code execution happens here.
      // For demo purposes, this part is hardcoded as 'pass' (you'll need a proper evaluator).
      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: testCase.expectedOutput, // This should be the real output from the code
        passed: true, // Hardcoded, in real scenarios this will depend on code output matching the expected output
      };
    });

    res.status(200).json({
      success: true,
      results, // Test case results
    });
  } catch (error) {
    console.error('Error evaluating code:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
