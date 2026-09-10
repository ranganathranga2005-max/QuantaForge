import React, { useState } from 'react';
import ProbabilityVisualization from './ProbabilityVisualization';
import StatevectorVisualization from './StatevectorVisualization';
import QuantumTracePlayer from './QuantumTracePlayer';
import BlochSphere3D from './BlochSphere3D';
import InterferenceVisualization from './InterferenceVisualization';

export default function ResultsPanel({ simResult, isStale }) {
  const [activeTab, setActiveTab] = useState('Process');

  return (
    <div className="lab-main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="lab-tabs" style={{ padding: '0 16px', overflowX: 'auto', flexShrink: 0, whiteSpace: 'nowrap', display: 'flex', gap: '8px' }}>
        {[
          { id: 'Process', label: 'Process Trace' },
          { id: 'Results', label: 'Results' },
          { id: 'Probabilities', label: 'Probabilities' },
          { id: 'Interference', label: 'Phase & Interference' },
          { id: 'Statevector', label: 'Statevector' },
          { id: 'Bloch', label: 'Bloch Sphere' },
          { id: 'Amplitudes', label: 'Amplitudes Table' }
        ].map(tab => (
          <div
            key={tab.id}
            className={`lab-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 14px',
              fontSize: '0.85rem',
              fontWeight: 600,
              fontFamily: 'monospace',
              cursor: 'pointer',
              borderRadius: '6px 6px 0 0',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-secondary)' : 'none',
              color: activeTab === tab.id ? 'var(--accent-secondary)' : 'var(--text-muted)',
              backgroundColor: activeTab === tab.id ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="lab-content" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {isStale && (
          <div style={{
            marginBottom: '16px',
            padding: '10px 14px',
            backgroundColor: 'rgba(255, 200, 0, 0.1)',
            border: '1px solid rgba(255, 200, 0, 0.3)',
            borderRadius: '6px',
            color: 'rgba(255, 200, 0, 0.9)',
            fontSize: '0.8rem',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚠</span>
            <span>Circuit modified — execution results may be stale. Re-run simulation to update backend results.</span>
          </div>
        )}

        {/* Process Trace Tab */}
        {activeTab === 'Process' && (
          <div style={{ animation: 'fadeIn 0.3s ease', minHeight: '400px' }}>
            <QuantumTracePlayer
              trace={simResult?.execution_trace ?? []}
              numQubits={simResult?.num_qubits ?? 1}
              traceCapability={simResult?.trace_capability ?? 'unavailable'}
              traceReason={simResult?.trace_reason}
            />
          </div>
        )}

        {/* Results Summary Tab */}
        {activeTab === 'Results' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {simResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontFamily: 'monospace' }}>Simulation Status</h3>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid var(--gate-y)',
                    borderRadius: '6px',
                    color: 'var(--gate-y)',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gate-y)', boxShadow: '0 0 8px var(--gate-y)' }}></div>
                    {simResult.status.toUpperCase()}
                  </div>
                </div>
                
                <div>
                  <h3 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontFamily: 'monospace' }}>Sampled Measurement Outcome</h3>
                  <div style={{
                    padding: '24px 32px',
                    backgroundColor: 'rgba(5, 5, 10, 0.6)',
                    border: '1px solid var(--border-active)',
                    borderRadius: '10px',
                    display: 'inline-block'
                  }}>
                    <h2 style={{
                      color: 'var(--accent-secondary)', 
                      fontSize: '3rem', 
                      margin: 0,
                      fontFamily: 'monospace',
                      letterSpacing: '0.1em'
                    }}>
                      |{simResult.measurement || 'None'}⟩
                    </h2>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontFamily: 'monospace' }}>Execution Backend</h3>
                  <p style={{
                    fontSize: '1.1rem', 
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace',
                    margin: 0
                  }}>{simResult.backend_name}</p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', opacity: 0.5 }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontFamily: 'monospace' }}>Run a simulation to view backend results.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Probabilities Tab */}
        {activeTab === 'Probabilities' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <ProbabilityVisualization probabilities={simResult?.probabilities} />
          </div>
        )}

        {/* Interference & Phase Tab */}
        {activeTab === 'Interference' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <InterferenceVisualization statevector={simResult?.statevector} probabilities={simResult?.probabilities} />
          </div>
        )}

        {/* Statevector Tab */}
        {activeTab === 'Statevector' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <StatevectorVisualization statevector={simResult?.statevector} numQubits={simResult?.num_qubits} />
          </div>
        )}

        {/* Bloch Sphere Tab */}
        {activeTab === 'Bloch' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <BlochSphere3D statevector={simResult?.statevector} />
          </div>
        )}

        {/* Amplitudes Table Tab */}
        {activeTab === 'Amplitudes' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {simResult?.statevector ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {simResult.statevector.slice(0, 16).map((amp, idx) => {
                    const binaryStr = idx.toString(2).padStart(simResult.num_qubits, '0');
                    const magnitude = Math.sqrt(amp.real*amp.real + amp.imag*amp.imag);
                    const phase = Math.atan2(amp.imag, amp.real);
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px', background: 'rgba(5,5,10,0.5)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--accent-secondary)', width: '60px' }}>|{binaryStr}⟩</div>
                        <div style={{ flex: 1, height: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', 
                            width: `${magnitude * 100}%`, 
                            backgroundColor: 'var(--accent-primary)',
                            opacity: 0.8
                          }}></div>
                        </div>
                        <div style={{ width: '220px', fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          <div>Re: {amp.real.toFixed(3)}, Im: {amp.imag.toFixed(3)}</div>
                          <div>Mag: {magnitude.toFixed(3)}, Phase: {(phase * (180/Math.PI)).toFixed(1)}°</div>
                        </div>
                      </div>
                    )
                 })}
                 {simResult.statevector.length > 16 && (
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'monospace' }}>
                     Displaying top 16 of {simResult.statevector.length} total basis state amplitudes.
                   </div>
                 )}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>Run a simulation to view quantum amplitudes table.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
