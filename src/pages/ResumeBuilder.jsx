import React, { useState, useRef } from 'react';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
    const resumeRef = useRef();
    const [step, setStep] = useState('select'); // 'select' or 'edit'
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    
    const [data, setData] = useState({
        personal: {
            name: "HARISH KUMAR",
            phone: "+91-9876543210",
            email: "harishkumar@gmail.com",
            address: "Chennai, India",
            platforms: [
                { label: 'LinkedIn', url: 'linkedin.com/in/HarishKumar' },
                { label: 'GitHub', url: 'github.com/harish' }
            ]
        },
        summary: "Ambitious Software Engineer with a passion for building scalable web applications. Experienced in full-stack development, cloud computing, and AI-driven automation.",
        education: [
            {
                institution: "Indian Institute of Technology (IIT) Madras",
                location: "Chennai, India",
                degree: "Bachelor of Technology in Computer Science",
                tenure: "Aug 2018 - May 2022",
                marks: "9.2 CGPA"
            }
        ],
        experience: [
            {
                company: "Amazon India",
                role: "Software Development Engineer - I",
                location: "Bangalore",
                tenure: "Jul 2022 - Present",
                description: "Developed microservices improving latency by 30%. Implemented DynamoDB and Redis caching to reduce DB queries by 40%. Collaborated with cross-functional teams to deliver scalable solutions."
            }
        ],
        projects: [
            {
                name: "Scalable URL Shortener",
                repo: "github.com/harish/url-shortener",
                description: "Built a distributed URL shortening service handling 5M+ daily requests using AWS Lambda and API Gateway."
            },
            {
                name: "AI Resume Parser",
                repo: "github.com/harish/analyzer",
                description: "Developed ML-powered resume parser with 92% accuracy using spaCy and modern NLP techniques."
            }
        ],
        skills: ["Java", "Python", "React.js", "Node.js", "AWS", "Docker", "Git", "C++", "SQL"],
        achievements: [
            "Ranked 200 in Google Kick Start 2021",
            "1st place in National Level Code-a-thon",
            "IEEE Published Researcher"
        ],
        interests: ["Cloud Native", "Open Source", "Chess"]
    });

    const templates = [
        { id: 1, name: "Format 1: ATS Gold (Jake's Style)", image: "/resume_template_1.png", desc: "The industry standard for Software Engineers. Clean and ATS-friendly." },
        { id: 2, name: "Format 2: Pragmatic Modern", image: "/resume_template_2.png", desc: "Professional tech-focused layout with clear lines and centered headers." },
        { id: 3, name: "Format 3: Executive Classic", image: "/resume_template_3.png", desc: "Bold headers and structured columns for an authoritative look." },
        { id: 4, name: "Format 4: Minimalist Student", image: "/resume_template_4.png", desc: "Clean academic layout perfect for students and new grads." }
    ];

    const updatePersonal = (field, val) => setData({ ...data, personal: { ...data.personal, [field]: val } });
    const updateSectionEntry = (section, index, field, val) => {
        const entries = [...data[section]];
        if (typeof entries[index] === 'object') entries[index][field] = val;
        else entries[index] = val;
        setData({ ...data, [section]: entries });
    };
    const addSectionEntry = (section, template) => setData({ ...data, [section]: [...data[section], template] });
    const removeSectionEntry = (section, index) => {
        const entries = data[section].filter((_, i) => i !== index);
        setData({ ...data, [section]: entries });
    };

    const handlePrint = () => window.print();

    if (step === 'select') {
        return (
            <div className="template-selection-container">
                <div className="selection-header">
                    <h1>Select Resume Pattern</h1>
                    <p>Choose from 4 industry-leading formats optimized for 2026</p>
                </div>
                <div className="templates-grid">
                    {templates.map(tmp => (
                        <div key={tmp.id} className={`template-card pulse-hover ${selectedTemplate === tmp.id ? 'active' : ''}`} onClick={() => { setSelectedTemplate(tmp.id); setStep('edit'); }}>
                            <div className="template-preview-img">
                                <span className="template-badge">#{tmp.id}</span>
                                <div className="img-placeholder" style={{backgroundImage: `url(${tmp.image})`}}></div>
                            </div>
                            <h3>{tmp.name}</h3>
                            <p className="tmp-desc">{tmp.desc}</p>
                            <button className="select-btn">Customize Template</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const renderHeader = () => {
        switch (selectedTemplate) {
            case 1: return (
                <div className="t1-header">
                    <h1>{data.personal.name}</h1>
                    <div className="t1-contact-row">
                        <span>{data.personal.phone}</span> • <span>{data.personal.email}</span> • <span>{data.personal.address}</span>
                    </div>
                </div>
            );
            case 2: return (
                <div className="t2-header">
                    <h1 className="t2-name">{data.personal.name}</h1>
                    <div className="t2-links-bar">
                         {data.personal.platforms.map((p, i) => <a key={i} href={p.url}>{p.url}</a>)}
                    </div>
                </div>
            );
            case 3: return (
                <div className="t3-header">
                    <div className="t3-split">
                        <h1>{data.personal.name}</h1>
                        <div className="t3-right">
                            <p>{data.personal.email}</p>
                            <p>{data.personal.phone}</p>
                        </div>
                    </div>
                </div>
            );
            case 4: return (
                <div className="t4-header">
                    <h1 className="t4-name-blue">{data.personal.name}</h1>
                    <p className="t4-sub">{data.personal.email} | {data.personal.phone} | {data.personal.address}</p>
                </div>
            );
            default: return null;
        }
    };

    const renderSection = (title, content) => (
        <div className={`template-section ts-${selectedTemplate}`}>
            <h2 className={`section-title st-${selectedTemplate}`}>{title}</h2>
            {content}
        </div>
    );

    return (
        <div className="resume-builder-container">
            <button className="back-btn-pill" onClick={() => setStep('select')}>← Switch Pattern</button>
            
            <div className="resume-editor">
                <div className="editor-intro">
                    <h2>Resume Details</h2>
                    <p>Enter your information below to update your resume in real-time.</p>
                </div>

                <div className="editor-group">
                    <div className="group-title">Personal Information</div>
                    <div className="input-grid">
                        <div className="form-item"><label>Name</label><input value={data.personal.name} onChange={e => updatePersonal('name', e.target.value)} /></div>
                        <div className="form-item"><label>Phone</label><input value={data.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} /></div>
                        <div className="form-item"><label>Email</label><input value={data.personal.email} onChange={e => updatePersonal('email', e.target.value)} /></div>
                        <div className="form-item"><label>Location</label><input value={data.personal.address} onChange={e => updatePersonal('address', e.target.value)} /></div>
                    </div>
                </div>

                <div className="editor-group">
                    <div className="group-header">
                        <div className="group-title">Education</div>
                        <button className="add-v2" onClick={() => addSectionEntry('education', { institution: '', location: '', degree: '', tenure: '', marks: '' })}>+ Add</button>
                    </div>
                    {data.education.map((edu, i) => (
                        <div key={i} className="entry-v2">
                            <input placeholder="Institution" value={edu.institution} onChange={e => updateSectionEntry('education', i, 'institution', e.target.value)} />
                            <div className="row-v2">
                                <input placeholder="Degree" value={edu.degree} onChange={e => updateSectionEntry('education', i, 'degree', e.target.value)} />
                                <input placeholder="Year" value={edu.tenure} onChange={e => updateSectionEntry('education', i, 'tenure', e.target.value)} />
                            </div>
                            <button className="del-btn" onClick={() => removeSectionEntry('education', i)}>Remove Entry</button>
                        </div>
                    ))}
                </div>

                <div className="editor-group">
                    <div className="group-header">
                        <div className="group-title">Experience</div>
                        <button className="add-v2" onClick={() => addSectionEntry('experience', { company: '', role: '', location: '', tenure: '', description: '' })}>+ Add</button>
                    </div>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="entry-v2">
                            <input placeholder="Company" value={exp.company} onChange={e => updateSectionEntry('experience', i, 'company', e.target.value)} />
                            <input placeholder="Role" value={exp.role} onChange={e => updateSectionEntry('experience', i, 'role', e.target.value)} />
                            <textarea placeholder="Job Description" value={exp.description} onChange={e => updateSectionEntry('experience', i, 'description', e.target.value)} />
                            <button className="del-btn" onClick={() => removeSectionEntry('experience', i)}>Remove Entry</button>
                        </div>
                    ))}
                </div>

                <div className="editor-group">
                    <div className="group-title">Skills (Comma separated)</div>
                    <textarea className="skills-blob" value={data.skills.join(', ')} onChange={e => setData({...data, skills: e.target.value.split(',').map(s => s.trim())})} />
                </div>
            </div>

            <div className="resume-preview-panel">
                <div className="preview-header-bar">
                    <div className="format-info">
                        <strong>Live Preview</strong>
                        <span>Format: {templates.find(t => t.id === selectedTemplate).name}</span>
                    </div>
                    <button className="final-download-btn" onClick={handlePrint}>📥 Download Final PDF</button>
                </div>

                <div className={`resume-paper theme-${selectedTemplate}`} ref={resumeRef}>
                    {renderHeader()}

                    {renderSection("Education", (
                        <div className="entries-list">
                            {data.education.map((edu, i) => (
                                <div key={i} className="entry-item">
                                    <div className="item-main">
                                        <strong>{edu.institution}</strong>
                                        <span>{edu.tenure}</span>
                                    </div>
                                    <div className="item-sub">
                                        <em>{edu.degree}</em>
                                        <span>{edu.location}</span>
                                    </div>
                                    {edu.marks && <div className="item-note">CGPA: {edu.marks}</div>}
                                </div>
                            ))}
                        </div>
                    ))}

                    {renderSection("Experience", (
                        <div className="entries-list">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="entry-item">
                                    <div className="item-main">
                                        <strong>{exp.company}</strong>
                                        <span>{exp.tenure}</span>
                                    </div>
                                    <div className="item-sub">
                                        <em>{exp.role}</em>
                                        <span>{exp.location}</span>
                                    </div>
                                    <p className="item-para">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}

                    {renderSection("Projects", (
                        <div className="entries-list">
                            {data.projects.map((proj, i) => (
                                <div key={i} className="entry-item">
                                    <div className="item-main">
                                        <strong>{proj.name}</strong>
                                        <span className="tiny-link">{proj.repo}</span>
                                    </div>
                                    <p className="item-para">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}

                    {renderSection("Skills", (
                        <div className="skills-wrap">
                            {data.skills.map((s, i) => <span key={i} className="skill-unit">{s}{i < data.skills.length - 1 ? ', ' : ''}</span>)}
                        </div>
                    ))}

                    {renderSection("Achievements", (
                        <ul className="achie-list">
                            {data.achievements.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                    ))}
                </div>
                <p className="print-hint">Make sure to select <strong>'Save as PDF'</strong> and set orientation to <strong>'Portrait'</strong> in the print settings.</p>
            </div>
        </div>
    );
};

export default ResumeBuilder;
