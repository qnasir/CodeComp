import './DifficultyModal.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const DifficultyModal = ({ isOpen, onClose }) => {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const navigate = useNavigate(); // Hook for navigation

  if (!isOpen) return null;

  const handleSelect = async (difficulty) => {
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
      console.log(data);
      const { question } = data;
      const { testCases } = data.question;
      console.log(question);
      console.log(testCases);

      // Navigate to the code editor page and pass the question and test cases
      navigate('/code-editor', {
        state: { question, testCases, difficulty }, // Pass the question and test cases to the code editor page
      });

      onClose(); // Close the modal after selection
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select Difficulty Level</h2>
        <div className="difficulty-options">
          {difficulties.map((level) => (
            <button
              key={level}
              className="difficulty-button"
              onClick={() => handleSelect(level)}
            >
              {level}
            </button>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DifficultyModal;
