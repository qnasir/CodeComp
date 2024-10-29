import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ResultDisplay.css';

const ResultDisplay = ({ result = [], testCases = [], difficulty }) => {
  // Check for passed test cases
  const totalTests = testCases.length;
  const passedTests = testCases.filter((test, index) => test.expectedOutput === result[index]?.trim()).length;

  const navigate = useNavigate(); // Hook for navigation


  useEffect(() => {
    if (totalTests == passedTests && totalTests > 0) {
      fetchNewQuestion();
    }
  }, totalTests, passedTests);

  const fetchNewQuestion = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/question/get-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          difficulty, // Send the selected difficulty level
          userId: 'userId', // Replace with actual user ID if needed
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { question } = data;
      const { testCases } = data.question;

      // Navigate to the code editor page and pass the question and test cases
      navigate('/code-editor', {
        state: { question, testCases, difficulty }, // Pass the question and test cases to the code editor page
      });

      window.location.reload();

    } catch (err) {
      console.log("Error fetching new question", err)
    }
  }

  return (
    <div className="result-display">
      <h3>Test Case Results</h3>
      <ul>
        {testCases.map((test, index) => {
          // Trim the result for accurate comparison
          const actualOutput = result[index]?.trim();
          const expectedOutput = test.expectedOutput;

          return (
            <li key={index} className={expectedOutput === actualOutput ? 'passed' : 'failed'}>
              <div><strong>Test {index + 1}:</strong> {expectedOutput === actualOutput ? 'Passed' : 'Failed'}</div>
              <div><strong>Expected Output:</strong> {expectedOutput}</div>
              <div><strong>Actual Output:</strong> {actualOutput ?? "No output"}</div>
            </li>
          );
        })}
      </ul>
      <div className="summary">
        {passedTests} out of {totalTests} test cases passed.
      </div>
    </div>
  );
};

export default ResultDisplay;
