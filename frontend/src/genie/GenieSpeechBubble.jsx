import React from 'react';

/**
 * GenieSpeechBubble.jsx
 * Organic Floating Speech Bubble attached to Genie's Spatial Location.
 * NO chatbot panel, NO card container around Genie.
 */
export default function GenieSpeechBubble({
  text,
  actions = [],
  onActionClick,
  onClose,
  position = { x: 0, y: 0 }
}) {
  if (!text) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y - 120}px`,
        transform: 'translate(-50%, -100%)',
        maxWidth: '360px',
        width: 'max-content',
        padding: '14px 18px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(56, 189, 248, 0.2)',
        color: '#F8FAFC',
        fontSize: '0.9rem',
        lineHeight: '1.45',
        zIndex: 9999,
        pointerEvents: 'auto',
        animation: 'genieBubblePop 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>{`
        @keyframes genieBubblePop {
          0% { opacity: 0; transform: translate(-50%, -85%) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        }
      `}</style>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '6px',
            right: '10px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1rem',
            cursor: 'pointer',
            padding: '2px 4px'
          }}
          title="Dismiss"
        >
          ×
        </button>
      )}

      {/* Bubble Speech Text */}
      <div style={{ fontWeight: 500, color: '#E2E8F0' }}>{text}</div>

      {/* Contextual Action Capsule Pills */}
      {actions.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
          {actions.map((act, idx) => (
            <button
              key={idx}
              onClick={() => onActionClick && onActionClick(act)}
              style={{
                padding: '5px 12px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                border: '1px solid #38bdf8',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {act.label || act}
            </button>
          ))}
        </div>
      )}

      {/* Organic Pointer Arrow pointing down to Genie */}
      <div
        style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid rgba(30, 41, 59, 0.95)'
        }}
      />
    </div>
  );
}
