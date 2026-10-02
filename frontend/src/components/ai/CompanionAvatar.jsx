import React, { useState, useEffect } from 'react';
import Companion3DCanvas from './Companion3DCanvas';

/**
 * Quantum Companion Avatar Component
 * Renders Three.js 3D WebGL Companion Character for Hero & Contextual sizes (>=120px)
 * and Crisp High-Fidelity Vector Graphics for Micro/Badge sizes (<120px).
 */
export default function CompanionAvatar({ state = 'IDLE', size = 240, className = '', use3D = true }) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural eye blinking cycle for 2D fallback / SVG mode
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  const getStateColors = () => {
    switch (state) {
      case 'LISTENING':
        return { main: '#06B6D4', glow: 'rgba(6, 182, 212, 0.45)', stroke: '#67E8F9', eye: '#22D3EE', visorBg: '#082F49' };
      case 'THINKING':
      case 'PROCESSING':
        return { main: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.45)', stroke: '#C4B5FD', eye: '#A78BFA', visorBg: '#1E1B4B' };
      case 'SPEAKING':
        return { main: '#3B82F6', glow: 'rgba(59, 130, 246, 0.5)', stroke: '#93C5FD', eye: '#60A5FA', visorBg: '#0F172A' };
      case 'EXPLAINING':
        return { main: '#7C3AED', glow: 'rgba(124, 58, 237, 0.45)', stroke: '#DDD6FE', eye: '#C4B5FD', visorBg: '#1E1B4B' };
      case 'CURIOUS':
        return { main: '#0284C7', glow: 'rgba(2, 132, 199, 0.45)', stroke: '#BAE6FD', eye: '#38BDF8', visorBg: '#0C4A6E' };
      case 'ENCOURAGING':
        return { main: '#059669', glow: 'rgba(5, 150, 105, 0.45)', stroke: '#A7F3D0', eye: '#34D399', visorBg: '#064E3B' };
      case 'SUCCESS':
      case 'DISCOVERY':
        return { main: '#10B981', glow: 'rgba(16, 185, 129, 0.55)', stroke: '#6EE7B7', eye: '#34D399', visorBg: '#064E3B' };
      case 'HINT':
        return { main: '#D97706', glow: 'rgba(217, 119, 6, 0.45)', stroke: '#FDE68A', eye: '#FBBF24', visorBg: '#451A03' };
      case 'WARNING':
        return { main: '#EF4444', glow: 'rgba(239, 68, 68, 0.5)', stroke: '#FCA5A5', eye: '#F87171', visorBg: '#450A0A' };
      default:
        return { main: '#2563EB', glow: 'rgba(37, 99, 235, 0.35)', stroke: '#BFDBFE', eye: '#60A5FA', visorBg: '#0F172A' };
    }
  };

  const colors = getStateColors();
  const stateLower = state.toLowerCase();

  // For Hero / Contextual Presentation (size >= 120px) and when use3D is true: Render 3D Canvas!
  if (use3D && size >= 120) {
    return <Companion3DCanvas state={state} size={size} className={className} />;
  }

  // Fallback 2D Vector SVG renderer for micro badges (<120px)
  return (
    <div
      className={`quantum-companion-avatar state-${stateLower} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
      title={`Quantum Companion State: ${state}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: `drop-shadow(0 6px 16px ${colors.glow})`,
          overflow: 'visible'
        }}
      >
        <defs>
          <linearGradient id={`avatarGrad2D_${stateLower}`} x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="44" stroke={colors.stroke} strokeWidth="1.6" strokeDasharray="6 4" />
        <circle cx="50" cy="6" r="3.5" fill={colors.main} />
        <circle cx="50" cy="50" r="36" fill={`url(#avatarGrad2D_${stateLower})`} stroke={colors.main} strokeWidth="3" />
        <path d="M 24 38 C 24 28, 76 28, 76 38 C 76 56, 24 56, 24 38 Z" fill={colors.visorBg} />

        {isBlinking ? (
          <>
            <line x1="30" y1="42" x2="44" y2="42" stroke={colors.eye} strokeWidth="3.5" strokeLinecap="round" />
            <line x1="56" y1="42" x2="70" y2="42" stroke={colors.eye} strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="37" cy="42" r="7" fill={colors.eye} />
            <circle cx="35" cy="40" r="2.2" fill="#FFFFFF" />
            <circle cx="63" cy="42" r="7" fill={colors.eye} />
            <circle cx="61" cy="40" r="2.2" fill="#FFFFFF" />
          </>
        )}

        <path d="M 40 57 Q 50 62 60 57" stroke={colors.eye} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
