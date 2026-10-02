/**
 * GenieEvents.js
 * Event Bus for Genie 3D Companion Event-Driven Spatial Behaviors
 */

export const GENIE_EVENTS = {
  GOAL_SELECTED: 'GOAL_SELECTED',
  DIAGNOSTIC_STARTED: 'DIAGNOSTIC_STARTED',
  DIAGNOSTIC_STEP: 'DIAGNOSTIC_STEP',
  DIAGNOSTIC_COMPLETED: 'DIAGNOSTIC_COMPLETED',
  ROUTE_GENERATED: 'ROUTE_GENERATED',
  ROADMAP_NODE_SELECTED: 'ROADMAP_NODE_SELECTED',
  ROUTE_MUTATED: 'ROUTE_MUTATED',
  MISSION_STARTED: 'MISSION_STARTED',
  LESSON_STARTED: 'LESSON_STARTED',
  LESSON_COMPLETED: 'LESSON_COMPLETED',
  CHALLENGE_FAILED: 'CHALLENGE_FAILED',
  CHALLENGE_PASSED: 'CHALLENGE_PASSED',
  CIRCUIT_CHANGED: 'CIRCUIT_CHANGED',
  SIMULATION_STARTED: 'SIMULATION_STARTED',
  SIMULATION_COMPLETED: 'SIMULATION_COMPLETED',
  MASTERY_GAINED: 'MASTERY_GAINED',
  SKILL_GAP_DETECTED: 'SKILL_GAP_DETECTED',
  USER_IDLE: 'USER_IDLE',
  USER_HOVERED: 'USER_HOVERED',
  USER_DRAGGED_GENIE: 'USER_DRAGGED_GENIE'
};

class GenieEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error handling GenieEvent [${event}]:`, err);
        }
      });
    }
  }
}

export const genieEvents = new GenieEventEmitter();
export default genieEvents;
