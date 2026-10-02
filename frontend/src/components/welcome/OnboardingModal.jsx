import React, { useState } from 'react';
import { useAdaptive, GOAL_DEFINITIONS, LEVEL_SPECTRUM } from '../../context/AdaptiveContext';
import QuantumBrandLogo from '../ui/QuantumBrandLogo';

export default function OnboardingModal() {
  const { isOnboardingOpen, setIsOnboardingOpen, completeOnboarding, userGoal, userLevel, setUserRole, setIsConsentModalOpen } = useAdaptive();
  const [selectedGoal, setSelectedGoal] = useState(userGoal || 'academics');
  const [selectedLevel, setSelectedLevel] = useState(userLevel || 1);
  const [step, setStep] = useState(1);

  if (!isOnboardingOpen) return null;

  const handleGoalSelect = (goalKey) => {
    setSelectedGoal(goalKey);
    const suggested = GOAL_DEFINITIONS[goalKey]?.suggestedLevel || 1;
    setSelectedLevel(suggested);
  };

  const handleFinish = () => {
    if (selectedLevel >= 6) {
      setUserRole('mentor');
    } else if (selectedLevel === 5 || selectedGoal === 'research') {
      setUserRole('researcher');
    } else {
      setUserRole('learner');
    }
    completeOnboarding(selectedGoal, selectedLevel);
    setIsConsentModalOpen(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        maxWidth: '680px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        animation: 'fadeInUp 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
          padding: '32px 32px 24px',
          color: '#FFFFFF',
          position: 'relative'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <QuantumBrandLogo variant="full" size="md" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
            {step === 1 ? 'What do you want to achieve?' : 'Select your baseline level'}
          </h2>
          <p style={{ margin: '8px 0 0', color: '#94A3B8', fontSize: '0.925rem', lineHeight: '1.5' }}>
            {step === 1
              ? 'Tell us your goal so we can build your personalized quantum journey.'
              : 'We will adapt explanations, controls, and complexity to match your experience.'}
          </p>

          <button
            onClick={() => setIsOnboardingOpen(false)}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'transparent', border: 'none', color: '#94A3B8',
              fontSize: '1.25rem', cursor: 'pointer', padding: '4px 8px'
            }}
            title="Skip for now"
          >
            ✕
          </button>
        </div>

        {/* Step 1: Goal Selection */}
        {step === 1 && (
          <div style={{ padding: '28px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {Object.entries(GOAL_DEFINITIONS).map(([key, goal]) => {
                const isSelected = selectedGoal === key;
                return (
                  <div
                    key={key}
                    onClick={() => handleGoalSelect(key)}
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{goal.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', marginBottom: '4px' }}>
                      {goal.title}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: '1.4' }}>
                      {goal.tagline}
                    </div>
                    {isSelected && (
                      <div style={{
                        position: 'absolute', top: '12px', right: '12px',
                        width: '20px', height: '20px', borderRadius: '50%',
                        backgroundColor: '#2563EB', color: '#FFF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 800
                      }}>
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                  transition: 'all 0.15s'
                }}
              >
                Next: Choose Level →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Level Selection */}
        {step === 2 && (
          <div style={{ padding: '28px 32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto', marginBottom: '24px', paddingRight: '4px' }}>
              {LEVEL_SPECTRUM.map((item) => {
                const isSelected = selectedLevel === item.level;
                return (
                  <div
                    key={item.level}
                    onClick={() => setSelectedLevel(item.level)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          padding: '2px 8px', borderRadius: '6px',
                          backgroundColor: isSelected ? '#2563EB' : '#E2E8F0',
                          color: isSelected ? '#FFF' : '#334155',
                          fontWeight: 800, fontSize: '0.75rem'
                        }}>
                          Level {item.level}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>
                          {item.targetAudience}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                        {item.description}
                      </div>
                    </div>

                    {isSelected && (
                      <span style={{ color: '#2563EB', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: '10px 18px',
                  backgroundColor: 'transparent',
                  color: '#64748B',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                ← Back to Goals
              </button>

              <button
                onClick={handleFinish}
                style={{
                  padding: '12px 28px',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                  transition: 'all 0.15s'
                }}
              >
                Start My Journey 🚀
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
