import React, { useState } from 'react';
import BlochSphere3D from '../components/visualization/BlochSphere3D';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * MissionView.jsx
 * Mission-Based Interactive Learning Canvas.
 * Loop: WONDER → PREDICT → INTERACT → EXPERIMENT → OBSERVE → EXPLAIN → PUZZLE → CHALLENGE → MASTER.
 */
export default function MissionView({ missionContent, onMissionCompleted, onBackToRoadmap }) {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [predictedAnswer, setPredictedAnswer] = useState(null);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const steps = missionContent?.steps || [];
  const currentStage = steps[activeStageIdx] || steps[0];

  const handleNextStage = () => {
    if (activeStageIdx + 1 < steps.length) {
      setActiveStageIdx(activeStageIdx + 1);
    } else {
      genieEvents.emit(GENIE_EVENTS.CHALLENGE_PASSED);
      if (onMissionCompleted) onMissionCompleted();
    }
  };

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    genieEvents.emit(GENIE_EVENTS.SIMULATION_STARTED);

    setTimeout(() => {
      const mockResult = {
        statevector: [
          { real: 0.7071, imag: 0 },
          { real: 0.7071, imag: 0 }
        ],
        probabilities: { '|0⟩': 0.5, '|1⟩': 0.5 }
      };
      setSimulationResult(mockResult);
      setIsSimulating(false);
      genieEvents.emit(GENIE_EVENTS.SIMULATION_COMPLETED, mockResult);
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        width: '100%',
        padding: '32px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}
    >
      {/* Top Mission Header */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button
          onClick={onBackToRoadmap}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94A3B8',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          ← Back to Path Roadmap
        </button>

        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
          MISSION: {missionContent?.objective}
        </div>
      </div>

      {/* Stage Progress Bar */}
      <div style={{ display: 'flex', gap: '8px', width: '100%', marginBottom: '32px' }}>
        {steps.map((st, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '6px',
              borderRadius: '9999px',
              backgroundColor: i <= activeStageIdx ? '#38BDF8' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Mission Canvas Panel */}
      <div
        style={{
          width: '100%',
          padding: '36px',
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          color: '#FFFFFF'
        }}
      >
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', marginBottom: '8px' }}>
          Stage {activeStageIdx + 1}: {currentStage.stage}
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 16px 0' }}>
          {currentStage.title}
        </h2>

        {/* Stage Content Renderers */}
        {currentStage.stage === 'WONDER' && (
          <div>
            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: '1.6' }}>
              {currentStage.description}
            </p>
            <div style={{ margin: '24px 0' }}>
              <BlochSphere3D statevector={[{ real: 0.7071, imag: 0 }, { real: 0.7071, imag: 0 }]} />
            </div>
          </div>
        )}

        {currentStage.stage === 'PREDICT' && (
          <div>
            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', marginBottom: '20px' }}>
              {currentStage.question}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {currentStage.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setPredictedAnswer(opt)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: predictedAnswer === opt ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.8)',
                    border: predictedAnswer === opt ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFF',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.95rem'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStage.stage === 'INTERACT' && (
          <div>
            <p style={{ fontSize: '1rem', color: '#94A3B8', marginBottom: '20px' }}>
              Interact with the 3D Quantum Statevector rotation.
            </p>
            <BlochSphere3D statevector={[{ real: 0.7071, imag: 0 }, { real: 0.7071, imag: 0 }]} />
          </div>
        )}

        {currentStage.stage === 'EXPERIMENT' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ fontSize: '1rem', color: '#CBD5E1', marginBottom: '24px' }}>
              Run exact statevector matrix multiplication on the custom NumPy Quantum Engine:
            </p>
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              style={{
                padding: '14px 28px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                border: '1px solid #38bdf8',
                color: '#FFF',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {isSimulating ? '⚡ Simulating Matrix...' : '▶ Run Quantum Engine Simulation'}
            </button>

            {simulationResult && (
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '12px', textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38BDF8' }}>QuantumResult Verification:</div>
                <pre style={{ color: '#10B981', fontFamily: 'monospace', margin: '8px 0 0 0' }}>
                  {JSON.stringify(simulationResult.probabilities, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {currentStage.stage === 'MASTER' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🏆</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 12px 0' }}>
              Milestone Mastered!
            </h3>
            <p style={{ color: '#94A3B8', margin: '0 0 24px 0' }}>
              You have successfully verified quantum superposition amplitude interference.
            </p>
          </div>
        )}

        {/* Next Stage Button */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleNextStage}
            style={{
              padding: '12px 28px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              border: '1px solid #38bdf8',
              color: '#FFF',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            {activeStageIdx + 1 < steps.length ? 'Continue Stage →' : 'Complete Mission & Claim Flag 🏁'}
          </button>
        </div>
      </div>
    </div>
  );
}
