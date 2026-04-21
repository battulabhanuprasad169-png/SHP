import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import RoadmapPhase from './pages/RoadmapPhase';
import Assessment from './pages/Assessment';
import AdminDashboard from './pages/AdminDashboard';

import CodingPractice from './pages/CodingPractice';
import MCQPractice from './pages/MCQPractice';
import ResumeBuilder from './pages/ResumeBuilder';
import Profile from './pages/Profile';
import Contests from './pages/Contests';
import CompanyQuestions from './pages/CompanyQuestions';
import Roadmaps from './pages/Roadmaps';

import { useAuth, AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import React, { useState } from 'react';
import TicTacToe from './components/TicTacToe';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleTheme, isDarkMode } = useTheme();
  const [showOXGame, setShowOXGame] = useState(false);
  const location = useLocation();

  // FIX: Absolutely hide navbar on login, register, and if user is missing
  if (!user || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
    return null;
  }

  return (
    <nav style={{ padding: '1rem 2rem', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div onClick={() => setShowOXGame(true)} style={{ textDecoration: 'none', cursor: 'pointer' }}>
           <h1 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--brand-primary)' }}>SHP</h1>
        </div>
        {user?.role === 'student' && (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/dashboard" className="nav-link">Home</Link>
            <Link to="/coding-practice" className="nav-link">Coding Practice</Link>
            <Link to="/mcq-practice" className="nav-link">MCQ Practice</Link>
            <Link to="/resume-builder" className="nav-link">Resume Building</Link>
            <Link to="/contests" className="nav-link">Contests</Link>
            <Link to="/company-questions" className="nav-link">Company Questions</Link>
            <Link to="/roadmaps" className="nav-link">Roadmaps</Link>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
         <button onClick={toggleTheme} style={{ cursor: 'pointer', padding: '0.25rem 0.5rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
           {isDarkMode ? '☀️' : '🌙'}
         </button>
         
         <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
           {user.role === 'admin' && (
             <>
               <Link to="/admin" style={{ color: 'var(--brand-primary)', fontWeight: 'bold' }}>Admin Dashboard</Link>
               <button onClick={logout} style={{ color: 'var(--status-error)', cursor: 'pointer', fontWeight: 'bold', background: 'transparent', border: 'none', fontSize: '1rem' }}>Logout</button>
             </>
           )}
           {user.role === 'student' && (
             <Link to="/profile" className="nav-link" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--brand-primary)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
               👤 {user.name}
             </Link>
           )}
         </div>
      </div>
      {showOXGame && <TicTacToe onClose={() => setShowOXGame(false)} />}
    </nav>
  );
};

function App() {
  console.log("App: Component rendering...");
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              
              <main style={{ flex: 1 }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected Student Routes */}
                  <Route element={<ProtectedRoute allowedRole="student" />}>
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/roadmap/:phaseId" element={<RoadmapPhase />} />
                    <Route path="/assessment/:assessmentId" element={<Assessment />} />
                    <Route path="/coding-practice" element={<CodingPractice />} />
                    <Route path="/mcq-practice" element={<MCQPractice />} />
                    <Route path="/resume-builder" element={<ResumeBuilder />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contests" element={<Contests />} />
                    <Route path="/company-questions" element={<CompanyQuestions />} />
                    <Route path="/roadmaps" element={<Roadmaps />} />
                  </Route>
                  
                  {/* Protected Admin Routes */}
                  <Route element={<ProtectedRoute allowedRole="admin" />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                  </Route>
                  
                  {/* 404 Catch-all */}
                  <Route path="*" element={<div className="container" style={{paddingTop: '5rem'}}><h2>404 - Not Found</h2></div>} />
                </Routes>
              </main>
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
