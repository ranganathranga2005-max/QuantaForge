import React, { useState } from 'react';
import { useAdaptive } from '../../context/AdaptiveContext';
import { playQuantumSoundEffect } from '../ai/Companion3DCanvas';

const PUZZLES = [
  {
    id: 'puz-1',
    title: 'BUILD SUPERPOSITION STATE',
    difficulty: 'BEGINNER',
    targetDescription: 'Transform |0⟩ into equal superposition (|0⟩ + |1⟩)/√2',
    targetState: [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
    initialQubits: 1,
    allowedGates: ['H', 'X', 'Z'],
    maxGates: 3,
    hint: 'Apply a single Hadamard (H) gate to qubit 0 to create an equal combination of possibilities.'
  },
  {
    id: 'puz-2',
    title: 'CREATE BELL STATE (|00⟩ + |11⟩)/√2',
    difficulty: 'INTERMEDIATE',
    targetDescription: 'Target output probability: |00⟩ → 50%, |11⟩ → 50%',
    targetState: [1 / Math.sqrt(2), 0, 0, 1 / Math.sqrt(2)],
    initialQubits: 2,
    allowedGates: ['H', 'X', 'CNOT'],
    maxGates: 4,
    hint: 'First put Qubit 0 into superposition with H, then entangle Qubit 1 with CNOT (Control: Q0, Target: Q1).'
  },
  {
    id: 'puz-3',
    title: 'PHASE DESTRUCTIVE CANCELLATION',
    difficulty: 'ADVANCED',
    targetDescription: 'Use phase rotation to rotate |0⟩ cleanly into |1⟩ via H-Z-H sequence',
    targetState: [0, 1],
    initialQubits: 1,
    allowedGates: ['H', 'Z', 'X', 'S'],
    maxGates: 4,
    hint: 'Applying H creates (|0⟩+|1⟩)/√2. Z flips the phase to (|0⟩-|1⟩)/√2. Applying H again creates |1⟩ through destructive interference.'
  }
];

export default function QuantumPuzzleEngine({ onPuzzleSolved }) {
  const { setCompanionState } = useAdaptive();
  const [activePuzzleIndex, setActivePuzzleIndex] = useState(0);
  const [circuit, setCircuit] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isSolved, setIsSolved] = useState(false);

  const currentPuzzle = PUZZLES[activePuzzleIndex];

  const handleAddGate = (gate) => {
    if (circuit.length >= currentPuzzle.maxGates) return;
    const newCircuit = [...circuit, { gate, id: Math.random().toString() }];
    setCircuit(newCircuit);
    evaluateCircuit(newCircuit);
  };

  const handleRemoveGate = (index) => {
    const newCircuit = circuit.filter((_, idx) => idx !== index);
    setCircuit(newCircuit);
    evaluateCircuit(newCircuit);
  };

  const handleReset = () => {
    setCircuit([]);
    setFeedback(null);
    setIsSolved(false);
  };

  const evaluateCircuit = (c) => {
    if (c.length === 0) {
      setFeedback(null);
      setIsSolved(false);
      return;
    }

    if (currentPuzzle.id === 'puz-1') {
      const isSuperposition = c.length === 1 && c[0].gate === 'H';
      if (isSuperposition) {
        setIsSolved(true);
        setFeedback({
          success: true,
          message: '✨ Target Superposition state (|0⟩ + |1⟩)/√2 built successfully!'
        });
        playQuantumSoundEffect('success');
        setCompanionState?.('celebrating');
        if (onPuzzleSolved) onPuzzleSolved('puz-1');
      } else {
        setIsSolved(false);
        setFeedback({
          success: false,
          message: 'State does not match target. Keep trying or reset!'
        });
      }
    } else if (currentPuzzle.id === 'puz-2') {
      const isBell = c.length === 2 && c[0].gate === 'H' && c[1].gate === 'CNOT';
      if (isBell) {
        setIsSolved(true);
        setFeedback({
          success: true,
          message: '🎉 Perfect Entanglement! |00⟩ and |11⟩ are 50/50 correlated.'
        });
        playQuantumSoundEffect('success');
        setCompanionState?.('celebrating');
        if (onPuzzleSolved) onPuzzleSolved('puz-2');
      } else {
        setIsSolved(false);
        setFeedback({
          success: false,
          message: 'Circuit did not produce maximal Bell state entanglement.'
        });
      }
    } else if (currentPuzzle.id === 'puz-3') {
      const isPhaseFlapped = c.length === 3 && c[0].gate === 'H' && c[1].gate === 'Z' && c[2].gate === 'H';
      if (isPhaseFlapped) {
        setIsSolved(true);
        setFeedback({
          success: true,
          message: '🌌 Brilliant! Phase shift Z combined with H caused complete destructive interference into |1⟩!'
        });
        playQuantumSoundEffect('success');
        setCompanionState?.('celebrating');
        if (onPuzzleSolved) onPuzzleSolved('puz-3');
      } else {
        setIsSolved(false);
        setFeedback({
          success: false,
          message: 'Phase interference sequence incomplete.'
        });
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#0F172A',
      borderRadius: '16px',
      padding: '28px',
      color: '#F8FAFC',
      border: '1px solid #1E293B',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
      marginBottom: '32px'
    }}>
      {/* Header & Puzzle Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            INTERACTIVE QUANTUM PUZZLE
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2px 0 0 0', color: '#FFF' }}>
            🧩 {currentPuzzle.title}
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {PUZZLES.map((puz, idx) => (
            <button
              key={puz.id}
              onClick={() => {
                setActivePuzzleIndex(idx);
                handleReset();
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: activePuzzleIndex === idx ? '2px solid #38BDF8' : '1px solid #334155',
                backgroundColor: activePuzzleIndex === idx ? '#1E293B' : 'transparent',
                color: activePuzzleIndex === idx ? '#38BDF8' : '#94A3B8',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Puzzle {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Target Requirement Banner */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: '#1E293B',
        borderRadius: '12px',
        marginBottom: '24px',
        borderLeft: '4px solid #38BDF8',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>TARGET REQUIREMENT</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC', marginTop: '2px' }}>
            {currentPuzzle.targetDescription}
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
          {currentPuzzle.difficulty}
        </span>
      </div>

      {/* Circuit Workspace Drop Zone */}
      <div style={{
        padding: '24px',
        backgroundColor: '#020617',
        borderRadius: '12px',
        border: '1.5px dashed #334155',
        marginBottom: '24px',
        minHeight: '110px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        overflowX: 'auto'
      }}>
        <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#94A3B8', paddingRight: '12px' }}>
          |0⟩ ──
        </div>

        {circuit.length === 0 ? (
          <div style={{ color: '#64748B', fontSize: '0.9rem', fontStyle: 'italic' }}>
            Click gates below to build circuit (Max {currentPuzzle.maxGates} gates)...
          </div>
        ) : (
          circuit.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleRemoveGate(idx)}
              style={{
                width: '46px',
                height: '46px',
                backgroundColor: item.gate === 'H' ? '#3B82F6' : item.gate === 'CNOT' ? '#EC4899' : '#8B5CF6',
                color: '#FFF',
                fontWeight: 900,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                animation: 'fadeIn 0.15s ease'
              }}
              title="Click to remove"
            >
              {item.gate}
            </div>
          ))
        )}

        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={handleReset}
            style={{
              padding: '6px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #475569',
              borderRadius: '6px',
              color: '#94A3B8',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Allowed Gate Palette */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, marginBottom: '10px' }}>
          AVAILABLE QUANTUM GATES:
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {currentPuzzle.allowedGates.map((gate) => (
            <button
              key={gate}
              onClick={() => handleAddGate(gate)}
              disabled={circuit.length >= currentPuzzle.maxGates}
              style={{
                padding: '10px 20px',
                backgroundColor: gate === 'H' ? '#1D4ED8' : gate === 'CNOT' ? '#BE185D' : '#6D28D9',
                color: '#FFF',
                fontWeight: 800,
                fontSize: '0.95rem',
                border: 'none',
                borderRadius: '8px',
                cursor: circuit.length >= currentPuzzle.maxGates ? 'not-allowed' : 'pointer',
                opacity: circuit.length >= currentPuzzle.maxGates ? 0.5 : 1,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              + {gate} Gate
            </button>
          ))}
        </div>
      </div>

      {/* Hint & Feedback Result */}
      {feedback && (
        <div style={{
          padding: '16px 20px',
          borderRadius: '10px',
          backgroundColor: feedback.success ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: feedback.success ? '1px solid #22C55E' : '1px solid #EF4444',
          color: feedback.success ? '#4ADE80' : '#F87171',
          fontWeight: 700,
          fontSize: '0.95rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>{feedback.message}</div>
          {feedback.success && activePuzzleIndex < PUZZLES.length - 1 && (
            <button
              onClick={() => {
                setActivePuzzleIndex(activePuzzleIndex + 1);
                handleReset();
              }}
              style={{
                padding: '6px 14px',
                backgroundColor: '#22C55E',
                color: '#052E16',
                fontWeight: 800,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Next Puzzle →
            </button>
          )}
        </div>
      )}

      {/* Companion Hint */}
      {!feedback?.success && (
        <div style={{ marginTop: '16px', fontSize: '0.825rem', color: '#94A3B8', fontStyle: 'italic' }}>
          💡 <strong>Companion Hint:</strong> {currentPuzzle.hint}
        </div>
      )}
    </div>
  );
}
