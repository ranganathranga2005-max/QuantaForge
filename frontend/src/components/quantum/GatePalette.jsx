import React from 'react';

const GATE_CATEGORIES = [
  {
    name: 'BASIC',
    gates: [
      { id: 'H', name: 'Hadamard', symbol: 'H', desc: 'Puts qubit into equal superposition |+⟩', color: 'var(--accent-secondary)' },
      { id: 'X', name: 'Pauli-X', symbol: 'X', desc: 'Quantum NOT gate (bit flip)', color: 'var(--gate-x)' },
      { id: 'Y', name: 'Pauli-Y', symbol: 'Y', desc: 'Bit & phase flip', color: 'var(--gate-y)' },
      { id: 'Z', name: 'Pauli-Z', symbol: 'Z', desc: 'Phase flip gate', color: 'var(--gate-z)' },
    ]
  },
  {
    name: 'PHASE',
    gates: [
      { id: 'S', name: 'Phase S', symbol: 'S', desc: 'π/2 phase shift gate', color: '#3b82f6' },
      { id: 'T', name: 'Phase T', symbol: 'T', desc: 'π/4 phase shift gate', color: '#8b5cf6' },
    ]
  },
  {
    name: 'ROTATIONS',
    gates: [
      { id: 'RX', name: 'Rotation X', symbol: 'RX', desc: 'Rotation around X-axis by θ', parameterized: true, color: '#ec4899' },
      { id: 'RY', name: 'Rotation Y', symbol: 'RY', desc: 'Rotation around Y-axis by θ', parameterized: true, color: '#ec4899' },
      { id: 'RZ', name: 'Rotation Z', symbol: 'RZ', desc: 'Rotation around Z-axis by θ', parameterized: true, color: '#ec4899' },
    ]
  },
  {
    name: 'CONTROLLED',
    gates: [
      { id: 'CNOT', name: 'Controlled-NOT', symbol: 'CX', desc: 'Flips target qubit if control is |1⟩', multiQubit: true, color: '#10b981' },
      { id: 'CZ', name: 'Controlled-Z', symbol: 'CZ', desc: 'Flips phase if both qubits are |1⟩', multiQubit: true, color: '#10b981' },
      { id: 'SWAP', name: 'SWAP', symbol: 'SW', desc: 'Swaps states of two qubits', multiQubit: true, color: '#10b981' },
    ]
  },
  {
    name: 'MEASUREMENT & LOGIC',
    gates: [
      { id: 'M', name: 'Measure', symbol: 'M', desc: 'Collapses qubit state to classical bit', color: '#f59e0b' },
      { id: 'Reset', name: 'Reset', symbol: '|0⟩', desc: 'Resets qubit to state |0⟩', color: '#64748b' },
      { id: 'IF', name: 'Conditional', symbol: 'IF', desc: 'Executes operation conditioned on classical bit', color: '#a855f7' }
    ]
  }
];

export default function GatePalette({ onDragStart, onSelectGate, selectedGateId }) {
  return (
    <div style={{
      width: '260px',
      flexShrink: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      borderRight: '1px solid var(--border-subtle)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflowY: 'auto',
      userSelect: 'none'
    }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: 'var(--text-muted)',
        fontFamily: 'monospace',
        textTransform: 'uppercase'
      }}>
        GATE PALETTE
      </div>

      {GATE_CATEGORIES.map(cat => (
        <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(148, 163, 184, 0.7)', fontFamily: 'monospace' }}>
            {cat.name}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {cat.gates.map(gate => {
              const isSelected = selectedGateId === gate.id;
              return (
                <div
                  key={gate.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, gate.id)}
                  onClick={() => onSelectGate && onSelectGate(gate)}
                  title={`${gate.name}: ${gate.desc}`}
                  style={{
                    padding: '8px 10px',
                    backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                    border: isSelected ? '1px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    cursor: 'grab',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: gate.color
                    }}>
                      {gate.symbol}
                    </span>
                    {gate.parameterized && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontFamily: 'monospace',
                        color: '#ec4899',
                        border: '1px solid rgba(236, 72, 153, 0.4)',
                        padding: '1px 3px',
                        borderRadius: '3px'
                      }}>
                        (θ)
                      </span>
                    )}
                    {gate.multiQubit && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontFamily: 'monospace',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        padding: '1px 3px',
                        borderRadius: '3px'
                      }}>
                        2-Q
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {gate.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: 'auto',
        padding: '12px',
        backgroundColor: 'rgba(5, 5, 15, 0.5)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '6px',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        fontFamily: 'monospace',
        lineHeight: 1.4
      }}>
        💡 <strong>Tip:</strong> Drag gates onto quantum wires or click a wire cell to place.
      </div>
    </div>
  );
}
