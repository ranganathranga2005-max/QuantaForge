import React, { createContext, useContext, useState, useEffect } from 'react';

// Level spectrum definition (Levels 1 to 7)
export const LEVEL_SPECTRUM = [
  { level: 1, key: 'beginner', label: 'Level 1: Beginner', description: 'Visual intuition, short explanations, no dense math.', targetAudience: '8th-Class / Complete Beginner' },
  { level: 2, key: 'highschool', label: 'Level 2: High School', description: 'Basic gate concepts, visual state transformations.', targetAudience: 'High School / Early Learner' },
  { level: 3, key: 'undergrad', label: 'Level 3: Undergrad', description: 'Circuit builder, interactive mathematics, guided challenges.', targetAudience: 'Undergrad / Intermediate' },
  { level: 4, key: 'advanced', label: 'Level 4: Advanced', description: 'Dirac notation, multi-framework code, execution trace.', targetAudience: 'Advanced Student / Developer' },
  { level: 5, key: 'researcher', label: 'Level 5: Researcher', description: 'Simulators, noise models, literature gaps, execution benchmarking.', targetAudience: 'Postgraduate / Researcher' },
  { level: 6, key: 'mentor', label: 'Level 6: Mentor', description: 'Cohort analytics, at-risk learners, intervention recommendations.', targetAudience: 'Mentor / Instructor' },
  { level: 7, key: 'author', label: 'Level 7: Institutional', description: 'Course creation, assessment design, institutional publishing.', targetAudience: 'Institutional Author' }
];

export const GOAL_DEFINITIONS = {
  career: {
    key: 'career',
    title: 'Quantum Algorithm Developer',
    icon: '💼',
    tagline: 'Prepare for industry roles in quantum software engineering',
    primaryTarget: 'Quantum Circuit Optimization & Qiskit SDK',
    suggestedLevel: 3,
    requiredSkills: ['Qubit Basics', 'Gate Operations', 'Superposition', 'Entanglement', 'Interference', 'Quantum Algorithms', 'Qiskit SDK']
  },
  research: {
    key: 'research',
    title: 'Quantum Research & Gap Discovery',
    icon: '🔬',
    tagline: 'Explore literature limitations, noise models, and novel algorithms',
    primaryTarget: 'Variational Algorithms (VQE/QAOA) & QEC',
    suggestedLevel: 5,
    requiredSkills: ['Linear Algebra', 'Density Matrices', 'Clifford Stabilizers', 'Noise Simulation', 'Literature Analysis']
  },
  academics: {
    key: 'academics',
    title: 'Master Quantum Physics & Computing',
    icon: '🎓',
    tagline: 'Excel in academic quantum courses and computational physics',
    primaryTarget: 'Statevector Mechanics & Quantum Gates',
    suggestedLevel: 2,
    requiredSkills: ['Dirac Notation', 'Bloch Sphere', 'Superposition', 'Phase Shifts', 'Measurement Probabilities']
  },
  curious: {
    key: 'curious',
    title: 'Explore Quantum Computing Fundamentals',
    icon: '🌱',
    tagline: 'Grasp intuitive quantum concepts without complex math',
    primaryTarget: 'Visual Qubit Manipulation & Intuition',
    suggestedLevel: 1,
    requiredSkills: ['What is a Qubit?', 'Coin Flip Analogies', 'Single Gate Rotations', 'Basic Entanglement']
  }
};

const AdaptiveContext = createContext();

