import React from 'react';
import QuantumBrandLogo from '../components/ui/QuantumBrandLogo';

/**
 * MinimalGlobalChrome.jsx
 * Ultra-Minimal Global Overlay — ZERO NAVBARS, ZERO CATEGORY TABS.
 */
export default function MinimalGlobalChrome({
  goal = 'ACADEMIC',
  currentWorldState = 'discovery',
  onBackToRoadmap,
  onResetGoal
}) {
  const showBackToPath = ['mission', 'experiment', 'result', 'lab', 'puzzle', 'proof'].includes(currentWorldState);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        padding: '24px 36px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        pointerEvents: 'none',
        zIndex: 9900,
        boxSizing: 'border-box'
      }}
    >
      {/* Top-Left: Minimal QuantumLearning Mark & Contextual Back Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', pointerEvents: 'auto' }}>
        <QuantumBrandLogo variant="full" size="sm" />

        {showBackToPath && (
          <button
            onClick={onBackToRoadmap}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38BDF8',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease'
            }}
          >
            ← PATH
          </button>
        )}
      </div>

      {/* Top-Right: Small Learner Destination Status Pill */}
      <div style={{ pointerEvents: 'auto' }}>
        {goal && (
          <div
            onClick={onResetGoal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#E2E8F0',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease'
            }}
            title="Click to change destination goal"
          >
            <span style={{ color: '#38BDF8', textTransform: 'uppercase' }}>{goal}</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>✏️</span>
          </div>
        )}
      </div>
    </div>
  );
}
