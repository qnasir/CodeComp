import { useLocation } from 'react-router-dom';
import './CodeEditor.css'; // Add your styles here

const CodeEditor = () => {
  const location = useLocation();
  const { question } = location.state || {}; // Get question from state

  return (
    <div className="code-editor-page">
      <h1>Code Editor</h1>
      <div className="question-display">
        <h2>Question:</h2>
        <p>{question}</p>
      </div>
      {/* Here you can add a code editor component or a textarea for user input */}
      <textarea className="code-input" placeholder="Write your code here..."></textarea>
      <button className="submit-button">Submit</button>
    </div>
  );
};

export default CodeEditor;
