import React from 'react';
import CircuitCanvas from './CircuitCanvas';


export default function CircuitBuilder({
  visualGates,
  interactionState,
  pendingControlQubit,
  onDrop,
  onDragOver,
  onTargetClick,
  numQubits = 2
}) {
  return (
    <div 
      style={{ 
        flex: 1, 
        height: '100%',
        width: '100%',
        backgroundColor: 'var(--bg-panel)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '8px', 
        padding: '24px', 
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {interactionState.startsWith('pending_') && (
        <div style={{ padding: '8px 14px', backgroundColor: 'rgba(6, 182, 212, 0.15)', border: '1px solid var(--accent-secondary)', borderRadius: '6px', color: 'var(--accent-secondary)', marginBottom: '16px', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'monospace' }}>
          ⚡ Select target qubit lane for {pendingControlQubit?.gate} on column {pendingControlQubit?.col}
        </div>
      )}

      <CircuitCanvas
        visualGates={visualGates}
        interactionState={interactionState}
        pendingControlQubit={pendingControlQubit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onTargetClick={onTargetClick}
        numQubits={numQubits}
      />
    </div>
  );
}
