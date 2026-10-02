import React, { useState } from 'react';
import BlochSphere3D from '../components/visualization/BlochSphere3D';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * SpatialMissionScene.jsx
 * Progressive Disclosure Spatial Mission Canvas.
 * NO CARDS / NO RECTANGULAR PANELS.
 * Flow: QUESTION → PREDICT → INTERACT → EXPERIMENT → OBSERVE → EXPLAIN → PUZZLE → CHALLENGE → MASTER.
 */
export default function SpatialMissionScene({
  missionContent,
  onMissionCompleted,
  onBackToRoadmap
}) {
  const [qubitState, setQubitState] = useState([{ real: 0.7071, imag: 0 }, { real: 0.7071, imag: 0 }]);
  const [prediction, setPrediction] = useState('');
  const [hasChecked, setHasChecked] = useState(false);

  const missionTitle = missionContent?.title || "Superposition & Wave Interference";

  const handleCheck = () => {
    if (!prediction) return;
    setHasChecked(true);
    genieEvents.emit(GENIE_EVENTS.SIMULATION_COMPLETED, { prediction });
  };

  const handleRotateQubit = () => {
    // Rotate vector state
    setQubitState(prev => [
      { real: prev[0].real > 0 ? 0 : 0.7071, imag: 0 },
      { real: prev[0].real > 0 ? 1 : 0.7071, imag: 0 }
    ]);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'flex-start',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        padding: '70px 24px 30px 24px',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center'
        }}
      >
        {/* MISSION 01 Header */}
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '2px', textTransform: 'uppercase' }}>
            MISSION 01
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F8FAFC', margin: '4px 0 0 0' }}>
            CAN YOU PREDICT THIS?
          </h2>
          <p style={{ margin: '6px 0 0 0', fontSize: '0.9rem', color: '#94A3B8' }}>
            {missionTitle}
          </p>
        </div>

        {/* 1 IDEA TEXT */}
        <div style={{ background: '#141E33', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '16px', padding: '16px 20px', fontSize: '0.9rem', color: '#E2E8F0', lineHeight: '1.5' }}>
          "Superposition means a qubit can have probability amplitudes for both |0⟩ and |1⟩ simultaneously."
        </div>

        {/* 1 VISUAL (Hero Qubit Object) */}
        <div style={{ width: '280px', height: '260px', background: '#0F1626', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <BlochSphere3D statevector={qubitState} />
        </div>

        <button
          onClick={handleRotateQubit}
          style={{
            padding: '8px 20px',
            borderRadius: '9999px',
            background: '#1B2742',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            color: '#00F2FE',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🔄 [ MOVE THE QUBIT ]
        </button>

        <span style={{ color: '#00F2FE', fontSize: '1.2rem' }}>↓</span>

        {/* PREDICTION SELECTOR */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '1px', textTransform: 'uppercase' }}>
            YOUR PREDICTION
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '100%' }}>
            {[
              'Equal 50% |0⟩ and 50% |1⟩',
              'Deterministic 100% |0⟩',
              'Deterministic 100% |1⟩',
              'Complete Destructive Phase'
            ].map(opt => (
              <button
                key={opt}
                onClick={() => setPrediction(opt)}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: prediction === opt ? 'rgba(0, 242, 254, 0.15)' : '#141E33',
                  border: prediction === opt ? '2px solid #00F2FE' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#F8FAFC',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={handleCheck}
            disabled={!prediction}
            style={{
              width: '100%',
              maxWidth: '240px',
              padding: '12px',
              borderRadius: '9999px',
              background: prediction ? 'linear-gradient(135deg, #00F2FE, #7928CA)' : '#1B2742',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: prediction ? 'pointer' : 'not-allowed',
              opacity: prediction ? 1 : 0.5,
              marginTop: '8px'
            }}
          >
            [ CHECK PREDICTION ]
          </button>
        </div>

        {/* AFTER INTERACTION: RESULT & WHY */}
        {hasChecked && (
          <div
            style={{
              width: '100%',
              background: '#141E33',
              border: '1px solid #00F2FE',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'left',
              marginTop: '12px',
              boxShadow: '0 12px 32px rgba(0, 242, 254, 0.2)'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '1px', textTransform: 'uppercase' }}>
              RESULT
            </div>
            <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#F8FAFC', fontWeight: 700 }}>
              ✓ Correct! The qubit is in an equal probability superposition.
            </h4>
            
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFB800', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px' }}>
              WHY?
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
              Applying a Hadamard gate transforms basis states into equal linear combinations: H|0⟩ = (|0⟩ + |1⟩)/√2. Measuring this state yields |0⟩ 50% of the time and |1⟩ 50% of the time.
            </p>

            <button
              onClick={() => {
                if (onMissionCompleted) onMissionCompleted();
              }}
              style={{
                marginTop: '12px',
                padding: '12px',
                borderRadius: '9999px',
                background: '#00F2FE',
                border: 'none',
                color: '#080C14',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              [ TRY PUZZLE CHALLENGE NEXT → ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
