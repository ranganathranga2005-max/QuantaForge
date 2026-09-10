import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Lab from './pages/Lab'
import Learn from './pages/Learn'
import AITutor from './pages/AITutor'
import AssessmentProgress from './pages/AssessmentProgress'
import Course from './pages/Course'
import Lesson from './pages/Lesson'
import Assessment from './pages/Assessment'
import Challenge from './pages/Challenge'
import Profile from './pages/Profile'
import LabErrorBoundary from './components/ui/LabErrorBoundary'
import LivingVoidBackground from './components/ui/LivingVoidBackground'
import StudentProfileModal from './components/auth/StudentProfileModal'

// SVG Icons
const IconDashboard = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
const IconLearn = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IconLab = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><circle cx="12" cy="16" r="2.5"/></svg>
const IconChallenges = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 1 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
const IconAI = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 1.1-.9 2-2 2s-2-.9-2-2 2-2 2-2z"/><path d="M12 6v6"/><path d="M8 12h8"/><path d="M8 16h8"/><path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"/></svg>
const IconUser = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>

function App() {
  const [studentProfile, setStudentProfile] = useState(null);
  const [studentProgress, setStudentProgress] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setStudentProfile(data.profile);
          setStudentProgress(data.progress);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Router>
      <LivingVoidBackground />
      <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="sidebar-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2a15 15 0 0 0 0 20"/>
            </svg>
            QUANTUMLEARNING
          </div>

          <div className="sidebar-nav">
            {/* SECTION: LEARN */}
            <div className="sidebar-section-header">LEARN</div>
            <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
              <IconDashboard /> Dashboard
            </NavLink>
            <NavLink to="/learn" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <IconLearn /> Curriculum
            </NavLink>
            <NavLink to="/assessment" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <IconChallenges /> Assessments & Progress
            </NavLink>

            {/* SECTION: DESIGN & SIMULATE */}
            <div className="sidebar-section-header">DESIGN & SIMULATE</div>
            <NavLink to="/lab" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <IconLab /> Quantum Lab
            </NavLink>

            {/* SECTION: ASSIST */}
            <div className="sidebar-section-header">ASSIST</div>
            <NavLink to="/ai-tutor" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <IconAI /> AI Tutor
            </NavLink>

            {/* SECTION: ACCOUNT */}
            <div className="sidebar-section-header">ACCOUNT</div>
            <NavLink to="/profile" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <IconUser /> Student Profile
            </NavLink>
          </div>
        </div>

        {/* Student Account Button */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid var(--border-active)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontFamily: 'monospace'
            }}
          >
            <IconUser />
            <div style={{ textAlign: 'left', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {studentProfile ? studentProfile.username : 'Student Account'}
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)' }}>
              {studentProfile ? studentProfile.level : 'Sign In'}
            </span>
          </button>
        </div>
      </div>

      <div className="workspace">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/curriculum" element={<Navigate to="/learn" replace />} />
          <Route path="/learning" element={<Learn />} />
          <Route path="/learning/courses/:courseId" element={<Course />} />
          <Route path="/learning/lessons/:lessonId" element={<Lesson />} />
          <Route path="/learning/assessments/:assessmentId" element={<Assessment />} />
          <Route path="/learning/challenges/:challengeId" element={<Challenge />} />
          <Route path="/assessment" element={<AssessmentProgress />} />
          <Route path="/progress" element={<Navigate to="/assessment" replace />} />
          <Route path="/challenges" element={<Navigate to="/assessment" replace />} />
          <Route path="/lab" element={<LabErrorBoundary><Lab /></LabErrorBoundary>} />
          <Route path="/algorithms" element={<Navigate to="/learn" replace />} />
          <Route path="/experiments" element={<Navigate to="/lab" replace />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <StudentProfileModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        studentProfile={studentProfile}
        studentProgress={studentProgress}
        onAuthSuccess={(data) => {
          setStudentProfile(data.profile);
          setStudentProgress(data.progress);
        }}
      />
    </Router>
  )
}

export default App

