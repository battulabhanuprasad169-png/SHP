import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css'; 

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [error, setError] = useState('');
  const { hasSeenIntro, markIntroSeen, login } = useAuth();
  const [isPulling, setIsPulling] = useState(false);
  const navigate = useNavigate();

  const handleStartIntro = () => {
    setIsPulling(true);
    setTimeout(() => {
      markIntroSeen();
    }, 1200); 
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const result = login(role, identifier, password);

    if (result.success) {
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Animated background blobs */}
      <div className="auth-bg-blob blob-1"></div>
      <div className="auth-bg-blob blob-2"></div>
      <div className="auth-bg-blob blob-3"></div>

      {!hasSeenIntro ? (
        <div className={`intro-screen ${isPulling ? 'is-pulling' : ''}`}>
          <div className="cyclist-anchor" onClick={!isPulling ? handleStartIntro : undefined}>
            <div className="cyclist-container">
              <span className="cyclist">🚴‍♂️</span>
              <div className="rope"></div>
            </div>
            <div className="start-prompt">Click to Start Journey</div>
          </div>
          <div className="intro-text">
             <h1 className="glow-text">Smart Hiring Portal</h1>
             <p>The journey to your dream career starts here</p>
          </div>
        </div>
      ) : (
        <div className="auth-card fade-in pulled-in">
          <div className="auth-header">
            <div className="auth-logo-circle pulsing">SHP</div>
            <h2>Welcome Back</h2>
            <p>Elevate your potential with Smart Hiring Portal</p>
          </div>

          <div className="role-toggle">
            <button 
              type="button"
              className={role === 'student' ? 'active' : ''} 
              onClick={() => setRole('student')}
            >
              Student Access
            </button>
            <button 
              type="button"
              className={role === 'admin' ? 'active' : ''} 
              onClick={() => setRole('admin')}
            >
              Admin Panel
            </button>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            {error && (
              <div className="error-message slide-in">
                <span>⚠️</span> {error}
              </div>
            )}
            
            <div className="form-group-animated">
              <div className="input-with-icon-animated">
                  <span className="input-icon-animated">👤</span>
                  <input 
                    type="text" 
                    id="identifier" 
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder=" " 
                    required 
                  />
                  <label className="floating-label" htmlFor="identifier">Identifer (Username / Email)</label>
                  <div className="input-focus-line"></div>
              </div>
            </div>

            <div className="form-group-animated">
              <div className="input-with-icon-animated">
                  <span className="input-icon-animated">🔒</span>
                  <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" " 
                    required 
                  />
                  <label className="floating-label" htmlFor="password">Security Key (Password)</label>
                  <div className="input-focus-line"></div>
              </div>
            </div>
            
            <button type="submit" className="auth-submit pulse-hover">
              Unlock {role === 'student' ? 'Student Dashboard' : 'Admin Nexus'}
            </button>
          </form>

          {role === 'student' && (
            <div className="auth-footer">
              <p>New here? <Link to="/register" className="highlight-link">Create an Account</Link></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
