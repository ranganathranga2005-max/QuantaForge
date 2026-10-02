import React, { useEffect, useRef } from 'react';

/**
 * Animated Dancing & Rotating Electron Canvas Component
 * Renders glowing nucleus, 3D tilted electron orbits, dancing particles, and wave pulses.
 */
function DancingElectronCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Quantum Wave Ripple Effect in background
      const waveR = (angle * 18) % 65;
      ctx.beginPath();
      ctx.arc(centerX, centerY, waveR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(37, 99, 235, ${Math.max(0, 0.3 - waveR / 65)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Glowing Core Nucleus
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#2563EB';
      ctx.shadowColor = '#3B82F6';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();

      // Core inner pulse
      const pulseR = 13 + Math.sin(angle * 4) * 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3. Orbit 1 (Cyan Electron)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, 52, 18, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.4)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 4]);
      ctx.stroke();

      const e1X = Math.cos(angle * 2.2) * 52;
      const e1Y = Math.sin(angle * 2.2) * 18;
      ctx.beginPath();
      ctx.arc(e1X, e1Y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#06B6D4';
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // 4. Orbit 2 (Purple Electron - Dancing)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-0.7);
      ctx.beginPath();
      ctx.ellipse(0, 0, 54, 20, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([6, 3]);
      ctx.stroke();

      const e2X = Math.cos(angle * 2.8 + Math.PI) * 54;
      const e2Y = Math.sin(angle * 2.8 + Math.PI) * 20;
      ctx.beginPath();
      ctx.arc(e2X, e2Y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#A855F7';
      ctx.shadowColor = '#C084FC';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // 5. Orbit 3 (Amber Electron)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(1.3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 48, 16, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      const e3X = Math.cos(angle * 1.9) * 48;
      const e3Y = Math.sin(angle * 1.9) * 16;
      ctx.beginPath();
      ctx.arc(e3X, e3Y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.shadowColor = '#FBBF24';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      angle += 0.022;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={130}
      height={130}
      style={{
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239, 246, 255, 0.9) 0%, rgba(255, 255, 255, 0) 75%)',
      }}
    />
  );
}

/**
 * Clean, Student-Friendly Albert Einstein Welcome Component
 */
export default function AlbertEinsteinWelcome({ quote, stageName = 'Quantum Explorer' }) {
  const defaultQuote =
    'Hey there, young explorer! Welcome to my Quantum Science Laboratory! Don’t worry, you don’t need any heavy math to get started—quantum computing is just like playing with magic light and dancing electrons!';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        backgroundColor: 'rgba(20, 24, 38, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(0, 242, 254, 0.3)',
        borderRadius: '20px',
        padding: '20px 24px',
        boxShadow: '0 12px 35px rgba(0, 242, 254, 0.15), inset 0 0 15px rgba(0, 242, 254, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        flexWrap: 'wrap',
      }}
    >
      {/* Background Accent */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0,242,254,0.2) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Dancing Electron Canvas */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DancingElectronCanvas />
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 900,
            color: '#00F2FE',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginTop: '-2px',
            backgroundColor: 'rgba(0, 242, 254, 0.12)',
            padding: '3px 10px',
            borderRadius: '999px',
            border: '1px solid rgba(0, 242, 254, 0.4)',
          }}
        >
          ✨ Dancing Electron
        </span>
      </div>

      {/* Albert Einstein Character & Speech Bubble */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '260px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#0D0E15',
                border: '2px solid #00F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
              }}
            >
              👴🏻
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif" }}>
                Prof. Albert Einstein
              </div>
              <div style={{ fontSize: '0.75rem', color: '#00F2FE', fontWeight: 700 }}>
                Your Quantum Companion & Mentor
              </div>
            </div>
          </div>

          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(127, 0, 255, 0.25)',
              color: '#FF007F',
              border: '1px solid rgba(255, 0, 127, 0.4)',
            }}
          >
            🏆 Stage: {stageName}
          </span>
        </div>

        {/* Speech Bubble */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'rgba(13, 14, 21, 0.9)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            borderRadius: '14px',
            padding: '14px 18px',
            fontSize: '0.9rem',
            lineHeight: 1.55,
            color: '#F8FAFC',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          “{quote || defaultQuote}”
        </div>
      </div>
    </div>
  );
}
