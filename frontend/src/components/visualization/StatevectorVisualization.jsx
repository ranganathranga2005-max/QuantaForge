import React from 'react';

export default function StatevectorVisualization({ statevector, numQubits }) {
  if (!statevector || statevector.length === 0) {
    return <p style={{color: 'var(--text-muted)'}}>No statevector data available.</p>;
  }

  return (
    <div style={{
      backgroundColor: 'rgba(5, 5, 10, 0.4)',
      borderRadius: '12px',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    }}>
      <table style={{
        width: '100%', 
        borderCollapse: 'collapse', 
        textAlign: 'left', 
        fontFamily: 'monospace', 
        fontSize: '1.1rem'
      }}>
        <thead>
          <tr style={{
            borderBottom: '1px solid var(--border-active)', 
            color: 'var(--text-muted)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}>
            <th style={{padding: '20px 24px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'}}>Basis State</th>
            <th style={{padding: '20px 24px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'}}>Amplitude (Real)</th>
            <th style={{padding: '20px 24px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'}}>Amplitude (Imag)</th>
          </tr>
        </thead>
        <tbody>
          {statevector.map((amp, idx) => {
            const binaryStr = idx.toString(2).padStart(numQubits, '0');
            return (
              <tr key={idx} style={{
                borderBottom: '1px solid var(--border-subtle)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <td style={{padding: '20px 24px', color: 'var(--accent-secondary)', fontWeight: 600}}>|{binaryStr}⟩</td>
                <td style={{padding: '20px 24px', color: 'var(--text-primary)'}}>{amp.real.toFixed(4)}</td>
                <td style={{padding: '20px 24px', color: 'var(--text-primary)'}}>{amp.imag.toFixed(4)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
