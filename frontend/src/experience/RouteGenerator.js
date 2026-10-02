/**
 * RouteGenerator.js
 * Dynamic Personal Route Generator from Master Knowledge Pool based on
 * Goal + Diagnostic Evidence + Demonstrated Mastery + Skill Gaps + Prerequisites.
 */

import { LearningRoute, LearningRouteNode } from './LearningRoute';
import { GOAL_TYPES } from './LearningState';

const MASTER_KNOWLEDGE_POOL = {
  qubits: {
    id: 'node-qubits',
    title: 'Visual Qubits & Superposition',
    concept: 'Superposition',
    skill: 'Qubit State Representation',
    icon: '🔮',
    isMilestone: true
  },
  entanglement: {
    id: 'node-entanglement',
    title: 'Entanglement & Bell States',
    concept: 'Entanglement',
    skill: 'Multi-Qubit Correlations',
    icon: '🔗',
    isMilestone: true
  },
  interference: {
    id: 'node-interference',
    title: 'Quantum Interference & Waves',
    concept: 'Interference',
    skill: 'Hadamard Phase Interference',
    icon: '🌊',
    isMilestone: false
  },
  algorithms: {
    id: 'node-algorithms',
    title: 'Deutsch-Jozsa & Grover Search',
    concept: 'Quantum Search',
    skill: 'Oracles & Amplitude Amplification',
    icon: '⚡',
    isMilestone: true
  },
  variational: {
    id: 'node-variational',
    title: 'Variational Quantum Eigensolver (VQE)',
    concept: 'VQE',
    skill: 'Hybrid Quantum-Classical Optimization',
    icon: '🧪',
    isMilestone: true
  },
  qiskit_dev: {
    id: 'node-qiskit',
    title: 'Qiskit Circuit Transpilation & Aer',
    concept: 'Circuit Optimization',
    skill: 'IBM Qiskit SDK',
    icon: '💼',
    isMilestone: true
  },
  qec_research: {
    id: 'node-qec',
    title: 'Quantum Error Correction & Noise Models',
    concept: 'QEC & Noise',
    skill: 'Clifford Stabilizers & Mitigation',
    icon: '🔬',
    isMilestone: true
  }
};

export class RouteGeneratorEngine {
  static generateRoute({ goal, diagnosticResults = {}, demonstratedMastery = {} }) {
    let selectedNodes = [];

    const isAdvancedLearner = diagnosticResults.experienceLevel === 'advanced' || diagnosticResults.recommendedLevel >= 4;
    const knowsSuperposition = diagnosticResults.demonstratedHighSuperposition || demonstratedMastery['Superposition'] >= 0.8;

    if (goal === GOAL_TYPES.CAREER) {
      selectedNodes = [
        { ...MASTER_KNOWLEDGE_POOL.qubits, status: knowsSuperposition ? 'completed' : 'active' },
        { ...MASTER_KNOWLEDGE_POOL.entanglement, status: knowsSuperposition ? 'active' : 'locked' },
        { ...MASTER_KNOWLEDGE_POOL.interference, status: 'locked', isOptional: isAdvancedLearner },
        { ...MASTER_KNOWLEDGE_POOL.qiskit_dev, status: 'locked' },
        { ...MASTER_KNOWLEDGE_POOL.algorithms, status: 'locked' }
      ];

      if (isAdvancedLearner) {
        selectedNodes.push({ ...MASTER_KNOWLEDGE_POOL.variational, status: 'locked', isOptional: true });
      }
    } else if (goal === GOAL_TYPES.RESEARCH) {
      selectedNodes = [
        { ...MASTER_KNOWLEDGE_POOL.qubits, status: 'completed' },
        { ...MASTER_KNOWLEDGE_POOL.entanglement, status: knowsSuperposition ? 'completed' : 'active' },
        { ...MASTER_KNOWLEDGE_POOL.variational, status: 'active' },
        { ...MASTER_KNOWLEDGE_POOL.qec_research, status: 'locked' },
        { ...MASTER_KNOWLEDGE_POOL.algorithms, status: 'locked' }
      ];
    } else if (goal === GOAL_TYPES.ACADEMIC) {
      selectedNodes = [
        { ...MASTER_KNOWLEDGE_POOL.qubits, status: knowsSuperposition ? 'completed' : 'active' },
        { ...MASTER_KNOWLEDGE_POOL.interference, status: knowsSuperposition ? 'active' : 'locked' },
        { ...MASTER_KNOWLEDGE_POOL.entanglement, status: 'locked' },
        { ...MASTER_KNOWLEDGE_POOL.algorithms, status: 'locked' }
      ];
    } else {
      // EXPLORE / CURIOUS
      selectedNodes = [
        { ...MASTER_KNOWLEDGE_POOL.qubits, status: 'active' },
        { ...MASTER_KNOWLEDGE_POOL.interference, status: 'locked', isOptional: true },
        { ...MASTER_KNOWLEDGE_POOL.entanglement, status: 'locked' }
      ];
    }

    const routeNodes = selectedNodes.map(n => new LearningRouteNode(n));
    const milestones = routeNodes.filter(n => n.isMilestone);
    const finalGoal = goal === GOAL_TYPES.CAREER
      ? 'Quantum Software Engineer Portfolio'
      : goal === GOAL_TYPES.RESEARCH
      ? 'Novel Algorithm Research Gap'
      : goal === GOAL_TYPES.ACADEMIC
      ? 'Academic Quantum Computing Mastery'
      : 'Quantum Computing Intuition';

    return new LearningRoute({
      goal,
      nodes: routeNodes,
      milestones,
      finalGoal
    });
  }
}

export default RouteGeneratorEngine;
