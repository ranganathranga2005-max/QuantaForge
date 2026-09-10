import React, { useState, useEffect } from 'react';

const ALGORITHM_CATEGORIES = [
  {
    category: 'FOUNDATIONS',
    algos: [
      { id: 'bell', name: 'Bell State', desc: 'Maximally entangled 2-qubit state |Φ+⟩', qubits: 2 },
      { id: 'ghz', name: 'GHZ State', desc: '3-qubit Greenberger–Horne–Zeilinger entangled state', qubits: 3 }
    ]
  },
  {
    category: 'ORACLE-BASED',
    algos: [
      { id: 'deutsch_jozsa', name: 'Deutsch–Jozsa', desc: 'Determines if function is constant or balanced in 1 query', qubits: 2 },
      { id: 'bernstein_vazirani', name: 'Bernstein–Vazirani', desc: 'Finds hidden n-bit binary string s in 1 query', qubits: 3 }
    ]
  },
  {
    category: 'SEARCH',
    algos: [
      { id: 'grover', name: 'Grover\'s Search', desc: 'Quadratic speedup search for marked state in unstructured database', qubits: 2 }
    ]
  },
  {
    category: 'TRANSFORM',
    algos: [
      { id: 'qft', name: 'Quantum Fourier Transform', desc: 'Maps quantum state to frequency domain amplitudes', qubits: 3 }
    ]
  },
  {
    category: 'VARIATIONAL',
    algos: [
      { id: 'vqe', name: 'VQE (Variational Quantum Eigensolver)', desc: 'Hybrid quantum-classical ground state energy optimization', qubits: 2 },
      { id: 'qaoa', name: 'QAOA (Quantum Approximate Optimization)', desc: 'Solves MaxCut graph combinatorial optimization problems', qubits: 3 }
    ]
  },
  {
    category: 'ERROR CORRECTION',
    algos: [
      { id: 'qec', name: 'Repetition Code (QEC)', desc: '3-qubit logical encoding, error injection, syndrome decoding', qubits: 3 }
    ]
  },
  {
    category: 'ADVANCED',
    algos: [
      { id: 'shor', name: 'Educational Shor\'s (N=15)', desc: 'Order-finding quantum period estimator for factoring N=15', qubits: 4 }
    ]
  }
];

