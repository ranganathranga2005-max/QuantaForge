import React from 'react';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * CinematicHomeScene.jsx
 * Cinematic Learning Home — Replaces traditional dashboard cards and grids completely.
 * Structure:
 *   GENIE: "What are we working toward today?"
 *   YOUR GOAL: Quantum ML Engineer
 *   YOU ARE HERE: Qubits → Gates → Entanglement●
 *   TODAY'S MISSION: "Predict what this circuit will do before running it."
 *   [ START TODAY'S MISSION ]
 */
export default function CinematicHomeScene({
  learningState,
  route,
  onStartMission,
  onOpenRoadmap,
  onOpenProof
}) {
  const goalTitle = learningState?.goal ? learningState.goal.toUpperCase() : 'QUANTUM ML ENGINEER';
  const activeNode = route?.getActiveNode() || { title: 'Predict what this circuit will do before running it.', skill: 'Superposition & Interference' };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        padding: '60px 24px 24px 24px',
        overflowY: 'auto'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center'
        }}
      >
        {/* TODAY Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: '#00F2FE', textTransform: 'uppercase' }}>
            TODAY
          </span>
          <p style={{ margin: 0, fontSize: '1rem', color: '#94A3B8', fontStyle: 'italic' }}>
            "Let's work toward your goal."
          </p>
          <h2 style={{ margin: '4px 0 0 0', fontSize: '1.8rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
            {goalTitle}
          </h2>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '4px 0' }} />

        {/* YOUR JOURNEY Timeline Pill Bar */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1.5px', color: '#64748B', textTransform: 'uppercase' }}>
            YOUR JOURNEY
          </span>
          <div
            onClick={onOpenRoadmap}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '9999px',
              background: '#141E33',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#94A3B8',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
            }}
          >
            <span>Foundations</span>
            <span style={{ color: '#00F2FE' }}>↓</span>
            <span style={{ color: '#00F2FE', fontWeight: 800 }}>Superposition ●</span>
            <span style={{ color: '#00F2FE' }}>↓</span>
            <span>Entanglement</span>
            <span style={{ color: '#64748B' }}>↓</span>
            <span>Algorithms</span>
            <span style={{ color: '#64748B' }}>↓</span>
            <span style={{ color: '#FFB800', fontWeight: 800 }}>GOAL</span>
          </div>
        </div>

        {/* TODAY'S MISSION CARD */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(145deg, #141E33 0%, #0F1626 100%)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '24px',
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(0, 242, 254, 0.08)',
            position: 'relative'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: '#00F2FE', textTransform: 'uppercase' }}>
            TODAY'S MISSION
          </div>

          <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 700, color: '#F8FAFC', lineHeight: '1.4' }}>
            {activeNode.title || "Predict what this circuit will do before running it."}
          </h3>

          <p style={{ margin: 0, fontSize: '0.9rem', color: '#94A3B8', maxWidth: '440px' }}>
            {activeNode.skill ? `Focus: ${activeNode.skill}` : "Test your state vector prediction and observe quantum interference in action."}
          </p>

          <button
            onClick={() => {
              genieEvents.emit(GENIE_EVENTS.MISSION_STARTED, activeNode);
              if (onStartMission) onStartMission(activeNode);
            }}
            style={{
              width: '100%',
              maxWidth: '320px',
              padding: '16px 28px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #00F2FE 0%, #7928CA 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0, 242, 254, 0.35)',
              transition: 'all 0.2s ease',
              marginTop: '8px'
            }}
          >
            [ START MISSION ]
          </button>
        </div>

        {/* Secondary Options */}
        <div style={{ display: 'flex', gap: '24px', marginTop: '4px' }}>
          <button
            onClick={onOpenRoadmap}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            🗺️ View Flowing Roadmap
          </button>
          <button
            onClick={onOpenProof}
            style={{
              background: 'none',
              border: 'none',
              color: '#00F2FE',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            🏆 Demonstrated Proof
          </button>
        </div>
      </div>
    </div>
  );
}
