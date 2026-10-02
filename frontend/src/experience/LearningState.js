/**
 * LearningState.js
 * Unified First-Class State Model for QuantumLearning
 */

export const GOAL_TYPES = {
  CAREER: 'career',
  RESEARCH: 'research',
  ACADEMIC: 'academics',
  EXPLORE: 'curious'
};

export const CONTEXT_MODES = {
  DISCOVERY: 'discovery',
  DIAGNOSTIC: 'diagnostic',
  ROADMAP: 'roadmap',
  MISSION: 'mission',
  LAB: 'lab',
  RESEARCH: 'research'
};

export class LearningStateModel {
  constructor(initialData = {}) {
    this.goal = initialData.goal || GOAL_TYPES.ACADEMIC;
    this.learnerLevel = initialData.learnerLevel || 2;
    this.experienceLevel = initialData.experienceLevel || 'beginner';
    this.role = initialData.role || 'learner';
    this.demonstratedMastery = initialData.demonstratedMastery || {};
    this.requiredSkills = initialData.requiredSkills || [];
    this.masteredSkills = initialData.masteredSkills || [];
    this.skillGaps = initialData.skillGaps || ['Quantum Interference'];
    this.activeMission = initialData.activeMission || null;
    this.recommendedNextStep = initialData.recommendedNextStep || null;
    this.route = initialData.route || null;
    this.progress = initialData.progress || { completedNodes: 0, totalNodes: 5, percentage: 0 };
    this.currentContext = initialData.currentContext || CONTEXT_MODES.DISCOVERY;
    this.disclosureLevel = initialData.disclosureLevel || 'visual';
  }

  static loadFromStorage() {
    try {
      const savedGoal = localStorage.getItem('ql_user_goal') || GOAL_TYPES.ACADEMIC;
      const savedLevel = parseInt(localStorage.getItem('ql_user_level') || '2', 10);
      const savedContext = localStorage.getItem('ql_current_context') || CONTEXT_MODES.DISCOVERY;

      return new LearningStateModel({
        goal: savedGoal,
        learnerLevel: savedLevel,
        currentContext: savedContext
      });
    } catch {
      return new LearningStateModel();
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('ql_user_goal', this.goal);
      localStorage.setItem('ql_user_level', this.learnerLevel);
      localStorage.setItem('ql_current_context', this.currentContext);
    } catch {
      // ignore
    }
  }
}

export default LearningStateModel;
