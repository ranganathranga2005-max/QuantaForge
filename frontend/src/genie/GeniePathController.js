/**
 * GeniePathController.js
 * Catmull-Rom Spline & Bezier Spatial Path Controller for 3D Genie Creature
 */

export class GeniePathController {
  constructor() {
    this.pathPoints = [];
    this.durationMs = 1200;
    this.startTime = 0;
    this.isMoving = false;
    this.currentPos = { x: 800, y: 600 };
    this.targetPos = { x: 800, y: 600 };
    this.tiltAngle = 0;
  }

  // Calculate Catmull-Rom Spline Point at t [0, 1] given 4 control points P0, P1, P2, P3
  static catmullRomPoint(t, p0, p1, p2, p3) {
    const t2 = t * t;
    const t3 = t2 * t;

    const f0 = -0.5 * t3 + t2 - 0.5 * t;
    const f1 = 1.5 * t3 - 2.5 * t2 + 1.0;
    const f2 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
    const f3 = 0.5 * t3 - 0.5 * t2;

    return {
      x: f0 * p0.x + f1 * p1.x + f2 * p2.x + f3 * p3.x,
      y: f0 * p0.y + f1 * p1.y + f2 * p2.y + f3 * p3.y
    };
  }

  startPathTo(targetX, targetY, durationMs = 1200) {
    const p0 = { ...this.currentPos };
    const p3 = { x: targetX, y: targetY };

    // Intermediate control points for organic arc curve
    const dx = p3.x - p0.x;
    const dy = p3.y - p0.y;

    const p1 = { x: p0.x + dx * 0.3 - dy * 0.2, y: p0.y + dy * 0.3 + dx * 0.2 };
    const p2 = { x: p0.x + dx * 0.7 + dy * 0.1, y: p0.y + dy * 0.7 - dx * 0.1 };

    this.pathPoints = [p0, p1, p2, p3];
    this.durationMs = durationMs;
    this.startTime = performance.now();
    this.isMoving = true;
    this.targetPos = { x: targetX, y: targetY };
  }

  update(now = performance.now()) {
    if (!this.isMoving || this.pathPoints.length < 4) {
      return { pos: this.currentPos, tiltAngle: 0, isMoving: false };
    }

    const elapsed = now - this.startTime;
    const t = Math.min(1, elapsed / this.durationMs);

    // Ease-in-out quadratic curve
    const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const newPos = GeniePathController.catmullRomPoint(
      easedT,
      this.pathPoints[0],
      this.pathPoints[1],
      this.pathPoints[2],
      this.pathPoints[3]
    );

    const deltaX = newPos.x - this.currentPos.x;
    this.tiltAngle = Math.max(-0.3, Math.min(0.3, deltaX * 0.03));
    this.currentPos = newPos;

    if (t >= 1) {
      this.isMoving = false;
      this.currentPos = { ...this.targetPos };
      this.tiltAngle = 0;
    }

    return {
      pos: this.currentPos,
      tiltAngle: this.tiltAngle,
      isMoving: this.isMoving
    };
  }
}

export default GeniePathController;
