/**
 * ExperiencePolicy.js
 * Declarative Policy Engine for Adaptive Quantum Learning Experience
 */

import { GOAL_TYPES } from './LearningState';

export class ExperiencePolicyEngine {
  static getPolicy(learningState) {
    const { goal, learnerLevel, demonstratedMastery } = learningState;

    const isCareer = goal === GOAL_TYPES.CAREER;
    const isResearch = goal === GOAL_TYPES.RESEARCH;
    const isAcademic = goal === GOAL_TYPES.ACADEMIC;
    const isExplore = goal === GOAL_TYPES.EXPLORE;

    const isBeginnerLevel = learnerLevel <= 2;
    const isAdvancedLevel = learnerLevel >= 4;

    return {
      // Visible navigation modes
      navigation: {
        showRoadmap: true,
        showLab: true,
        showResearch: isResearch || isAdvancedLevel,
        showOpportunities: isCareer,
        showCommunity: true,
        showMentorStudio: learnerLevel >= 6
      },

      // Content depth & mathematical disclosure
      contentDepth: {
        showDiracNotation: !isExplore && !isBeginnerLevel,
        showStatevectorDetails: !isExplore,
        showEquations: isAcademic || isResearch || isAdvancedLevel,
        showNoiseSimulation: isResearch || (isCareer && isAdvancedLevel),
        showTranspilation: isCareer,
        visualSimulatorsFirst: isExplore || isBeginnerLevel
      },

      // Goal-oriented focus sequence
      learningPathFocus: isCareer
        ? ['Fundamentals', 'Qiskit SDK', 'Gate Optimization', 'VQE / QML', 'Portfolio Project']
        : isResearch
        ? ['Quantum Mechanics', 'Density Matrices', 'Variational Algorithms', 'Noise Models', 'Literature Gaps']
        : isAcademic
        ? ['Linear Algebra', 'Dirac Notation', 'Bloch Sphere', 'Single & Multi Qubit Gates', 'Assessments']
        : ['Visual Qubits', 'Coin Flip Analogy', 'Interference Waves', 'Quantum Teleportation'],

      // Recommended primary lab tool
      primaryLabTool: isResearch
        ? 'noise_benchmarking'
        : isCareer
        ? 'qiskit_transpiler'
        : 'visual_circuit_builder',

      // Mission difficulty scaling
      defaultDifficulty: isBeginnerLevel ? 'Beginner' : isAdvancedLevel ? 'Advanced' : 'Intermediate'
    };
  }
}

export default ExperiencePolicyEngine;
