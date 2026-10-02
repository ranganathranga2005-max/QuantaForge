import React, { useState } from 'react';
import { GOAL_TYPES } from './LearningState';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * GoalDiscoveryScene.jsx
 * Floating Orbital Portals directly on open 3D space.
 * ZERO CARD CONTAINERS / ZERO BOXES.
 */
export default function GoalDiscoveryScene({ onGoalSelected }) {
  const [hoveredPortal, setHoveredPortal] = useState(null);

  const portals = [
    {
      key: GOAL_TYPES.CAREER,
      title: 'Quantum Algorithm Developer',
      icon: '💼',
      tagline: 'Qiskit transpilation & developer portfolio',
      color: '#38BDF8'
    },
    {
      key: GOAL_TYPES.RESEARCH,
      title: 'Quantum Research & Gap Discovery',
      icon: '🔬',
      tagline: 'VQE/QAOA algorithms & noise models',
      color: '#C084FC'
    },
    {
      key: GOAL_TYPES.ACADEMIC,
      title: 'Master Quantum Physics & Computing',
      icon: '🎓',
      tagline: 'Dirac notation & statevector mechanics',
      color: '#34D399'
    },
    {
      key: GOAL_TYPES.EXPLORE,
      title: 'Explore Quantum Computing Fundamentals',
      icon: '🌱',
      tagline: 'Visual qubit manipulation & zero math',
      color: '#FBBF24'
    }
  ];

  const handleSelect = (key) => {
    genieEvents.emit(GENIE_EVENTS.GOAL_SELECTED, key);
    if (onGoalSelected) onGoalSelected(key);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '720px', marginBottom: '56px', animation: 'fadeInDown 0.8s ease-out' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: '1.1',
            margin: '0 0 16px 0',
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #FFFFFF 40%, #7DD3FC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Where do you want to go?
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#94A3B8', margin: 0 }}>
          Hover over a portal to inspect your destination in the quantum world.
        </p>
      </div>

      {/* 4 Floating Spatial Orbital Portals (NO CARDS / NO BOXES) */}
      <div
        style={{
          display: 'flex',
          justify: 'center',
          gap: '32px',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          width: '100%',
          padding: '0 24px',
          boxSizing: 'border-box'
        }}
      >
        {portals.map(p => {
          const isHovered = hoveredPortal === p.key;

          return (
            <div
              key={p.key}
              onClick={() => handleSelect(p.key)}
              onMouseEnter={() => setHoveredPortal(p.key)}
              onMouseLeave={() => setHoveredPortal(null)}
              style={{
                width: '220px',
                height: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justify: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'scale(1.12) translateY(-16px)' : 'scale(1) translateY(0)',
                position: 'relative'
              }}
            >
              {/* Glowing Orbital Ring Icon */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${p.color} 0%, rgba(15, 23, 42, 0.6) 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  fontSize: '2.8rem',
                  marginBottom: '20px',
                  boxShadow: isHovered
                    ? `0 0 50px ${p.color}90, inset 0 0 20px rgba(255,255,255,0.6)`
                    : `0 0 25px ${p.color}40`,
                  border: isHovered ? `2px solid ${p.color}` : '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.4s ease'
                }}
              >
                {p.icon}
              </div>

              {/* Portal Label */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {p.title.split(' ')[0]} {p.title.split(' ')[1]}
              </h3>

              <p style={{ fontSize: '0.825rem', color: '#94A3B8', lineHeight: '1.4', margin: 0 }}>
                {p.tagline}
              </p>

              {/* Hover Enter Action */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-12px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: p.color,
                    letterSpacing: '1px'
                  }}
                >
                  ENTER PORTAL →
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
