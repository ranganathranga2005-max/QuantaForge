import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Community() {
  const navigate = useNavigate();

  const communityDiscussions = [
    {
      id: 1,
      title: 'How does phase kickback work in Deutsch-Jozsa algorithm?',
      author: 'Priya S.',
      level: 'Level 3: Undergrad',
      replies: 12,
      topic: 'Algorithm Intuition',
      preset: [{ id: '1', gate: 'H', qubit: 0 }, { id: '2', gate: 'X', qubit: 1 }, { id: '3', gate: 'H', qubit: 1 }, { id: '4', gate: 'CNOT', control: 0, target: 1 }],
      lastActive: '2h ago'
    },
    {
      id: 2,
      title: 'Optimizing circuit depth for 5-qubit Grover search',
      author: 'Marcus K.',
      level: 'Level 4: Advanced',
      replies: 8,
      topic: 'Qiskit Optimization',
      preset: [{ id: '1', gate: 'H', qubit: 0 }, { id: '2', gate: 'H', qubit: 1 }, { id: '3', gate: 'Z', qubit: 0 }],
      lastActive: '4h ago'
    }
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      <div style={{
        marginBottom: '28px', background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
        padding: '32px', borderRadius: '20px', color: '#FFF', boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🤝</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93C5FD' }}>
            Quantum Learning Community
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          Peer Discussion & Circuit Sharing
        </h1>
        <p style={{ color: '#94A3B8', margin: 0, fontSize: '0.95rem' }}>
          Collaborate with fellow learners, exchange quantum circuit designs, and solve conceptual roadblocks together.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {communityDiscussions.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'var(--bg-panel)',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: '0.75rem' }}>
                  {item.topic}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Posted by {item.author} ({item.level})</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {item.title}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>💬 {item.replies} replies</span>
              <button
                onClick={() => navigate('/lab', { state: { preset: item.preset, autoExecute: true } })}
                style={{ padding: '8px 16px', backgroundColor: '#2563EB', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.825rem', cursor: 'pointer', boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)' }}
              >
                OPEN SHARED CIRCUIT IN LAB →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
