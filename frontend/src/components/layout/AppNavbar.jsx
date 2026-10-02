import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import QuantumBrandLogo from '../ui/QuantumBrandLogo';

/**
 * AppNavbar.jsx
 * Global Product Navigation Bar supporting two first-class product roles:
 * 1. STUDENT: Home, Learn, Play, Build, Challenges, Projects, Opportunities + Contextual Links.
 * 2. TUTOR / EDUCATOR: Dashboard, Courses, Content Studio, Cohorts, Analytics, Project Reviews.
 * Includes instant [ Student ↔ Tutor/Educator ] role switcher toggle and active goal pill.
 */
export default function AppNavbar({
  userRole = 'student',
  onRoleChange,
  studentGoal = 'Quantum Software Engineer',
  onToggleGenie
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isStudent = userRole === 'student';

  const handleRoleToggle = () => {
    const nextRole = isStudent ? 'tutor' : 'student';
    if (onRoleChange) onRoleChange(nextRole);
    if (nextRole === 'tutor') {
      navigate('/tutor');
    } else {
      navigate('/');
    }
  };

  return (
    <header
      style={{
        height: '64px',
        width: '100%',
        backgroundColor: '#0F1626',
        borderBottom: '1px solid rgba(0, 242, 254, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '0 24px',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        zIndex: 9900,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Left: Brand Identity & Role Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate(isStudent ? '/' : '/tutor')}>
          <QuantumBrandLogo variant="full" size="sm" />
        </div>

        {/* Global Role Switcher */}
        <div
          onClick={handleRoleToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            borderRadius: '9999px',
            background: isStudent ? 'rgba(0, 242, 254, 0.12)' : 'rgba(121, 40, 202, 0.2)',
            border: isStudent ? '1px solid rgba(0, 242, 254, 0.35)' : '1px solid rgba(121, 40, 202, 0.5)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: isStudent ? '#00F2FE' : '#C084FC',
            transition: 'all 0.2s ease'
          }}
          title="Click to switch between Student and Tutor/Educator experience"
        >
          <span>ROLE: {isStudent ? 'STUDENT 🎓' : 'TUTOR / EDUCATOR 🧑‍🏫'}</span>
          <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>⇄ SWITCH</span>
        </div>

        {/* Active Student Goal Pill */}
        {isStudent && studentGoal && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              background: '#141E33',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.7rem',
              color: '#94A3B8',
              fontWeight: 600
            }}
          >
            <span>GOAL:</span>
            <span style={{ color: '#F8FAFC', fontWeight: 700 }}>{studentGoal}</span>
          </div>
        )}
      </div>

      {/* Center / Right: Primary Navigation Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {isStudent ? (
          <>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              🏠 Home
            </NavLink>
            <NavLink to="/learn" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              📖 Learn
            </NavLink>
            <NavLink to="/play" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              🎮 Play
            </NavLink>
            <NavLink to="/lab" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              🧪 Build (Lab)
            </NavLink>
            <NavLink to="/challenges" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              ⚡ Challenges
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              📂 Projects
            </NavLink>
            <NavLink to="/problems" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              🌐 Problems
            </NavLink>
            <NavLink to="/opportunities" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              💼 Opportunities
            </NavLink>
            <NavLink to="/identity" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              🛡️ Identity
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/tutor" end className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              📊 Cohort Analytics
            </NavLink>
            <NavLink to="/tutor/studio" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              🛠️ Content Studio
            </NavLink>
            <NavLink to="/tutor/courses" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              📚 Courses & Lessons
            </NavLink>
            <NavLink to="/tutor/projects" className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              📝 Project Reviews
            </NavLink>
          </>
        )}

        {/* AI Genie Quick Toggle */}
        <button
          onClick={onToggleGenie}
          style={{
            marginLeft: '12px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #00F2FE, #7928CA)',
            border: 'none',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0, 242, 254, 0.3)'
          }}
        >
          <span>🧞 AI Companion</span>
        </button>
      </nav>

      <style>{`
        .nav-pill {
          padding: 6px 12px;
          border-radius: 8px;
          color: #94A3B8;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.15s ease;
        }
        .nav-pill:hover {
          color: #F8FAFC;
          background-color: #141E33;
        }
        .nav-pill.active {
          color: #00F2FE;
          background-color: #141E33;
          font-weight: 700;
          border-bottom: 2px solid #00F2FE;
        }
      `}</style>
    </header>
  );
}
