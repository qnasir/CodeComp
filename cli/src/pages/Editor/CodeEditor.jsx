import React from 'react';
import CodeMirror from '@uiw/react-codemirror'; // Use the Controlled component
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import './CodeEditor.css';

const CodeEditor = ({ code, setCode }) => {
  return (
    <div className="code-editor">
      <CodeMirror
        value={code} // This is the code value
        height="400px" // Adjust height as necessary
        theme={oneDark} // Use the oneDark theme
        extensions={[javascript()]} // Add language extensions
        onChange={(value) => setCode(value)} // Update code on change
      />
    </div>
  );
};

export default CodeEditor;
