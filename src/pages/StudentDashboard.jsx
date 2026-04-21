import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

import { FREE_COURSES } from '../data/courseData';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { userStats, setUserStats } = useData();

  const setPreference = (pref) => {
    setUserStats(prev => ({ ...prev, roadmapPreference: pref }));
  };

  const preference = userStats.roadmapPreference || 'dsa';

  const roadmaps = {
    dsa: {
      title: 'Current Focus: Data Structures & Algorithms',
      description: 'Master Arrays, Strings, and Dynamic Programming to crack technical rounds of top product companies.',
      link: '/coding-practice',
      btnText: 'Practice DSA Questions'
    },
    webdev: {
      title: 'Current Focus: Industrial Web Development',
      description: 'Build production-ready applications using modern frameworks and system design patterns.',
      link: '/mcq-practice',
      btnText: 'Explore Web Topics'
    },
    company: {
      title: 'Current Focus: Company Specific Patterns',
      description: 'Practice the exact patterns used by TCS NQT, Infosys HackWithInfy, and Amazon SDE roles.',
      link: '/company-questions',
      btnText: 'View Company Patterns'
    }
  };

  const currentRoadmap = roadmaps[preference];

  return (
    <div className="dashboard-container slide-in">
      <header className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h2>Home: Hello, {user?.name || 'Student'}!</h2>
            <p>Here is your personalized roadmap and preparation topics.</p>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
             <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '0.5rem', fontWeight: 'bold' }}>PATH PRIORITY:</span>
             <button onClick={() => setPreference('dsa')} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: preference === 'dsa' ? 'var(--brand-primary)' : 'transparent', color: preference === 'dsa' ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>DSA</button>
             <button onClick={() => setPreference('webdev')} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: preference === 'webdev' ? 'var(--brand-primary)' : 'transparent', color: preference === 'webdev' ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Web Dev</button>
             <button onClick={() => setPreference('company')} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: preference === 'company' ? 'var(--brand-primary)' : 'transparent', color: preference === 'company' ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Corporate</button>
          </div>
        </div>
      </header>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'minmax(300px, 2fr) minmax(300px, 1fr)' }}>
        
        {/* Left Column: Courses & Roadmap */}
        <div>
          <section className="dashboard-card primary-card" style={{ marginBottom: '2rem', transition: 'all 0.3s ease' }}>
            <h3>Your Preparation Roadmap</h3>
            <div className="phase-banner" style={{ marginTop: '1rem', animation: 'fadeIn 0.5s ease' }}>
              <h4>{currentRoadmap.title}</h4>
              <p>{currentRoadmap.description}</p>
              <Link to={currentRoadmap.link} className="action-button" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '1rem' }}>{currentRoadmap.btnText} &rarr;</Link>
            </div>
          </section>

          <section className="dashboard-card" style={{ marginBottom: '2rem' }}>
            <h3>Free Industry Courses & Topics</h3>
            <p className="card-subtitle" style={{ marginBottom: '1rem' }}>Curated free resources across the web to help you get hired.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {FREE_COURSES.map((course, idx) => (
                <div key={idx} style={{ padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '12px', borderLeft: '5px solid var(--brand-primary)', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{course.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>{course.duration}</span>
                  </div>
                  <div style={{ marginTop: '0.5rem', color: 'var(--brand-primary)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {course.source}
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <strong>What you'll learn: </strong>
                    <span style={{ color: 'var(--text-muted)' }}>{course.topics.join(', ')}</span>
                  </div>
                  <a 
                    href={course.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      marginTop: '1.2rem', 
                      display: 'inline-block', 
                      color: 'var(--brand-primary)', 
                      textDecoration: 'none', 
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      background: 'rgba(59, 130, 246, 0.1)',
                      padding: '0.4rem 1rem',
                      borderRadius: '4px'
                    }}
                  >
                    View Course Details &rarr;
                  </a>
                  {course.isFree && <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--status-success)', color: '#fff', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '900', letterSpacing: '1px' }}>FREE</span>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Contests & Company Questions Sections */}
        <div>
          <section className="dashboard-card" style={{ marginBottom: '2rem', border: '2px solid var(--brand-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Live Contests</h3>
              <span style={{ background: 'var(--status-error)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE</span>
            </div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Compete with others in live coding. Compile, run test cases, and submit to earn points before time runs out!</p>
            <Link to="/contests" className="action-button" style={{ display: 'block', textDecoration: 'none', marginTop: '1.5rem', textAlign: 'center' }}>Enter Live Contest</Link>
          </section>

          <section className="dashboard-card" style={{ marginBottom: '2rem' }}>
            <h3>Company Selective Questions</h3>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Preparing for an interview? Practice questions specifically tailored for top companies like Google, TCS, and Amazon.</p>
            <Link to="/company-questions" className="outline-button" style={{ display: 'block', textDecoration: 'none', marginTop: '1.5rem', textAlign: 'center' }}>View Company Patterns</Link>
          </section>

          <section className="dashboard-card weakness-card">
            <div className="card-header-flex">
              <h3>Quick Analytics</h3>
            </div>
            <ul className="weakness-list" style={{ marginTop: '1rem' }}>
              <li>
                <span className="topic-name">Overall Ranking</span>
                <strong>{userStats.rank}</strong>
              </li>
              <li>
                <span className="topic-name">Total Submissions</span>
                <strong>{userStats.submitted}</strong>
              </li>
            </ul>
            <Link to="/profile" className="text-button-small" style={{ marginTop: '1rem', display: 'inline-block' }}>View Full Profile Tracker &rarr;</Link>
          </section>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
