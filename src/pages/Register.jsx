import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirmPassword: ''
  });
  const { hasSeenIntro, markIntroSeen, registerUser } = useAuth();
  const [isPulling, setIsPulling] = useState(false);
  const navigate = useNavigate();

  const handleStartIntro = () => {
    setIsPulling(true);
    setTimeout(() => {
      markIntroSeen();
    }, 1200); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const result = registerUser(formData.username, formData.email, formData.password);
    if (result.success) {
       alert('Registration successful! You can now log in.');
       navigate('/login');
    } else {
       alert(result.message);
    }
  };

  return (
    <div className="auth-container">
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
            <div className="start-prompt">Click to Begin Journey</div>
          </div>
          <div className="intro-text">
             <h1 className="glow-text">Smart Hiring Portal</h1>
             <p>Register to unlock your career potential</p>
          </div>
        </div>
      ) : (
        <div className="auth-card fade-in pulled-in">
          <div className="auth-header">
            <div className="auth-logo-circle pulsing">SHP</div>
            <h2>Create Account</h2>
            <p>Join the next generation of top talent</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group-animated">
              <div className="input-with-icon-animated">
                <span className="input-icon-animated">👤</span>
                <input 
                  type="text" value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder=" " required 
                />
                <label className="floating-label">Username</label>
                <div className="input-focus-line"></div>
              </div>
            </div>

            <div className="form-group-animated">
              <div className="input-with-icon-animated">
                <span className="input-icon-animated">📧</span>
                <input 
                  type="email" value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder=" " required 
                />
                <label className="floating-label">Email Address</label>
                <div className="input-focus-line"></div>
              </div>
            </div>

            <div className="form-group-animated">
              <div className="input-with-icon-animated">
                <span className="input-icon-animated">🔒</span>
                <input 
                  type="password" value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder=" " required 
                />
                <label className="floating-label">Password</label>
                <div className="input-focus-line"></div>
              </div>
            </div>

            <div className="form-group-animated">
              <div className="input-with-icon-animated">
                <span className="input-icon-animated">🛡️</span>
                <input 
                  type="password" value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder=" " required 
                />
                <label className="floating-label">Confirm Password</label>
                <div className="input-focus-line"></div>
              </div>
            </div>

            <button type="submit" className="auth-submit pulse-hover">Create My Account</button>
            <div className="auth-footer">
              <p>Already have an account? <Link to="/login" className="highlight-link">Sign in</Link></p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
