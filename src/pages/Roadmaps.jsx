import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROLES } from '../data/roadmapData';
import './Roadmap.css';

const Roadmaps = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [activePopup, setActivePopup] = useState(null);

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(ROLES[roleKey]);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setActivePopup(null);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  if (selectedRole) {
    return (
      <div className="roadmap-container slide-in" style={{ padding: '2rem', position: 'relative' }}>
        {/* Detail Popup Modal */}
        {activePopup && (
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'rgba(0,0,0,0.7)', 
              zIndex: 1000, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              padding: '1rem'
            }}
            onClick={closePopup}
          >
            <div 
              style={{ 
                background: 'var(--bg-secondary)', 
                maxWidth: '600px', 
                width: '100%', 
                borderRadius: 'var(--radius-xl)', 
                padding: '2.5rem', 
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                position: 'relative',
                border: '1px solid var(--border-color)',
                animation: 'slideUp 0.3s ease-out'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closePopup}
                style={{ 
                  position: 'absolute', 
                  top: '1.5rem', 
                  right: '1.5rem', 
                  background: 'var(--bg-tertiary)', 
                  border: 'none', 
                  color: 'var(--text-primary)', 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                &times;
              </button>
              <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: 'var(--brand-primary)', fontWeight: '700' }}>{activePopup.title}</h3>
              <div style={{ height: '6px', width: '80px', background: 'var(--brand-primary)', marginBottom: '2rem', borderRadius: '3px' }}></div>
              <div style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.25rem', 
                lineHeight: '2', 
                whiteSpace: 'pre-wrap', 
                maxHeight: '60vh', 
                overflowY: 'auto',
                paddingRight: '1rem'
              }}>
                {activePopup.popupDescription}
              </div>
              <button 
                onClick={closePopup}
                className="btn-primary" 
                style={{ marginTop: '2.5rem', width: '100%', padding: '1.2rem', fontSize: '1.1rem', fontWeight: '600' }}
              >
                Return to Roadmap
              </button>
            </div>
          </div>
        )}

        <div className="roadmap-header">
          <button onClick={handleBack} className="back-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            &larr; Back to Selection
          </button>
          <div style={{ marginTop: '1.5rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>{selectedRole.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>{selectedRole.description}</p>
          </div>
        </div>

        <div className="roadmap-content" style={{ marginTop: '3rem' }}>
          <div className="timeline">
            {selectedRole.steps.map((step, index) => (
              <div 
                key={step.id} 
                className="timeline-item active" 
                onClick={() => setActivePopup(step)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateX(10px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <div className="node" style={{ backgroundColor: 'var(--brand-primary)', border: 'none', color: 'white' }}>
                  {index + 1}
                </div>
                <div className="timeline-content" style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid transparent', transition: 'all 0.3s ease' }}>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {step.title}
                    <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--brand-primary)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '1rem', opacity: 0.8 }}>
                      Read More
                    </span>
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{step.details}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--brand-primary)', borderRadius: 'var(--radius-xl)', color: 'white', textAlign: 'center', boxShadow: '0 10px 40px rgba(79, 70, 229, 0.2)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚀 Career Roadmap Complete!</h3>
            <p style={{ opacity: 0.9 }}>Following this path consistently will make you a prime candidate for top-tier MNCs like Google, Amazon, and Microsoft.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Career Roadmaps</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Select a role to view a curated learning path designed to help you land a position at a top-tier MNC.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {Object.entries(ROLES).map(([key, role]) => (
          <div 
            key={key} 
            className="card" 
            onClick={() => handleRoleSelect(key)}
            style={{ 
              cursor: 'pointer', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xl)',
              height: '100%'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {key === 'software-developer' && '💻'}
              {key === 'frontend-developer' && '🎨'}
              {key === 'backend-developer' && '⚙️'}
              {key === 'fullstack-developer' && '⚡'}
              {key === 'ai-ml-engineer' && '🤖'}
              {key === 'data-analyst' && '📊'}
              {key === 'cyber-security' && '🔒'}
              {key === 'devops-engineer' && '♾️'}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{role.title}</h3>
            <p style={{ color: 'var(--text-secondary)', flex: 1, marginBottom: '2rem' }}>{role.description}</p>
            <button className="btn-primary" style={{ marginTop: 'auto' }}>View Workflow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmaps;
