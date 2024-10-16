import Editor from "@monaco-editor/react";
import './CodeEditor.css'

const CodeEditor = ({code, setCode, language}) => {
  const getLanguageName = (language) => {
    const languageMap = {
      63: 'javascript',
      71: 'python',
      53: 'cpp',
      62: 'java',
    };
    return languageMap[language];
  };

  const editorOptions = {
    fontSize: 15,
    wordWrap: 'off',
  }

  return (
    <div className="code-editor">
      <Editor
        height={"460px"}
        language={getLanguageName(language)}
        value={code}
        onChange={(value) => setCode(value)}
        options={editorOptions}
        theme={'vs-dark'}
      />
    </div>
  )
}

export default CodeEditor;
