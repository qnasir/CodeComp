const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // The coding question text
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true }, // Difficulty level
  testCases: [testCaseSchema], // List of test cases for the question
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
