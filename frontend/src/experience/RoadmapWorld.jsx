import React, { useState } from 'react';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * RoadmapWorld.jsx
 * Visual Path / Journey Roadmap with Animated SVG Path, Milestone Flags,
 * and Interactive Route Customization Actions.
 */
export default function RoadmapWorld({ route, onStartPath, onModifyRoute }) {
  const [selectedNode, setSelectedNode] = useState(route?.getActiveNode() || null);
  const [isAdjusting, setIsAdjusting] = useState(false);

  if (!route || !route.nodes || route.nodes.length === 0) return null;

  const nodes = route.nodes;

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    genieEvents.emit(GENIE_EVENTS.ROADMAP_NODE_SELECTED, node);
  };

  const handleAction = (actionType) => {
    if (onModifyRoute) {
      onModifyRoute(actionType);
      genieEvents.emit(GENIE_EVENTS.ROUTE_MUTATED, actionType);
    }
    setIsAdjusting(false);
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        width: '100%',
        padding: '32px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '640px', marginBottom: '32px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
          Personal Learning Journey
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 12px 0' }}>
          Recommended Quantum Path
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#94A3B8', margin: 0 }}>
          Destination Goal: <strong style={{ color: '#38BDF8' }}>{route.finalGoal}</strong>
        </p>
      </div>

      {/* ROAD CANVAS / PATH VISUALIZATION (SVG Winding Road Metaphor) */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          minHeight: '420px',
          borderRadius: '24px',
          background: 'radial-gradient(ellipse at top, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          padding: '40px 20px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-around',
          flexWrap: 'wrap',
          gap: '24px',
          boxSizing: 'border-box'
        }}
      >
        {/* Animated SVG Path Line */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <path
            d="M 80 210 Q 250 80, 450 210 T 820 210"
            fill="none"
            stroke="url(#roadGradient)"
            strokeWidth="6"
            strokeDasharray="12 8"
            style={{
              animation: 'roadPathDraw 30s linear infinite'
            }}
          />
          <defs>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
        </svg>

        <style>{`
          @keyframes roadPathDraw {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -300; }
          }
        `}</style>

        {/* Milestone Flags along the road */}
        {nodes.map((node, idx) => {
          const isSelected = selectedNode?.id === node.id;
          const isActive = node.status === 'active';
          const isCompleted = node.status === 'completed';
          const isLocked = node.status === 'locked';

          return (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node)}
              style={{
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isSelected ? 'scale(1.15) translateY(-10px)' : 'scale(1)',
                opacity: isLocked ? 0.55 : 1
              }}
            >
              {/* Flag / Node Orb */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: isCompleted
                    ? 'linear-gradient(135deg, #10B981, #059669)'
                    : isActive
                    ? 'linear-gradient(135deg, #38BDF8, #2563EB)'
                    : 'linear-gradient(135deg, #334155, #1E293B)',
                  border: isSelected
                    ? '3px solid #FFFFFF'
                    : isActive
                    ? '3px solid #38BDF8'
                    : '2px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: isActive
                    ? '0 0 30px rgba(56, 189, 248, 0.7)'
                    : isCompleted
                    ? '0 0 20px rgba(16, 185, 129, 0.5)'
                    : 'none',
                  position: 'relative'
                }}
              >
                {node.icon || (isCompleted ? '✅' : isActive ? '🚩' : '🔒')}
                {node.isOptional && (
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: '#F59E0B',
                    color: '#FFF'
                  }}>
                    OPTIONAL
                  </span>
                )}
              </div>

              {/* Node Title Label */}
              <div
                style={{
                  marginTop: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: isSelected ? '#FFFFFF' : '#CBD5E1',
                  textAlign: 'center',
                  maxWidth: '120px'
                }}
              >
                {node.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* ROADMAP ACTION BAR (Start Path / Adjust Path) */}
      <div
        style={{
          marginTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '600px'
        }}
      >
        <div style={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'center' }}>
          <button
            onClick={() => onStartPath && onStartPath(selectedNode)}
            style={{
              flex: 1,
              padding: '16px 28px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              border: '1px solid #38bdf8',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            🚀 START THIS PATH
          </button>

          <button
            onClick={() => setIsAdjusting(prev => !prev)}
            style={{
              padding: '16px 24px',
              borderRadius: '16px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#E2E8F0',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            ⚙️ ADJUST PATH
          </button>
        </div>

        {/* Adjust Path Interactive Options */}
        {isAdjusting && (
          <div
            style={{
              width: '100%',
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38BDF8' }}>
              How would you like to adjust your path?
            </div>
            <button
              onClick={() => handleAction('skip')}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFF',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              "I already know this concept — skip to next step"
            </button>
            <button
              onClick={() => handleAction('faster')}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFF',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              "Show me a faster, streamlined route"
            </button>
            <button
              onClick={() => handleAction('research')}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFF',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              "Add advanced research & noise mitigation focus"
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
