import React, { useState } from 'react';
import BlochSphere3D from '../components/visualization/BlochSphere3D';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * DiagnosticScene.jsx
 * In-World Interactive Quantum Baseline Diagnostic.
 * ZERO CARD CONTAINERS / ZERO FORMS. 3D Qubit floats directly in space.
 */
export default function DiagnosticScene({ onComplete }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [qubitState, setQubitState] = useState([{ real: 1, imag: 0 }, { real: 0, imag: 0 }]); // Starts at |0>
  const [answers, setAnswers] = useState({});

  const diagnosticSteps = [
    {
      id: 'step-1',
      question: 'Select your starting background level:',
      options: [
        { label: 'Beginner (No prior physics)', level: 1, key: 'beginner' },
        { label: 'High School / Early Undergrad', level: 2, key: 'basic' },
        { label: 'Intermediate / Qiskit Familiarity', level: 3, key: 'intermediate' },
        { label: 'Advanced Student / Researcher', level: 5, key: 'advanced' }
      ]
    },
    {
      id: 'step-2',
      question: 'Pulse a Hadamard (H) Gate to put the 3D Qubit into Superposition:',
      type: 'interactive_pulse'
    },
    {
      id: 'step-3',
      question: 'If H is applied again to the superposition state, what happens?',
      options: [
        { label: 'Constructive phase return to |0⟩', key: 'correct', evidence: 'high_superposition' },
        { label: 'Permanent collapse to |1⟩', key: 'incorrect' },
        { label: '50% random chance', key: 'random' }
      ]
    }
  ];

  const handlePulseHadamard = () => {
    setQubitState([{ real: 0.7071, imag: 0 }, { real: 0.7071, imag: 0 }]);
    genieEvents.emit(GENIE_EVENTS.DIAGNOSTIC_STEP, 1);
  };

  const handleOptionSelect = (opt) => {
    const nextAns = { ...answers, [diagnosticSteps[currentStepIdx].id]: opt };
    setAnswers(nextAns);

    genieEvents.emit(GENIE_EVENTS.DIAGNOSTIC_STEP, currentStepIdx);

    if (currentStepIdx + 1 < diagnosticSteps.length) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      finishDiagnostic(nextAns);
    }
  };

  const finishDiagnostic = (finalAnswers) => {
    genieEvents.emit(GENIE_EVENTS.DIAGNOSTIC_COMPLETED);
    if (onComplete) {
      onComplete({
        demonstratedHighSuperposition: finalAnswers['step-3']?.key === 'correct',
        experienceLevel: finalAnswers['step-1']?.key || 'beginner',
        recommendedLevel: finalAnswers['step-1']?.level || 2
      });
    }
  };

  const activeStep = diagnosticSteps[currentStepIdx];

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
        boxSizing: 'border-box'
      }}
    >
      {/* Central 3D Qubit Object floating directly in open space */}
      <div style={{ width: '340px', marginBottom: '24px' }}>
        <BlochSphere3D statevector={qubitState} />
      </div>

      {/* Interactive Question Overlay (Floating directly on background) */}
      <div style={{ textAlign: 'center', maxWidth: '640px', padding: '0 24px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
          Step {currentStepIdx + 1} of {diagnosticSteps.length} — Baseline Diagnostic
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 24px 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          {activeStep.question}
        </h2>

        {/* Options or Interactive Button */}
        {activeStep.type === 'interactive_pulse' ? (
          <button
            onClick={() => {
              handlePulseHadamard();
              setTimeout(() => setCurrentStepIdx(currentStepIdx + 1), 1000);
            }}
            style={{
              padding: '16px 32px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              border: '1px solid #38bdf8',
              color: '#FFF',
              fontWeight: 900,
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(56, 189, 248, 0.6)'
            }}
          >
            ⚡ Pulse Hadamard Gate (H)
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeStep.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt)}
                style={{
                  padding: '16px 24px',
                  borderRadius: '9999px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#F8FAFC',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#38BDF8';
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
