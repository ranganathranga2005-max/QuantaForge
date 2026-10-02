import React, { useState } from 'react';
import { useAdaptive } from '../../context/AdaptiveContext';

export default function RoadmapConsentModal({ isOpen, onClose, onConfirm }) {
  const { currentGoalData, currentSkillGap, consentDetails, grantConsent, setIsOnboardingOpen } = useAdaptive();
  const [showWhyRoute, setShowWhyRoute] = useState(false);

  if (!isOpen) return null;

  const handleStart = () => {
    grantConsent();
    if (onConfirm) onConfirm();
    if (onClose) onClose();
  };

  const handleModifyGoal = () => {
    if (onClose) onClose();
    setIsOnboardingOpen(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(15, 23, 42, 0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: '#0F172A',
        borderRadius: '24px',
        maxWidth: '720px',
        width: '100%',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
        border: '1px solid #1E293B',
        color: '#F8FAFC',
        overflow: 'hidden',
        animation: 'fadeInUp 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
          padding: '32px',
          borderBottom: '1px solid #1E293B'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ROADMAP CONSENT GATEWAY
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFF', margin: '4px 0 8px 0' }}>
            🗺️ Your Tailored Quantum Learning Route
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
            We derived a personalized backward learning route from your destination goal down to your exact skill gap.
          </p>
        </div>

        {/* Content Details */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Destination & Gap Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8' }}>DESTINATION GOAL</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', marginTop: '4px' }}>
                {currentGoalData.icon} {currentGoalData.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>
                {currentGoalData.primaryTarget}
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B' }}>DETECTED SKILL GAP</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', marginTop: '4px' }}>
                🎯 {currentSkillGap}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>
                Prerequisites verified • Ready to unlock next node
              </div>
            </div>
          </div>

          {/* Why This Route Explanation */}
          <div style={{
            padding: '20px',
            backgroundColor: '#020617',
            borderRadius: '14px',
            border: '1px solid #1E293B'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#E2E8F0' }}>
                WHY THIS ROUTE WAS GENERATED
              </span>
              <button
                onClick={() => setShowWhyRoute(!showWhyRoute)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38BDF8',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {showWhyRoute ? '▲ Hide Analysis' : '▼ Details'}
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: '1.6', margin: 0 }}>
              {consentDetails?.reason || `Based on your chosen goal (${currentGoalData.title}), we bypassed concepts you've already demonstrated and routed you straight to ${currentSkillGap} to optimize your learning velocity.`}
            </p>

            {showWhyRoute && (
              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #1E293B', fontSize: '0.85rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>✓ <strong>Demonstrated Mastery:</strong> Qubits, Single Qubit Gates, Superposition</div>
                <div>⚠ <strong>Active Target:</strong> {currentSkillGap}</div>
                <div>🔒 <strong>Upcoming Goal:</strong> Multi-qubit Algorithms & Qiskit Optimization</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              onClick={handleModifyGoal}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: 'transparent',
                border: '1px solid #475569',
                borderRadius: '12px',
                color: '#94A3B8',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              ⚙️ Modify My Goal
            </button>

            <button
              onClick={handleStart}
              style={{
                flex: 2,
                padding: '14px',
                backgroundColor: '#2563EB',
                border: 'none',
                borderRadius: '12px',
                color: '#FFF',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4)',
                transition: 'all 0.15s'
              }}
            >
              🚀 START THIS JOURNEY
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
