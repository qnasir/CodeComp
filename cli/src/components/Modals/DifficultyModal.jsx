import './DifficultyModal.css';

const DifficultyModal = ({ isOpen, onClose, onSelect }) => {
  const difficulties = ['Easy', 'Medium', 'Hard'];

  if (!isOpen) return null;

  const handleSelect = async (difficulty) => {
    try {
      // Send POST request to the backend
      const response = await fetch('http://your-backend-url/api/get-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({
          difficulty, // Send the selected difficulty level
          userId: 'userId' // Replace with actual user ID if needed
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Assuming the question is returned in data.question
      onSelect(data.question); // Pass the question back to the parent component
      onClose();
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
