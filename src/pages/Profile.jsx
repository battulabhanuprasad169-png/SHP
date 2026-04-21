import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Profile = () => {
    const { user, updateUserInfo } = useAuth();
    const { userStats: stats } = useData();
    const [activeTab, setActiveTab] = useState('dashboard');

    const [editMode, setEditMode] = useState({
        name: user?.name || '',
        bio: user?.bio || 'Passionate about coding and solving problems!',
        institution: user?.institution || 'IIT / NIT / Generic University',
        country: user?.country || 'India',
        gradYear: user?.gradYear || '2026',
        photo: user?.photo || null
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditMode({ ...editMode, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const saveChanges = () => {
        updateUserInfo(editMode);
        alert('Profile Updated Successfully!');
    };

    const RatingGraph = ({ history }) => {
        if (!history || history.length === 0) return null;
        const width = 600;
        const height = 200;
        const padding = 40;
        const maxVal = Math.max(...history, 1000) + 100;
        const minVal = Math.min(...history, 500) - 100;
        
        const points = history.map((val, i) => {
            const x = padding + (i * ((width - 2 * padding) / (Math.max(1, history.length - 1))));
            const y = height - padding - ((val - minVal) / (maxVal - minVal) * (height - 2 * padding));
            return `${x},${y}`;
        }).join(' ');

        return (
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '1rem', overflowX: 'auto' }}>
                <h4 style={{ marginBottom: '1.5rem' }}>Contest Rating Progress</h4>
                <svg width={width} height={height} style={{ overflow: 'visible' }}>
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map(i => {
                        const y = padding + i * (height - 2 * padding) / 4;
                        const val = Math.round(maxVal - i * (maxVal - minVal) / 4);
                        return (
                            <g key={i}>
                                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="var(--border-color)" strokeDasharray="4" />
                                <text x={padding - 35} y={y + 5} fill="var(--text-muted)" fontSize="10">{val}</text>
                            </g>
                        );
                    })}
                    
                    <polyline
                        fill="none"
                        stroke="var(--brand-primary)"
                        strokeWidth="3"
                        points={points}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    {history.map((val, i) => {
                        const x = padding + (i * ((width - 2 * padding) / (Math.max(1, history.length - 1))));
                        const y = height - padding - ((val - minVal) / (maxVal - minVal) * (height - 2 * padding));
                        return (
                            <g key={i}>
                                <circle cx={x} cy={y} r="6" fill="#fff" stroke="var(--brand-primary)" strokeWidth="2" />
                                <text x={x - 10} y={y - 12} fill="var(--text-primary)" fontSize="12" fontWeight="bold">{val}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    };

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1>Profile & Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem', marginTop: '1.5rem' }}>
                <aside style={{ flex: '1' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)', position: 'sticky', top: '2rem' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
                            {editMode.photo ? (
                                <img src={editMode.photo} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--brand-primary)' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#fff' }}>
                                    {user?.name?.[0]?.toUpperCase() || '👤'}
                                </div>
                            )}
                            <label htmlFor="photo-upload" style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--brand-primary)', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid var(--bg-secondary)' }}>
                                📷
                                <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <h3>{user?.name || 'Guest'}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{user?.institution || 'Aspiration University'}</p>
                        
                        <nav style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button 
                                onClick={() => setActiveTab('dashboard')}
                                className={activeTab === 'dashboard' ? 'action-button' : 'outline-button'}
                                style={{ width: '100%', textAlign: 'left' }}
                            >📊 Dashboard</button>
                            <button 
                                onClick={() => setActiveTab('settings')}
                                className={activeTab === 'settings' ? 'action-button' : 'outline-button'}
                                style={{ width: '100%', textAlign: 'left' }}
                            >⚙️ Settings</button>
                            
                            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />
                            
                            <button 
                                onClick={() => {
                                    if(window.confirm('Are you sure you want to logout?')) {
                                        window.location.href = '/login';
                                        // The auth context should ideally be cleared here, but redirecting to login will force a re-check
                                    }
                                }}
                                className="outline-button"
                                style={{ width: '100%', textAlign: 'left', borderColor: 'var(--status-error)', color: 'var(--status-error)' }}
                            >🚪 Logout</button>
                        </nav>
                    </div>
                </aside>
                
                <main style={{ flex: '3' }}>
                    {activeTab === 'dashboard' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                                    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Problems Solved</h4>
                                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.submitted} / {stats.total}</p>
                                </div>
                                <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                                    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Contest Rating</h4>
                                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: 'var(--status-success)' }}>{stats.rating}</p>
                                </div>
                                <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                                    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Contests Done</h4>
                                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.contestsDone || 0}</p>
                                </div>
                            </div>

                            <RatingGraph history={stats.ratingHistory} />

                            <div style={{ padding: '1.5rem', borderLeft: '4px solid var(--brand-primary)', background: 'var(--bg-secondary)', borderRadius: '4px', borderTop: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                                <h4>Learning Recommendation</h4>
                                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                    Your current rating suggests you're ready for <strong>Intermediate Data Structures</strong>. 
                                    Try solving some "Medium" difficulty problems in the Coding Practice section!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3>Account Information</h3>
                                <button type="button" className="action-button" onClick={saveChanges} style={{ padding: '0.6rem 1.5rem' }}>💾 Save Profile</button>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Display Name</label>
                                    <input type="text" value={editMode.name} onChange={e => setEditMode({...editMode, name: e.target.value})} className="admin-input" />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Institution / College</label>
                                    <input type="text" value={editMode.institution} onChange={e => setEditMode({...editMode, institution: e.target.value})} className="admin-input" />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Country</label>
                                    <input type="text" value={editMode.country} onChange={e => setEditMode({...editMode, country: e.target.value})} className="admin-input" />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Expected Graduation</label>
                                    <input type="text" value={editMode.gradYear} onChange={e => setEditMode({...editMode, gradYear: e.target.value})} className="admin-input" />
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Short Bio</label>
                                <textarea 
                                    className="admin-input textarea" 
                                    rows="4" 
                                    value={editMode.bio}
                                    onChange={e => setEditMode({...editMode, bio: e.target.value})}
                                    placeholder="Write a little about your journey..."
                                ></textarea>
                            </div>

                            <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                                <h3>Portal Settings</h3>
                                <label style={{ display: 'block', margin: '1rem 0 0.5rem' }}>Platform Notification Level</label>
                                <select className="admin-input" style={{ maxWidth: '300px' }}>
                                    <option>Priority Only (Contests & Results)</option>
                                    <option>Social (Peer Updates)</option>
                                    <option>Mute All Notifications</option>
                                </select>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Profile;
