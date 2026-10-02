/**
 * GenieExpression.js
 * Expression & Gaze State Engine for Cute 3D Quantum Companion
 */

export const EXPRESSIONS = {
  IDLE: 'idle',
  CURIOUS: 'curious',
  THINKING: 'thinking',
  EXCITED: 'excited',
  CONCERNED: 'concerned',
  LISTENING: 'listening',
  SPEAKING: 'speaking',
  CELEBRATING: 'celebrating',
  SLEEPING: 'sleeping'
};

export class GenieExpressionEngine {
  constructor() {
    this.currentExpression = EXPRESSIONS.IDLE;
    this.eyeScaleY = 1.0;
    this.eyeGaze = { x: 0, y: 0 }; // [-1, 1] range
    this.mouthShape = 'happy'; // 'happy', 'open', 'o_mouth', 'concerned', 'smile'
    this.orbGlowColor = '#22D3EE'; // Cyan quantum aura
    this.glowIntensity = 1.0;
  }

  setExpression(expressionName) {
    if (!EXPRESSIONS[expressionName.toUpperCase()] && !Object.values(EXPRESSIONS).includes(expressionName)) {
      return;
    }

    this.currentExpression = expressionName;

    switch (expressionName) {
      case EXPRESSIONS.EXCITED:
      case EXPRESSIONS.CELEBRATING:
        this.eyeScaleY = 1.25;
        this.mouthShape = 'open';
        this.orbGlowColor = '#F43F5E'; // Sparkly rose/gold pulse
        this.glowIntensity = 1.8;
        break;

      case EXPRESSIONS.CONCERNED:
        this.eyeScaleY = 0.7;
        this.mouthShape = 'concerned';
        this.orbGlowColor = '#F59E0B'; // Soft amber
        this.glowIntensity = 1.2;
        break;

      case EXPRESSIONS.THINKING:
        this.eyeScaleY = 0.85;
        this.eyeGaze = { x: 0.4, y: 0.5 };
        this.mouthShape = 'o_mouth';
        this.orbGlowColor = '#A855F7'; // Purple quantum state
        this.glowIntensity = 1.5;
        break;

      case EXPRESSIONS.LISTENING:
        this.eyeScaleY = 1.1;
        this.eyeGaze = { x: 0, y: 0.1 };
        this.mouthShape = 'smile';
        this.orbGlowColor = '#06B6D4'; // Deep electric cyan
        this.glowIntensity = 1.6;
        break;

      case EXPRESSIONS.SPEAKING:
        this.eyeScaleY = 1.05;
        this.mouthShape = 'open';
        this.orbGlowColor = '#3B82F6'; // Warm royal blue
        this.glowIntensity = 1.4;
        break;

      case EXPRESSIONS.SLEEPING:
        this.eyeScaleY = 0.1; // Squint/closed eyes
        this.mouthShape = 'smile';
        this.orbGlowColor = '#64748B'; // Muted slate
        this.glowIntensity = 0.5;
        break;

      case EXPRESSIONS.IDLE:
      default:
        this.eyeScaleY = 1.0;
        this.eyeGaze = { x: 0, y: 0 };
        this.mouthShape = 'happy';
        this.orbGlowColor = '#22D3EE';
        this.glowIntensity = 1.0;
        break;
    }
  }

  lookAt(targetX, targetY, currentX, currentY) {
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    const dist = Math.hypot(dx, dy) || 1;
    this.eyeGaze = {
      x: Math.max(-1, Math.min(1, dx / dist)),
      y: Math.max(-1, Math.min(1, dy / dist))
    };
  }
}
