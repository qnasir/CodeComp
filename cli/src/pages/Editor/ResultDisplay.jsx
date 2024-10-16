import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result, testCases }) => {
  // Handle cases where result or testCases is undefined or null
  console.log("Result Display ", result);
  console.log("Test Cases Display ", testCases);

  return (
    <div className="result-display">
      <h3>Test Case Results</h3>
      <ul>
        {testCases.map((test, index) => {
          // Trim the result for accurate comparison
          const actualOutput = result[index]?.trim(); // Safely access result[index] and trim it
          const expectedOutput = test.expectedOutput;

          return (
            <li key={index} className={expectedOutput === actualOutput ? 'passed' : 'failed'}>
              <div><strong>Test {index + 1}:</strong> {expectedOutput === actualOutput ? 'Passed' : 'Failed'}</div>
              <div><strong>Expected Output:</strong> {expectedOutput}</div>
              <div><strong>Actual Output:</strong> {actualOutput}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultDisplay;
