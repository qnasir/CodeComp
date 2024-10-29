import React from 'react';
import './QuestionDisplay.css';
import { useNavigate } from 'react-router-dom';

const QuestionDisplay = ({ question, difficulty }) => {

  const navigate = useNavigate();


  const handleSkip = async () => {
    try {
      // Send POST request to the backend
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

    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };


  return (
    <div className="question-display">
      <div className='skip'>
        <h2>Problem Statement</h2>
        <h3 onClick={() => handleSkip()}>SKIP</h3>
      </div>
      <p>{question}</p>
    </div>
  );
};

export default QuestionDisplay;
