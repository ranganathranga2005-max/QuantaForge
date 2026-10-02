/**
 * QuantumLearning — Teaching Plan Engine
 * Machine-Readable Structured Teaching Plans for Quantum Concepts
 */

export function generateTeachingPlan({ concept = 'Superposition', userLevel = 1, userGoal = 'Quantum Algorithm Developer', activeMission = {} }) {
  const normConcept = concept.toLowerCase();

  // 1. SUPERPOSITIONS AND HADAMARD GATE
  if (normConcept.includes('superposition') || normConcept.includes('hadamard') || normConcept.includes('h gate')) {
    return {
      concept: 'Superposition',
      title: 'Understanding Superposition & The Hadamard Gate',
      userLevel,
      userGoal,
      objective: 'Learn how Hadamard (H) transforms |0⟩ into equal probability amplitudes |0⟩ and |1⟩',
      actions: [
        {
          id: 'step-1',
          type: 'INTRODUCE_CONCEPT',
          characterState: 'INTRODUCING',
          voiceNarration: "Welcome! Let's explore quantum superposition together. In classical computing, a bit is either 0 or 1. But a qubit can exist in a linear combination of both!",
          params: { conceptName: 'Quantum Superposition' }
        },
        {
          id: 'step-2',
          type: 'SHOW_QUBIT',
          characterState: 'POINTING',
          voiceNarration: 'Here is our initial qubit q0, initialized in the ground state |0⟩.',
          params: { qubitIndex: 0, initialState: '|0⟩' }
        },
        {
          id: 'step-3',
          type: 'SHOW_BLOCH',
          characterState: 'DEMONSTRATING',
          voiceNarration: 'On the 3D Bloch sphere, state |0⟩ points straight up to the North Pole.',
          params: { theta: 0, phi: 0, vector: [0, 0, 1] }
        },
        {
          id: 'step-4',
          type: 'APPLY_GATE',
          characterState: 'DEMONSTRATING',
          voiceNarration: "Now, let's apply a Hadamard (H) gate to qubit q0.",
          params: { qubitIndex: 0, gate: 'H' }
        },
        {
          id: 'step-5',
          type: 'ANIMATE_STATE_TRANSITION',
          characterState: 'EXPLAINING',
          voiceNarration: 'Watch the Bloch vector rotate 90 degrees down onto the equator into the state |+⟩ = (|0⟩ + |1⟩)/√2!',
          params: { fromState: '|0⟩', toState: '|+⟩', theta: Math.PI / 2, phi: 0, statevector: [0.7071, 0.7071] }
        },
        {
          id: 'step-6',
          type: 'SHOW_PROBABILITY',
          characterState: 'EXPLAINING',
          voiceNarration: 'Look at the probabilities: exactly 50% chance for |0⟩ and 50% chance for |1⟩!',
          params: { prob0: 0.5, prob1: 0.5 }
        },
        {
          id: 'step-7',
          type: 'ASK_PREDICTION',
          characterState: 'WAITING',
          voiceNarration: "Before we measure this superposition qubit, what do you predict will happen upon measurement?",
          params: {
            question: 'What happens when we measure qubit q0 in state (|0⟩ + |1⟩)/√2?',
            options: [
              'It randomly collapses to either |0⟩ (50%) or |1⟩ (50%)',
              'It stays in superposition after measurement',
              'It always outputs |0⟩',
              'It outputs 0.5 as a continuous decimal'
            ],
            correctIndex: 0,
            explanation: 'Correct! Quantum measurement forces the wave function to collapse to a single classical outcome |0⟩ or |1⟩ with probability |α|².'
          }
        },
        {
          id: 'step-8',
          type: 'RUN_CIRCUIT',
          characterState: 'DEMONSTRATING',
          voiceNarration: "Let's run 1000 quantum shots on the simulator to verify the collapse!",
          params: {
            circuit: [{ gate: 'H', qubit: 0 }, { gate: 'MEASURE', qubit: 0 }],
            resultCounts: { '0': 508, '1': 492 }
          }
        },
        {
          id: 'step-9',
          type: 'CELEBRATE',
          characterState: 'CELEBRATING',
          voiceNarration: "Fantastic job! You've mastered the concept of superposition and the Hadamard transformation.",
          params: {}
        }
      ]
    };
  }

  // 2. ENTANGLEMENT & BELL STATES
  if (normConcept.includes('entangle') || normConcept.includes('bell') || normConcept.includes('cnot')) {
    return {
      concept: 'Entanglement',
      title: 'Creating Quantum Entanglement & Bell States',
      userLevel,
      userGoal,
      objective: 'Build the maximally entangled Bell state (|00⟩ + |11⟩)/√2 using H and CNOT',
      actions: [
        {
          id: 'step-1',
          type: 'INTRODUCE_CONCEPT',
          characterState: 'INTRODUCING',
          voiceNarration: 'Welcome to Quantum Entanglement! When two qubits become entangled, their states are linked such that measuring one instantly dictates the state of the other.',
          params: { conceptName: 'Quantum Entanglement' }
        },
        {
          id: 'step-2',
          type: 'SHOW_QUBIT',
          characterState: 'POINTING',
          voiceNarration: 'We begin with two unentangled qubits: q0 = |0⟩ and q1 = |0⟩. Initial joint state: |00⟩.',
          params: { qubits: [0, 1], initialState: '|00⟩' }
        },
        {
          id: 'step-3',
          type: 'APPLY_GATE',
          characterState: 'DEMONSTRATING',
          voiceNarration: 'First, apply an H gate on qubit q0 to put it into superposition.',
          params: { qubitIndex: 0, gate: 'H' }
        },
        {
          id: 'step-4',
          type: 'APPLY_GATE',
          characterState: 'DEMONSTRATING',
          voiceNarration: 'Next, apply a CNOT gate with Control = q0 and Target = q1.',
          params: { control: 0, target: 1, gate: 'CNOT' }
        },
        {
          id: 'step-5',
          type: 'ANIMATE_STATE_TRANSITION',
          characterState: 'EXPLAINING',
          voiceNarration: 'The 2-qubit statevector evolves into the Bell State Φ+ = (|00⟩ + |11⟩)/√2!',
          params: { statevector: [0.7071, 0, 0, 0.7071] }
        },
        {
          id: 'step-6',
          type: 'SHOW_PROBABILITY',
          characterState: 'EXPLAINING',
          voiceNarration: 'Notice the joint probabilities: 50% |00⟩, 0% |01⟩, 0% |10⟩, and 50% |11⟩. Outcomes |01⟩ and |10⟩ are completely impossible!',
          params: { probabilities: { '|00⟩': 0.5, '|01⟩': 0.0, '|10⟩': 0.0, '|11⟩': 0.5 } }
        },
        {
          id: 'step-7',
          type: 'ASK_PREDICTION',
          characterState: 'WAITING',
          voiceNarration: 'If we measure qubit q0 and observe |1⟩, what will qubit q1 be when measured?',
          params: {
            question: 'If q0 collapses to |1⟩, what is the state of q1?',
            options: [
              'It is guaranteed to be |1⟩',
              'It is guaranteed to be |0⟩',
              'It stays 50% random',
              'It turns into |-⟩'
            ],
            correctIndex: 0,
            explanation: 'Spot on! In state (|00⟩ + |11⟩)/√2, measuring q0 = 1 instantly collapses the joint state vector to |11⟩, forcing q1 to be 1.'
          }
        },
        {
          id: 'step-8',
          type: 'CELEBRATE',
          characterState: 'CELEBRATING',
          voiceNarration: "Outstanding! You've unlocked the fundamental core of quantum entanglement!",
          params: {}
        }
      ]
    };
  }

  // 3. PHASE AND DESTRUCTIVE INTERFERENCE
  if (normConcept.includes('phase') || normConcept.includes('interference') || normConcept.includes('z gate')) {
    return {
      concept: 'Interference',
      title: 'Quantum Phase & Interference Dynamics',
      userLevel,
      userGoal,
      objective: 'Understand phase shift Z and destructive interference H-Z-H',
      actions: [
        {
          id: 'step-1',
          type: 'INTRODUCE_CONCEPT',
          characterState: 'INTRODUCING',
          voiceNarration: 'Quantum amplitudes carry a phase angle! By manipulating phase, quantum algorithms create constructive interference to boost correct answers and destructive interference to cancel wrong ones.',
          params: { conceptName: 'Quantum Phase & Interference' }
        },
        {
          id: 'step-2',
          type: 'APPLY_GATE',
          characterState: 'DEMONSTRATING',
          voiceNarration: 'Apply Hadamard H to q0 to get (1/√2)|0⟩ + (1/√2)|1⟩.',
          params: { qubitIndex: 0, gate: 'H' }
        },
        {
          id: 'step-3',
          type: 'APPLY_GATE',
          characterState: 'DEMONSTRATING',
          voiceNarration: 'Now apply a Z Pauli phase gate to flip the phase of state |1⟩ by 180 degrees (π radians).',
          params: { qubitIndex: 0, gate: 'Z' }
        },
        {
          id: 'step-4',
          type: 'SHOW_PHASE',
          characterState: 'EXPLAINING',
          voiceNarration: 'The state is now |-⟩ = (1/√2)|0⟩ - (1/√2)|1⟩. Notice the negative sign on amplitude |1⟩!',
          params: { stateName: '|-⟩', phase0: 0, phase1: Math.PI }
        },
        {
          id: 'step-5',
          type: 'APPLY_GATE',
          characterState: 'DEMONSTRATING',
          voiceNarration: 'Apply a second Hadamard H gate to trigger phase interference.',
          params: { qubitIndex: 0, gate: 'H' }
        },
        {
          id: 'step-6',
          type: 'ANIMATE_STATE_TRANSITION',
          characterState: 'EXPLAINING',
          voiceNarration: 'The amplitudes for |0⟩ cancel out destructively (+1/2 - 1/2 = 0), while amplitudes for |1⟩ add constructively (+1/2 + 1/2 = 1)! The final state is |1⟩ with 100% certainty.',
          params: { finalState: '|1⟩', prob0: 0, prob1: 1.0 }
        },
        {
          id: 'step-7',
          type: 'CELEBRATE',
          characterState: 'CELEBRATING',
          voiceNarration: 'Brilliant! You just performed destructive interference, the secret engine behind Grover search and QAOA algorithms!',
          params: {}
        }
      ]
    };
  }

  // 4. DEFAULT CONCEPT (Qubit Foundations)
  return {
    concept: concept || 'Qubit Foundations',
    title: `Understanding ${concept}`,
    userLevel,
    userGoal,
    objective: `Master core principles of ${concept}`,
    actions: [
      {
        id: 'step-1',
        type: 'INTRODUCE_CONCEPT',
        characterState: 'INTRODUCING',
        voiceNarration: `Let's break down ${concept} step-by-step using interactive quantum visualization.`,
        params: { conceptName: concept }
      },
      {
        id: 'step-2',
        type: 'SHOW_QUBIT',
        characterState: 'POINTING',
        voiceNarration: 'Qubits represent quantum state vectors in complex Hilbert space.',
        params: { qubitIndex: 0 }
      },
      {
        id: 'step-3',
        type: 'SHOW_BLOCH',
        characterState: 'DEMONSTRATING',
        voiceNarration: 'The Bloch sphere visualizes state transformations as rotations on a unit sphere.',
        params: { theta: 0, phi: 0 }
      },
      {
        id: 'step-4',
        type: 'ASK_PREDICTION',
        characterState: 'WAITING',
        voiceNarration: 'Which gate is commonly used to create superposition?',
        params: {
          question: 'Which gate creates superposition from |0⟩?',
          options: ['Hadamard (H)', 'Pauli-X (X)', 'Pauli-Z (Z)', 'Identity (I)'],
          correctIndex: 0,
          explanation: 'Correct! The Hadamard gate H creates equal superposition (|0⟩+|1⟩)/√2.'
        }
      },
      {
        id: 'step-5',
        type: 'CELEBRATE',
        characterState: 'CELEBRATING',
        voiceNarration: 'Great job exploring quantum concepts with your companion!',
        params: {}
      }
    ]
  };
}
