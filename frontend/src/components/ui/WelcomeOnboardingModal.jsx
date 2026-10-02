import React, { useState } from 'react';
import AlbertEinsteinWelcome from './AlbertEinsteinWelcome';

const STAGES = [
  {
    id: 'Stage 1: Quantum Explorer',
    level: 'Beginner',
    icon: '🌱',
    title: 'Stage 1: Quantum Explorer (Beginner Friendly)',
    desc: 'Fun introduction! Learn how qubits spin, flip, and exist in 50/50 Superposition like a spinning coin.',
    einsteinQuote: 'Ach! In Stage 1, you will learn the magic of Superposition! Just like a spinning coin is both Heads and Tails at once, a Qubit can be |0⟩ and |1⟩ at the same time!',
    verifications: [
      '✨ Place a Hadamard (H) Gate to spin a Qubit into Superposition',
      '🔮 Watch the 3D Bloch Sphere rotate live on screen',
      '📊 Measure the 50% / 50% probability bar chart'
    ]
  },
  {
    id: 'Stage 2: Quantum Apprentice',
    level: 'Intermediate',
    icon: '🚀',
    title: 'Stage 2: Quantum Apprentice (Entanglement)',
    desc: 'Connect two qubits together! Experience what I called Spooky Action at a Distance.',
    einsteinQuote: 'Wunderbar! In Stage 2, we link two qubits with CNOT. When you measure Qubit 0, Qubit 1 instantly responds no matter how far apart they are!',
    verifications: [
      '🔗 Connect 2 Qubits using a CNOT (CX) Gate',
      '🌌 Generate a Bell State |Φ+⟩ = (|00⟩ + |11⟩)/2',
      '📐 Inspect Dirac Phase Rotation angles & Interference'
    ]
  },
  {
    id: 'Stage 3: Quantum Wizard',
    level: 'Advanced',
    icon: '🔬',
    title: 'Stage 3: Quantum Wizard (Algorithms & Code)',
    desc: 'Build real quantum algorithms (VQE, Grover Search), code in Qiskit/Cirq, and solve puzzles!',
    einsteinQuote: 'Magnificent! In Stage 3, you become a Quantum Wizard! You will write Python code, run 50+ qubit simulations, and solve quantum chemistry problems!',
    verifications: [
      '⚡ Run Grover Search & VQE Chemistry Optimization',
      '💻 Transpiles live visual circuits into Qiskit & OpenQASM 2.0',
      '🛡️ Test 3-Qubit Quantum Error Correction (QEC)'
    ]
  }
];

export default function WelcomeOnboardingModal({ isOpen, onClose, currentGoal, currentLevel, onSaveSettings }) {
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);

  if (!isOpen) return null;

  const currentStage = STAGES[selectedStageIdx];

  const handleStart = () => {
    onSaveSettings({ goal: currentStage.id, level: currentStage.level });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '720px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.45)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxHeight: '92vh',
        overflowY: 'auto'
      }}>
        
        {/* Header Title */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: '#EFF6FF', padding: '4px 12px', borderRadius: '999px', border: '1px solid #BFDBFE' }}>
            ⚛️ Welcome to Quantum Science Studio
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: '8px 0 0 0', letterSpacing: '-0.02em' }}>
            Start Your Quantum Journey!
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#64748B', margin: '4px 0 0 0' }}>
            Designed for curious minds — no hard math required! Select your learning stage below:
          </p>
        </div>

        {/* Albert Einstein Welcome Component */}
        <AlbertEinsteinWelcome 
          quote={currentStage.einsteinQuote}
          stageName={currentStage.level}
        />

        {/* Stage Selector Cards */}
        <div>
          <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 900, color: '#0F172A', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Choose Your Learning Stage:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {STAGES.map((stg, idx) => {
              const active = selectedStageIdx === idx;
              return (
                <div
                  key={stg.id}
                  onClick={() => setSelectedStageIdx(idx)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: active ? '2.5px solid #2563EB' : '1px solid #E2E8F0',
                    backgroundColor: active ? '#F0F9FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: active ? '0 6px 20px rgba(37, 99, 235, 0.15)' : '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: active ? '#2563EB' : '#F1F5F9',
                    color: active ? '#FFFFFF' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    flexShrink: 0
                  }}>
                    {stg.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.98rem', fontWeight: 900, color: active ? '#0369A1' : '#0F172A' }}>
                        {stg.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', backgroundColor: active ? '#DBEAFE' : '#F1F5F9', color: active ? '#1E40AF' : '#475569' }}>
                        {stg.level}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: '#64748B', display: 'block', marginTop: '2px' }}>
                      {stg.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones / Verification List for Selected Stage */}
        <div style={{ backgroundColor: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: '16px', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            🎯 What You Will Accomplish in {currentStage.level}:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {currentStage.verifications.map((item, idx) => (
              <div key={idx} style={{ fontSize: '0.86rem', color: '#1E293B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#059669', fontWeight: 900, fontSize: '1rem' }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleStart}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            color: '#FFFFFF',
            fontSize: '1.05rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)',
            marginTop: '4px',
            transition: 'transform 0.15s ease'
          }}
        >
          🚀 Enter Quantum Laboratory as {currentStage.level} →
        </button>
      </div>
    </div>
  );
}
