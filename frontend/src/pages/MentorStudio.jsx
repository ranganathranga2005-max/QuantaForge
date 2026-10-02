import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdaptive } from '../context/AdaptiveContext';

export default function MentorStudio() {
  const navigate = useNavigate();
  const { currentLevelData, addMentorIntervention } = useAdaptive();
  const [sentInterventions, setSentInterventions] = useState({});

  const atRiskLearners = [
    { id: 1, name: 'Alex Johnson', level: 'Level 1: Beginner', gap: 'Quantum Interference', attemptsFailed: 3, status: 'Needs Help' },
    { id: 2, name: 'Samantha Lee', level: 'Level 3: Undergrad', gap: 'Phase Kickback', attemptsFailed: 4, status: 'Stuck on Circuit' },
    { id: 3, name: 'David Chen', level: 'Level 2: High School', gap: 'Entanglement Measurement', attemptsFailed: 2, status: 'Recommended Intervention' }
  ];

  const handleSendHint = (learner) => {
    addMentorIntervention({
      id: Math.random().toString(),
      learnerName: learner.name,
      gap: learner.gap,
      hint: `Custom mentor hint sent to ${learner.name} for ${learner.gap}.`,
      date: 'Just now'
    });
    setSentInterventions(prev => ({ ...prev, [learner.id]: true }));
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      {/* Top Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '28px', background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        padding: '32px', borderRadius: '20px', color: '#FFF', boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🧑‍🏫</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C7D2FE' }}>
              Mentor & Instructor Studio
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Cohort Analytics & Learner Interventions
          </h1>
          <p style={{ color: '#E0E7FF', margin: 0, fontSize: '0.95rem' }}>
            Identify struggling learners, pinpoint systemic knowledge gaps, and send targeted learning hints.
          </p>
        </div>

        <button
          onClick={() => navigate('/learn')}
          style={{
            padding: '12px 20px', backgroundColor: '#4F46E5', color: '#FFF', border: 'none',
            borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer'
          }}
        >
          + Author New Mission / Course
        </button>
      </div>

      {/* Primary Section: Which Learners Need My Attention? */}
      <div style={{
        backgroundColor: 'var(--bg-panel)',
        borderRadius: '16px',
        padding: '28px',
        border: '1px solid var(--border-subtle)',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              🚨 Learners Needing Attention
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '4px 0 0 0' }}>
              Prioritized list of learners encountering repeated friction or knowledge gap roadblocks.
            </p>
          </div>
          <span style={{ padding: '6px 12px', borderRadius: '20px', backgroundColor: '#FEF2F2', color: '#991B1B', fontWeight: 800, fontSize: '0.8rem' }}>
            3 At-Risk Alert(s)
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {atRiskLearners.map(learner => {
            const isSent = sentInterventions[learner.id];
            return (
              <div
                key={learner.id}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', borderRadius: '12px',
                  backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: '#2563EB'
                  }}>
                    {learner.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>{learner.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{learner.level}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991B1B', textTransform: 'uppercase' }}>
                    Stuck Skill Gap
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#7F1D1D' }}>
                    {learner.gap}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => navigate('/journey')}
                    style={{
                      padding: '8px 12px', backgroundColor: 'transparent', color: '#334155',
                      border: '1px solid #CBD5E1', borderRadius: '8px', fontWeight: 600, fontSize: '0.825rem', cursor: 'pointer'
                    }}
                  >
                    Inspect Journey
                  </button>

                  <button
                    onClick={() => handleSendHint(learner)}
                    disabled={isSent}
                    style={{
                      padding: '8px 14px', backgroundColor: isSent ? '#059669' : '#2563EB', color: '#FFF',
                      border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.825rem', cursor: 'pointer'
                    }}
                  >
                    {isSent ? '✓ Hint Sent' : 'Send Guided Hint'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
