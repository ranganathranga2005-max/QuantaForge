import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import QuantumBrandLogo from '../components/ui/QuantumBrandLogo';

/**
 * ContextualNavigation.jsx
 * Minimal top bar replacing the wide permanent sidebar.
 * Exposes contextual links based on active learner mode and goal.
 */
export default function ContextualNavigation({
  learningState,
  onResetGoal
}) {
  const location = useLocation();
  const goal = learningState?.goal || 'academic';

  return (
    <header
      style={{
        height: '64px',
        width: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.25)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '0 24px',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        zIndex: 9900
      }}
    >
      {/* Brand & Goal Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <QuantumBrandLogo variant="full" size="sm" />

        {learningState && (
          <div
            onClick={onResetGoal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#38BDF8',
              transition: 'all 0.15s ease'
            }}
            title="Click to change goal or reset path"
          >
            <span>DESTINATION: {goal.toUpperCase()}</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>✏️</span>
          </div>
        )}
      </div>

      {/* Contextual Navigation Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
          end
          style={{ textDecoration: 'none' }}
        >
          🗺️ Path Roadmap
        </NavLink>

        <NavLink
          to="/lab"
          className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
          style={{ textDecoration: 'none' }}
        >
          🧪 Quantum Lab
        </NavLink>

        {goal === 'research' && (
          <NavLink
            to="/research"
            className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
            style={{ textDecoration: 'none' }}
          >
            🔬 Research Surface
          </NavLink>
        )}

        {goal === 'career' && (
          <NavLink
            to="/opportunities"
            className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
            style={{ textDecoration: 'none' }}
          >
            💼 Opportunities & Projects
          </NavLink>
        )}

        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
          style={{ textDecoration: 'none' }}
        >
          👤 Profile
        </NavLink>
      </nav>

      <style>{`
        .nav-pill {
          padding: 6px 14px;
          border-radius: 8px;
          color: #94A3B8;
          font-size: 0.85rem;
          font-weight: 700;
          transition: all 0.15s ease;
        }
        .nav-pill:hover {
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.08);
        }
        .nav-pill.active {
          color: #38BDF8;
          background-color: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.3);
        }
      `}</style>
    </header>
  );
}
