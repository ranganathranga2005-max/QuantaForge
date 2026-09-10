import React from 'react';
import { QuantumPanel, QuantumMetric } from '../ui/QuantumPrimitives';

export default function InterferenceVisualization({ statevector, probabilities }) {
  if (!statevector || statevector.length === 0) {
    return (
      <QuantumPanel title="Quantum Phase & Interference" badgeText="Real Statevector">
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '16px' }}>
          Execute a quantum circuit to observe quantum phase interference.
        </div>
      </QuantumPanel>
    );
  }

  const numQubits = Math.round(Math.log2(statevector.length));
  
  // Calculate relative phase angles and constructive/destructive interference indicators
  const amplitudes = statevector.map((amp, idx) => {
    const real = amp.real;
    const imag = amp.imag;
    const mag = Math.sqrt(real * real + imag * imag);
    const phase = Math.atan2(imag, real); // radians (-pi to pi)
    const phaseDeg = (phase * (180 / Math.PI) + 360) % 360;
    const bitstr = idx.toString(2).padStart(numQubits, '0');
    const prob = probabilities ? (probabilities[bitstr] || 0) : (mag * mag);
    return { idx, bitstr, real, imag, mag, phase, phaseDeg, prob };
  });

  return (
    <QuantumPanel title="Quantum Phase & Interference" badgeText={`${numQubits}-Qubit System`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          <strong style={{ color: 'var(--accent-secondary)' }}>Quantum Interference Principle:</strong> Quantum state amplitudes psi(x) = |alpha| e^(i phi) combine constructively when phases align (delta phi approx 0 deg) and destructively when out of phase (delta phi approx 180 deg).
        </div>

        {/* Phase Wave & Magnitude Spectrum */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {amplitudes.slice(0, 8).map(a => (
            <div key={a.idx} style={{ background: 'rgba(5, 5, 15, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-secondary)' }}>
                  |{a.bitstr}⟩
                </span>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  <span style={{ color: '#06b6d4' }}>|α| = {a.mag.toFixed(3)}</span>
                  <span style={{ color: '#a78bfa' }}>φ = {a.phaseDeg.toFixed(1)}°</span>
                  <span style={{ color: '#4ade80' }}>P = {(a.prob * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* Amplitude Bar & Phase Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '8px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, a.prob * 100)}%`,
                    background: `hsl(${a.phaseDeg}, 85%, 55%)`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <div style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  backgroundColor: a.mag > 0.01 ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)',
                  color: a.mag > 0.01 ? 'var(--accent-primary)' : 'var(--text-muted)'
                }}>
                  {a.mag > 0.01 ? `Phase ${a.phaseDeg.toFixed(0)}°` : 'Canceled (0)'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {amplitudes.length > 8 && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'monospace' }}>
            Showing top 8 basis state amplitudes of {amplitudes.length} total system states.
          </div>
        )}
      </div>
    </QuantumPanel>
  );
}

function bin(n) {
  return n.toString(2);
}
