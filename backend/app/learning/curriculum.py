"""
Curriculum Definition for QuantumLearning System.

Structured into 9 pedagogical modules:
Module 1: Quantum Foundations
Module 2: Single-Qubit Quantum Gates
Module 3: Multi-Qubit Circuits & Gates
Module 4: Entanglement & Interference
Module 5: Dynamic Circuits & Measurements
Module 6: Quantum Algorithms
Module 7: Parameterized Circuits & Hybrid Computing
Module 8: Noise & Quantum Error Correction
Module 9: Advanced Quantum Computing & Benchmarking
"""

CURRICULUM = [
    {
        "id": "mod-1",
        "title": "Module 1 — Quantum Foundations",
        "description": "Fundamental principles of quantum information: qubits, state vectors, superposition, and measurement probabilities.",
        "order": 1,
        "lessons": [
            {
                "id": "les-1-1",
                "module_id": "mod-1",
                "title": "01 — What is a Qubit?",
                "description": "The physical and mathematical foundation of quantum information.",
                "difficulty": "Beginner",
                "time_minutes": 5,
                "prerequisites": [],
                "objectives": [
                    "Define a qubit as a two-level quantum system.",
                    "Distinguish classical deterministic bits from complex statevector amplitudes.",
                    "Identify the computational basis states |0⟩ and |1⟩."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "A classical bit stores a discrete binary state: 0 or 1. A qubit (quantum bit) is a two-level quantum mechanical system represented by a unit vector in a 2-dimensional complex Hilbert space."
                    },
                    {
                        "title": "Mathematical Formalism",
                        "type": "math",
                        "content": "The general state vector of a single qubit is written as |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex numbers satisfying |α|² + |β|² = 1.",
                        "latex_math": "|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\quad |\\alpha|^2 + |\\beta|^2 = 1"
                    }
                ],
                "takeaway": "Qubits store quantum state amplitudes as unit vectors in complex vector spaces.",
                "preset_circuit": [],
                "exercises": [
                    {
                        "id": "ex-1-1-1",
                        "concept_id": "qubit-definition",
                        "type": "multiple_choice",
                        "difficulty": "Beginner",
                        "question": "Which mathematical condition must complex amplitudes α and β satisfy for a valid qubit state α|0⟩ + β|1⟩?",
                        "options": [
                            "α + β = 1",
                            "|α|² + |β|² = 1",
                            "α · β = 0",
                            "|α| + |β| = 1"
                        ],
                        "explanation": "The sum of probability magnitudes |α|² + |β|² must equal 1 by conservation of probability (norm normalization)."
                    }
                ],
                "assessment": {
                    "id": "ass-1-1",
                    "title": "Qubit Foundations Assessment",
                    "description": "Evaluate understanding of statevectors and basis states.",
                    "questions": [
                        {
                            "id": "q1",
                            "question": "What are the standard computational basis state vectors |0⟩ and |1⟩ in vector notation?",
                            "options": [
                                "|0⟩ = [1, 0]^T and |1⟩ = [0, 1]^T",
                                "|0⟩ = [0, 1]^T and |1⟩ = [1, 0]^T",
                                "|0⟩ = [1, 1]^T and |1⟩ = [0, 0]^T",
                                "|0⟩ = [1/2, 1/2]^T and |1⟩ = [1/2, -1/2]^T"
                            ],
                            "explanation": "|0⟩ represents column vector [1, 0]^T and |1⟩ represents column vector [0, 1]^T in standard computational basis."
                        }
                    ]
                }
            },
            {
                "id": "les-1-2",
                "module_id": "mod-1",
                "title": "02 — Superposition & Hadamard Gate",
                "description": "Creating coherent superpositions and inspecting amplitude distributions.",
                "difficulty": "Beginner",
                "time_minutes": 10,
                "prerequisites": ["les-1-1"],
                "objectives": [
                    "Explain quantum superposition.",
                    "Apply the Hadamard (H) gate to create equal superposition.",
                    "Calculate statevector probabilities P(|0⟩) and P(|1⟩)."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "Superposition enables a qubit to exist in a linear combination of basis states. The Hadamard gate transforms basis states into equal superposition states."
                    },
                    {
                        "title": "Mathematical Formalism",
                        "type": "math",
                        "content": "Applying H to |0⟩ yields |+⟩ = (1/√2)|0⟩ + (1/√2)|1⟩. The probability of measuring outcome 0 is |1/√2|² = 0.5 (50%).",
                        "latex_math": "H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle) = |+\\rangle"
                    }
                ],
                "takeaway": "The Hadamard gate maps basis state |0⟩ to equal superposition state |+⟩ with 50% measurement probabilities.",
                "preset_circuit": [{"gate": "H", "qubits": [0]}],
                "exercises": [
                    {
                        "id": "ex-1-2-1",
                        "concept_id": "superposition",
                        "type": "multiple_choice",
                        "difficulty": "Beginner",
                        "question": "What is the result of applying the H gate to |0⟩?",
                        "options": [
                            "Deterministically flips to |1⟩",
                            "Creates an equal superposition state |+⟩ = (|0⟩ + |1⟩)/√2",
                            "Collapses the qubit to 0",
                            "Applies a π/2 phase shift to |1⟩"
                        ],
                        "explanation": "The Hadamard gate transforms |0⟩ into the equal superposition state |+⟩ with equal amplitudes 1/√2."
                    },
                    {
                        "id": "ex-1-2-2",
                        "concept_id": "superposition-challenge",
                        "type": "circuit_challenge",
                        "difficulty": "Beginner",
                        "question": "Build a circuit on 1 qubit that transforms |0⟩ into equal superposition state |+⟩.",
                        "explanation": "Applying the H gate to qubit 0 creates equal superposition state |+⟩ with P(|0⟩) ≈ 0.5 and P(|1⟩) ≈ 0.5.",
                        "target_behavior": {
                            "num_qubits": 1,
                            "min_prob_0": 0.49,
                            "max_prob_0": 0.51,
                            "min_prob_1": 0.49,
                            "max_prob_1": 0.51
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "mod-2",
        "title": "Module 2 — Single-Qubit Quantum Gates",
        "description": "Unitary transformations: Pauli X, Y, Z, Phase S, T gates, and arbitrary rotations RX, RY, RZ.",
        "order": 2,
        "lessons": [
            {
                "id": "les-2-1",
                "module_id": "mod-2",
                "title": "01 — Pauli X, Y, Z Gates",
                "description": "Bit flip, phase flip, and combined Pauli operators.",
                "difficulty": "Beginner",
                "time_minutes": 10,
                "prerequisites": ["les-1-2"],
                "objectives": [
                    "Describe Pauli X (quantum NOT) operation.",
                    "Apply Pauli Z phase flip operation.",
                    "Understand Pauli matrix action on statevectors."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "The Pauli gates X, Y, Z form the core single-qubit unitary operators. Pauli X flips amplitudes (|0⟩ ↔ |1⟩). Pauli Z applies a -1 phase factor to |1⟩."
                    },
                    {
                        "title": "Mathematical Formalism",
                        "type": "math",
                        "content": "X = [[0, 1], [1, 0]], Z = [[1, 0], [0, -1]]. X|0⟩ = |1⟩, Z|1⟩ = -|1⟩.",
                        "latex_math": "X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}"
                    }
                ],
                "takeaway": "Pauli X flips bit basis states; Pauli Z applies a relative phase of π to state |1⟩.",
                "preset_circuit": [{"gate": "X", "qubits": [0]}],
                "exercises": [
                    {
                        "id": "ex-2-1-1",
                        "concept_id": "pauli-x-challenge",
                        "type": "circuit_challenge",
                        "difficulty": "Beginner",
                        "question": "Build a circuit on 1 qubit that deterministically transforms |0⟩ into state |1⟩.",
                        "explanation": "Applying the X (NOT) gate to qubit 0 transforms |0⟩ to |1⟩ with 100% probability.",
                        "target_behavior": {
                            "num_qubits": 1,
                            "min_prob_1": 0.99
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "mod-3",
        "title": "Module 3 — Multi-Qubit Circuits & Entanglement",
        "description": "Two-qubit gates (CNOT, CZ, SWAP) and constructing Bell states.",
        "order": 3,
        "lessons": [
            {
                "id": "les-3-1",
                "module_id": "mod-3",
                "title": "01 — CNOT Gate & Bell State",
                "description": "Controlled-NOT gate dynamics and creating maximally entangled Bell states.",
                "difficulty": "Intermediate",
                "time_minutes": 15,
                "prerequisites": ["les-2-1"],
                "objectives": [
                    "Explain CNOT control and target qubit behavior.",
                    "Construct the Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2.",
                    "Verify non-separable bipartite quantum correlations."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "The CNOT gate flips the target qubit if the control qubit is |1⟩. Applying H(q0) followed by CNOT(q0, q1) creates the Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2."
                    },
                    {
                        "title": "Mathematical Formalism",
                        "type": "math",
                        "content": "CNOT|10⟩ = |11⟩. H(q0)|00⟩ = 1/√2(|00⟩ + |10⟩). CNOT(q0,q1) → 1/√2(|00⟩ + |11⟩).",
                        "latex_math": "|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)"
                    }
                ],
                "takeaway": "Hadamard on control qubit plus CNOT on target qubit generates maximally entangled Bell states.",
                "preset_circuit": [
                    {"gate": "H", "qubits": [0]},
                    {"gate": "CNOT", "qubits": [0, 1]}
                ],
                "exercises": [
                    {
                        "id": "ex-3-1-1",
                        "concept_id": "bell-state-challenge",
                        "type": "circuit_challenge",
                        "difficulty": "Intermediate",
                        "question": "Build a circuit on 2 qubits that generates the Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2.",
                        "explanation": "Applying H to qubit 0 and CNOT from control q0 to target q1 produces P(|00⟩) ≈ 0.5 and P(|11⟩) ≈ 0.5.",
                        "target_behavior": {
                            "num_qubits": 2,
                            "min_prob_00": 0.48,
                            "max_prob_00": 0.52,
                            "min_prob_11": 0.48,
                            "max_prob_11": 0.52
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "mod-4",
        "title": "Module 4 — Phase & Quantum Interference",
        "description": "Constructive and destructive quantum interference, phase shifts, and state cancellation.",
        "order": 4,
        "lessons": [
            {
                "id": "les-4-1",
                "module_id": "mod-4",
                "title": "01 — Quantum Interference & H-H Identity",
                "description": "Demonstrating amplitude cancellation via H · H = I.",
                "difficulty": "Intermediate",
                "time_minutes": 10,
                "prerequisites": ["les-3-1"],
                "objectives": [
                    "Define constructive and destructive interference.",
                    "Verify that applying H twice returns the state to |0⟩.",
                    "Understand how negative phase causes destructive cancellation."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "Hadamard is self-inverse (H² = I). Applying H to |+⟩ causes constructive interference on |0⟩ and destructive interference on |1⟩."
                    },
                    {
                        "title": "Mathematical Formalism",
                        "type": "math",
                        "content": "H|+⟩ = 1/2(|0⟩ + |1⟩ + |0⟩ - |1⟩) = 1/2(2|0⟩ + 0|1⟩) = |0⟩.",
                        "latex_math": "H|+\\rangle = \\frac{1}{2}(|0\\rangle + |1\\rangle + |0\\rangle - |1\\rangle) = |0\\rangle"
                    }
                ],
                "takeaway": "Destructive interference cancels the amplitude of |1⟩, leaving full amplitude on |0⟩.",
                "preset_circuit": [
                    {"gate": "H", "qubits": [0]},
                    {"gate": "H", "qubits": [0]}
                ],
                "exercises": [
                    {
                        "id": "ex-4-1-1",
                        "concept_id": "interference-challenge",
                        "type": "circuit_challenge",
                        "difficulty": "Intermediate",
                        "question": "Build a circuit using two H gates on qubit 0 to demonstrate destructive interference returning |0⟩.",
                        "explanation": "Applying H followed by H results in net transformation I, restoring state |0⟩ with P(|0⟩) = 1.0.",
                        "target_behavior": {
                            "num_qubits": 1,
                            "min_prob_0": 0.99
                        }
                    }
                ]
            }
        ]
    },
    {
        "id": "mod-5",
        "title": "Module 5 — Measurement & Dynamic Circuits",
        "description": "Physical measurement collapse, classical registers, reset operations, and conditional gates.",
        "order": 5,
        "lessons": [
            {
                "id": "les-5-1",
                "module_id": "mod-5",
                "title": "01 — Dynamic Circuits & Conditionals",
                "description": "Mid-circuit measurements, reset operations, and classical bit conditionals.",
                "difficulty": "Intermediate",
                "time_minutes": 15,
                "prerequisites": ["les-4-1"],
                "objectives": [
                    "Understand mid-circuit measurement and classical feedback.",
                    "Apply ResetNode to collapse and re-initialize qubits to |0⟩.",
                    "Execute ConditionalNode gates based on measured classical bits."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "Dynamic quantum circuits allow classical control flow during execution. Measurement outputs a classical bit, which can conditionally trigger subsequent gates."
                    }
                ],
                "takeaway": "Classical feedback enables dynamic quantum error correction and state resets.",
                "preset_circuit": [],
                "exercises": [
                    {
                        "id": "ex-5-1-1",
                        "concept_id": "dynamic-circuits",
                        "type": "multiple_choice",
                        "difficulty": "Intermediate",
                        "question": "What happens during a Reset operation on a qubit in state |1⟩?",
                        "options": [
                            "It entangles the qubit with ancillas",
                            "It measures the qubit and applies X if the outcome is 1, returning state |0⟩",
                            "It applies a Hadamrd gate",
                            "It multiplies the amplitude by i"
                        ],
                        "explanation": "Reset measures the qubit and conditionally flips it back to ground state |0⟩."
                    }
                ]
            }
        ]
    },
    {
        "id": "mod-6",
        "title": "Module 6 — Quantum Algorithms",
        "description": "Foundational quantum algorithms: Deutsch-Jozsa, Bernstein-Vazirani, Grover, and QFT.",
        "order": 6,
        "lessons": [
            {
                "id": "les-6-1",
                "module_id": "mod-6",
                "title": "01 — Bernstein-Vazirani Algorithm",
                "description": "Finding a hidden bitstring s in a single query.",
                "difficulty": "Advanced",
                "time_minutes": 20,
                "prerequisites": ["les-5-1"],
                "objectives": [
                    "Explain oracle query complexity.",
                    "Understand phase kickback in Bernstein-Vazirani.",
                    "Reconstruct the hidden bitstring in one query."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "Bernstein-Vazirani recovers an n-bit secret bitstring s from an oracle f(x) = s · x (mod 2) in 1 quantum query instead of n classical queries."
                    }
                ],
                "takeaway": "Phase kickback allows simultaneous evaluation of all bits of secret bitstring s.",
                "preset_circuit": [],
                "exercises": [
                    {
                        "id": "ex-6-1-1",
                        "concept_id": "bv-algorithm",
                        "type": "multiple_choice",
                        "difficulty": "Advanced",
                        "question": "How many queries does Bernstein-Vazirani require to find an n-bit secret string s?",
                        "options": ["n queries", "2^n queries", "1 query", "n² queries"],
                        "explanation": "Bernstein-Vazirani achieves O(1) query complexity compared to O(n) classical queries."
                    }
                ]
            }
        ]
    },
    {
        "id": "mod-7",
        "title": "Module 7 — Parameterized Circuits & Hybrid Computing",
        "description": "Variational Quantum Eigensolver (VQE), QAOA, observables, and optimization.",
        "order": 7,
        "lessons": [
            {
                "id": "les-7-1",
                "module_id": "mod-7",
                "title": "01 — VQE & Variational Optimization",
                "description": "Finding ground state energy of Hamiltonians using parameterized ansaetze.",
                "difficulty": "Advanced",
                "time_minutes": 20,
                "prerequisites": ["les-6-1"],
                "objectives": [
                    "Formulate variational energy E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩.",
                    "Optimize parameters θ using classical optimizers (COBYLA).",
                    "Find analytical ground state energy of H = Z."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "VQE uses a hybrid quantum-classical loop: quantum backend evaluates expectation value ⟨H⟩ for an ansatz state |ψ(θ)⟩, and classical optimizer updates θ to minimize energy."
                    }
                ],
                "takeaway": "VQE relies on the Rayleigh-Ritz variational principle to approximate ground state energy.",
                "preset_circuit": [],
                "exercises": [
                    {
                        "id": "ex-7-1-1",
                        "concept_id": "vqe-concept",
                        "type": "multiple_choice",
                        "difficulty": "Advanced",
                        "question": "What is the theoretical ground state energy for Hamiltonian H = Z on 1 qubit?",
                        "options": ["+1.0", "0.0", "-1.0", "-0.5"],
                        "explanation": "The eigenvalues of Z are +1 and -1. The ground state is |1⟩ with energy -1.0."
                    }
                ]
            }
        ]
    },
    {
        "id": "mod-8",
        "title": "Module 8 — Noise & Quantum Error Correction",
        "description": "Noise channels, Kraus operators, ZNE error mitigation, and 3-qubit bit-flip QEC.",
        "order": 8,
        "lessons": [
            {
                "id": "les-8-1",
                "module_id": "mod-8",
                "title": "01 — 3-Qubit Bit-Flip Code QEC",
                "description": "Active error detection and correction using parity check ancilla qubits.",
                "difficulty": "Advanced",
                "time_minutes": 25,
                "prerequisites": ["les-7-1"],
                "objectives": [
                    "Encode logical qubit |ψ_L⟩ into 3 physical qubits.",
                    "Extract error syndromes using parity check ancillas.",
                    "Apply recovery operations to correct single-qubit bit flips."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "3-qubit bit-flip repetition code encodes |0⟩ → |000⟩ and |1⟩ → |111⟩. Ancilla qubits measure syndromes q0⊕q1 and q1⊕q2 without destroying logical information."
                    }
                ],
                "takeaway": "Syndrome measurements identify error location, allowing active correction.",
                "preset_circuit": [],
                "exercises": [
                    {
                        "id": "ex-8-1-1",
                        "concept_id": "qec-syndrome",
                        "type": "multiple_choice",
                        "difficulty": "Advanced",
                        "question": "In 3-qubit bit-flip code with syndrome bits c0 = q0⊕q1 and c1 = q1⊕q2, what syndrome indicates an error on q0?",
                        "options": ["00", "10", "11", "01"],
                        "explanation": "Syndrome 10 (c0=1, c1=0) indicates q0 differs from q1, while q1 matches q2, identifying q0 as corrupted."
                    }
                ]
            }
        ]
    },
    {
        "id": "mod-9",
        "title": "Module 9 — Advanced Benchmarking & Surface Codes",
        "description": "Stabilizer tableau simulation, Randomized Benchmarking (RB), and 2D surface-code foundations.",
        "order": 9,
        "lessons": [
            {
                "id": "les-9-1",
                "module_id": "mod-9",
                "title": "01 — Randomized Benchmarking (RB)",
                "description": "Assessing average gate fidelity using random Clifford sequences and inverse gates.",
                "difficulty": "Advanced",
                "time_minutes": 20,
                "prerequisites": ["les-8-1"],
                "objectives": [
                    "Generate random Clifford sequences.",
                    "Compute mathematical inverse Clifford sequence U^†.",
                    "Measure ground state survival probability to evaluate gate fidelity."
                ],
                "sections": [
                    {
                        "title": "Concept",
                        "type": "concept",
                        "content": "Randomized Benchmarking applies sequences of random Clifford gates followed by inverse sequence U^†. In an ideal noiseless circuit, survival probability is exactly 1.0."
                    }
                ],
                "takeaway": "RB decouples gate error rate evaluation from state preparation and measurement errors.",
                "preset_circuit": [],
                "exercises": [
                    {
                        "id": "ex-9-1-1",
                        "concept_id": "rb-fidelity",
                        "type": "multiple_choice",
                        "difficulty": "Advanced",
                        "question": "What is the expected ground state survival probability for an ideal noiseless RB sequence followed by its inverse?",
                        "options": ["0.5", "0.0", "1.0", "0.7071"],
                        "explanation": "A Clifford sequence U followed by its inverse U^† equals the identity I, returning state |0⟩ with probability 1.0."
                    }
                ]
            }
        ]
    }
]
