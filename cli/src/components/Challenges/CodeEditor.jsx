import { useState } from 'react';
import { MonacoEditor } from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor = ({ questionId }) => {
  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/code/submit', {
        questionId,
        userCode: code,
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };

  return (
    <div>
      <MonacoEditor
        height="400"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value)}
      />
      <button onClick={handleSubmit}>Submit Code</button>
    </div>
  );
};

export default CodeEditor;