export default function AlgorithmModePanel({
  selectedBackend,
  onBuildAlgorithmCircuit,
  onRunAlgorithmSimulation,
  isLoading
}) {
  const [selectedAlgoId, setSelectedAlgoId] = useState('grover');
  const [params, setParams] = useState({
    num_qubits: 2,
    hidden_string: '101',
    oracle_type: 'balanced',
    marked_state: '11',
    iterations: 1,
    is_inverse: false,
    ansatz_type: 'hardware_efficient',
    max_iterations: 30,
    initial_state_bit: 0,
    N: 15,
    a: 2
  });

  const activeAlgo = ALGORITHM_CATEGORIES.flatMap(c => c.algos).find(a => a.id === selectedAlgoId);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{
      display: 'flex',
      gap: '24px',
      padding: '24px',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      minHeight: '400px'
    }}>
      {/* Category & Algorithm Selector Column */}
      <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px', borderRight: '1px solid var(--border-subtle)', paddingRight: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
          ALGORITHM REGISTRY
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '450px' }}>
          {ALGORITHM_CATEGORIES.map(cat => (
            <div key={cat.category} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-secondary)', fontFamily: 'monospace' }}>
                {cat.category}
              </div>
              {cat.algos.map(algo => {
                const isSelected = selectedAlgoId === algo.id;
                return (
                  <div
                    key={algo.id}
                    onClick={() => setSelectedAlgoId(algo.id)}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(30, 41, 59, 0.4)',
                      border: isSelected ? '1px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? 'var(--accent-secondary)' : 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {algo.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {algo.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Algorithm Parameters & Actions */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: 'rgba(5, 5, 15, 0.6)', border: '1px solid var(--border-active)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, color: 'var(--accent-secondary)', fontFamily: 'monospace', fontSize: '1.2rem' }}>
              {activeAlgo?.name}
            </h3>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', padding: '4px 10px', backgroundColor: 'rgba(6,182,212,0.1)', border: '1px solid var(--border-subtle)', borderRadius: '4px', color: 'var(--accent-primary)' }}>
              Backend: {selectedBackend}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '8px', lineHeight: '1.5' }}>
            {activeAlgo?.desc}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            INPUT / ORACLE PARAMETERS
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {selectedAlgoId === 'bernstein_vazirani' && (
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>HIDDEN BITSTRING (s):</label>
                <input
                  type="text"
                  value={params.hidden_string}
                  onChange={e => handleParamChange('hidden_string', e.target.value)}
                  style={{ width: '100%', marginTop: '6px', padding: '8px', background: 'rgba(5,5,10,0.8)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: '6px', fontFamily: 'monospace' }}
                />
              </div>
            )}

            {selectedAlgoId === 'deutsch_jozsa' && (
              <>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>ORACLE TYPE:</label>
                  <select
                    value={params.oracle_type}
                    onChange={e => handleParamChange('oracle_type', e.target.value)}
                    style={{ width: '100%', marginTop: '6px', padding: '8px', background: 'rgba(5,5,10,0.8)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: '6px', fontFamily: 'monospace' }}
                  >
                    <option value="constant">Constant (returns 0 or 1)</option>
                    <option value="balanced">Balanced (returns 0 for half, 1 for half)</option>
                  </select>
                </div>
              </>
            )}

            {selectedAlgoId === 'grover' && (
              <>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>MARKED TARGET STATE:</label>
                  <input
                    type="text"
                    value={params.marked_state}
                    onChange={e => handleParamChange('marked_state', e.target.value)}
                    style={{ width: '100%', marginTop: '6px', padding: '8px', background: 'rgba(5,5,10,0.8)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: '6px', fontFamily: 'monospace' }}
                  />
                </div>
              </>
            )}

            {selectedAlgoId === 'qft' && (
              <>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>QUBITS (n):</label>
                  <select
                    value={params.num_qubits}
                    onChange={e => handleParamChange('num_qubits', parseInt(e.target.value, 10))}
                    style={{ width: '100%', marginTop: '6px', padding: '8px', background: 'rgba(5,5,10,0.8)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: '6px', fontFamily: 'monospace' }}
                  >
                    <option value={2}>2 Qubits</option>
                    <option value={3}>3 Qubits</option>
                    <option value={4}>4 Qubits</option>
                  </select>
                </div>
              </>
            )}

            {selectedAlgoId === 'vqe' && (
              <>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>ANSATZ TYPE:</label>
                  <select
                    value={params.ansatz_type}
                    onChange={e => handleParamChange('ansatz_type', e.target.value)}
                    style={{ width: '100%', marginTop: '6px', padding: '8px', background: 'rgba(5,5,10,0.8)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: '6px', fontFamily: 'monospace' }}
                  >
                    <option value="hardware_efficient">Hardware-Efficient (Ry + CNOT)</option>
                    <option value="uccsd">UCCSD-inspired</option>
                  </select>
                </div>
              </>
            )}

            {selectedAlgoId === 'qec' && (
              <>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>INITIAL LOGICAL BIT:</label>
                  <select
                    value={params.initial_state_bit}
                    onChange={e => handleParamChange('initial_state_bit', parseInt(e.target.value, 10))}
                    style={{ width: '100%', marginTop: '6px', padding: '8px', background: 'rgba(5,5,10,0.8)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: '6px', fontFamily: 'monospace' }}
                  >
                    <option value={0}>Logical |0_L⟩</option>
                    <option value={1}>Logical |1_L⟩</option>
                  </select>
                </div>
              </>
            )}

            {selectedAlgoId === 'shor' && (
              <>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>NUMBER TO FACTOR (N):</label>
                  <input
                    type="number"
                    value={params.N}
                    readOnly
                    style={{ width: '100%', marginTop: '6px', padding: '8px', background: 'rgba(5,5,10,0.8)', border: '1px solid var(--border-subtle)', color: 'white', borderRadius: '6px', fontFamily: 'monospace' }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => onBuildAlgorithmCircuit(selectedAlgoId, params)}
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid var(--accent-secondary)',
              color: 'var(--accent-secondary)',
              borderRadius: '8px',
              fontWeight: 700,
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            ⚡ BUILD CIRCUIT IN WORKSPACE
          </button>

          <button
            onClick={() => onRunAlgorithmSimulation(selectedAlgoId, params)}
            disabled={isLoading}
            style={{
              padding: '12px 28px',
              backgroundColor: 'var(--accent-primary)',
              color: '#0b1120',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 800,
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
            }}
          >
            {isLoading ? 'EXECUTING ALGORITHM...' : '▶ RUN ALGORITHM'}
          </button>
        </div>
      </div>
    </div>
  );
}
