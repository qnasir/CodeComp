import React from 'react';
import './QuestionDisplay.css';

const QuestionDisplay = ({ question }) => {
  return (
    <div className="question-display">
      <h2>Problem Statement</h2>
      <p>{question}</p>
    </div>
  );
};

export default QuestionDisplay;
