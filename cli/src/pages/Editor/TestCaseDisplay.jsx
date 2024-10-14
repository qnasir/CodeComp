import React from 'react';
import './TestCaseDisplay.css';

const TestCaseDisplay = ({ testCases }) => {
  return (
    <div className="testcase-display">
      <h3>Test Cases</h3>
      <ul>
        {testCases.map((testCase, index) => (
          <li key={index}>
            <strong>Input:</strong> {testCase.input}, <strong>Expected Output:</strong> {testCase.expectedOutput}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestCaseDisplay;
