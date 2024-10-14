import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ result }) => {
  // Handle cases where result or result.testCases is undefined or null
  console.log(result);
  console.log(result.testCases);
  if (!result || !result.testCases || !Array.isArray(result.testCases)) {
    return <div className="result-display">No test case results available.</div>;
  }

  return (
    <div className="result-display">
      <h3>Test Case Results</h3>
      <ul>
        {result.testCases.map((test, index) => (
          <li key={index} className={test.passed ? 'passed' : 'failed'}>
            <strong>Test {index + 1}:</strong> {test.passed ? 'Passed' : 'Failed'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultDisplay;
