import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCompanion } from '../../context/CompanionContext';
import CompanionAvatar from './CompanionAvatar';
import InteractiveTeachingStage from '../learning/InteractiveTeachingStage';

/**
 * Free-Floating 3D Spatial AI Companion — Hard Rectangle Elimination Pass
 * ABSOLUTE RULE: Zero rectangular containers, zero status bars, zero white/dark boxes.
 * The Three.js 3D character floats directly over the QuantumLearning environment as a spatial entity.
 * Speech text renders as pure floating glowing typography. Interaction uses a single circular floating node.
 */
export default function QuantumCompanion() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    companionState,
    messages,
    askCompanion,
    activeSpeechText,
    isMuted,
    toggleMute,
    isListening,
    startListening,
    stopListening,
    voiceSupported,
    activeActions,
    transcript,
    micError
  } = useCompanion();

  const [isActive, setIsActive] = useState(false);
  const [isTeachingActive, setIsTeachingActive] = useState(false);
  const [targetTeachingConcept, setTargetTeachingConcept] = useState('Superposition');
  const latestMessage = messages[messages.length - 1];

  const isLabPage = location.pathname === '/lab';
  const isResearchPage = location.pathname === '/research';

  // Detect explanation trigger in AI messages
  useEffect(() => {
    if (latestMessage?.role === 'user' && latestMessage.text) {
      const lower = latestMessage.text.toLowerCase();
      if (lower.includes('explain') || lower.includes('teach') || lower.includes('what is') || lower.includes('how does')) {
        if (lower.includes('entangle') || lower.includes('bell')) {
          setTargetTeachingConcept('Entanglement');
          setIsTeachingActive(true);
        } else if (lower.includes('phase') || lower.includes('interference')) {
          setTargetTeachingConcept('Interference');
          setIsTeachingActive(true);
        } else if (lower.includes('superposition') || lower.includes('hadamard') || lower.includes('qubit')) {
          setTargetTeachingConcept('Superposition');
          setIsTeachingActive(true);
        }
      }
    }
  }, [latestMessage]);


  // Automatically expand spatial presence when listening, speaking, or reacting
  useEffect(() => {
    if (isListening || activeSpeechText || (companionState !== 'IDLE' && companionState !== 'PROCESSING')) {
      setIsActive(true);
    }
  }, [isListening, activeSpeechText, companionState]);

  // Auto-settle back to small idle presence after speech ends
  useEffect(() => {
    if (companionState === 'IDLE' && !isListening && !activeSpeechText) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [companionState, isListening, activeSpeechText]);

  const handleActionClick = (action) => {
    if (typeof action === 'string') {
      if (action === 'go_lab') navigate('/lab');
      else if (action === 'go_journey') navigate('/journey');
      else if (action === 'go_learn') navigate('/learn');
      else askCompanion(`Tell me more about ${action}`);
    } else if (action?.action) {
      if (action.action === 'go_lab') navigate('/lab');
      else if (action.action === 'go_journey') navigate('/journey');
      else if (action.action === 'go_learn') navigate('/learn');
      else askCompanion(action.label || 'Explain this step');
    }
  };

  // 3D Character Footprint: IDLE = 180px, ACTIVE = 480px Desktop / 260px Mobile
  const avatarSize = isActive ? (isResearchPage ? 360 : 480) : 180;

  return (
    <div
      className="quantum-spatial-companion-layer"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9990,
        pointerEvents: 'none', // 100% click-through to underlying application content
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Radiating Concentric Waves for Circular Listening Node */
        @keyframes quantumListeningWave {
          0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); }
          100% { box-shadow: 0 0 0 22px rgba(34, 211, 238, 0); }
        }
        @keyframes floatingTextGlow {
          0%, 100% { text-shadow: 0 2px 14px rgba(34, 211, 238, 0.7), 0 0 25px rgba(59, 130, 246, 0.5); }
          50% { text-shadow: 0 2px 20px rgba(96, 165, 250, 0.9), 0 0 35px rgba(167, 139, 250, 0.7); }
        }
        @media (max-width: 640px) {
          .spatial-companion-anchor-node {
            right: 12px !important;
            bottom: 12px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .spatial-companion-anchor-node { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* ── FREE-FLOATING 3D SPATIAL COMPANION ENTITY (ZERO RECTANGLES) ── */}
      <div
        className="spatial-companion-anchor-node"
        style={{
          position: 'fixed',
          bottom: isLabPage ? '16px' : '24px',
          right: '28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto',
          transform: isActive
            ? 'translate3d(-120px, -50px, 0) scale(1)'
            : 'translate3d(0, 0, 0) scale(1)',
          transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.3s ease, right 0.3s ease',
          zIndex: 9991
        }}
      >
        {/* FREE-FLOATING 3D CHARACTER (THREE.JS CANVAS) */}
        <div
          onClick={() => setIsActive(prev => !prev)}
          style={{
            cursor: 'pointer',
            margin: '0 auto',
            background: 'transparent',
            transition: 'transform 0.4s ease'
          }}
          title={isActive ? 'Click to settle companion' : 'Click to interact with 3D Quantum Companion'}
        >
          <CompanionAvatar state={companionState} size={avatarSize} use3D={true} />
        </div>

        {/* PURE FLOATING SPATIAL SPEECH TYPOGRAPHY (NO BOX / NO CONTAINER) */}
        {isActive && (
          <div
            style={{
              marginTop: '-16px',
              maxWidth: '400px',
              width: 'calc(100vw - 48px)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.3s ease-out'
            }}
          >
            {/* Pure Floating Typography */}
            <div
              style={{
                fontSize: '1.05rem',
                lineHeight: '1.55',
                fontWeight: 600,
                color: '#FFFFFF',
                animation: 'floatingTextGlow 3.5s ease-in-out infinite'
              }}
            >
              {isListening ? (
                <span style={{ color: '#67E8F9', fontWeight: 700 }}>
                  🎙 Listening: "{transcript || 'Speak your question…'}"
                </span>
              ) : activeSpeechText ? (
                <span>
                  🔊 {activeSpeechText}
                </span>
              ) : (
                latestMessage?.text || "I am your quantum companion! Ask a question or build a circuit."
              )}
            </div>

            {/* Contextual Action Capsule Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px' }}>
              <button
                onClick={() => setIsTeachingActive(true)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#2563EB',
                  border: '1px solid #60A5FA',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                  transition: 'all 0.15s ease'
                }}
              >
                🎓 Launch Interactive AI Teacher
              </button>

              {activeActions && activeActions.length > 0 && !isListening && activeActions.map((act, idx) => (
                <button
                  key={idx}
                  onClick={() => handleActionClick(act)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(37, 99, 235, 0.3)',
                    border: '1px solid rgba(96, 165, 250, 0.45)',
                    color: '#E0F2FE',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.55)'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.3)'; e.currentTarget.style.color = '#E0F2FE'; }}
                >
                  {act.label || act}
                </button>
              ))}
            </div>

            {micError && (
              <div style={{ fontSize: '0.8rem', color: '#F87171', fontWeight: 600 }}>
                ⚠️ {micError}
              </div>
            )}
          </div>
        )}

        {/* Modal Interactive AI Teacher Stage */}
        {isTeachingActive && (
          <InteractiveTeachingStage
            conceptName={targetTeachingConcept}
            onClose={() => setIsTeachingActive(false)}
          />
        )}


        {/* SINGLE MINIMAL CIRCULAR FLOATING MICROPHONE NODE (NO TOOLBAR) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '12px'
          }}
        >
          {voiceSupported && (
            <button
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  setIsActive(true);
                  startListening();
                }
              }}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: isListening ? '2px solid #22D3EE' : '1px solid rgba(96, 165, 250, 0.4)',
                background: isListening
                  ? 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(15, 23, 42, 0.9) 100%)'
                  : 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(15, 23, 42, 0.85) 100%)',
                color: isListening ? '#67E8F9' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                cursor: 'pointer',
                fontSize: '1.1rem',
                boxShadow: isListening ? '0 0 25px rgba(34, 211, 238, 0.6)' : '0 8px 20px rgba(0,0,0,0.3)',
                animation: isListening ? 'quantumListeningWave 1.4s infinite' : 'none',
                transition: 'all 0.2s ease'
              }}
              title={isListening ? 'Stop Listening' : 'Talk to 3D Quantum Companion'}
            >
              🎙️
            </button>
          )}

          {/* Minimal Floating Mute Toggle Node */}
          <button
            onClick={toggleMute}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: isMuted ? 'rgba(220, 38, 38, 0.25)' : 'rgba(15, 23, 42, 0.7)',
              color: isMuted ? '#F87171' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.15s ease'
            }}
            title={isMuted ? 'Unmute Voice Output' : 'Mute Voice Output'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </div>
  );
}
