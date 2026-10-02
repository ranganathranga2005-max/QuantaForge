/**
 * SpatialTransitionController.js
 * Controls Continuous Spatial Transformations & Camera Motion across World States
 */

export const WORLD_STATES = {
  DISCOVERY: 'discovery',
  DIAGNOSTIC: 'diagnostic',
  ROADMAP: 'roadmap',
  MISSION: 'mission',
  EXPERIMENT: 'experiment',
  RESULT: 'result'
};

export class SpatialTransitionController {
  static getTransformForState(state) {
    switch (state) {
      case WORLD_STATES.DISCOVERY:
        return {
          scale: 1.0,
          translateX: 0,
          translateY: 0,
          opacity: 1.0,
          blurPx: 0
        };

      case WORLD_STATES.DIAGNOSTIC:
        return {
          scale: 1.05,
          translateX: 0,
          translateY: -20,
          opacity: 1.0,
          blurPx: 0
        };

      case WORLD_STATES.ROADMAP:
        return {
          scale: 1.0,
          translateX: 0,
          translateY: 0,
          opacity: 1.0,
          blurPx: 0
        };

      case WORLD_STATES.MISSION:
        return {
          scale: 1.08,
          translateX: 0,
          translateY: -30,
          opacity: 1.0,
          blurPx: 0
        };

      case WORLD_STATES.EXPERIMENT:
        return {
          scale: 1.12,
          translateX: 0,
          translateY: -40,
          opacity: 1.0,
          blurPx: 0
        };

      default:
        return {
          scale: 1.0,
          translateX: 0,
          translateY: 0,
          opacity: 1.0,
          blurPx: 0
        };
    }
  }
}

export default SpatialTransitionController;