export function AdaptiveProvider({ children }) {
  const [userLevel, setUserLevel] = useState(() => {
    const saved = localStorage.getItem('ql_user_level');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [userGoal, setUserGoal] = useState(() => {
    const saved = localStorage.getItem('ql_user_goal');
    return saved && GOAL_DEFINITIONS[saved] ? saved : 'academics';
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    return localStorage.getItem('ql_onboarding_completed') === 'true';
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    return localStorage.getItem('ql_onboarding_completed') !== 'true';
  });

  const [currentSkillGap, setCurrentSkillGap] = useState('Quantum Interference');

  const [activeMission, setActiveMission] = useState({
    id: 'mission-01',
    title: 'Understand Quantum Interference',
    concept: 'Interference',
    description: 'Discover how Hadamard gates cause amplitude wave interference to create constructive and destructive outcomes.',
    estimatedTime: '10-15 min',
    path: '/learning',
    difficulty: 'Beginner',
    stepNumber: 3,
    totalSteps: 6
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ql_user_level', userLevel);
  }, [userLevel]);

  useEffect(() => {
    localStorage.setItem('ql_user_goal', userGoal);
  }, [userGoal]);

  const setLevel = (newLevel) => {
    const validLevel = Math.max(1, Math.min(7, parseInt(newLevel, 10)));
    setUserLevel(validLevel);
  };

  const [consentStatus, setConsentStatus] = useState(() => {
    return localStorage.getItem('ql_consent_status') || 'GRANTED';
  });

  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);

  const grantConsent = () => {
    setConsentStatus('GRANTED');
    localStorage.setItem('ql_consent_status', 'GRANTED');
    setIsConsentModalOpen(false);
  };

  const setGoal = (newGoal) => {
    if (GOAL_DEFINITIONS[newGoal]) {
      setUserGoal(newGoal);
      // Auto-update active mission and skill gap based on goal
      if (newGoal === 'research') {
        setCurrentSkillGap('Variational Algorithms & Noise Models');
        setActiveMission({
          id: 'mission-res-01',
          title: 'Discover VQE Energy Surface & Noise Sensitivity',
          concept: 'VQE',
          description: 'Simulate hydrogen molecule ground state energy under depolarizing noise models.',
          estimatedTime: '15-20 min',
          path: '/research',
          difficulty: 'Advanced'
        });
      } else if (newGoal === 'career') {
        setCurrentSkillGap('Quantum Circuit Optimization & Qiskit');
        setActiveMission({
          id: 'mission-dev-01',
          title: 'Transpile & Optimize 4-Qubit Circuit for IBM Quantum',
          concept: 'Qiskit Transpilation',
          description: 'Apply gate reduction pass manager and execute on Aer simulator.',
          estimatedTime: '12-15 min',
          path: '/lab',
          difficulty: 'Intermediate'
        });
      } else {
        setCurrentSkillGap('Quantum Interference');
        setActiveMission({
          id: 'mission-01',
          title: 'Understand Quantum Interference',
          concept: 'Interference',
          description: 'Discover how Hadamard gates cause amplitude wave interference to create constructive and destructive outcomes.',
          estimatedTime: '10-15 min',
          path: '/learn',
          difficulty: 'Beginner'
        });
      }
    }
  };


  const completeOnboarding = (selectedGoal, selectedLevel) => {
    if (selectedGoal && GOAL_DEFINITIONS[selectedGoal]) {
      setUserGoal(selectedGoal);
    }
    if (selectedLevel) {
      setLevel(selectedLevel);
    }
    setOnboardingCompleted(true);
    setIsOnboardingOpen(false);
    localStorage.setItem('ql_onboarding_completed', 'true');
  };

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('ql_user_role') || 'learner';
  });

  useEffect(() => {
    localStorage.setItem('ql_user_role', userRole);
  }, [userRole]);

  const setRole = (newRole) => {
    setUserRole(newRole);
  };

  const currentGoalData = GOAL_DEFINITIONS[userGoal] || GOAL_DEFINITIONS.academics;
  const currentLevelData = LEVEL_SPECTRUM.find(l => l.level === userLevel) || LEVEL_SPECTRUM[0];

  const isBeginner = userLevel <= 2;
  const isIntermediate = userLevel === 3 || userLevel === 4;
  const isAdvanced = userLevel >= 4;
  const isResearcher = userRole === 'researcher' || userGoal === 'research' || userLevel === 5;
  const isMentor = userRole === 'mentor' || userRole === 'author' || userLevel >= 6;

  const [userProjects, setUserProjects] = useState([
    {
      id: 'proj-01',
      title: 'QAOA Supply Chain Optimization',
      concept: 'QAOA / Max-Cut Graph',
      skills: ['QAOA', 'Combinatorial Optimization', 'Qiskit Aer'],
      evidence: 'P(optimal route) = 87.4% on 4-qubit simulated graph',
      preset: [{ id: '1', gate: 'H', qubit: 0 }, { id: '2', gate: 'H', qubit: 1 }, { id: '3', gate: 'CNOT', control: 0, target: 1 }],
      date: '2026-09-12'
    },
    {
      id: 'proj-02',
      title: 'Bell State Entanglement Verification',
      concept: 'Entanglement',
      skills: ['Superposition', 'Entanglement', 'Statevector'],
      evidence: '|Φ⁺⟩ = 1/√2(|00⟩ + |11⟩) verified on NumPy M1',
      preset: [{ id: '1', gate: 'H', qubit: 0 }, { id: '2', gate: 'CNOT', control: 0, target: 1 }],
      date: '2026-09-10'
    }
  ]);

  const [mentorInterventions, setMentorInterventions] = useState([
    {
      id: 'int-01',
      learnerName: 'Alex Johnson',
      gap: 'Quantum Interference',
      hint: 'Remember that Hadamard gate transforms basis states |0⟩ to (|0⟩+|1⟩)/√2 and |1⟩ to (|0⟩-|1⟩)/√2. Step through gate-by-gate in the Quantum Lab trace player.',
      date: '2h ago'
    }
  ]);

  const addProjectToShowcase = (newProj) => {
    setUserProjects(prev => [newProj, ...prev]);
  };

  const addMentorIntervention = (intervention) => {
    setMentorInterventions(prev => [intervention, ...prev]);
  };

  const value = {
    userLevel,
    userGoal,
    userRole,
    setUserRole: setRole,
    setLevel,
    setGoal,
    currentGoalData,
    currentLevelData,
    onboardingCompleted,
    isOnboardingOpen,
    setIsOnboardingOpen,
    completeOnboarding,
    currentSkillGap,
    setCurrentSkillGap,
    activeMission,
    setActiveMission,
    userProjects,
    addProjectToShowcase,
    mentorInterventions,
    addMentorIntervention,
    consentStatus,
    grantConsent,
    isConsentModalOpen,
    setIsConsentModalOpen,
    isBeginner,
    isIntermediate,
    isAdvanced,
    isResearcher,
    isMentor
  };

  return (
    <AdaptiveContext.Provider value={value}>
      {children}
    </AdaptiveContext.Provider>
  );
}

export function useAdaptive() {
  const context = useContext(AdaptiveContext);
  if (!context) {
    throw new Error('useAdaptive must be used within an AdaptiveProvider');
  }
  return context;
}

export default AdaptiveContext;
