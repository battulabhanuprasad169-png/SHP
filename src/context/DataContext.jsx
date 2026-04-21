import React, { createContext, useContext, useState, useEffect } from 'react';
import { LEETCODE_QUESTIONS } from '../data/leetCodeData';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  console.log("DataContext: Initializing...");
  // Load initial state from local storage or use defaults
  const loadInitialState = (key, defaultVal) => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(`Failed parsing ${key} from storage`, e);
      }
    }
    return defaultVal;
  };

  const { user } = useAuth();
  const userId = user?.name || 'guest';

  const [userStats, setUserStats] = useState(() => {
    const stats = loadInitialState(`shp_userStats_${userId}`, {
      submitted: 0,
      total: LEETCODE_QUESTIONS.length,
      rating: 700,
      ratingHistory: [700],
      rank: 'Unranked',
      contestsDone: 0,
      roadmapPreference: 'dsa'
    });
    if (!stats.ratingHistory) stats.ratingHistory = [700];
    if (stats.rating === 0) stats.rating = 700;
    return { ...stats, total: LEETCODE_QUESTIONS.length }; 
  });

  const [codingQuestions, setCodingQuestions] = useState(() => {
    const savedQuestions = loadInitialState('shp_codingQuestions', []);
    const leetIds = new Set(LEETCODE_QUESTIONS.map(q => q.id));
    const merged = [...LEETCODE_QUESTIONS, ...savedQuestions.filter(q => !leetIds.has(q.id))];
    return merged;
  });
  
  const [solvedQuestions, setSolvedQuestions] = useState(() => 
    loadInitialState(`shp_solvedQuestions_${userId}`, []) 
  );

  useEffect(() => {
    // Sync when user changes
    const stats = loadInitialState(`shp_userStats_${userId}`, {
      submitted: 0,
      total: codingQuestions.length || LEETCODE_QUESTIONS.length,
      rating: 700,
      ratingHistory: [700],
      rank: 'Unranked',
      contestsDone: 0,
      roadmapPreference: 'dsa'
    });
    if (!stats.ratingHistory) stats.ratingHistory = [700];
    if (stats.rating === 0) stats.rating = 700;
    setUserStats({ ...stats, total: codingQuestions.length || LEETCODE_QUESTIONS.length });
    
    setSolvedQuestions(loadInitialState(`shp_solvedQuestions_${userId}`, []));
  }, [userId]);

  const [contestData, setContestData] = useState(() => 
    loadInitialState('shp_contestData', {
      isActive: false,
      questions: [],
      title: "Weekly Coding Contest",
      durationMinutes: 120, // 2 hours
      startTime: null,
      endTime: null,
      leaderboard: []
    })
  );

  const [mcqs, setMcqs] = useState(() => loadInitialState('shp_mcqs', []));
  const [companies, setCompanies] = useState(() => loadInitialState('shp_companies', []));

  const addMcq = (mcq) => {
    const updated = [...mcqs, { ...mcq, id: Date.now() }];
    setMcqs(updated);
    localStorage.setItem('shp_mcqs', JSON.stringify(updated));
  };

  const addCompany = (companyName) => {
    if (companies.some(c => c.name.toLowerCase() === companyName.toLowerCase())) return;
    const updated = [...companies, { id: Date.now(), name: companyName, coding: [], conceptual: [] }];
    setCompanies(updated);
    localStorage.setItem('shp_companies', JSON.stringify(updated));
  };

  const addCompanyQuestion = (companyId, type, question) => {
    setCompanies(prev => {
        const updated = prev.map(c => {
            if (c.id === companyId) {
                return { ...c, [type]: [...c[type], { ...question, id: Date.now() }] };
            }
            return c;
        });
        localStorage.setItem('shp_companies', JSON.stringify(updated));
        return updated;
    });
  };

  const publishContest = (data) => {
    let updatedData = { ...data };
    // Only set times if we ARE going live and times aren't already set
    if (data.isActive && !data.endTime) {
       const start = Date.now();
       updatedData.startTime = start;
       updatedData.endTime = start + (data.durationMinutes || 120) * 60 * 1000;
    }
    setContestData(updatedData);
    localStorage.setItem('shp_contestData', JSON.stringify(updatedData));
  };

  useEffect(() => {
    if (!contestData.isActive || !contestData.endTime) return;
    
    const checkTimer = setInterval(() => {
        if (Date.now() >= contestData.endTime) {
            setContestData(prev => {
                const final = { ...prev, isActive: false };
                localStorage.setItem('shp_contestData', JSON.stringify(final));
                return final;
            });
            clearInterval(checkTimer);
        }
    }, 5000);

    return () => clearInterval(checkTimer);
  }, [contestData.isActive, contestData.endTime]);

  const updateLeaderboard = (userName, score, timeSpent) => {
    setContestData(prev => {
        const newLeaderboard = [...(prev.leaderboard || [])];
        const userIndex = newLeaderboard.findIndex(u => u.name === userName);
        if (userIndex > -1) {
            newLeaderboard[userIndex] = { name: userName, score, timeSpent };
        } else {
            newLeaderboard.push({ name: userName, score, timeSpent });
        }
        newLeaderboard.sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent);
        const updated = { ...prev, leaderboard: newLeaderboard };
        localStorage.setItem('shp_contestData', JSON.stringify(updated));
        return updated;
    });
  };

  const finishContest = (finalScore) => {
    setUserStats(prev => {
        // Rating Logic:
        // Each problem is 50 pts.
        // Starting rating is 700.
        // We add finalScore directly to provide a visible impact.
        const ratingGain = finalScore;
        const newRating = (prev.rating || 700) + ratingGain;
        const newHistory = [...(prev.ratingHistory || [700]), newRating];
        
        const updated = {
            ...prev,
            rating: newRating,
            ratingHistory: newHistory,
            contestsDone: (prev.contestsDone || 0) + 1
        };
        localStorage.setItem(`shp_userStats_${userId}`, JSON.stringify(updated));
        return updated;
    });
  };

  // Sync state changes to local storage
  useEffect(() => {
    setUserStats(prev => ({ ...prev, total: codingQuestions.length }));
  }, [codingQuestions.length]);

  useEffect(() => {
    localStorage.setItem(`shp_userStats_${userId}`, JSON.stringify(userStats));
  }, [userStats, userId]);

  useEffect(() => {
    const customQuestions = codingQuestions.filter(q => q.id > 4000 || q.isCustom);
    localStorage.setItem('shp_codingQuestions', JSON.stringify(customQuestions));
  }, [codingQuestions]);

  useEffect(() => {
    localStorage.setItem(`shp_solvedQuestions_${userId}`, JSON.stringify(solvedQuestions));
  }, [solvedQuestions, userId]);

  const addCodingQuestion = (question) => {
    setCodingQuestions(prev => [...prev, { ...question, id: Date.now(), isCustom: true }]);
  };

  const editCodingQuestion = (id, updatedData) => {
    setCodingQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updatedData } : q));
  };

  const markQuestionSolved = (questionId) => {
    if (!solvedQuestions.includes(questionId)) {
      setSolvedQuestions(prev => [...prev, questionId]);
      setUserStats(prev => ({ 
        ...prev, 
        submitted: prev.submitted + 1, 
        // For general practice, maybe a small rating boost?
        rating: prev.rating + 2,
        total: codingQuestions.length 
      }));
    }
  };

  return (
    <DataContext.Provider value={{
      userStats,
      setUserStats,
      codingQuestions,
      solvedQuestions,
      addCodingQuestion,
      editCodingQuestion,
      markQuestionSolved,
      contestData,
      publishContest,
      updateLeaderboard,
      finishContest,
      mcqs,
      addMcq,
      companies,
      addCompany,
      addCompanyQuestion
    }}>
      {children}
    </DataContext.Provider>
  );
};
