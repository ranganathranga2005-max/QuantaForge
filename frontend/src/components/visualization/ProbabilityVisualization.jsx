import React from 'react';

export default function ProbabilityVisualization({ probabilities }) {
  if (!probabilities || Object.keys(probabilities).length === 0) {
    return <p style={{color: 'var(--text-muted)'}}>No probability data available.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {Object.entries(probabilities).map(([state, prob]) => {
        const percentage = (prob * 100).toFixed(1);
        return (
          <div key={state} style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
            <div style={{
              width: 80, 
              fontSize: '1.2rem', 
              fontFamily: 'monospace', 
              color: 'var(--text-primary)',
              fontWeight: 600
            }}>
              |{state}⟩
            </div>
            
            <div style={{
              flex: 1, 
              backgroundColor: 'rgba(255, 255, 255, 0.03)', 
              height: 40, 
              borderRadius: 8, 
              overflow: 'hidden', 
              border: '1px solid var(--border-subtle)',
              position: 'relative'
            }}>
              <div style={{
                width: `${percentage}%`, 
                background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', 
                height: '100%', 
                transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
              }}></div>
            </div>
            
            <div style={{
              width: 80, 
              textAlign: 'right', 
              fontSize: '1.2rem', 
              fontWeight: 600,
              color: 'var(--accent-secondary)'
            }}>
              {percentage}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
