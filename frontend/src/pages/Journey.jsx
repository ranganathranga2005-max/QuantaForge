import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdaptive } from '../context/AdaptiveContext';
import DynamicRoadmap from '../components/learning/DynamicRoadmap';

export default function Journey() {
  const navigate = useNavigate();
  const {
    currentGoalData,
    currentLevelData,
    currentSkillGap,
    activeMission,
    setIsOnboardingOpen,
    userLevel
  } = useAdaptive();

  return (
    <div style={{ padding: '32px', maxWidth: '1300px', margin: '0 auto', color: 'var(--text-primary)' }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        marginBottom: '28px', background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
        padding: '32px', borderRadius: '20px', color: '#FFF', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.4)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.5rem' }}>{currentGoalData.icon}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93C5FD' }}>
              Dynamic Learning Route & Visual Roadmap
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Your Quantum Journey Map
          </h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: '0.95rem', maxWidth: '650px', lineHeight: '1.5' }}>
            An interactive skill graph that adapts to what you already know, pinpoints skill gaps, and unlocks your next best action.
          </p>
        </div>

        <button
          onClick={() => setIsOnboardingOpen(true)}
          style={{
            padding: '12px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '12px',
            color: '#FFF',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
            transition: 'all 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        >
          ⚙️ Change Goal / Intent
        </button>
      </div>

      {/* Main Dynamic Roadmap Visual Graph */}
      <div style={{ marginBottom: '32px' }}>
        <DynamicRoadmap />
      </div>

      {/* Contextual Side-by-Side: Mission & Adaptive Level */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Active Mission Card */}
        <div style={{
          backgroundColor: 'var(--bg-panel)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          borderLeft: '5px solid #3B82F6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{
              fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase',
              padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA'
            }}>
              Active Target Mission
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>
              ⏳ {activeMission.estimatedTime}
            </span>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
            {activeMission.title}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 20px 0' }}>
            {activeMission.description}
          </p>

          <button
            onClick={() => navigate(activeMission.path)}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#2563EB',
              color: '#FFF',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
              transition: 'all 0.15s',
              textAlign: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1D4ED8'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563EB'}
          >
            LAUNCH MISSION EXPERIMENT →
          </button>
        </div>

        {/* Adaptive Level Info */}
        <div style={{
          backgroundColor: 'var(--bg-panel)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            ADAPTIVE COGNITIVE PROFILE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ padding: '4px 10px', borderRadius: '8px', backgroundColor: '#3B82F6', color: '#FFF', fontWeight: 800, fontSize: '0.85rem' }}>
              Level {userLevel}
            </span>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              {currentLevelData.targetAudience}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
            {currentLevelData.description}
          </p>
        </div>

      </div>
    </div>
  );
}

