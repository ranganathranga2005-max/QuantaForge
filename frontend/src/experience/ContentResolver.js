/**
 * ContentResolver.js
 * Resolves mission objectives, interaction steps, difficulty, and visual variants
 * dynamically based on LearningState evidence (Goal, Mastery, Skill Gaps, Level).
 */

import { GOAL_TYPES } from './LearningState';

export class ContentResolver {
  static resolveMissionContent(activeNode, learningState = {}) {
    const { goal, learnerLevel = 2, demonstratedMastery = {}, skillGaps = [] } = learningState;

    const isBeginner = learnerLevel <= 2;
    const isResearch = goal === GOAL_TYPES.RESEARCH;
    const isCareer = goal === GOAL_TYPES.CAREER;
    const hasHighMastery = (demonstratedMastery[activeNode?.concept] || 0) > 0.7;

    // Base steps
    let steps = [];

    if (hasHighMastery) {
      // Learner A: Advanced / Prior Mastery -> Skip basic explanation, go straight to prediction & puzzle challenge
      steps = [
        {
          stage: 'PREDICT',
          title: `Advanced Prediction: ${activeNode?.title || 'Statevector Phase Shift'}`,
          question: 'What is the amplitude phase angle φ after applying H followed by Z?',
          options: ['φ = 180° (Phase Flip)', 'φ = 90°', 'φ = 0°', 'Unchanged'],
          correctAnswer: 'φ = 180° (Phase Flip)'
        },
        {
          stage: 'PUZZLE',
          title: 'Quantum Target-State Circuit Puzzle',
          targetState: '|+⟩',
          description: 'Construct the shortest circuit that transforms |0⟩ into state |+⟩ = 1/√2(|0⟩ + |1⟩).'
        },
        {
          stage: 'EXPERIMENT',
          title: isResearch ? 'Simulate Noise & Density Matrix' : 'Qiskit Aer Transpilation & Execution',
          type: 'quantum_simulation'
        },
        {
          stage: 'MASTER',
          title: 'Milestone Mastered!',
          type: 'mastery_summary'
        }
      ];
    } else {
      // Learner B: Beginner / Skill Gap Present -> Visual intuition, guided interaction, contextual video support
      steps = [
        {
          stage: 'WONDER',
          title: `Discover ${activeNode?.concept || 'Quantum Superposition'}`,
          description: 'Observe how a single qubit state vector rotates continuously across the 3D Bloch sphere.'
        },
        {
          stage: 'PREDICT',
          title: 'Predict the Outcome',
          question: 'What is the probability of measuring |0⟩ after applying a Hadamard (H) gate to state |0⟩?',
          options: ['50% |0⟩ and 50% |1⟩', '100% |0⟩', '100% |1⟩', '0%'],
          correctAnswer: '50% |0⟩ and 50% |1⟩'
        },
        {
          stage: 'INTERACT',
          title: 'Guided 3D Bloch Sphere Rotation',
          type: 'circuit_and_bloch'
        },
        {
          stage: 'EXPERIMENT',
          title: 'Run Custom NumPy Engine Simulation',
          type: 'quantum_simulation'
        },
        {
          stage: 'MASTER',
          title: 'Milestone Mastered!',
          type: 'mastery_summary'
        }
      ];

      // Insert contextual video recommendation if learner has a recognized skill gap
      if (skillGaps.includes('Quantum Interference') || isBeginner) {
        steps.splice(2, 0, {
          stage: 'VIDEO_HINT',
          title: 'Contextual 45-Second Visual Guide',
          videoTopic: 'Quantum Wave Interference Explained',
          duration: '0:45'
        });
      }
    }

    return {
      objective: activeNode?.title || 'Quantum Superposition & Wave Interference',
      concept: activeNode?.concept || 'Superposition',
      skill: activeNode?.skill || 'Qubit State Representation',
      steps,
      exposure: {
        showDirac: !isBeginner,
        showEquations: !isBeginner,
        showNoise: isResearch,
        showTranspilation: isCareer
      }
    };
  }
}

export default ContentResolver;
