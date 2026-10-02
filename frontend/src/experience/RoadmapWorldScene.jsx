import React, { useState, useEffect } from 'react';
import { genieEvents, GENIE_EVENTS } from '../genie/GenieEvents';

/**
 * RoadmapWorldScene.jsx
 * Signature Animated Path Journey & Spatial Roadmap World.
 * Path occupies 75% of visual space directly on atmospheric canvas.
 * ZERO CARDS / ZERO CONTAINER BOXES.
 */
export default function RoadmapWorldScene({
  route,
  onStartPath,
  onModifyRoute
}) {
  const [selectedNode, setSelectedNode] = useState(route?.getActiveNode() || null);
  const [isAdjusting, setIsAdjusting] = useState(false);

  if (!route || !route.nodes || route.nodes.length === 0) return null;

  const nodes = route.nodes;

  const handleNodeHover = (node) => {
    genieEvents.emit(GENIE_EVENTS.USER_HOVERED, node);
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    genieEvents.emit(GENIE_EVENTS.ROADMAP_NODE_SELECTED, node);
    if (node.status !== 'locked' && onStartPath) {
      onStartPath(node);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'flex-start',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        padding: '70px 24px 30px 24px',
        overflowY: 'auto'
      }}
    >
      {/* Header Prompt */}
      <div style={{ textAlign: 'center', maxWidth: '640px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00F2FE', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
          YOUR JOURNEY TO MASTERY
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#F8FAFC', margin: '0 0 6px 0' }}>
          {route.finalGoal || "Quantum ML Engineer"}
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0 }}>
          Follow the central path. Click your active node to launch today's mission.
        </p>
      </div>

      {/* CENTRAL FLOWING PATH CONTAINER */}
      <div
        style={{
          width: '100%',
          maxWidth: '840px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          position: 'relative',
          paddingBottom: '40px'
        }}
      >
        {nodes.map((node, idx) => {
          const isCurrent = node.status === 'active' || node.id === selectedNode?.id;
          const isCompleted = node.status === 'completed';
          const isLocked = node.status === 'locked';
          const isOptional = node.isOptional;

          // Alternate left / center / right alignment for flowing serpentine feel
          const alignSelf = idx % 2 === 0 ? 'flex-start' : 'flex-end';
          const marginLeft = idx % 2 === 0 ? '40px' : '0px';
          const marginRight = idx % 2 !== 0 ? '40px' : '0px';

          return (
            <div
              key={node.id}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: alignSelf === 'flex-start' ? 'flex-start' : 'flex-end',
                position: 'relative'
              }}
            >
              {/* Vertical Path Line Connector */}
              {idx > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-24px',
                    left: idx % 2 === 0 ? '80px' : 'auto',
                    right: idx % 2 !== 0 ? '80px' : 'auto',
                    width: '3px',
                    height: '28px',
                    background: isCompleted ? '#00F2FE' : isCurrent ? 'linear-gradient(to bottom, #00F2FE, rgba(255,255,255,0.1))' : 'rgba(255,255,255,0.1)'
                  }}
                />
              )}

              {/* Node Card Container */}
              <div
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => handleNodeHover(node)}
                style={{
                  width: 'calc(100% - 60px)',
                  maxWidth: '480px',
                  marginLeft,
                  marginRight,
                  background: isCurrent
                    ? 'linear-gradient(145deg, #1B2742 0%, #141E33 100%)'
                    : isCompleted
                    ? 'rgba(20, 30, 51, 0.7)'
                    : 'rgba(15, 22, 38, 0.5)',
                  border: isCurrent
                    ? '2px solid #00F2FE'
                    : isCompleted
                    ? '1px solid rgba(0, 242, 254, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  opacity: isLocked ? 0.55 : 1,
                  boxShadow: isCurrent ? '0 12px 32px rgba(0, 242, 254, 0.25)' : '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Node Status Badge / Icon */}
                <div
                  style={{
                    width: isCurrent ? '52px' : '44px',
                    height: isCurrent ? '52px' : '44px',
                    borderRadius: '50%',
                    background: isCompleted
                      ? '#00F2FE'
                      : isCurrent
                      ? 'linear-gradient(135deg, #00F2FE, #7928CA)'
                      : '#1B2742',
                    color: isCompleted ? '#080C14' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isCurrent ? '1.4rem' : '1.1rem',
                    fontWeight: 800,
                    flexShrink: 0
                  }}
                >
                  {isCompleted ? '✓' : isLocked ? '🔒' : node.icon || '●'}
                </div>

                {/* Node Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: isCurrent ? '#F8FAFC' : '#CBD5E1' }}>
                      {node.title}
                    </span>
                    {isCurrent && (
                      <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '9999px', background: '#00F2FE', color: '#080C14', fontWeight: 800 }}>
                        CURRENT
                      </span>
                    )}
                    {isOptional && (
                      <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 184, 0, 0.2)', color: '#FFB800', fontWeight: 700 }}>
                        OPTIONAL
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8', lineHeight: '1.4' }}>
                    {node.summary || node.description || "Understand fundamental quantum operations and probabilities."}
                  </p>
                </div>

                {/* Action CTA for Current Node */}
                {isCurrent && (
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      background: '#00F2FE',
                      border: 'none',
                      color: '#080C14',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    START
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ROADMAP ACTIONS */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button
          onClick={() => setIsAdjusting(prev => !prev)}
          style={{
            padding: '10px 20px',
            borderRadius: '9999px',
            background: '#141E33',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            color: '#F8FAFC',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          ⚙️ Adjust Path
        </button>

        {isAdjusting && (
          <div style={{ display: 'flex', gap: '8px' }}>
            {['skip', 'faster', 'research'].map(act => (
              <button
                key={act}
                onClick={() => {
                  if (onModifyRoute) onModifyRoute(act);
                  setIsAdjusting(false);
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  background: '#1B2742',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#00F2FE',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {act.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
