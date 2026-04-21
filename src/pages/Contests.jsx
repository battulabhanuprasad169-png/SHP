import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';

const Contests = () => {
  const { contestData, updateLeaderboard, userStats, finishContest } = useData();
  const { user } = useAuth();
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [codes, setCodes] = useState({}); // Store code per question index
  const [outputs, setOutputs] = useState({});
  const [scores, setScores] = useState({});
  const [submittedStatus, setSubmittedStatus] = useState({});
  const [activeTab, setActiveTab] = useState('live');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const templates = {
    javascript: `// JavaScript (Node.js) - LeetCode Style
const fs = require('fs');

class Solution {
    solve(input) {
        // Your logic here
        return input;
    }
}

// DRIVER
const input = fs.readFileSync(0, 'utf8').trim();
console.log(new Solution().solve(input));`,
    python: `import sys

# LeetCode Python 3 Template
class Solution:
    def solve(self, input_data: str) -> str:
        # Your logic here
        return input_data

if __name__ == "__main__":
    input_str = sys.stdin.read().trim()
    print(Solution().solve(input_str))`,
    java: `import java.util.*;
import java.io.*;

// Class Main is mandatory for the driver
class Solution {
    public void solve(Scanner sc) {
        if (sc.hasNext()) {
            System.out.println(sc.next());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        new Solution().solve(sc);
    }
}`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    void solve() {
        string s;
        if (cin >> s) cout << s << endl;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    Solution().solve();
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void solve() {
    char s[1024];
    if (scanf("%s", s) != EOF) printf("%s\\n", s);
}

int main() {
    solve();
    return 0;
}`,
    csharp: `using System;

public class Solution {
    public void Solve() {
        Console.WriteLine(Console.ReadLine() ?? "");
    }
}

public class Program {
    public static void Main() {
        new Solution().Solve();
    }
}`,
    ruby: `# Ruby Template
class Solution
  def solve(input)
    input
  end
end
puts Solution.new.solve(gets)`,
    go: `package main
import "fmt"

type Solution struct{}
func (s *Solution) solve() {
    var i string
    fmt.Scan(&i)
    fmt.Println(i)
}

func main() {
    (&Solution{}).solve()
}`
  };

  const runBackendExecution = async (userCode, inputToProvide, lang) => {
    try {
        const response = await fetch(`http://${window.location.hostname}:5000/api/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: lang, code: userCode, input: inputToProvide })
        });
        const data = await response.json();
        return {
            stdout: data.output ? data.output.trim() : '',
            success: data.success
        };
    } catch (err) {
        return { stdout: 'Backend Connection Error: Make sure your local engine is running.', success: false };
    }
  };

  useEffect(() => {
    if (contestData?.isActive && contestData.endTime) {
        const remaining = Math.floor((contestData.endTime - Date.now()) / 1000);
        setTimeLeft(Math.max(0, remaining));
    }
  }, [contestData]);

  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 1) {
                handleFinish();
                return 0;
            }
            return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateLiveScore = (idx) => {
    if (submittedStatus[idx]) return scores[idx] || 0;
    const timeSpentSecret = (120 * 60) - timeLeft;
    const minutesSpent = timeSpentSecret / 60;
    // Base 50, decreases by 1 every 2 minutes late
    const currentPotential = Math.max(10, 50 - Math.floor(minutesSpent / 2));
    return currentPotential;
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutputs(prev => ({ ...prev, [currentQuestionIdx]: "Compiling & Executing..." }));
    const q = contestData.questions[currentQuestionIdx];
    const currentCode = codes[currentQuestionIdx] || templates[selectedLanguage];
    
    const res = await runBackendExecution(currentCode, q.input, selectedLanguage);
    setOutputs(prev => ({ ...prev, [currentQuestionIdx]: res.stdout || "<No Output Result>" }));
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    const q = contestData.questions[currentQuestionIdx];
    const currentCode = codes[currentQuestionIdx] || templates[selectedLanguage];
    
    if (submittedStatus[currentQuestionIdx]) return;

    setIsRunning(true);
    setOutputs(prev => ({ ...prev, [currentQuestionIdx]: "Running final evaluation..." }));
    
    const res = await runBackendExecution(currentCode, q.input, selectedLanguage);
    
    if (res.success && res.stdout === q.output.trim()) {
        const finalScore = calculateLiveScore(currentQuestionIdx);
        setScores(prev => ({ ...prev, [currentQuestionIdx]: finalScore }));
        setSubmittedStatus(prev => ({ ...prev, [currentQuestionIdx]: true }));
        alert(`✅ Accepted! Points: ${finalScore}`);
        
        const totalScore = Object.values({ ...scores, [currentQuestionIdx]: finalScore }).reduce((a, b) => a + b, 0);
        updateLeaderboard(user?.name || "You", totalScore, (120 * 60) - timeLeft);
    } else {
        setOutputs(prev => ({ ...prev, [currentQuestionIdx]: `❌ Wrong Answer or Error.\n\nExpected:\n${q.output.trim()}\n\nYour Output:\n${res.stdout}` }));
    }
    setIsRunning(false);
  };

  const handleFinish = () => {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    finishContest(totalScore);
    setTestStarted(false);
    alert(`Contest Finished! Your final score is ${totalScore}. Your rating has been updated.`);
  };

  // Professional SVG Rating Graph Component
  const RatingGraph = ({ history }) => {
    if (!history || history.length === 0) return null;
    const width = 450;
    const height = 180;
    const padding = 30;
    
    // Smooth scaling
    const maxVal = Math.max(...history, 1200) + 50;
    const minVal = Math.min(...history, 500) - 50;
    const range = Math.max(10, maxVal - minVal);
    
    const getX = (i) => padding + (i * ((width - 2 * padding) / (Math.max(1, history.length - 1))));
    const getY = (val) => height - padding - ((val - minVal) / range * (height - 2 * padding));

    const points = history.map((val, i) => `${getX(i)},${getY(val)}`).join(' ');

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'var(--bg-tertiary)', borderRadius: '16px', padding: '10px' }}>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map(tick => (
                <line key={tick} x1={padding} y1={getY(minVal + range * tick)} x2={width - padding} y2={getY(minVal + range * tick)} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 2" />
            ))}
            
            <polyline
                fill="none"
                stroke="var(--brand-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                style={{ filter: 'drop-shadow(0 0 4px var(--brand-primary-alpha))' }}
            />
            {history.map((val, i) => (
                <g key={i}>
                    <circle cx={getX(i)} cy={getY(val)} r="6" fill="var(--bg-secondary)" stroke="var(--brand-primary)" strokeWidth="3" />
                    <text x={getX(i)} y={getY(val) - 15} textAnchor="middle" fontSize="10" fill="var(--text-muted)">{val}</text>
                </g>
            ))}
        </svg>
    );
  };

  if (!contestData || !contestData.isActive) {
      return (
        <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '6rem', marginBottom: '2.5rem', filter: 'drop-shadow(0 0 20px var(--brand-primary-alpha))', animation: 'float 3s ease-in-out infinite' }}>🚀</div>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: '900' }}>The Arena is Currently Locked</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3.5rem', fontSize: '1.2rem', lineHeight: '1.8' }}>
                The host hasn't opened a live contest session yet. Preparing high-performance logic challenges 
                for your next career breakthrough. Stay tuned!
            </p>
            
            {userStats.ratingHistory.length > 0 && (
                <div style={{ 
                    background: 'var(--bg-secondary)', 
                    padding: '2.5rem', 
                    borderRadius: '24px', 
                    border: '1px solid var(--border-color)', 
                    display: 'inline-block', 
                    boxShadow: 'var(--shadow-xl)',
                    margin: '0 auto'
                }}>
                    <h3 style={{ marginBottom: '2rem', color: 'var(--brand-primary)', fontSize: '1.5rem' }}>Your Progress Analytics</h3>
                    <RatingGraph history={userStats.ratingHistory} />
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center' }}>
                        <div>
                           <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>ACCURACY SCORE</span>
                           <div style={{ color: 'var(--status-success)', fontSize: '2.5rem', fontWeight: '900' }}>{userStats.rating}</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
                        <div>
                           <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>CANDIDATE GRADE</span>
                           <div style={{ color: 'var(--brand-primary)', fontSize: '2.5rem', fontWeight: '900' }}>{userStats.rating > 1400 ? 'A+' : 'A'}</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
                        <div>
                           <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>TOTAL TESTS</span>
                           <div style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: '900' }}>{userStats.contestsDone || 0}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      );
  }

  const currentQ = contestData.questions[currentQuestionIdx];

  return (
    <div className="container slide-in" style={{ padding: '1rem', maxWidth: '1450px' }}>
      {/* Test Header */}
      <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          padding: '1.5rem 2rem',
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)'
      }}>
        <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--brand-primary)' }}>{contestData.title}</h1>
            <p style={{ margin: '0.3rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Smart Hiring Portal • Live Performance Arena</p>
        </div>
        
        {testStarted ? (
           <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Time Remaining</span>
                <span style={{ color: timeLeft < 300 ? 'var(--status-error)' : 'var(--text-primary)', fontWeight: '900', fontSize: '1.5rem' }}>{formatTime(timeLeft)}</span>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Score</span>
                <span style={{ color: 'var(--status-success)', fontWeight: '900', fontSize: '1.5rem' }}>{Object.values(scores).reduce((a, b) => a + b, 0)} pts</span>
              </div>
           </div>
        ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                    Locked System • ID: {Math.floor(Math.random() * 9000) + 1000}
                </span>
            </div>
        )}
      </div>
      
      {!testStarted ? (
          <div style={{ 
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)', 
              padding: '4rem 3rem', 
              borderRadius: '24px', 
              textAlign: 'center', 
              marginTop: '1rem', 
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-2xl)'
          }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛡️</div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '900' }}>Entrance to the Arena</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                  Please ensure you have a stable connection. Once you click start, the timer cannot be paused. 
                  Your performance directly impacts your global hiring rank.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', marginBottom: '4rem' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', color: 'var(--brand-primary)' }}>🕒</div>
                      <h4 style={{ margin: '0.5rem 0 0.2rem' }}>120 Minutes</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Contest Duration</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', color: 'var(--brand-primary)' }}>💎</div>
                      <h4 style={{ margin: '0.5rem 0 0.2rem' }}>{contestData.questions.length || 0} Points</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Max Potential</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', color: 'var(--brand-primary)' }}>📈</div>
                      <h4 style={{ margin: '0.5rem 0 0.2rem' }}>Live Graph</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time Statistics</p>
                  </div>
              </div>
              
              <button 
                className="action-button" 
                style={{ padding: '1.2rem 5rem', fontSize: '1.4rem', borderRadius: '50px', fontWeight: 'bold' }}
                onClick={() => {
                   const alreadyParticipated = contestData.leaderboard?.some(u => u.name === user?.name);
                   const isExpired = contestData.endTime && Date.now() > contestData.endTime;
                   
                   if (alreadyParticipated) {
                      alert("⚠️ Completion Record Found: You have already submitted your response for this contest. You can view the leaderboard to check your rank.");
                   } else if (isExpired) {
                      alert("⏰ Session Expired: This contest has already ended.");
                   } else {
                      setTestStarted(true);
                   }
                }}
              >⚡ Initialize Session</button>
          </div>
      ) : (
          <div>
            {/* Arena Header Bar */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1.5rem', 
                background: 'var(--bg-secondary)', 
                padding: '1rem 1.5rem', 
                borderRadius: '12px', 
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-color)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'bold', marginRight: '1rem' }}>PROBLEMS:</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {contestData.questions.map((q, idx) => (
                        <button 
                            key={idx}
                            onClick={() => {
                                setCurrentQuestionIdx(idx);
                                setActiveTab('live');
                            }}
                            style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '8px',
                                border: currentQuestionIdx === idx ? '2px solid var(--brand-primary)' : '1px solid var(--border-color)',
                                background: currentQuestionIdx === idx ? 'var(--brand-primary)' : (submittedStatus[idx] ? 'var(--status-success)' : 'var(--bg-tertiary)'),
                                color: currentQuestionIdx === idx || submittedStatus[idx] ? '#fff' : 'var(--text-primary)',
                                cursor: 'pointer',
                                fontWeight: '900',
                                fontSize: '1.1rem',
                                transition: 'all 0.2s',
                                transform: currentQuestionIdx === idx ? 'scale(1.1)' : 'scale(1)',
                                boxShadow: currentQuestionIdx === idx ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none'
                            }}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
                <div style={{ flex: 1 }}></div>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <button 
                        className={activeTab === 'live' ? 'action-button' : 'outline-button'} 
                        onClick={() => setActiveTab('live')}
                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
                    >💻 Solve</button>
                    <button 
                        className={activeTab === 'leaderboard' ? 'action-button' : 'outline-button'} 
                        onClick={() => setActiveTab('leaderboard')}
                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
                    >📊 Rank</button>
                    <button 
                        className="outline-button" 
                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', color: 'var(--status-error)', borderColor: 'var(--status-error)' }}
                        onClick={() => { if(window.confirm("Finish Contest Early?")) handleFinish(); }}
                    >End</button>
                </div>
            </div>

            {activeTab === 'live' && (
                <div style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 250px)' }}>
                    {/* Sidebar Question Info */}
                    <div style={{ flex: '0 0 350px', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>{currentQ?.title}</h3>
                            <span style={{ color: 'var(--status-success)', fontSize: '0.9rem' }}>
                                Potential: {calculateLiveScore(currentQuestionIdx)} pts
                            </span>
                        </div>
                        <hr style={{ margin: '1rem 0', opacity: 0.1 }} />
                        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{currentQ?.statement}</p>
                        
                        <div style={{ marginTop: '2rem' }}>
                            <strong>Sample Input:</strong>
                            <pre style={{ background: 'var(--bg-tertiary)', padding: '0.8rem', borderRadius: '4px', marginTop: '0.5rem' }}>{currentQ?.input}</pre>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <strong>Expected Output:</strong>
                            <pre style={{ background: 'var(--bg-tertiary)', padding: '0.8rem', borderRadius: '4px', marginTop: '0.5rem' }}>{currentQ?.output}</pre>
                        </div>
                    </div>

                    {/* Editor & Output */}
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                            <Editor
                                height="100%"
                                language={selectedLanguage === 'cpp' ? 'cpp' : (selectedLanguage === 'c' ? 'c' : selectedLanguage)}
                                theme="vs-dark"
                                value={codes[currentQuestionIdx] || templates[selectedLanguage]}
                                onChange={(val) => setCodes(prev => ({ ...prev, [currentQuestionIdx]: val }))}
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        </div>
                        <div style={{ height: '200px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong>Output</strong>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'var(--bg-tertiary)' }}>
                                        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lang:</label>
                                        <select 
                                            value={selectedLanguage} 
                                            onChange={(e) => {
                                                const newLang = e.target.value;
                                                setSelectedLanguage(newLang);
                                                // If current editor is empty or still has a template from another language, update it
                                                const currentCode = codes[currentQuestionIdx] || "";
                                                if (!currentCode || Object.values(templates).includes(currentCode)) {
                                                    setCodes(prev => ({ ...prev, [currentQuestionIdx]: templates[newLang] }));
                                                }
                                            }}
                                            style={{ background: 'transparent', color: 'var(--text-primary)', border: 'none', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
                                        >
                                            <option value="javascript">JavaScript</option>
                                            <option value="python">Python</option>
                                            <option value="java">Java</option>
                                            <option value="cpp">C++</option>
                                            <option value="c">C</option>
                                            <option value="csharp">C#</option>
                                            <option value="ruby">Ruby</option>
                                            <option value="go">Go</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="outline-button" onClick={handleRun} disabled={isRunning}>{isRunning ? '...' : 'Run'}</button>
                                        <button className="action-button" onClick={handleSubmit} disabled={isRunning || submittedStatus[currentQuestionIdx]}>
                                            {submittedStatus[currentQuestionIdx] ? '✓ Submitted' : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <pre style={{ flex: 1, margin: 0, padding: '1rem', overflow: 'auto', fontSize: '0.9rem', color: '#d4d4d4' }}>
                                {outputs[currentQuestionIdx] || "Execute code to see output..."}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'leaderboard' && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Live Leaderboard</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Rank</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Student</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Score</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(contestData.leaderboard || []).length > 0 ? (
                                    contestData.leaderboard.map((u, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem' }}>#{i + 1}</td>
                                            <td style={{ padding: '1rem', fontWeight: 'bold' }}>{u.name}</td>
                                            <td style={{ padding: '1rem', color: 'var(--brand-primary)' }}>{u.score}</td>
                                            <td style={{ padding: '1rem' }}>{Math.floor(u.timeSpent / 60)}m {u.timeSpent % 60}s</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No submissions yet. Be the first!</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Contest Performance</h3>
                            <RatingGraph history={userStats.ratingHistory} />
                            <p style={{ marginTop: '1rem' }}>Current Global Rating: <strong>{userStats.rating}</strong></p>
                        </div>
                        <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <h3>Summary</h3>
                            <p>Solved: {Object.keys(submittedStatus).length} / {contestData.questions.length}</p>
                            <p>Total Score: {Object.values(scores).reduce((a, b) => a + b, 0)}</p>
                        </div>
                    </div>
                </div>
            )}
          </div>
      )}
    </div>
  );
};

export default Contests;

