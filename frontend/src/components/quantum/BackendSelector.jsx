import React from 'react';

export default function BackendSelector({ selectedBackend, onBackendChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
      <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Simulation Backend</label>
      <select 
        value={selectedBackend}
        onChange={(e) => onBackendChange(e.target.value)}
        style={{
          padding: '8px 32px 8px 16px',
          backgroundColor: 'rgba(5, 5, 10, 0.6)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-active)',
          borderRadius: '6px',
          fontFamily: 'var(--font-family)',
          fontSize: '0.95rem',
          outline: 'none',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238A93A6%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px top 50%',
          backgroundSize: '10px auto',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-secondary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-active)'; }}
      >
        <option value="custom_m1" style={{ backgroundColor: '#0C0E14' }}>NumPy Engine (custom_m1)</option>
        <option value="qiskit_aer" style={{ backgroundColor: '#0C0E14' }}>Qiskit Aer (qiskit_aer)</option>
        <option value="pennylane" style={{ backgroundColor: '#0C0E14' }}>PennyLane (pennylane)</option>
        <option value="cirq" style={{ backgroundColor: '#0C0E14' }}>Google Cirq (cirq)</option>
        <option value="qbraid" style={{ backgroundColor: '#0C0E14' }}>qBraid Platform (qbraid)</option>
      </select>
    </div>
  );
}
