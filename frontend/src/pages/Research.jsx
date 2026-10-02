import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdaptive } from '../context/AdaptiveContext';

export default function Research() {
  const navigate = useNavigate();
  const { currentLevelData, userLevel } = useAdaptive();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('gaps');

  const paperGaps = [
    {
      id: 1,
      title: 'Barren Plateaus in Variational Quantum Eigensolvers (VQE)',
      authors: 'McClean et al., Nature Communications',
      limitation: 'Gradient disappearance in deep random ansätze as qubit counts scale.',
      identifiedGap: 'Layer-by-layer initialization strategies with localized entanglement gates.',
      status: 'Validated Research Gap',
      difficulty: 'Advanced'
    },
    {
      id: 2,
      title: 'Noise Sensitivity in Quantum Approximate Optimization (QAOA)',
      authors: 'Farhi & Gutmann, Phys. Rev. X',
      limitation: 'Coherence time decay during high-depth p-level QAOA execution on NISQ QPUs.',
      identifiedGap: 'Pulse-level dynamic decoupling combined with Clifford stabilizer error mitigation.',
      status: 'Open Exploration',
      difficulty: 'Researcher'
    }
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '28px', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '32px', borderRadius: '20px', color: '#FFF', boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🔬</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38BDF8' }}>
              Advanced Research Workspace
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Quantum Literature & Gap Validation
          </h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: '0.95rem', maxWidth: '650px' }}>
            Explore literature limitations, cross-check existing works, validate novel research gaps, and benchmark execution simulations.
          </p>
        </div>

        <div style={{
          padding: '8px 16px', borderRadius: '10px',
          backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)',
          color: '#7DD3FC', fontWeight: 700, fontSize: '0.85rem'
        }}>
          Mode: {currentLevelData.label}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        {[
          { id: 'gaps', label: '🔬 Research Gap Discovery' },
          { id: 'literature', label: '📚 Literature Search' },
          { id: 'benchmarks', label: '⚡ Simulation Benchmarking' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              backgroundColor: activeTab === tab.id ? '#2563EB' : 'transparent',
              color: activeTab === tab.id ? '#FFF' : 'var(--text-muted)',
              border: activeTab === tab.id ? 'none' : '1px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Research Gap Discovery */}
      {activeTab === 'gaps' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {paperGaps.map(gap => (
            <div
              key={gap.id}
              style={{
                backgroundColor: 'var(--bg-panel)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{
                  padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800,
                  backgroundColor: '#EFF6FF', color: '#2563EB'
                }}>
                  {gap.status}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                  Difficulty: {gap.difficulty}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                {gap.title}
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '16px' }}>
                Source: {gap.authors}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#991B1B', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Identified Limitation
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#7F1D1D' }}>
                    {gap.limitation}
                  </div>
                </div>

                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Proposed Research Gap
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#14532D' }}>
                    {gap.identifiedGap}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const preset = [
                    { id: '1', gate: 'H', qubit: 0, col: 1 },
                    { id: '2', gate: 'H', qubit: 1, col: 1 },
                    { id: '3', gate: 'CNOT', control: 0, target: 1, col: 2 },
                    { id: '4', gate: 'RZ', qubit: 1, col: 3, parameters: { theta: 1.57 } }
                  ];
                  navigate('/lab', { state: { preset, autoExecute: true } });
                }}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#2563EB',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
                }}
              >
                FORMULATE & RUN SIMULATION IN LAB →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Literature Search */}
      {activeTab === 'literature' && (
        <div style={{ backgroundColor: 'var(--bg-panel)', borderRadius: '16px', padding: '28px', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>Search Verified Quantum Papers</h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search by topic, algorithm, author, or Qiskit doc..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                flex: 1, padding: '12px 16px', borderRadius: '10px',
                border: '1px solid var(--border-medium)', fontSize: '0.9rem'
              }}
            />
            <button style={{ padding: '12px 24px', backgroundColor: '#2563EB', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: 700 }}>
              Search RAG Database
            </button>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Queries vector embeddings of peer-reviewed arXiv publications, IBM Qiskit reference manuals, and IEEE Quantum transactions.
          </p>
        </div>
      )}

      {/* Tab 3: Simulation Benchmarking */}
      {activeTab === 'benchmarks' && (
        <div style={{ backgroundColor: 'var(--bg-panel)', borderRadius: '16px', padding: '28px', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>Simulator Execution Scaling</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, color: '#2563EB' }}>NumPy M1 Dense Engine</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>Up to 16 Qubits • Statevector $2^n$</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, color: '#7C3AED' }}>Qiskit Aer Simulator</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>Up to 20 Qubits • Shots & Noise</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, color: '#059669' }}>Clifford Stabilizer Engine</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>50+ Qubits • $O(n^2)$ Gottesman-Knill</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
