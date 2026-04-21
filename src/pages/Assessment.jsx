import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Assessment.css';

const MOCK_QUESTIONS = [
  {
    id: 1,
    type: 'mcq',
    question: 'A train 120 meters long is running with a speed of 60 km/hr. In what time will it pass a boy who is running at 6 km/hr in the direction opposite to that in which the train is going?',
    options: ['6.54 sec', '6.8 sec', '7.2 sec', '7.4 sec'],
    answer: 1 // index 1 is '6.54 sec'
  },
  {
    id: 2,
    type: 'coding',
    question: 'Write a function to return the nth number in the Fibonacci sequence. The function should run in O(n) time complexity.',
    initialCode: 'function getFibonacci(n) {\n  // Write your code here\n  \n}'
  }
];

const Assessment = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [code, setCode] = useState(MOCK_QUESTIONS[1].initialCode);

  const question = MOCK_QUESTIONS[currentQ];

  const handleNext = () => {
    if (currentQ < MOCK_QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
    } else {
      alert('Assessment Submitted! Analyzing your weak topics...');
      navigate('/dashboard');
    }
  };

  return (
    <div className="assessment-container slide-in">
      <div className="assessment-header">
        <div>
          <h2>TCS NQT Simulation - {assessmentId}</h2>
          <span className="timer">Time Remaining: 44:12</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${((currentQ + 1) / MOCK_QUESTIONS.length) * 100}%` }}></div>
        </div>
        <span className="question-count">Question {currentQ + 1} of {MOCK_QUESTIONS.length}</span>
      </div>

      <div className="assessment-content">
        <div className="question-panel">
          <h3>Problem Statement</h3>
          <p>{question.question}</p>
        </div>

        <div className="interaction-panel">
          {question.type === 'mcq' ? (
            <div className="mcq-options">
              {question.options.map((opt, idx) => (
                <button 
                  key={idx} 
                  className={`option-btn ${selectedOption === idx ? 'selected' : ''}`}
                  onClick={() => setSelectedOption(idx)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="coding-workspace">
              <div className="editor-header">
                <span>Code Editor (JavaScript)</span>
                <button className="run-code-btn">Run Code</button>
              </div>
              <textarea 
                className="code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
              />
              <div className="output-console">
                <span>Console Output</span>
                <div className="console-area">
                  {/* Mock empty output */}
                  <br/>&gt; Run your code to see output here.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="assessment-footer">
        <button 
           className="btn-secondary" 
           onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
           disabled={currentQ === 0}
        >
          Previous
        </button>
        <button className="btn-primary" onClick={handleNext}>
          {currentQ === MOCK_QUESTIONS.length - 1 ? 'Submit Assessment' : 'Save & Next'}
        </button>
      </div>
    </div>
  );
};

export default Assessment;
