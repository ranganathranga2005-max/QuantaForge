import React from 'react';
import BackendSelector from './BackendSelector';
import { LEVEL_SPECTRUM } from '../../context/AdaptiveContext';

export default function ExperimentSettingsModal({
  isOpen,
  onClose,
  selectedBackend,
  onBackendChange,
  numQubits,
  onQubitsChange,
  userLevel,
  onLevelChange,
  onOpenOnboarding
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        maxWidth: '520px',
        width: '100%',
        padding: '28px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
        border: '1px solid #E2E8F0',
        animation: 'fadeInUp 0.2s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
            }}>
              ⚙️
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                Experiment Settings
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                Configure execution backend, qubit registers, and learning density
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', fontSize: '1.25rem', color: '#94A3B8',
              cursor: 'pointer', padding: '4px 8px', borderRadius: '6px'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Execution Backend */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
              EXECUTION BACKEND ENGINE:
            </label>
            <BackendSelector selectedBackend={selectedBackend} onBackendChange={onBackendChange} />
          </div>

          {/* Qubit Count */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
              NUM OF QUBITS:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <button
                  key={n}
                  onClick={() => onQubitsChange(n)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: '8px',
                    border: numQubits === n ? '2px solid #2563EB' : '1px solid #CBD5E1',
                    backgroundColor: numQubits === n ? '#EFF6FF' : '#F8FAFC',
                    color: numQubits === n ? '#1E40AF' : '#475569',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {n}Q
                </button>
              ))}
            </div>
          </div>

          {/* Learner Baseline Level */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
              LEARNER DENSITY LEVEL:
            </label>
            <select
              value={userLevel}
              onChange={e => onLevelChange(parseInt(e.target.value, 10))}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#0F172A',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {LEVEL_SPECTRUM.map(item => (
                <option key={item.level} value={item.level}>{item.label} — {item.targetAudience}</option>
              ))}
            </select>
          </div>

          {/* Goal Settings Trigger */}
          <div style={{
            padding: '14px 16px',
            backgroundColor: '#F1F5F9',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>Personal Goal & Onboarding</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Re-configure your learning path or target skills</div>
            </div>
            <button
              onClick={() => { onClose(); onOpenOnboarding(); }}
              style={{
                padding: '8px 14px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Open Goals
            </button>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
