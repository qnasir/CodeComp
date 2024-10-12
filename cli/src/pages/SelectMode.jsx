import { useState } from 'react';
import './SelectMode.css';
import DifficultyModal from '../components/Modals/DifficultyModal';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const SelectMode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const handleModeSelect = (mode) => {
    if (mode === 'Practice') {
      setIsModalOpen(true); // Open modal for practice mode
    } else {
      console.log(`Selected mode: ${mode}`);
      // Add logic for Battle mode if needed
    }
  };

  const handleQuestionSelect = (question) => {
    // Navigate to the code editor page and pass the question
    history.push({
      pathname: '/code-editor',
      state: { question } // Pass the selected question to the code editor
    });
  };

  return (
    <div className="select-mode-page">
      <h1>Select Mode</h1>
      <p>Please select a mode to continue:</p>
      <div className="mode-options">
        {['Practice', 'Battle'].map((mode) => (
          <button
            key={mode}
            className="mode-button"
            onClick={() => handleModeSelect(mode)}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Modal for Difficulty Selection */}
      <DifficultyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleQuestionSelect} // Update to use new function
      />
    </div>
  );
};

export default SelectMode;
