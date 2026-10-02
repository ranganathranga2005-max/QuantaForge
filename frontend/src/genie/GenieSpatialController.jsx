import React, { useState, useEffect, useRef, useCallback } from 'react';
import GenieBody from './GenieBody';
import GenieSpeechBubble from './GenieSpeechBubble';
import { GenieExpressionEngine, EXPRESSIONS } from './GenieExpression';
import { GenieMotionController } from './GenieMotion';
import { GenieBehaviorEngine, BEHAVIORS } from './GenieBehavior';
import { genieEvents, GENIE_EVENTS } from './GenieEvents';

/**
 * GenieSpatialController.jsx
 * Free-floating spatial controller rendering the 3D Cute Quantum Creature.
 * Supports drag-and-drop placement, spring physics movement, and speech bubbles.
 */
export default function GenieSpatialController({ initialText }) {
  const [pos, setPos] = useState(() => {
    if (typeof window !== 'undefined') {
      return { x: window.innerWidth - 180, y: window.innerHeight - 180 };
    }
    return { x: 800, y: 600 };
  });

  const [motionState, setMotionState] = useState({ floatY: 0, rotationZ: 0 });
  const [speechText, setSpeechText] = useState(initialText || "Hey... where do you want to go?");
  const [speechActions, setSpeechActions] = useState([]);
  const [expression, setExpression] = useState(EXPRESSIONS.IDLE);
  const [isDragging, setIsDragging] = useState(false);

  // Instantiated engines
  const expressionEngineRef = useRef(new GenieExpressionEngine());
  const motionControllerRef = useRef(new GenieMotionController(pos));
  const behaviorEngineRef = useRef(new GenieBehaviorEngine(expressionEngineRef.current, motionControllerRef.current));

  // Pointer drag handling
  const dragStartRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    motionControllerRef.current.isDragging = true;
    dragStartRef.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const newX = Math.max(80, Math.min(window.innerWidth - 80, e.clientX - dragStartRef.current.x));
    const newY = Math.max(80, Math.min(window.innerHeight - 80, e.clientY - dragStartRef.current.y));

    setPos({ x: newX, y: newY });
    motionControllerRef.current.currentPos = { x: newX, y: newY };
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    motionControllerRef.current.isDragging = false;
    motionControllerRef.current.setSavedPosition(pos.x, pos.y);
    genieEvents.emit(GENIE_EVENTS.USER_DRAGGED_GENIE, pos);
  }, [isDragging, pos]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Main animation frame loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      const motion = motionControllerRef.current.update(dt);
      if (!isDragging) {
        setPos({ x: motion.x, y: motion.y });
      }
      setMotionState({ floatY: motion.floatY, rotationZ: motion.rotationZ });
      setExpression(expressionEngineRef.current.currentExpression);

      if (behaviorEngineRef.current.isSpeechActive && behaviorEngineRef.current.speechText) {
        setSpeechText(behaviorEngineRef.current.speechText);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  // Set initial speech text if provided
  useEffect(() => {
    if (initialText) {
      setSpeechText(initialText);
    }
  }, [initialText]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9990
      }}
    >
      {/* Organic Speech Bubble originating from Genie's position */}
      {speechText && (
        <GenieSpeechBubble
          text={speechText}
          actions={speechActions}
          onClose={() => {
            setSpeechText('');
            behaviorEngineRef.current.clearSpeech();
          }}
          position={{ x: pos.x, y: pos.y + motionState.floatY }}
        />
      )}

      {/* 3D Cute Quantum Creature Character */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          position: 'fixed',
          left: `${pos.x}px`,
          top: `${pos.y + motionState.floatY}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <GenieBody
          size={160}
          expression={expression}
          gaze={expressionEngineRef.current.eyeGaze}
          rotationZ={motionState.rotationZ}
        />
      </div>
    </div>
  );
}
