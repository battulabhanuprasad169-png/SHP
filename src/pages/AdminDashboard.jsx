import { useState } from 'react';
import './AdminDashboard.css';
import { useData } from '../context/DataContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    codingQuestions, addCodingQuestion, editCodingQuestion, userStats, contestData, publishContest,
    mcqs, addMcq, companies, addCompany, addCompanyQuestion 
  } = useData();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  
  // MCQ Form State
  const [mcqTopic, setMcqTopic] = useState('');
  const [mcqQ, setMcqQ] = useState('');
  const [mcqOpts, setMcqOpts] = useState({ A: '', B: '', C: '', D: '' });
  const [mcqAns, setMcqAns] = useState('A');

  const handleMCQSubmit = (e) => {
    e.preventDefault();
    addMcq({
        topic: mcqTopic,
        question: mcqQ,
        options: [mcqOpts.A, mcqOpts.B, mcqOpts.C, mcqOpts.D],
        correctAnswer: mcqAns
    });
    alert('MCQ Added to Global Practice!');
    setMcqTopic(''); setMcqQ(''); setMcqOpts({ A: '', B: '', C: '', D: '' });
  };

  // Company Form State
  const [newCompanyName, setNewCompanyName] = useState('');
  const [compQType, setCompQType] = useState('coding'); // 'coding' or 'conceptual'
  const [compCodingData, setCompCodingData] = useState({ title: '', statement: '', input: '', output: '' });
  const [compMcqData, setCompMcqData] = useState({ q: '', A: '', B: '', C: '', D: '', ans: 'A' });

  const handleAddCompanyAction = (e) => {
    e.preventDefault();
    if (!newCompanyName) return;
    addCompany(newCompanyName);
    setNewCompanyName('');
    alert('Company Profile Created!');
  };

  const handleAddCompQuestion = (e) => {
    e.preventDefault();
    if (compQType === 'coding') {
        addCompanyQuestion(selectedCompanyId, 'coding', compCodingData);
        setCompCodingData({ title: '', statement: '', input: '', output: '' });
    } else {
        addCompanyQuestion(selectedCompanyId, 'conceptual', {
            question: compMcqData.q,
            options: [compMcqData.A, compMcqData.B, compMcqData.C, compMcqData.D],
            answer: compMcqData.ans
        });
        setCompMcqData({ q: '', A: '', B: '', C: '', D: '', ans: 'A' });
    }
    alert('Question Added to Company Profile!');
  };

  // Coding Qs Form State
  const [cqTopic, setCqTopic] = useState('');
  const [cqStatement, setCqStatement] = useState('');
  const [cqInput, setCqInput] = useState('');
  const [cqOutput, setCqOutput] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleEditClick = (q) => {
    setCqTopic(q.topic);
    setCqStatement(q.statement);
    setCqInput(q.input);
    setCqOutput(q.output);
    setEditingId(q.id);
  };

  const handleAddCodingQuestion = (e) => {
    e.preventDefault();
    if (editingId) {
      editCodingQuestion(editingId, {
        topic: cqTopic,
        statement: cqStatement,
        input: cqInput,
        output: cqOutput
      });
      alert('Coding Question Updated successfully!');
      setEditingId(null);
    } else {
      addCodingQuestion({
        topic: cqTopic,
        statement: cqStatement,
        input: cqInput,
        output: cqOutput
      });
      alert('Coding Question Added successfully to the Application!');
    }
    setCqTopic('');
    setCqStatement('');
    setCqInput('');
    setCqOutput('');
  };

  return (
    <div className="admin-container slide-in">
      <aside className="admin-sidebar">
        <h3>Admin Portal</h3>
        <nav>
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => { setActiveTab('overview'); setSelectedStudent(null); }}>
            📊 Dashboard
          </button>
          <button className={activeTab === 'add-coding' ? 'active' : ''} onClick={() => { setActiveTab('add-coding'); setSelectedStudent(null); }}>
            💻 Add Coding Qs
          </button>
          <button className={activeTab === 'add-mcq' ? 'active' : ''} onClick={() => { setActiveTab('add-mcq'); setSelectedStudent(null); }}>
            📝 Add MCQs
          </button>
          <button className={activeTab === 'manage-contests' ? 'active' : ''} onClick={() => { setActiveTab('manage-contests'); setSelectedStudent(null); }}>
            ⏰ Manage Contests
          </button>
          <button className={activeTab === 'add-company' ? 'active' : ''} onClick={() => { setActiveTab('add-company'); setSelectedStudent(null); }}>
            🏢 Add Company Qs
          </button>
          <button className={activeTab === 'check-score' ? 'active' : ''} onClick={() => { setActiveTab('check-score'); setSelectedStudent(null); }}>
            🏆 Check Scores
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        {activeTab === 'overview' && (
          <div className="admin-overview">
            <header className="admin-header">
              <h2>Platform Analytics</h2>
              <p>Top-level metrics across all active students.</p>
            </header>
            
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <span className="stat-number">{userStats.submitted > 0 ? 1 : 0}</span>
                <span className="stat-label">Active Students</span>
              </div>
              <div className="admin-stat-card">
                <span className="stat-number">{userStats.contestsDone || 0}</span>
                <span className="stat-label">Contests Completed</span>
              </div>
              <div className="admin-stat-card">
                <span className="stat-number">{userStats.rating}</span>
                <span className="stat-label">Avg. Hiring Score</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add-coding' && (
          <div className="content-inserter">
            <header className="admin-header">
              <h2>{editingId ? "Edit Coding Question" : "Add Coding Questions"}</h2>
              <p>{editingId ? "Modify an existing question statement and testcases." : "Add new coding problems to the general practice section."}</p>
            </header>
            <form className="admin-form" onSubmit={handleAddCodingQuestion}>
               <div className="form-group">
                 <label>Topic Name (e.g., Arrays, Trees)</label>
                 <input type="text" className="admin-input" value={cqTopic} onChange={e => setCqTopic(e.target.value)} required />
               </div>
               <div className="form-group">
                 <label>Problem Statement</label>
                 <textarea className="admin-input textarea" rows="4" value={cqStatement} onChange={e => setCqStatement(e.target.value)} required></textarea>
               </div>
               <div className="form-group">
                 <label>Sample Inputs</label>
                 <textarea className="admin-input textarea" rows="2" value={cqInput} onChange={e => setCqInput(e.target.value)} required></textarea>
               </div>
               <div className="form-group">
                 <label>Expected Outputs</label>
                 <textarea className="admin-input textarea" rows="2" value={cqOutput} onChange={e => setCqOutput(e.target.value)} required></textarea>
               </div>
               <div style={{ display: 'flex', gap: '1rem' }}>
                 <button type="submit" className="admin-submit-btn">{editingId ? "Update Question" : "Add Coding Question"}</button>
                 {editingId && (
                   <button type="button" className="admin-outline-btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => {
                     setEditingId(null);
                     setCqTopic(''); setCqStatement(''); setCqInput(''); setCqOutput('');
                   }}>Cancel Edit</button>
                 )}
               </div>
            </form>

            <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
               <h3>Manage Existing Questions</h3>
               <p style={{ color: 'var(--text-muted)' }}>Click 'Edit' to pull a question's data into the form above.</p>
               {codingQuestions.length === 0 ? (
                  <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>No questions added yet.</p>
               ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {codingQuestions.map(q => (
                       <div key={q.id} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: editingId === q.id ? '2px solid var(--brand-primary)' : '1px solid var(--border-color)' }}>
                          <div>
                             <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>{q.topic}</h4>
                             <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>{q.statement.substring(0, 60)}...</p>
                          </div>
                          <button className="admin-outline-btn" onClick={() => handleEditClick(q)} style={{ padding: '0.5rem 1rem' }}>Edit</button>
                       </div>
                    ))}
                  </div>
               )}
            </div>
          </div>
        )}

        {activeTab === 'add-mcq' && (
          <div className="content-inserter">
            <header className="admin-header">
              <h2>Add Global MCQs</h2>
              <p>These questions will appear in the general MCQ / Roadmap sections.</p>
            </header>
            <form className="admin-form" onSubmit={handleMCQSubmit}>
               <div className="form-group">
                 <label>Topic (e.g., JAVA, Python, DS)</label>
                 <input type="text" className="admin-input" value={mcqTopic} onChange={e => setMcqTopic(e.target.value)} required />
               </div>
               <div className="form-group">
                 <label>Question Text</label>
                 <textarea className="admin-input textarea" rows="3" value={mcqQ} onChange={e => setMcqQ(e.target.value)} required></textarea>
               </div>
               <div className="form-group">
                 <label>Options</label>
                 <div className="options-editor" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input type="text" className="admin-input" placeholder="Option A" value={mcqOpts.A} onChange={e => setMcqOpts({ ...mcqOpts, A: e.target.value })} required />
                    <input type="text" className="admin-input" placeholder="Option B" value={mcqOpts.B} onChange={e => setMcqOpts({ ...mcqOpts, B: e.target.value })} required />
                    <input type="text" className="admin-input" placeholder="Option C" value={mcqOpts.C} onChange={e => setMcqOpts({ ...mcqOpts, C: e.target.value })} required />
                    <input type="text" className="admin-input" placeholder="Option D" value={mcqOpts.D} onChange={e => setMcqOpts({ ...mcqOpts, D: e.target.value })} required />
                 </div>
               </div>
               <div className="form-group">
                 <label>Correct Answer Letter</label>
                 <select className="admin-input" value={mcqAns} onChange={e => setMcqAns(e.target.value)} style={{ width: '150px' }}>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                 </select>
               </div>
               <button type="submit" className="admin-submit-btn">💾 Add Global MCQ</button>
            </form>

            <div style={{ marginTop: '2rem' }}>
               <h3>Live MCQ Count: {mcqs.length}</h3>
            </div>
          </div>
        )}

        {activeTab === 'manage-contests' && (
          <div className="content-inserter">
            <header className="admin-header">
              <h2>Build & Manage Contest</h2>
              <p>Configure contest title and build the question set for students.</p>
            </header>
            
            <div className="admin-form">
               <div className="form-group">
                 <label>Contest Title</label>
                 <input 
                    type="text" 
                    className="admin-input" 
                    placeholder="e.g., Spring Hiring Challenge 2026"
                    value={contestData.title} 
                    onChange={e => publishContest({...contestData, title: e.target.value})} 
                 />
               </div>
               <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Contest Duration (Minutes)</label>
                  <input 
                     type="number" 
                     className="admin-input" 
                     placeholder="e.g., 120"
                     value={contestData.durationMinutes || 120} 
                     onChange={e => publishContest({...contestData, durationMinutes: parseInt(e.target.value) || 120})} 
                  />
               </div>

               <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', margin: '2rem 0' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Step 1: Add a Problem</h3>
                  <div className="form-group">
                    <label>Problem Title</label>
                    <input type="text" id="contest_q_title" className="admin-input" placeholder="e.g., Maximum Subarray Sum" />
                  </div>
                  <div className="form-group">
                    <label>Problem Statement</label>
                    <textarea id="contest_q_statement" className="admin-input textarea" rows="4"></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Sample Input</label>
                      <textarea id="contest_q_input" className="admin-input textarea" rows="2"></textarea>
                    </div>
                    <div className="form-group">
                      <label>Expected Output</label>
                      <textarea id="contest_q_output" className="admin-input textarea" rows="2"></textarea>
                    </div>
                  </div>
                  <button 
                    className="admin-submit-btn" 
                    style={{ background: 'var(--brand-primary)', marginTop: '1rem' }}
                    onClick={() => {
                        const t = document.getElementById('contest_q_title');
                        const s = document.getElementById('contest_q_statement');
                        const i = document.getElementById('contest_q_input');
                        const o = document.getElementById('contest_q_output');
                        
                        if (!t.value || !s.value) {
                            alert("Please enter at least Title and Statement");
                            return;
                        }

                        const newQ = { title: t.value, statement: s.value, input: i.value, output: o.value };
                        publishContest({ ...contestData, questions: [...contestData.questions, newQ] });
                        
                        // Clear for next
                        t.value = ''; s.value = ''; i.value = ''; o.value = '';
                        alert("Problem Saved to Contest Draft! Add more or submit to students below.");
                    }}
                  >💾 Save & Add Next Question</button>
               </div>
               
               <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Current Contest Questions ({contestData.questions.length})
                    <span style={{ fontSize: '0.9rem', color: contestData.isActive ? 'var(--status-success)' : 'var(--status-error)' }}>
                        Status: {contestData.isActive ? "● LIVE" : "○ DRAFT"}
                    </span>
                  </h3>
                  {contestData.questions.length === 0 ? (
                    <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No questions added to this contest yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                        {contestData.questions.map((q, idx) => (
                          <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center animate-fade-in' }}>
                             <div>
                                <strong>{idx + 1}. {q.title}</strong>
                                <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{q.statement.substring(0, 50)}...</p>
                             </div>
                             <button 
                                className="admin-outline-btn" 
                                style={{ color: 'var(--status-error)', borderColor: 'var(--status-error)', padding: '0.4rem 0.8rem' }}
                                onClick={() => {
                                    const newQs = contestData.questions.filter((_, i) => i !== idx);
                                    publishContest({...contestData, questions: newQs});
                                }}
                             >Remove</button>
                          </div>
                        ))}
                    </div>
                  )}
               </div>

               <div style={{ marginTop: '3rem', borderTop: '2px dashed var(--border-color)', paddingTop: '2rem', textAlign: 'center' }}>
                  {!contestData.isActive ? (
                      <div>
                        <h3>Ready to Launch?</h3>
                        <p style={{ marginBottom: '1.5rem' }}>Once you submit, the contest will be visible to all logged-in students.</p>
                        <button 
                            className="admin-submit-btn" 
                            style={{ background: 'var(--status-success)', padding: '1rem 3rem', fontSize: '1.2rem' }}
                            onClick={() => {
                                if (contestData.questions.length === 0) {
                                    alert("Add at least one question before publishing!");
                                    return;
                                }
                                publishContest({ ...contestData, isActive: true, startTime: Date.now() });
                                alert("Contest is now LIVE for all students!");
                            }}
                        >🚀 Submit to Students (Go Live)</button>
                      </div>
                  ) : (
                      <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--status-error)' }}>
                        <h3 style={{ color: 'var(--status-error)' }}>Contest is Currently Live!</h3>
                        <p>Students are currently participating. Stopping the contest will hide it from the arena.</p>
                        <button 
                            className="admin-submit-btn" 
                            style={{ background: 'var(--status-error)', marginTop: '1.5rem' }}
                            onClick={() => {
                                publishContest({ ...contestData, isActive: false });
                                alert("Contest has been stopped and moved to draft.");
                            }}
                        >⛔ End Contest & Stop Participation</button>
                      </div>
                  )}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'add-company' && (
          <div className="content-inserter">
            <header className="admin-header">
              <h2>Company Nexus Management</h2>
              <p>Add new hiring companies and build their selective question banks.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                <aside style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Create Company</h3>
                    <form onSubmit={handleAddCompanyAction}>
                        <input 
                          type="text" 
                          className="admin-input" 
                          placeholder="e.g. Google" 
                          value={newCompanyName}
                          onChange={e => setNewCompanyName(e.target.value)}
                          required 
                        />
                        <button type="submit" className="admin-submit-btn" style={{ marginTop: '0.5rem', width: '100%' }}>Add Profile</button>
                    </form>

                    <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Select Profile</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {companies.map(c => (
                            <button 
                                key={c.id} 
                                onClick={() => setSelectedCompanyId(c.id)}
                                className={`admin-outline-btn ${selectedCompanyId === c.id ? 'active-comp' : ''}`}
                                style={{ 
                                    textAlign: 'left', 
                                    padding: '0.8rem', 
                                    background: selectedCompanyId === c.id ? 'var(--brand-primary)' : 'transparent',
                                    color: selectedCompanyId === c.id ? '#fff' : 'inherit'
                                }}
                            >
                                🏢 {c.name}
                            </button>
                        ))}
                    </div>
                </aside>

                <main>
                    {selectedCompanyId ? (
                        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '12px' }}>
                            <header style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <h2>Managing: {companies.find(c => c.id === selectedCompanyId)?.name}</h2>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button 
                                        className={`admin-outline-btn ${compQType === 'coding' ? 'active-tab-btn' : ''}`}
                                        onClick={() => setCompQType('coding')}
                                        style={{ background: compQType === 'coding' ? '#3b82f615' : 'transparent' }}
                                    >💻 Coding Prep</button>
                                    <button 
                                        className={`admin-outline-btn ${compQType === 'conceptual' ? 'active-tab-btn' : ''}`}
                                        onClick={() => setCompQType('conceptual')}
                                        style={{ background: compQType === 'conceptual' ? '#3b82f615' : 'transparent' }}
                                    >🧠 Conceptual Prep</button>
                                </div>
                            </header>

                            <form onSubmit={handleAddCompQuestion}>
                                {compQType === 'coding' ? (
                                    <div className="admin-form">
                                        <div className="form-group">
                                            <label>Problem Title</label>
                                            <input className="admin-input" value={compCodingData.title} onChange={e => setCompCodingData({...compCodingData, title: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Detailed Statement</label>
                                            <textarea className="admin-input textarea" rows="4" value={compCodingData.statement} onChange={e => setCompCodingData({...compCodingData, statement: e.target.value})} required />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div className="form-group">
                                                <label>Sample Input</label>
                                                <textarea className="admin-input textarea" rows="2" value={compCodingData.input} onChange={e => setCompCodingData({...compCodingData, input: e.target.value})} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Expected Output</label>
                                                <textarea className="admin-input textarea" rows="2" value={compCodingData.output} onChange={e => setCompCodingData({...compCodingData, output: e.target.value})} required />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="admin-form">
                                        <div className="form-group">
                                            <label>Question</label>
                                            <input className="admin-input" value={compMcqData.q} onChange={e => setCompMcqData({...compMcqData, q: e.target.value})} required />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                            <input className="admin-input" placeholder="Opt A" value={compMcqData.A} onChange={e => setCompMcqData({...compMcqData, A: e.target.value})} required />
                                            <input className="admin-input" placeholder="Opt B" value={compMcqData.B} onChange={e => setCompMcqData({...compMcqData, B: e.target.value})} required />
                                            <input className="admin-input" placeholder="Opt C" value={compMcqData.C} onChange={e => setCompMcqData({...compMcqData, C: e.target.value})} required />
                                            <input className="admin-input" placeholder="Opt D" value={compMcqData.D} onChange={e => setCompMcqData({...compMcqData, D: e.target.value})} required />
                                        </div>
                                        <div className="form-group" style={{ marginTop: '1rem' }}>
                                            <label>Correct Answer Letter</label>
                                            <select className="admin-input" value={compMcqData.ans} onChange={e => setCompMcqData({...compMcqData, ans: e.target.value})}>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                                <button type="submit" className="admin-submit-btn" style={{ marginTop: '1.5rem' }}>🎯 Save to Company Database</button>
                            </form>
                        </div>
                    ) : (
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border-color)', borderRadius: '12px' }}>
                            <p style={{ color: 'var(--text-muted)' }}>Select a company on the left to start adding questions.</p>
                        </div>
                    )}
                </main>
            </div>
          </div>
        )}

        {activeTab === 'check-score' && (
          <div className="content-inserter">
            <header className="admin-header">
              <h2>Check Scores & Leaderboard</h2>
              <p>View the highest scores from the most recent live contest.</p>
            </header>
            
            {selectedStudent ? (
              <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '8px' }}>
                <button 
                   className="admin-outline-btn" 
                   onClick={() => setSelectedStudent(null)}
                   style={{ marginBottom: '1rem' }}
                >
                   &larr; Back to Leaderboard
                </button>
                <h3>Student Profile: {selectedStudent.name}</h3>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                   <div style={{ flex: 1, padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                     <h4>Contest Performance</h4>
                     <p>Final Score: {selectedStudent.score}</p>
                     <p>Time Taken: {Math.floor(selectedStudent.timeSpent / 60)}m {selectedStudent.timeSpent % 60}s</p>
                     <p>Rank: #{contestData.leaderboard.findIndex(u => u.name === selectedStudent.name) + 1}</p>
                   </div>
                   <div style={{ flex: 1, padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                     <h4>Account Details</h4>
                     <p>Status: Verified Student</p>
                     <p>Hiring Eligibility: High</p>
                   </div>
                </div>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Student Name</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contestData.leaderboard && contestData.leaderboard.length > 0 ? (
                    contestData.leaderboard.map((u, idx) => (
                      <tr key={idx}>
                        <td>#{idx + 1}</td>
                        <td 
                          style={{ color: 'var(--brand-primary)', cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => setSelectedStudent(u)}
                        >
                          {u.name}
                        </td>
                        <td>{u.score}</td>
                        <td>
                          <button className="admin-outline-btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => setSelectedStudent(u)}>View Results</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No student submissions for the active contest yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
