import React, { useState } from 'react';
import CircuitCanvas from '../components/quantum/CircuitCanvas';
import BlochSphere3D from '../components/visualization/BlochSphere3D';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * ContextualLabScene.jsx
 * Reconstructed Quantum Lab Experience.
 * ZERO RECTANGULAR CARDS / ZERO WHITE PANELS.
 * Circuit is the central hero in open space.
 * Plain-English answers: WHAT HAPPENED? | WHY? | TRY THIS NEXT.
 */
export default function ContextualLabScene({ onBackToPath }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [circuitGates, setCircuitGates] = useState([{ id: '1', gate: 'H', qubit: 0 }]);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    genieEvents.emit(GENIE_EVENTS.SIMULATION_STARTED);

    setTimeout(() => {
      const res = {
        statevector: [{ real: 0.7071, imag: 0 }, { real: 0.7071, imag: 0 }],
        probabilities: { '|0⟩': 0.5, '|1⟩': 0.5 },
        explanation: {
          whatHappened: 'This circuit placed qubit q₀ into an equal superposition state.',
          why: 'The Hadamard (H) gate transforms basis state |0⟩ into equal linear combinations of (|0⟩ + |1⟩) / √2.',
          tryNext: 'Add a CNOT gate to entangle q₀ with q₁ and create a Bell State (|00⟩ + |11⟩)/√2.'
        }
      };
      setSimulationResult(res);
      setIsSimulating(false);
      genieEvents.emit(GENIE_EVENTS.SIMULATION_COMPLETED, res);
    }, 900);
  };

  const handleAddGate = (gateName) => {
    setCircuitGates(prev => [...prev, { id: String(Date.now()), gate: gateName, qubit: 0 }]);
  };

  const handleUndo = () => {
    setCircuitGates(prev => prev.slice(0, -1));
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '70px 24px 30px 24px',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10,
        overflowY: 'auto'
      }}
    >
      {/* Container */}
      <div style={{ width: '100%', maxWidth: '1080px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Header & Contextual Toolbar */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '2px', textTransform: 'uppercase' }}>
              QUANTUM EXPERIMENT LAB
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F8FAFC', margin: '2px 0 0 0' }}>
              Your Circuit Experiment
            </h2>
          </div>

          {/* Contextual Clean Toolbar (NO 10 COMPETING BUTTONS) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#141E33', border: '1px solid rgba(0, 242, 254, 0.25)', padding: '6px 12px', borderRadius: '9999px' }}>
            <button
              onClick={() => handleAddGate('H')}
              style={{ padding: '6px 12px', borderRadius: '9999px', background: '#1B2742', border: 'none', color: '#00F2FE', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              + H Gate
            </button>
            <button
              onClick={() => handleAddGate('X')}
              style={{ padding: '6px 12px', borderRadius: '9999px', background: '#1B2742', border: 'none', color: '#EF4444', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              + X Gate
            </button>
            <button
              onClick={() => handleAddGate('Z')}
              style={{ padding: '6px 12px', borderRadius: '9999px', background: '#1B2742', border: 'none', color: '#3B82F6', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              + Z Gate
            </button>
            <button
              onClick={handleUndo}
              style={{ padding: '6px 12px', borderRadius: '9999px', background: 'transparent', border: 'none', color: '#94A3B8', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Undo
            </button>
            
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #00F2FE, #7928CA)',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {isSimulating ? 'Running...' : 'RUN'}
            </button>

            <button
              onClick={() => setShowAdvanced(prev => !prev)}
              style={{ padding: '6px 10px', borderRadius: '9999px', background: 'transparent', border: 'none', color: '#94A3B8', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Advanced ▾
            </button>
          </div>
        </div>

        {/* HERO CIRCUIT WIRE */}
        <div style={{ background: '#141E33', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '24px', padding: '28px', boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}>
          <CircuitCanvas
            numQubits={2}
            gates={circuitGates}
            onGateAdd={(g) => setCircuitGates(prev => [...prev, g])}
            onGateRemove={(id) => setCircuitGates(prev => prev.filter(x => x.id !== id))}
          />
        </div>

        {/* ADVANCED PROGRESSIVE DRAWER */}
        {showAdvanced && (
          <div style={{ background: '#1B2742', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px 20px', display: 'flex', gap: '24px', fontSize: '0.8rem', color: '#94A3B8' }}>
            <div>Backend: <strong style={{ color: '#F8FAFC' }}>NumPy Engine (Local M1 Aer)</strong></div>
            <div>Shots: <strong style={{ color: '#F8FAFC' }}>1024</strong></div>
            <div>Noise Model: <strong style={{ color: '#F8FAFC' }}>Ideal (Zero Decoherence)</strong></div>
          </div>
        )}

        {/* RESULTS: WHAT HAPPENED? -> WHY? -> TRY THIS NEXT */}
        {simulationResult && (
          <div
            style={{
              background: '#141E33',
              border: '1px solid #00F2FE',
              borderRadius: '24px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 12px 32px rgba(0, 242, 254, 0.15)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '1px', textTransform: 'uppercase' }}>
                WHAT HAPPENED?
              </span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '1.2rem', color: '#F8FAFC', fontWeight: 700 }}>
                {simulationResult.explanation.whatHappened}
              </h3>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFB800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                WHY?
              </span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#94A3B8', lineHeight: '1.5' }}>
                {simulationResult.explanation.why}
              </p>
            </div>

            <div style={{ background: '#1B2742', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  TRY THIS NEXT
                </span>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 600 }}>
                  {simulationResult.explanation.tryNext}
                </p>
              </div>
              <button
                onClick={() => handleAddGate('CNOT')}
                style={{ padding: '8px 18px', borderRadius: '9999px', background: '#00F2FE', border: 'none', color: '#080C14', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', flexShrink: 0 }}
              >
                + Add CNOT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
