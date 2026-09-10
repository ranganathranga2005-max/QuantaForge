import React from 'react';

export default function ExperimentModePanel({
  onRunParallelSimulation,
  parallelResults,
  isLoading
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '24px',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      minHeight: '400px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--accent-secondary)', fontFamily: 'monospace', fontSize: '1.2rem' }}>
            ADVANCED EXPERIMENTS WORKBENCH
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>
            Compare cross-backend execution results across Custom M1, Qiskit Aer, PennyLane, and Cirq simulators.
          </p>
        </div>

        <button
          onClick={onRunParallelSimulation}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: 'linear-gradient(135deg, #a78bfa 0%, #3b82f6 100%)',
            color: 'white',
            border: '1px solid rgba(167, 139, 250, 0.5)',
            borderRadius: '8px',
            fontWeight: 800,
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(167, 139, 250, 0.3)'
          }}
        >
          {isLoading ? 'RUNNING CROSS-BACKEND...' : '⚡ RUN PARALLEL BACKEND COMPARISON'}
        </button>
      </div>

      {parallelResults ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
          {Object.entries(parallelResults.results || {}).map(([bName, bRes]) => (
            <div key={bName} style={{ padding: '16px', backgroundColor: 'rgba(5, 5, 15, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                  {bName}
                </span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#10b981' }}>
                  {bRes.status}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                Sampled Measurement: <strong style={{ color: 'white' }}>|{bRes.measurement}⟩</strong>
              </div>
              <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                Probabilities: {JSON.stringify(bRes.probabilities)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px', border: '1px dashed var(--border-subtle)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
            Click "RUN PARALLEL BACKEND COMPARISON" to execute the current circuit across all 4 quantum backends simultaneously.
          </p>
        </div>
      )}
    </div>
  );
}
