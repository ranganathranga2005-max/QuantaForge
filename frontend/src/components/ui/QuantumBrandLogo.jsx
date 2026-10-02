import React from 'react';

/**
 * Unified QuantumLearning Brand Identity Logo Mark
 * Communicates: QUANTUM + LEARNING + ADAPTIVE INTELLIGENCE
 */
export default function QuantumBrandLogo({ variant = 'full', size = 'md', className = '' }) {
  const isCompact = variant === 'icon';
  const isLarge = variant === 'large';

  const iconSize = isLarge ? 36 : size === 'sm' ? 20 : 24;

  return (
    <div
      className={`quantum-brand-identity ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isLarge ? '14px' : '10px',
        userSelect: 'none'
      }}
    >
      <div
        style={{
          width: isLarge ? '48px' : size === 'sm' ? '32px' : '40px',
          height: isLarge ? '48px' : size === 'sm' ? '32px' : '40px',
          borderRadius: isLarge ? '14px' : '10px',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
          flexShrink: 0
        }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Quantum Orbit */}
          <circle cx="12" cy="12" r="9" strokeOpacity="0.8" />
          {/* Inner Qubit Nucleus */}
          <circle cx="12" cy="12" r="3" fill="#2563EB" fillOpacity="0.15" />
          {/* Superposition Wave Arcs */}
          <path d="M12 3a9 9 0 0 1 9 9" />
          <path d="M12 3a13 13 0 0 0 0 18" />
          {/* Learning Spark Node */}
          <circle cx="12" cy="12" r="1" fill="#2563EB" />
        </svg>
      </div>

      {!isCompact && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: isLarge ? '1.35rem' : size === 'sm' ? '0.92rem' : '1.05rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}
          >
            QuantumLearning
          </div>
          <div
            style={{
              fontSize: isLarge ? '0.72rem' : size === 'sm' ? '0.62rem' : '0.66rem',
              fontWeight: 800,
              color: '#2563EB',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginTop: '1px'
            }}
          >
            Adaptive Quantum Learning Ecosystem
          </div>
        </div>
      )}
    </div>
  );
}
