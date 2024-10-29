import React, { useEffect, useState } from 'react';
import QuestionDisplay from './Editor/QuestionDisplay';
import TestCaseDisplay from './Editor/TestCaseDisplay';
import CodeEditor from './Editor/CodeEditor';
import LanguageSelector from './Editor/LanguageSelector';
import ResultDisplay from './Editor/ResultDisplay';
import ManualTestCaseInput from './Editor/ManualTestCaseInput';
import { useLocation } from 'react-router-dom';
import './CodingPage.css';
import Spinner from './Editor/Spinner';

const CodingPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(63);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(); // For test case results
  const [manualOutput, setManualOutput] = useState(''); // For manual code run output
  const [manualTestCase, setManualTestCase] = useState(''); // Manual test case input
  const [isRunningTestCases, setIsRunningTestCases] = useState(false); // For showing running status
  const [isManualInputVisible, setIsManualInputVisible] = useState(false); // To toggle visibility of manual test case input
  const [isOutput, setIsOutput] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);


  const location = useLocation();
  const { question, testCases, difficulty } = location.state || {};


  const handleLanguageChange = (language) => {
    const id = getLanguageId(language);
    setSelectedLanguage(id);
  };

  const handleRun = () => {
    setIsManualInputVisible(!isManualInputVisible);
    setIsOutput(false);
    setIsSpinner(false);
    if (isRunningTestCases) setIsRunningTestCases(false); // Hide running status if previously running test cases
  };

  // Handle running code with manual input
  const handleRunCode = async () => {
    setIsManualInputVisible(true); // Show manual input section when the user clicks "Run Code"
    setIsOutput(false);
    setIsSpinner(true);

    try {
      const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '50d52ff9bcmsh9cbc17577107263p18bbeejsn4e76460dddfe',
        },
        body: JSON.stringify({
          source_code: btoa(code), // Encode code to base64
          language_id: selectedLanguage,
          stdin: btoa(manualTestCase), // Encode input to base64
        }),
      });

      const data = await response.json();
      const { token } = data;

      const getResult = async (token) => {
        const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '50d52ff9bcmsh9cbc17577107263p18bbeejsn4e76460dddfe',
          },
        });

        const resultData = await resultResponse.json();
        console.log(resultData);
        if (resultData.status) {
          if (resultData.status.id === 2 || resultData.status.id === 1) {
            // Still processing or compiling
            setTimeout(() => getResult(token), 1000);
          } else if (resultData.status.id === 3) {
            // Accepted, show the output 
            setManualOutput(atob(resultData.stdout)); // Decode output from base64
            setIsSpinner(false);
            setIsOutput(true);
          } else if (resultData.status.id === 6) {
            // Compilation error
            const compileError = atob(resultData.compile_output) || "Compilation Error: The code failed to compile.";
            const formattedError = compileError.replace(/â/g, "'").replace(/â/g, "'").replace(/â€œ/g, '"').replace(/â€/g, '"');
            setManualOutput(`Compilation Error: ${formattedError}`);
            setIsSpinner(false);
            setIsOutput(true);
          } else if (resultData.status.id === 8) {
            // Runtime error
            setManualOutput(atob(resultData.stderr) || "Runtime Error: An error occurred during execution.");
            setIsSpinner(false);
            setIsOutput(true);
          } else {
            // Handle other cases as necessary
            setManualOutput("An unexpected error occurred.");
            setIsSpinner(false);
            setIsOutput(true);
          }
        } else {
          setManualOutput("Error fetching result: " + JSON.stringify(resultData));
          setIsSpinner(false);
        }
      };

      // Start polling for the result after submitting
      getResult(token);
    } catch (error) {
      console.error('Error running code:', error);
      setIsSpinner(false);
    }
  };



  const getLanguageId = (language) => {
    const languageMap = {
      javascript: 63,
      python: 71,
      cpp: 53,
      java: 62,
    };
    return languageMap[language];
  };

  const EvaluateInput = async (input, resultsArray) => {
    try {
      const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '553f78bd17mshcc97847b575ba91p1dd782jsndd8d898be4a0', // replace with your actual API key
        },
        body: JSON.stringify({
          source_code: btoa(code), // Encode code to base64
          language_id: selectedLanguage,
          stdin: btoa(testCases[input].input), // Encode test case input to base64
        }),
      });

      const data = await response.json();
      const { token } = data;

      const getResult = async (token) => {
        let resultData;
        while (true) {
          const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '553f78bd17mshcc97847b575ba91p1dd782jsndd8d898be4a0', // replace with your actual API key
            },
          });

          resultData = await resultResponse.json();

          if (resultData.status) {
            if (resultData.status.id === 2 || resultData.status.id === 1) {
              // Still processing or compiling
              await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            } else {
              break; // Exit the loop once we have a result
            }
          } else {
            throw new Error("Error fetching result: " + JSON.stringify(resultData));
          }
        }

        // Process the final result
        if (resultData.status.id === 3) {
          // Accepted
          const output = atob(resultData.stdout); // Decode base64 to text
          resultsArray[input] = output; // Store the result in the local array at the correct index
        } else if (resultData.status.id === 6) {
          // Compilation error
          const compileError = atob(resultData.compile_output) || "Compilation Error: The code failed to compile.";
          const formattedError = compileError.replace(/â/g, "'").replace(/â/g, "'").replace(/â€œ/g, '"').replace(/â€/g, '"');
          resultsArray[input] = `Compilation Error: ${formattedError}`; // Store error
        } else if (resultData.status.id === 8) {
          // Runtime error
          const runtimeError = atob(resultData.stderr) || "Runtime Error: An error occurred during execution.";
          resultsArray[input] = runtimeError; // Store error
        } else {
          // Handle other cases
          resultsArray[input] = "An unexpected error occurred.";
        }
      };

      // Start polling for the result after submitting
      await getResult(token);
    } catch (error) {
      console.error('Error running code:', error);
      resultsArray[input] = 'Error occurred while running the code.'; // Store error in the right index
    }
  };

  // Handle running the code with predefined test cases
  const handleRunTestCases = async () => {
    setIsManualInputVisible(false);
    setIsSpinner(true);

    const resultsArray = new Array(testCases.length); // Initialize an array with the same length as test cases


    try {
      // Use Promise.all to ensure all test cases are processed concurrently
      await Promise.all(
        testCases.map((_, index) => EvaluateInput(index, resultsArray))
      );

      // Push the resultsArray to the state after all test cases have been processed
      setResult(resultsArray);
    } catch (err) {
      console.log("Error", err);
    } finally {
      setIsSpinner(false);
      setIsRunningTestCases(true); // Set loading to false after completion
    }
  };

  return (
    <div className="coding-page">
      <div className="question-section">
        <QuestionDisplay question={question.text} difficulty={difficulty} />
        <TestCaseDisplay testCases={testCases} />
      </div>

      <div className="editor-section">
        <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
        <CodeEditor language={selectedLanguage} code={code} setCode={setCode} />

        {/* Button section */}
        <div className="button-section">
          <button className="run-code-button" onClick={handleRun}>Run</button>
          <button className="run-test-cases-button" onClick={handleRunTestCases}>Run Test Cases</button>
        </div>

        {/* Manual test case input section appears only after "Run" is clicked */}
        {isManualInputVisible && (
          <div className="run-code-section">
            <ManualTestCaseInput value={manualTestCase} onChange={setManualTestCase} />

            {isOutput ? (
              <div className="manual-output">
                <h4>Output:</h4>
                <p>{manualOutput}</p>
              </div>
            ) : (
              isSpinner && (
                <Spinner />
              )
            )}

            <div className="run-code-button-container">
              <button className='run-code' onClick={handleRunCode}>Run Code</button>
            </div>
          </div>
        )}


        {/* Popup style for loading */}
        {isRunningTestCases && (
          <div className="run-code-section">
            {/* <TestCaseDisplay testCases={testCases} /> */}
            {isSpinner ? <Spinner /> : <ResultDisplay result={result} testCases={testCases} difficulty={difficulty} />}
          </div>
        )}

      </div>

    </div>
  );
};

export default CodingPage;
