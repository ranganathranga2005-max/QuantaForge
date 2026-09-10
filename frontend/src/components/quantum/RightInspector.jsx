import React from 'react';

export default function RightInspector({
  selectedGate,
  onUpdateGateParam,
  onDeleteSelectedGate,
  onDeselectGate,
  numQubits,
  visualGates,
  selectedBackend,
  simResult,
  isStale
}) {
  const operationsCount = visualGates.length;
  const measurementCount = visualGates.filter(g => g.gate === 'M').length;

  return (
    <div style={{
      width: '280px',
      flexShrink: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      borderLeft: '1px solid var(--border-subtle)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflowY: 'auto',
      userSelect: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          fontFamily: 'monospace',
          textTransform: 'uppercase'
        }}>
          {selectedGate ? 'GATE INSPECTOR' : 'CIRCUIT OVERVIEW'}
        </div>
        {selectedGate && (
          <button
            onClick={onDeselectGate}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}
          >
            ✕ Close
          </button>
        )}
      </div>

      {selectedGate ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            backgroundColor: 'rgba(5, 5, 15, 0.6)',
            border: '1px solid var(--border-active)',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              fontFamily: 'monospace',
              color: 'var(--accent-secondary)'
            }}>
              {selectedGate.gate}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {selectedGate.gate === 'H' ? 'Hadamard Gate' :
                 selectedGate.gate === 'X' ? 'Pauli-X Gate' :
                 selectedGate.gate === 'Y' ? 'Pauli-Y Gate' :
                 selectedGate.gate === 'Z' ? 'Pauli-Z Gate' :
                 selectedGate.gate === 'CNOT' ? 'Controlled-NOT' :
                 selectedGate.gate === 'CZ' ? 'Controlled-Z' :
                 selectedGate.gate === 'SWAP' ? 'SWAP Gate' :
                 selectedGate.gate === 'M' ? 'Measurement' :
                 selectedGate.gate === 'Reset' ? 'Reset Gate' :
                 selectedGate.gate === 'IF' ? 'Conditional Gate' : `${selectedGate.gate} Gate`}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                Column: {selectedGate.col}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>TYPE</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'monospace' }}>
                {['CNOT', 'CZ', 'SWAP'].includes(selectedGate.gate) ? '2-Qubit Controlled' :
                 selectedGate.gate === 'M' ? 'Measurement' :
                 ['RX', 'RY', 'RZ'].includes(selectedGate.gate) ? 'Parameterized Single-Qubit' : 'Single-Qubit'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>TARGET</span>
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 700, fontFamily: 'monospace' }}>
                {selectedGate.control !== undefined ? `Ctrl: q${selectedGate.control}, Tgt: q${selectedGate.target}` :
                 selectedGate.qubit !== undefined ? `q${selectedGate.qubit}` :
                 selectedGate.cbit !== undefined ? `c${selectedGate.cbit} → q${selectedGate.targetQubit}` : 'N/A'}
              </span>
            </div>

            {['RX', 'RY', 'RZ'].includes(selectedGate.gate) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  PARAMETER (θ radians):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={selectedGate.parameters?.theta ?? 0.785}
                  onChange={(e) => onUpdateGateParam && onUpdateGateParam(selectedGate.id, parseFloat(e.target.value))}
                  style={{
                    backgroundColor: 'rgba(5, 5, 15, 0.8)',
                    border: '1px solid var(--border-active)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            )}
          </div>

          <button
            onClick={() => onDeleteSelectedGate && onDeleteSelectedGate(selectedGate.id)}
            style={{
              marginTop: '16px',
              padding: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              borderRadius: '6px',
              fontWeight: 700,
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            🗑 DELETE GATE
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'rgba(5,5,15,0.4)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>Qubits</span>
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 700, fontFamily: 'monospace' }}>{numQubits} Qubits</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'rgba(5,5,15,0.4)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>Operations</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontFamily: 'monospace' }}>{operationsCount} Gates</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'rgba(5,5,15,0.4)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>Measurements</span>
              <span style={{ color: '#f59e0b', fontWeight: 700, fontFamily: 'monospace' }}>{measurementCount} M</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'rgba(5,5,15,0.4)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>Active Backend</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'monospace' }}>{selectedBackend}</span>
            </div>
          </div>

          <div style={{
            padding: '14px',
            backgroundColor: isStale ? 'rgba(255, 200, 0, 0.08)' : simResult ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${isStale ? 'rgba(255, 200, 0, 0.3)' : simResult ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              EXECUTION STATUS
            </div>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              fontFamily: 'monospace',
              color: isStale ? 'rgba(255, 200, 0, 0.9)' : simResult ? '#10b981' : 'var(--text-muted)'
            }}>
              {isStale ? '⚡ STALE (Circuit modified)' : simResult ? '✓ SIMULATED' : '○ IDLE (Ready)'}
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace', lineHeight: '1.4', marginTop: '10px' }}>
            Click any gate on the circuit wires to inspect, adjust parameters, or delete.
          </div>
        </div>
      )}
    </div>
  );
}
