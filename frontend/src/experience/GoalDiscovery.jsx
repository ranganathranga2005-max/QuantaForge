import React, { useState } from 'react';
import { GOAL_TYPES } from './LearningState';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * GoalDiscovery.jsx
 * Immersive Entry Scene & Goal Destination Selection.
 * NO BLOCKING MODALS! Genie is conversationally present.
 */
export default function GoalDiscovery({ onGoalSelected }) {
  const [hoveredGoal, setHoveredGoal] = useState(null);

  const destinations = [
    {
      key: GOAL_TYPES.CAREER,
      title: 'Quantum Algorithm Developer',
      icon: '💼',
      tagline: 'Build industry quantum algorithms, master Qiskit transpilation, and build a developer portfolio.',
      badge: 'Industry Focus',
      color: '#3B82F6'
    },
    {
      key: GOAL_TYPES.RESEARCH,
      title: 'Quantum Research & Gap Discovery',
      icon: '🔬',
      tagline: 'Explore literature limitations, simulate noise models, and design novel variational algorithms.',
      badge: 'Advanced / Postgrad',
      color: '#A855F7'
    },
    {
      key: GOAL_TYPES.ACADEMIC,
      title: 'Master Quantum Physics & Computing',
      icon: '🎓',
      tagline: 'Excel in academic coursework with Dirac notation, statevectors, and structured concept mastery.',
      badge: 'Coursework Mastery',
      color: '#10B981'
    },
    {
      key: GOAL_TYPES.EXPLORE,
      title: 'Explore Quantum Computing Fundamentals',
      icon: '🌱',
      tagline: 'Grasp intuitive quantum phenomena with visual qubit manipulation and zero complex math.',
      badge: 'Intuitive & Visual',
      color: '#F59E0B'
    }
  ];

  const handleSelect = (key) => {
    genieEvents.emit(GENIE_EVENTS.GOAL_SELECTED, key);
    if (onGoalSelected) onGoalSelected(key);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box'
      }}
    >
      {/* Header Title */}
      <div style={{ textAlign: 'center', maxWidth: '720px', marginBottom: '40px' }}>
        <div style={{
          fontSize: '0.85rem',
          fontWeight: 800,
          letterSpacing: '2px',
          color: '#38BDF8',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          Living Quantum Learning Environment
        </div>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: '1.15',
          margin: '0 0 16px 0',
          background: 'linear-gradient(135deg, #FFFFFF 30%, #93C5FD 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Choose Your Destination
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: '#94A3B8',
          lineHeight: '1.6',
          margin: 0
        }}>
          Where do you want to take your quantum journey? Your path, recommendations, and environment will adapt dynamically.
        </p>
      </div>

      {/* Destination Grid Cards (4 Interactive Destinations) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          width: '100%',
          maxWidth: '1100px'
        }}
      >
        {destinations.map(dest => {
          const isHovered = hoveredGoal === dest.key;
          return (
            <div
              key={dest.key}
              onClick={() => handleSelect(dest.key)}
              onMouseEnter={() => setHoveredGoal(dest.key)}
              onMouseLeave={() => setHoveredGoal(null)}
              style={{
                position: 'relative',
                padding: '28px 24px',
                borderRadius: '20px',
                background: isHovered
                  ? `linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))`
                  : 'rgba(15, 23, 42, 0.75)',
                border: isHovered
                  ? `1px solid ${dest.color}`
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered
                  ? `0 20px 40px -15px ${dest.color}40, 0 0 25px ${dest.color}30`
                  : '0 10px 30px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '2.5rem' }}>{dest.icon}</div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: `${dest.color}25`,
                      color: dest.color,
                      border: `1px solid ${dest.color}50`
                    }}
                  >
                    {dest.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
                  {dest.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                  {dest.tagline}
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: dest.color
                }}
              >
                Enter Destination →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
