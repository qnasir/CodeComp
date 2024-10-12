import './SelectDifficulty.css'; 

const SelectDifficulty = () => {
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="select-difficulty-page">
      <h1>Select Difficulty Level</h1>
      <div className="difficulty-options">
        {difficulties.map((level) => (
          <button key={level} className="difficulty-button">
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectDifficulty;
