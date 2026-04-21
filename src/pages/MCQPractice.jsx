import React, { useState, useEffect } from 'react';
import { MCQ_DATA } from '../data/mcqData';

const MCQPractice = () => {
  const [mcqs, setMcqs] = useState(MCQ_DATA || []);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const topics = Array.from(new Set(mcqs.map(m => m.topic)));

  const handleSyncQuestions = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=20&category=18&type=multiple');
      const data = await response.json();
      
      if (data.results) {
        const newMcqs = data.results.map((item, index) => ({
          id: `sync-${Math.random().toString(36).substr(2, 9)}`,
          topic: "Technical Core",
          question: item.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&"),
          options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5).map(o => o.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&")),
          answer: item.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&"),
          difficulty: item.difficulty || "Medium"
        }));
        
        const existingTexts = new Set(mcqs.map(m => m.question));
        const uniqueNew = newMcqs.filter(m => !existingTexts.has(m.question));
        setMcqs([...mcqs, ...uniqueNew]);
      }
    } catch (err) {
      console.warn("Sync failed:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setScore(null);
  };

  const handleAnswerSelect = (qId, option) => {
    setUserAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleDisplayResult = () => {
    const currentQuestions = mcqs.filter(m => !selectedTopic || m.topic === selectedTopic);
    let correctCount = 0;
    currentQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) {
        correctCount++;
      }
    });
    setScore({
      correct: correctCount,
      total: currentQuestions.length
    });
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>MCQ Practice</h1>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ flex: '1' }}>
          <h3>Topics</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {topics.map(topic => (
              <li key={topic} style={{ margin: '0.5rem 0' }}>
                <button 
                  onClick={() => { setSelectedTopic(topic); setScore(null); }}
                  style={{ 
                    padding: '0.7rem 1rem', 
                    width: '100%', 
                    textAlign: 'left',
                    background: selectedTopic === topic ? 'var(--brand-primary)' : 'var(--bg-tertiary)',
                    color: selectedTopic === topic ? '#fff' : 'inherit',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{topic}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7, background: 'rgba(0,0,0,0.1)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>
                    {mcqs.filter(m => m.topic === topic).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '3' }}>
          {selectedTopic ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>{selectedTopic} Questions ({mcqs.filter(m => m.topic === selectedTopic).length})</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={resetQuiz}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem' }}
                  >
                    🗑️ Clear Answers
                  </button>
                  <button 
                    onClick={handleSyncQuestions}
                    disabled={isSyncing}
                    style={{ background: 'var(--brand-secondary)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem' }}
                  >
                    {isSyncing ? "Syncing..." : "🔄 Sync Technical"}
                  </button>
                </div>
              </div>

              {score === null ? (
                <div>
                  {mcqs.filter(m => !selectedTopic || m.topic === selectedTopic).map((q, i) => (
                    <div key={q.id || i} style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--brand-primary)', boxShadow: 'var(--shadow-sm)' }}>
                      <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}><strong>Q{i + 1}.</strong> {q.question}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {q.options.map(opt => (
                          <label 
                            key={opt} 
                            style={{ 
                              cursor: 'pointer', 
                              padding: '1rem', 
                              background: userAnswers[q.id] === opt ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-tertiary)', 
                              borderRadius: '8px', 
                              border: userAnswers[q.id] === opt ? '2px solid var(--brand-primary)' : '2px solid transparent',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.8rem'
                            }}
                          >
                            <input 
                              type="radio" 
                              name={`q${q.id}`} 
                              value={opt} 
                              checked={userAnswers[q.id] === opt}
                              onChange={() => handleAnswerSelect(q.id, opt)}
                              style={{ transform: 'scale(1.2)' }}
                            /> {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                    <button className="action-button" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }} onClick={handleDisplayResult}>Submit Quiz</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '12px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{score.correct > score.total / 2 ? '🎉' : '📚'}</div>
                  <h2>Assessment Result</h2>
                  <p style={{ fontSize: '3rem', color: 'var(--status-success)', fontWeight: 'bold', margin: '1rem 0' }}>{score.correct} / {score.total}</p>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Percentage: {Math.round((score.correct / score.total) * 100)}%</p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="outline-button" onClick={() => { setScore(null); setUserAnswers({}); }}>Retake Topic</button>
                    <button className="action-button" onClick={() => { setSelectedTopic(''); setScore(null); }}>Practice Another Topic</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
              <p>Select a topic to load questions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQPractice;
