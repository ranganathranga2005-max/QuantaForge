/**
 * GenieBehavior.js
 * Behavior State Engine & Event Reactions for Cute 3D Quantum Creature
 */

import { GENIE_EVENTS, genieEvents } from './GenieEvents';
import { EXPRESSIONS } from './GenieExpression';

export const BEHAVIORS = {
  IDLE: 'idle',
  FLOAT: 'float',
  ROTATE: 'rotate',
  SWIRL: 'swirl',
  LOOK_AT: 'lookAt',
  APPROACH: 'approach',
  RETREAT: 'retreat',
  PEEK: 'peek',
  ORBIT: 'orbit',
  FOLLOW: 'follow',
  CELEBRATE: 'celebrate',
  THINK: 'think',
  LISTEN: 'listen',
  SPEAK: 'speak',
  SLEEP: 'sleep',
  HIDE: 'hide',
  APPEAR: 'appear'
};

export class GenieBehaviorEngine {
  constructor(expressionEngine, motionController) {
    this.expression = expressionEngine;
    this.motion = motionController;
    this.currentBehavior = BEHAVIORS.IDLE;
    this.speechText = '';
    this.isSpeechActive = false;

    this.setupEventListeners();
  }

  setupEventListeners() {
    genieEvents.on(GENIE_EVENTS.GOAL_SELECTED, (goal) => {
      this.setBehavior(BEHAVIORS.CELEBRATE, `Destination chosen: ${goal.toUpperCase()}! Let's map your quantum journey.`);
    });

    genieEvents.on(GENIE_EVENTS.DIAGNOSTIC_STARTED, () => {
      this.setBehavior(BEHAVIORS.APPROACH, "Let's check your starting baseline with a few fun micro-experiments!");
    });

    genieEvents.on(GENIE_EVENTS.DIAGNOSTIC_STEP, (stepIdx) => {
      this.setBehavior(BEHAVIORS.THINK, `Step ${stepIdx + 1}: Take your best guess or observe the quantum wave!`);
    });

    genieEvents.on(GENIE_EVENTS.DIAGNOSTIC_COMPLETED, () => {
      this.setBehavior(BEHAVIORS.SWIRL, "Awesome! Diagnostic complete. Generating your personal route now...");
    });

    genieEvents.on(GENIE_EVENTS.ROUTE_GENERATED, () => {
      this.setBehavior(BEHAVIORS.CELEBRATE, "Here is your recommended route! Inspect the path and adjust anytime.");
    });

    genieEvents.on(GENIE_EVENTS.CHALLENGE_FAILED, () => {
      this.setBehavior(BEHAVIORS.PEEK, "Don't worry! Quantum superposition collapses take practice. Let's try again with a hint.");
      this.expression.setExpression(EXPRESSIONS.CONCERNED);
    });

    genieEvents.on(GENIE_EVENTS.CHALLENGE_PASSED, () => {
      this.setBehavior(BEHAVIORS.CELEBRATE, "Quantum state verified! You mastered this milestone flag! 🚀");
      this.expression.setExpression(EXPRESSIONS.CELEBRATING);
    });

    genieEvents.on(GENIE_EVENTS.SIMULATION_STARTED, () => {
      this.setBehavior(BEHAVIORS.THINK, "Executing circuit matrix simulation across statevector space...");
      this.expression.setExpression(EXPRESSIONS.THINKING);
    });

    genieEvents.on(GENIE_EVENTS.SIMULATION_COMPLETED, (results) => {
      this.setBehavior(BEHAVIORS.LOOK_AT, "Simulation snapshot generated! Inspect state probabilities below.");
      this.expression.setExpression(EXPRESSIONS.EXCITED);
    });

    genieEvents.on(GENIE_EVENTS.USER_DRAGGED_GENIE, (pos) => {
      this.motion.setSavedPosition(pos.x, pos.y);
      this.setBehavior(BEHAVIORS.FLOAT, "I'll hang out right here with you!");
    });
  }

  setBehavior(behaviorName, speechMessage = null) {
    this.currentBehavior = behaviorName;

    if (speechMessage) {
      this.speechText = speechMessage;
      this.isSpeechActive = true;
    }

    switch (behaviorName) {
      case BEHAVIORS.CELEBRATE:
      case BEHAVIORS.SWIRL:
        this.expression.setExpression(EXPRESSIONS.CELEBRATING);
        break;

      case BEHAVIORS.THINK:
        this.expression.setExpression(EXPRESSIONS.THINKING);
        break;

      case BEHAVIORS.PEEK:
      case BEHAVIORS.APPROACH:
        this.expression.setExpression(EXPRESSIONS.CURIOUS);
        break;

      case BEHAVIORS.LISTEN:
        this.expression.setExpression(EXPRESSIONS.LISTENING);
        break;

      case BEHAVIORS.SPEAK:
        this.expression.setExpression(EXPRESSIONS.SPEAKING);
        break;

      default:
        this.expression.setExpression(EXPRESSIONS.IDLE);
        break;
    }
  }

  clearSpeech() {
    this.speechText = '';
    this.isSpeechActive = false;
  }
}
