import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import Editor from '@monaco-editor/react';
import { COMPANY_INTERVIEW_QUESTIONS } from '../data/companyQuestionsData';

const CompanyQuestions = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [activeConsoleTab, setActiveConsoleTab] = useState('testcase'); // 'testcase' or 'result'
  const [output, setOutput] = useState('');
  const [runStatus, setRunStatus] = useState(null); // 'pending', 'success', 'error'
  const [isExecuting, setIsExecuting] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [customInput, setCustomInput] = useState('');

  const { solvedQuestions, markQuestionSolved } = useData();

  const LANGUAGE_TEMPLATES = {
    javascript: `// JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction solve(input) {\n    // Your logic here\n    // Example: for Unique Paths with input "3 7", return "28"\n    return input;\n}\n\n// Read from stdin\n// const input = fs.readFileSync(0, 'utf8').trim();\n// console.log(solve(input));\n\n// FOR DEMO: \nconsole.log("28"); // Return expected output for Unique Paths`,
    python: `import sys\n\ndef solve(input_data):\n    # Your logic here\n    return input_data\n\nif __name__ == "__main__":\n    # input_str = sys.stdin.read().strip()\n    # print(solve(input_str))\n    print("28") # Sample output`,
    java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // String input = sc.nextLine();\n        System.out.println("28");\n    }\n}`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // string s;\n    // cin >> s;\n    cout << "28" << endl;\n    return 0;\n}`
  };

  const [code, setCode] = useState(LANGUAGE_TEMPLATES['javascript']);

  useEffect(() => {
    setCode(LANGUAGE_TEMPLATES[selectedLanguage]);
  }, [selectedLanguage]);

  const companies = Object.keys(COMPANY_INTERVIEW_QUESTIONS);
  
  const currentQuestions = selectedCompany ? COMPANY_INTERVIEW_QUESTIONS[selectedCompany] : [];
  const filteredQuestions = currentQuestions.filter(q => activeTab === 'all' || q.type === activeTab);

  const handleExecute = async (isSubmit = false) => {
    setIsExecuting(true);
    setRunStatus('pending');
    setActiveConsoleTab('result');
    setOutput('Compiling and executing...');

    const inputToUse = isSubmit ? (activeQuestion.input || '') : customInput;

    try {
      const response = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: selectedLanguage, code, input: inputToUse })
      });
      const data = await response.json();
      const userOutput = data.output ? data.output.trim() : '';
      setOutput(userOutput);
      
      const expected = activeQuestion.output ? activeQuestion.output.trim() : '';

      if (data.success) {
        if (isSubmit) {
            if (userOutput === expected) {
                setRunStatus('success');
                markQuestionSolved(`company-${selectedCompany}-${activeQuestion.id}`);
                setOutput(`✅ Accepted\n\nOutput: ${userOutput}\n\nAll test cases passed!`);
            } else {
                setRunStatus('error');
                setOutput(`❌ Wrong Answer\n\nExpected: ${expected}\nActual: ${userOutput}`);
            }
        } else {
            setRunStatus('success');
            setOutput(`▶ Run Successful\n\nOutput:\n${userOutput}`);
        }
      } else {
        setRunStatus('error');
        setOutput(`⚠️ Execution Error:\n${data.output}`);
      }
    } catch (err) {
      setOutput('Error: Could not connect to execution server.');
      setRunStatus('error');
    } finally {
      setIsExecuting(false);
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'coding': return '#3b82f6';
      case 'conceptual': return '#8b5cf6';
      case 'skills': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflowY: 'auto'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .company-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); cursor: pointer; border-color: var(--brand-primary) !important; }
        .question-row:hover { background: rgba(59,130,246,0.05); transform: translateX(5px); cursor: pointer; }
        .tab-btn { padding: 0.6rem 1.2rem; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-secondary); cursor: pointer; transition: all 0.2s; font-weight: 500; font-size: 0.9rem; color: var(--text-primary); }
        .tab-btn.active { background: var(--brand-primary); color: white; border-color: var(--brand-primary); }
        .console-tab { padding: 0.5rem 1rem; cursor: pointer; border: none; background: transparent; color: var(--text-muted); font-weight: 600; border-bottom: 2px solid transparent; }
        .console-tab.active { color: var(--brand-primary); border-bottom-color: var(--brand-primary); }
        .scroll-container::-webkit-scrollbar { width: 6px; }
        .scroll-container::-webkit-scrollbar-track { background: transparent; }
        .scroll-container::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
      `}</style>

      {/* Header section */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }} className="fade-in">
        <h1 style={{ 
          fontSize: '2.8rem', 
          fontWeight: '900', 
          marginBottom: '0.8rem',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}>
          Elite Interview Intelligence
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>
          Master technical & behavioral challenges from the world's most innovative brands with integrated compiler.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Sidebar: Brand Selector */}
        <div className="scroll-container" style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderRadius: '28px', 
          padding: '1.8rem',
          border: '1px solid var(--border-color)',
          height: 'fit-content',
          position: 'sticky',
          top: '2rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.15rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)' }}>
            👑 Select Brand
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
            {companies.map(c => (
              <div 
                key={c}
                onClick={() => { setSelectedCompany(c); setActiveQuestion(null); setActiveTab('all'); }}
                className="company-card"
                style={{
                  padding: '1.1rem 1rem',
                  borderRadius: '16px',
                  border: `2px solid ${selectedCompany === c ? 'var(--brand-primary)' : 'var(--border-color)'}`,
                  backgroundColor: selectedCompany === c ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-tertiary)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: '1rem',
                  fontWeight: selectedCompany === c ? '800' : '600',
                  color: selectedCompany === c ? 'var(--brand-primary)' : 'var(--text-primary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{c}</span>
                {selectedCompany === c && <span style={{ fontSize: '1.2rem' }}>✨</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="fade-in">
          {!selectedCompany ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '8rem 2rem', 
              background: 'var(--bg-secondary)', 
              borderRadius: '32px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎯</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1rem' }}>Elevate Your Career</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                Choose a company to unlock their most frequent interview questions across coding, system design, and soft skills.
              </p>
            </div>
          ) : !activeQuestion ? (
            /* Questions List View */
            <div className="fade-in" style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: '32px', 
              padding: '2.5rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>🏢</span>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0 }}>{selectedCompany}</h2>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                    Curated interview challenges with integrated compiler testing.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.4rem', borderRadius: '16px' }}>
                  {['all', 'coding', 'conceptual', 'skills'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredQuestions.map(q => (
                  <div 
                    key={q.id} 
                    onClick={() => { setActiveQuestion(q); setCustomInput(q.input || ''); setShowAnswer(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="question-row"
                    style={{
                      padding: '1.5rem',
                      borderRadius: '20px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '14px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: `${getTypeColor(q.type)}15`,
                        color: getTypeColor(q.type),
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {q.type === 'coding' ? '💻' : q.type === 'conceptual' ? '🧠' : '🤝'}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--text-primary)' }}>{q.title}</h4>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: '800', 
                            color: getTypeColor(q.type),
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {q.type}
                          </span>
                          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>•</span>
                          <span style={{ 
                            fontSize: '0.85rem', 
                            color: q.difficulty === 'Hard' ? 'var(--status-error)' : q.difficulty === 'Medium' ? '#f59e0b' : 'var(--status-success)',
                            fontWeight: '700'
                          }}>{q.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      {solvedQuestions.includes(`company-${selectedCompany}-${q.id}`) && (
                        <div style={{ 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '10px', 
                          backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                          color: 'var(--status-success)',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          SOLVED
                        </div>
                      )}
                      <span style={{ fontSize: '1.6rem', color: 'var(--text-tertiary)' }}>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Question Detail View */
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  onClick={() => { setActiveQuestion(null); setRunStatus(null); setOutput(''); }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.6rem', 
                    color: 'var(--brand-primary)',
                    fontWeight: '800',
                    padding: '0.7rem 1.4rem',
                    borderRadius: '16px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  ← Back to {selectedCompany} Questions
                </button>
              </div>

              <div style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: '32px', 
                padding: '2.5rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-2xl)',
                display: 'grid',
                gridTemplateColumns: activeQuestion.type === 'coding' ? '1fr 1.5fr' : '1fr',
                gap: '2rem'
              }}>
                {/* Left Side: Question Info */}
                <div style={{ overflowY: 'auto', maxHeight: '80vh' }} className="scroll-container">
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <span style={{ 
                      padding: '0.5rem 1.2rem', 
                      borderRadius: '12px', 
                      fontSize: '0.85rem', 
                      fontWeight: '800', 
                      backgroundColor: `${getTypeColor(activeQuestion.type)}15`, 
                      color: getTypeColor(activeQuestion.type),
                      textTransform: 'uppercase'
                    }}>
                      {activeQuestion.type}
                    </span>
                    <span style={{ 
                      color: activeQuestion.difficulty === 'Hard' ? 'var(--status-error)' : activeQuestion.difficulty === 'Medium' ? '#f59e0b' : 'var(--status-success)',
                      fontWeight: '800',
                      fontSize: '0.95rem'
                    }}>
                      {activeQuestion.difficulty}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem' }}>{activeQuestion.title}</h2>
                  
                  <div style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.7', 
                    color: 'var(--text-secondary)', 
                    background: 'var(--bg-tertiary)', 
                    padding: '1.5rem', 
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '2rem',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {activeQuestion.statement || activeQuestion.description}
                  </div>

                  {activeQuestion.type === 'coding' && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '800' }}>Example Case:</h4>
                      <div style={{ background: '#0b0e14', padding: '1.2rem', borderRadius: '16px', border: '1px solid #1a1f26', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                        <div style={{ marginBottom: '0.8rem' }}>
                           <span style={{ color: '#6b7280' }}>// Input:</span><br/>
                           <span style={{ color: '#34d399' }}>{activeQuestion.input || 'N/A'}</span>
                        </div>
                        <div>
                           <span style={{ color: '#6b7280' }}>// Expected Output:</span><br/>
                           <span style={{ color: '#8b5cf6' }}>{activeQuestion.output || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeQuestion.type !== 'coding' && showAnswer && (
                    <div className="fade-in" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                         <h4 style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }}>Model Answer</h4>
                         <p style={{ lineHeight: '1.7' }}>{activeQuestion.answer}</p>
                    </div>
                  )}
                  
                  {activeQuestion.type !== 'coding' && !showAnswer && (
                    <button 
                        onClick={() => setShowAnswer(true)}
                        style={{ padding: '1rem 3rem', borderRadius: '20px', background: 'var(--brand-primary)', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer' }}
                    >
                        Reveal Answer
                    </button>
                  )}
                </div>

                {/* Right Side: Compiler (Only for coding) */}
                {activeQuestion.type === 'coding' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#1e1e1e' }}>
                      <div style={{ padding: '0.8rem 1.5rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <select 
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                         >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                         </select>
                      </div>
                      <div style={{ height: '400px' }}>
                        <Editor
                          theme="vs-dark"
                          language={selectedLanguage}
                          value={code}
                          onChange={setCode}
                          options={{ fontSize: 14, minimap: { enabled: false }, padding: { top: 16 } }}
                        />
                      </div>
                    </div>

                    {/* Console Area */}
                    <div style={{ background: 'var(--bg-tertiary)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                       <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                          <button 
                            className={`console-tab ${activeConsoleTab === 'testcase' ? 'active' : ''}`}
                            onClick={() => setActiveConsoleTab('testcase')}
                          >
                            ☑ Testcase
                          </button>
                          <button 
                            className={`console-tab ${activeConsoleTab === 'result' ? 'active' : ''}`}
                            onClick={() => setActiveConsoleTab('result')}
                          >
                            ↻ Result
                          </button>
                       </div>
                       <div style={{ padding: '1rem', flex: 1, minHeight: '150px', maxHeight: '250px', overflowY: 'auto' }} className="scroll-container">
                          {activeConsoleTab === 'testcase' ? (
                            <div>
                               <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Custom Input:</p>
                               <textarea 
                                  value={customInput}
                                  onChange={(e) => setCustomInput(e.target.value)}
                                  style={{ width: '100%', minHeight: '80px', background: '#0b0e14', color: '#34d399', border: '1px solid #1a1f26', borderRadius: '12px', padding: '1rem', fontFamily: 'monospace' }}
                               />
                            </div>
                          ) : (
                            <div>
                               {output ? (
                                 <pre style={{ 
                                    margin: 0, 
                                    whiteSpace: 'pre-wrap', 
                                    fontFamily: 'monospace', 
                                    fontSize: '0.95rem',
                                    color: runStatus === 'success' ? '#10b981' : runStatus === 'error' ? '#ef4444' : '#fff'
                                 }}>
                                   {output}
                                 </pre>
                               ) : (
                                 <p style={{ color: 'var(--text-muted)' }}>Run your code to see results here.</p>
                               )}
                            </div>
                          )}
                       </div>
                    </div>

                    {/* Bottom Actions */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                       <button 
                         onClick={() => handleExecute(false)}
                         disabled={isExecuting}
                         style={{ padding: '0.8rem 2rem', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontWeight: 'bold', cursor: 'pointer' }}
                       >
                         Run
                       </button>
                       <button 
                         onClick={() => handleExecute(true)}
                         disabled={isExecuting}
                         style={{ padding: '0.8rem 3rem', borderRadius: '16px', border: 'none', background: 'var(--status-success)', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
                       >
                         {isExecuting ? '...' : 'Submit'}
                       </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyQuestions;
