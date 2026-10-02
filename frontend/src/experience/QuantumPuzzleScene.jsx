import React, { useState } from 'react';
import BlochSphere3D from '../components/visualization/BlochSphere3D';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * QuantumPuzzleScene.jsx
 * Interactive Target-State Circuit Puzzle Engine.
 * Target state e.g. |1⟩ or |+⟩. Learner builds shortest gate circuit to reach target.
 * Replaces standard multiple choice quizzes.
 */
export default function QuantumPuzzleScene({
  targetStateLabel = '|1⟩',
  onPuzzleSolved,
  onBackToPath
}) {
  const [placedGates, setPlacedGates] = useState([]);
  const [currentStatevector, setCurrentStatevector] = useState([{ real: 1, imag: 0 }, { real: 0, imag: 0 }]); // Starts at |0>
  const [isSolved, setIsSolved] = useState(false);

  const availableGates = ['H', 'X', 'Z', 'S'];

  const handleAddGate = (gate) => {
    const updated = [...placedGates, gate];
    setPlacedGates(updated);

    // Compute statevector transformation
    // H gate transforms |0> -> 1/sqrt(2)(|0>+|1>)
    // X gate transforms |0> -> |1>
    let newAlpha = { real: 1, imag: 0 };
    let newBeta = { real: 0, imag: 0 };

    updated.forEach(g => {
      if (g === 'X') {
        const temp = newAlpha;
        newAlpha = newBeta;
        newBeta = temp;
      } else if (g === 'H') {
        const nextA = { real: 0.7071 * (newAlpha.real + newBeta.real), imag: 0 };
        const nextB = { real: 0.7071 * (newAlpha.real - newBeta.real), imag: 0 };
        newAlpha = nextA;
        newBeta = nextB;
      }
    });

    const newVec = [newAlpha, newBeta];
    setCurrentStatevector(newVec);

    // Check target state match
    if (targetStateLabel === '|1⟩' && Math.abs(newBeta.real - 1) < 0.1) {
      setIsSolved(true);
      genieEvents.emit(GENIE_EVENTS.CHALLENGE_PASSED);
      if (onPuzzleSolved) onPuzzleSolved();
    } else if (targetStateLabel === '|+⟩' && Math.abs(newAlpha.real - 0.7071) < 0.1 && Math.abs(newBeta.real - 0.7071) < 0.1) {
      setIsSolved(true);
      genieEvents.emit(GENIE_EVENTS.CHALLENGE_PASSED);
      if (onPuzzleSolved) onPuzzleSolved();
    }
  };

  const handleReset = () => {
    setPlacedGates([]);
    setCurrentStatevector([{ real: 1, imag: 0 }, { real: 0, imag: 0 }]);
    setIsSolved(false);
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
        padding: '0 24px'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '640px', marginBottom: '24px' }}>
        <button
          onClick={onBackToPath}
          style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(30, 41, 59, 0.85)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#94A3B8',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          ← Back to Path
        </button>

        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
          Quantum State Puzzle
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
          Reach Target State: <span style={{ color: '#34D399' }}>{targetStateLabel}</span>
        </h2>
      </div>

      {/* 3D Bloch Sphere Live Visual */}
      <div style={{ width: '280px', marginBottom: '20px' }}>
        <BlochSphere3D statevector={currentStatevector} />
      </div>

      {/* Circuit Gate Assembly Palette & Circuit Wire */}
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '24px',
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Available Gate Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {availableGates.map(g => (
            <button
              key={g}
              onClick={() => handleAddGate(g)}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                border: '1px solid #38bdf8',
                color: '#FFF',
                fontWeight: 900,
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
              }}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Placed Gate Wire */}
        <div
          style={{
            width: '100%',
            minHeight: '60px',
            borderRadius: '12px',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px dashed rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38BDF8' }}>q₀: |0⟩ ──</span>
          {placedGates.map((g, i) => (
            <div
              key={i}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#0284c7',
                color: '#FFF',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem'
              }}
            >
              {g}
            </div>
          ))}
          <span style={{ flex: 1, borderTop: '2px solid rgba(255,255,255,0.2)' }} />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Reset Circuit
          </button>

          {isSolved && (
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#34D399' }}>
              🎉 Puzzle Solved! (Gate Count: {placedGates.length})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
