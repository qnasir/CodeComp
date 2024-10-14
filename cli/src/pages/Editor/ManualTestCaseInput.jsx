import './ManualTestCaseInput.css'

const ManualTestCaseInput = ({ value, onChange }) => {
  return (
      <div className="manual-test-case-input">
          <label>Enter the Input:</label>
          <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter test case"
              rows="1" // Set initial rows to 1 for compact height
              className="manual-textarea" // Added a class for specific styling
          />
      </div>
  );
};

export default ManualTestCaseInput;

