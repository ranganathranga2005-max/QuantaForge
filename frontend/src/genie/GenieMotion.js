/**
 * GenieMotion.js
 * Physics Kinematics & Bezier Spatial Path Controller for 3D Genie
 */

export class GenieMotionController {
  constructor(initialPos = { x: 0, y: 0 }) {
    this.currentPos = { ...initialPos };
    this.targetPos = { ...initialPos };
    this.velocity = { x: 0, y: 0 };
    this.isDragging = false;
    this.customSavedPos = null;
    this.pathCurve = null;
    this.pathProgress = 0;
    this.isFollowingPath = false;

    // Physics parameters
    this.springStiffness = 0.08;
    this.damping = 0.75;
    this.bobPhase = 0;
  }

  setTarget(x, y) {
    if (this.isDragging) return;
    this.targetPos = { x, y };
    this.isFollowingPath = false;
  }

  setSavedPosition(x, y) {
    this.customSavedPos = { x, y };
    localStorage.setItem('ql_genie_custom_pos', JSON.stringify({ x, y }));
  }

  getSavedPosition() {
    if (this.customSavedPos) return this.customSavedPos;
    try {
      const saved = localStorage.getItem('ql_genie_custom_pos');
      if (saved) {
        this.customSavedPos = JSON.parse(saved);
        return this.customSavedPos;
      }
    } catch {
      // fallback
    }
    return null;
  }

  clearSavedPosition() {
    this.customSavedPos = null;
    localStorage.removeItem('ql_genie_custom_pos');
  }

  startBezierPath(start, control1, control2, end, durationMs = 1200) {
    this.pathCurve = { start, control1, control2, end, durationMs, startTime: performance.now() };
    this.isFollowingPath = true;
  }

  evaluateBezier(t, p0, p1, p2, p3) {
    const oneMinusT = 1 - t;
    return (
      Math.pow(oneMinusT, 3) * p0 +
      3 * Math.pow(oneMinusT, 2) * t * p1 +
      3 * oneMinusT * Math.pow(t, 2) * p2 +
      Math.pow(t, 3) * p3
    );
  }

  update(dtMs = 16) {
    this.bobPhase += dtMs * 0.003;
    const floatOffset = Math.sin(this.bobPhase) * 6;

    if (this.isDragging) {
      return {
        x: this.currentPos.x,
        y: this.currentPos.y,
        floatY: floatOffset,
        rotationZ: this.velocity.x * 0.05
      };
    }

    if (this.isFollowingPath && this.pathCurve) {
      const elapsed = performance.now() - this.pathCurve.startTime;
      const t = Math.min(1, elapsed / this.pathCurve.durationMs);

      // Smooth ease-in-out quadratic t
      const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const bx = this.evaluateBezier(
        easedT,
        this.pathCurve.start.x,
        this.pathCurve.control1.x,
        this.pathCurve.control2.x,
        this.pathCurve.end.x
      );
      const by = this.evaluateBezier(
        easedT,
        this.pathCurve.start.y,
        this.pathCurve.control1.y,
        this.pathCurve.control2.y,
        this.pathCurve.end.y
      );

      this.currentPos = { x: bx, y: by };

      if (t >= 1) {
        this.isFollowingPath = false;
        this.targetPos = { x: bx, y: by };
      }

      return {
        x: this.currentPos.x,
        y: this.currentPos.y,
        floatY: floatOffset,
        rotationZ: Math.sin(t * Math.PI) * 0.1
      };
    }

    // Spring physics update
    const saved = this.getSavedPosition();
    const effectiveTarget = saved || this.targetPos;

    const forceX = (effectiveTarget.x - this.currentPos.x) * this.springStiffness;
    const forceY = (effectiveTarget.y - this.currentPos.y) * this.springStiffness;

    this.velocity.x = (this.velocity.x + forceX) * this.damping;
    this.velocity.y = (this.velocity.y + forceY) * this.damping;

    this.currentPos.x += this.velocity.x;
    this.currentPos.y += this.velocity.y;

    return {
      x: this.currentPos.x,
      y: this.currentPos.y,
      floatY: floatOffset,
      rotationZ: Math.max(-0.25, Math.min(0.25, this.velocity.x * 0.02))
    };
  }
}
