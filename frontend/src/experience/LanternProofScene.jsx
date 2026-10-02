import React from 'react';

/**
 * LanternProofScene.jsx
 * Layer 4 — Proof & Opportunities Bridge.
 * Displays verified learner skill evidence, portfolio projects, and direct matches with industry quantum challenges.
 */
export default function LanternProofScene({ onBackToPath }) {
  const verifiedSkills = [
    { name: 'Single-Qubit Superposition', evidence: 'Hadamard phase interference verified', badge: 'Verified' },
    { name: 'Bell State Entanglement', evidence: '|Φ⁺⟩ = 1/√2(|00⟩ + |11⟩) verified on NumPy', badge: 'Verified' },
    { name: 'Qiskit Circuit Transpilation', evidence: 'Aer simulator pass manager execution', badge: 'Verified' }
  ];

  const industryMatches = [
    {
      title: 'QAOA Supply Chain Route Optimization',
      company: 'Quantum Logistics Lab',
      matchScore: '94% Skill Match',
      required: ['QAOA', 'Combinatorial Optimization', 'Qiskit Aer']
    },
    {
      title: 'VQE Molecular Ground State Simulation',
      company: 'BioQuantum Therapeutics',
      matchScore: '88% Skill Match',
      required: ['VQE', 'Hamiltonian Mapping', 'Noise Simulation']
    }
  ];

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 32px 32px 32px',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <button
          onClick={onBackToPath}
          style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(30, 41, 59, 0.85)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#94A3B8',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          ← Back to Path
        </button>

        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34D399', letterSpacing: '2px' }}>
          PROOF OF MASTERY & OPPORTUNITIES
        </div>
      </div>

      <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Verified Capabilities */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF', margin: '0 0 16px 0' }}>
            Demonstrated Capabilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {verifiedSkills.map((sk, i) => (
              <div
                key={i}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF' }}>{sk.name}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: '#059669', color: '#FFF' }}>
                    {sk.badge}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{sk.evidence}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Problem Matches */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF', margin: '0 0 16px 0' }}>
            Relevant Industry Opportunities
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {industryMatches.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#38BDF8', fontWeight: 700, marginBottom: '8px' }}>
                    {item.company}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {item.required.map((req, j) => (
                      <span key={j} style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: '#CBD5E1' }}>
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  style={{
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    border: 'none',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Apply Capabilities →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
