import { useParams, Navigate, Link } from 'react-router-dom';
import './Roadmap.css';

const PHASES = {
  foundational: {
    title: 'Phase 1: Foundational Frameworks',
    description: 'Basic Aptitude, Core Programming concepts, and Syntax familiarity.',
    modules: [
      { id: 1, title: 'Introduction to Core Logic', status: 'completed' },
      { id: 2, title: 'Quantitative Aptitude (Basics)', status: 'completed' },
      { id: 3, title: 'Verbal Reasoning', status: 'completed' },
    ]
  },
  intermediate: {
    title: 'Phase 2: Intermediate Synthesis',
    description: 'Data Structures, Advanced Logic, and algorithmic thinking.',
    modules: [
      { id: 4, title: 'Arrays & Strings', status: 'completed' },
      { id: 5, title: 'Linked Lists & Trees', status: 'in-progress' },
      { id: 6, title: 'Advanced Logical Reasoning', status: 'locked' },
    ]
  },
  'company-specialized': {
    title: 'Phase 3: Company-Specialized Environment',
    description: 'Simulated exam environments tailored for target corporations (TCS, Infosys).',
    modules: [
      { id: 7, title: 'TCS NQT Simulation Pattern', status: 'locked' },
      { id: 8, title: 'Infosys Pseudocode & HackWithInfy', status: 'locked' },
      { id: 9, title: 'Wipro Elite NLTH Format', status: 'locked' },
    ]
  },
  'career-ready': {
    title: 'Phase 4: Career-Ready Execution',
    description: 'Resume optimization, HR behavioral simulations, and corporate readiness.',
    modules: [
      { id: 10, title: 'Resume ATS Optimization', status: 'locked' },
      { id: 11, title: 'HR Response Strategies', status: 'locked' },
      { id: 12, title: 'Final Technical Mock Interview', status: 'locked' },
    ]
  }
};

const RoadmapPhase = () => {
  const { phaseId } = useParams();
  
  const currentPhase = PHASES[phaseId];
  
  if (!currentPhase) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="roadmap-container slide-in">
      <div className="roadmap-header">
        <Link to="/dashboard" className="back-link">&larr; Back to Dashboard</Link>
        <h2>{currentPhase.title}</h2>
        <p>{currentPhase.description}</p>
      </div>

      <div className="roadmap-content">
        <div className="timeline">
          {currentPhase.modules.map((module, index) => (
            <div key={module.id} className={`timeline-item ${module.status}`}>
              <div className="node">
                {module.status === 'completed' && '✓'}
                {module.status === 'in-progress' && '▶'}
                {module.status === 'locked' && '🔒'}
              </div>
              <div className="timeline-content">
                 <h3>{module.title}</h3>
                 <span className={`status-badge ${module.status}`}>
                   {module.status === 'in-progress' ? 'In Progress' : module.status}
                 </span>
                 {module.status !== 'locked' && (
                   <button className="roadmap-action-btn">
                     {module.status === 'completed' ? 'Review Topic' : 'Continue Module'}
                   </button>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPhase;
