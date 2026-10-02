import React, { useState } from 'react';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * Diagnostic.jsx
 * Short 4-Step Friendly Baseline Diagnostic.
 * Computes skill evidence and feeds into Route Generator.
 */
export default function Diagnostic({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    confidence: null,
    prediction: null,
    circuitInteracted: false,
    conceptChoice: null
  });

  const steps = [
    {
      id: 'step-1',
      title: 'Prior Experience & Confidence',
      question: 'How familiar are you with quantum computing concepts or linear algebra?',
      type: 'choice',
      options: [
        { label: 'Complete Beginner (No background)', level: 1, val: 'beginner' },
        { label: 'Some Physics/CS (High School / Early Undergrad)', level: 2, val: 'basic' },
        { label: 'Familiar with Qubits & Gates', level: 3, val: 'intermediate' },
        { label: 'Experienced Developer / Researcher', level: 5, val: 'advanced' }
      ]
    },
    {
      id: 'step-2',
      title: 'Visual Quantum Wave Prediction',
      question: 'If a Hadamard (H) gate is applied twice to |0⟩, what state will the qubit end up in?',
      type: 'choice',
      options: [
        { label: '|0⟩ (Constructive & Destructive Phase Cancellation)', val: 'correct', evidence: 'demonstratedHighSuperposition' },
        { label: '|1⟩ State', val: 'incorrect' },
        { label: '50% |0⟩ and 50% |1⟩ (Random)', val: 'incorrect' },
        { label: 'I am not sure yet (Let us explore!)', val: 'unsure' }
      ]
    },
    {
      id: 'step-3',
      title: 'Interactive 1-Qubit Pulse Experiment',
      question: 'Click "Pulse Hadamard Gate" below to observe statevector rotation on the Bloch sphere:',
      type: 'experiment'
    },
    {
      id: 'step-4',
      title: 'Conceptual Curiosity',
      question: 'Which quantum phenomenon intrigues you most?',
      type: 'choice',
      options: [
        { label: 'Superposition (Being in multiple states at once)', val: 'superposition' },
        { label: 'Entanglement (EPR paradox & spooky action)', val: 'entanglement' },
        { label: 'Quantum Speedup in Optimization & Machine Learning', val: 'algorithms' },
        { label: 'Hardware Noise Mitigation & Error Correction', val: 'qec' }
      ]
    }
  ];

  const handleChoice = (opt) => {
    const nextAnswers = { ...answers, [steps[currentStep].id]: opt };
    setAnswers(nextAnswers);

    genieEvents.emit(GENIE_EVENTS.DIAGNOSTIC_STEP, currentStep);

    if (currentStep + 1 < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      finishDiagnostic(nextAnswers);
    }
  };

  const finishDiagnostic = (finalAnswers) => {
    genieEvents.emit(GENIE_EVENTS.DIAGNOSTIC_COMPLETED);
    if (onComplete) {
      onComplete({
        demonstratedHighSuperposition: finalAnswers['step-2']?.val === 'correct',
        experienceLevel: finalAnswers['step-1']?.val || 'beginner',
        recommendedLevel: finalAnswers['step-1']?.level || 2,
        interestTopic: finalAnswers['step-4']?.val || 'superposition'
      });
    }
  };

  const activeStep = steps[currentStep];

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        padding: '32px 24px',
        maxWidth: '680px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Step Indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', width: '100%', justifyContent: 'center' }}>
        {steps.map((s, idx) => (
          <div
            key={s.id}
            style={{
              height: '6px',
              flex: 1,
              borderRadius: '9999px',
              backgroundColor: idx <= currentStep ? '#38BDF8' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Diagnostic Card */}
      <div
        style={{
          width: '100%',
          padding: '36px',
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          color: '#FFFFFF'
        }}
      >
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
          Step {currentStep + 1} of {steps.length} — Baseline Diagnostic
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 16px 0' }}>
          {activeStep.title}
        </h2>
        <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: '1.5', margin: '0 0 28px 0' }}>
          {activeStep.question}
        </p>

        {activeStep.type === 'choice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeStep.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleChoice(opt)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F8FAFC',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#38BDF8';
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)';
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {activeStep.type === 'experiment' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #38bdf8 0%, #0284c7 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)'
            }}>
              |ψ⟩
            </div>
            <button
              onClick={() => handleChoice({ val: 'pulsed' })}
              style={{
                padding: '14px 28px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                border: '1px solid #38bdf8',
                color: '#FFF',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              ⚡ Pulse Hadamard Gate & Observe State
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
