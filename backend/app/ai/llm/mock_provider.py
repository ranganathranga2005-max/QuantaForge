"""
Mock AI Provider — fully functional offline chatbot.
Gives detailed, educationally accurate answers without any API key.
Used as fallback when no LLM key is configured.
"""
from app.ai.llm.base import LLMProviderInterface


class MockAIProvider(LLMProviderInterface):

    def is_configured(self) -> bool:
        return True

    @property
    def provider_name(self) -> str:
        return "mock_provider"

    def generate_response(self, prompt: str) -> str:
        p = prompt.lower()

        # ── Greetings ──────────────────────────────────────────────────────
        if any(w in p for w in ["hello", "hi ", "hey", "how are you", "who are you"]):
            return (
                "Hello! I'm your **Quantum AI Tutor** 🔬\n\n"
                "I can help you with:\n"
                "- Qubits, superposition, entanglement, measurement\n"
                "- Quantum gates: H, X, Y, Z, CNOT, RX, RY, RZ\n"
                "- Quantum algorithms: Grover, Shor, VQE, QAOA, QFT\n"
                "- Circuit building and debugging\n"
                "- Any quantum computing concept you're studying\n\n"
                "What would you like to learn today?"
            )

        # ── Qubit ──────────────────────────────────────────────────────────
        if any(w in p for w in ["qubit", "what is a qubit", "qubits"]):
            return (
                "A **qubit** (quantum bit) is the fundamental unit of quantum information.\n\n"
                "**Classical bit vs Qubit:**\n"
                "- A classical bit is always exactly 0 or 1\n"
                "- A qubit can be in a **superposition**: |ψ⟩ = α|0⟩ + β|1⟩\n"
                "- α and β are complex amplitudes where |α|² + |β|² = 1\n\n"
                "**Physical implementations:**\n"
                "- Electron spin (up = |0⟩, down = |1⟩)\n"
                "- Photon polarization\n"
                "- Superconducting circuits (used by IBM, Google)\n"
                "- Trapped ions (used by IonQ)\n\n"
                "**Key insight:** A qubit doesn't 'secretly' have a value — "
                "it genuinely exists in both states simultaneously until measured."
            )

        # ── Superposition ──────────────────────────────────────────────────
        if any(w in p for w in ["superposition", "super position"]):
            return (
                "**Superposition** means a qubit exists in multiple states at once — not just a hidden value.\n\n"
                "**Mathematically:**\n"
                "|ψ⟩ = α|0⟩ + β|1⟩\n\n"
                "where:\n"
                "- α, β are complex numbers called **probability amplitudes**\n"
                "- |α|² = probability of measuring 0\n"
                "- |β|² = probability of measuring 1\n"
                "- |α|² + |β|² = 1 (normalization)\n\n"
                "**Creating superposition:**\n"
                "Apply the `H` (Hadamard) gate to |0⟩:\n"
                "H|0⟩ = (|0⟩ + |1⟩)/√2  →  50% chance of 0, 50% of 1\n\n"
                "**Key insight:** Superposition is destroyed upon measurement — "
                "the qubit collapses to a definite 0 or 1."
            )

        # ── Hadamard gate ──────────────────────────────────────────────────
        if any(w in p for w in ["hadamard", "h gate", "h-gate"]):
            return (
                "The **Hadamard gate** (H) is the most important single-qubit gate.\n\n"
                "**What it does:**\n"
                "- H|0⟩ = (|0⟩ + |1⟩)/√2  →  equal superposition\n"
                "- H|1⟩ = (|0⟩ − |1⟩)/√2  →  equal superposition with phase flip\n\n"
                "**Matrix representation:**\n"
                "H = (1/√2) × [[1, 1], [1, −1]]\n\n"
                "**Key properties:**\n"
                "- H is its own inverse: H² = I\n"
                "- Creates equal probability of 0 and 1\n"
                "- Fundamental for quantum parallelism\n\n"
                "**Used in:** Almost every quantum algorithm — Grover, QFT, Deutsch-Jozsa, Bell states"
            )

        # ── Entanglement ───────────────────────────────────────────────────
        if any(w in p for w in ["entanglement", "entangled", "bell state", "bell"]):
            return (
                "**Quantum Entanglement** is a correlation between qubits that has no classical equivalent.\n\n"
                "**Creating a Bell state (maximally entangled):**\n"
                "1. Start: |00⟩\n"
                "2. Apply H to qubit 0: (|00⟩ + |10⟩)/√2\n"
                "3. Apply CNOT (control=q0, target=q1): (|00⟩ + |11⟩)/√2\n\n"
                "**Result:** |Φ+⟩ = (|00⟩ + |11⟩)/√2\n\n"
                "**What this means:**\n"
                "- Measuring qubit 0 as 0 → qubit 1 is instantly 0\n"
                "- Measuring qubit 0 as 1 → qubit 1 is instantly 1\n"
                "- This holds true regardless of distance between qubits\n\n"
                "**The 4 Bell states:** Φ+, Φ−, Ψ+, Ψ− — each maximally entangled"
            )

        # ── CNOT gate ──────────────────────────────────────────────────────
        if any(w in p for w in ["cnot", "cx gate", "controlled-not", "controlled not"]):
            return (
                "The **CNOT (Controlled-NOT)** gate is the fundamental 2-qubit gate.\n\n"
                "**How it works:**\n"
                "- Has a **control qubit** and a **target qubit**\n"
                "- If control = |0⟩ → target unchanged\n"
                "- If control = |1⟩ → target is flipped (X applied)\n\n"
                "**Truth table:**\n"
                "- |00⟩ → |00⟩\n"
                "- |01⟩ → |01⟩\n"
                "- |10⟩ → |11⟩\n"
                "- |11⟩ → |10⟩\n\n"
                "**Matrix:**\n"
                "[[1,0,0,0], [0,1,0,0], [0,0,0,1], [0,0,1,0]]\n\n"
                "**Key uses:** Creating entanglement, implementing classical logic, error correction"
            )

        # ── Measurement ────────────────────────────────────────────────────
        if any(w in p for w in ["measurement", "measure", "collapse", "wavefunction"]):
            return (
                "**Quantum Measurement** is the process of extracting classical information from a qubit.\n\n"
                "**What happens:**\n"
                "- Before measurement: |ψ⟩ = α|0⟩ + β|1⟩\n"
                "- After measurement: qubit collapses to either |0⟩ or |1⟩\n"
                "- Probability of 0 = |α|², Probability of 1 = |β|²\n\n"
                "**Key properties:**\n"
                "- Measurement is **irreversible** — destroys superposition\n"
                "- Repeated measurements give the same result (state collapsed)\n"
                "- The Born rule gives the probability: P(0) = |⟨0|ψ⟩|²\n\n"
                "**No-cloning theorem:** You cannot copy an unknown quantum state, "
                "which is why measurement destroys it."
            )

        # ── Grover's Algorithm ─────────────────────────────────────────────
        if any(w in p for w in ["grover", "grover's", "search algorithm", "amplitude amplification"]):
            return (
                "**Grover's Search Algorithm** finds a marked item in an unsorted database.\n\n"
                "**Quantum speedup:**\n"
                "- Classical: O(N) searches needed\n"
                "- Grover: O(√N) searches — quadratic speedup\n\n"
                "**Steps:**\n"
                "1. **Initialize:** Apply H to all qubits → equal superposition\n"
                "2. **Oracle:** Phase-flip the marked state (multiplies it by −1)\n"
                "3. **Diffuser:** Inversion about average (amplifies marked state)\n"
                "4. **Repeat:** Steps 2-3 for ≈ π√N/4 iterations\n"
                "5. **Measure:** Marked state has high probability\n\n"
                "**Example (4 items, 2 qubits):**\n"
                "- Need only 1 iteration instead of 2-3 classical checks\n\n"
                "**Key insight:** Constructive interference amplifies the answer, "
                "destructive interference suppresses wrong answers."
            )

        # ── Shor's Algorithm ───────────────────────────────────────────────
        if any(w in p for w in ["shor", "shor's", "factoring", "rsa", "period finding"]):
            return (
                "**Shor's Algorithm** factors large numbers exponentially faster than classical computers.\n\n"
                "**Why it matters:** It can break RSA encryption (used in banking, internet security).\n\n"
                "**Core idea — Quantum Period Finding:**\n"
                "1. Choose random a < N\n"
                "2. Find period r of f(x) = aˣ mod N using QFT\n"
                "3. Use r to compute factors: gcd(a^(r/2) ± 1, N)\n\n"
                "**For N=15, a=2:**\n"
                "- Period r = 4\n"
                "- gcd(2² − 1, 15) = gcd(3, 15) = **3** ✓\n"
                "- gcd(2² + 1, 15) = gcd(5, 15) = **5** ✓\n\n"
                "**Speedup:** Classical best = O(e^(n^1/3)) | Shor = O(n³)\n\n"
                "**Status:** Implemented for small N. Large-scale factoring needs millions of error-corrected qubits."
            )

        # ── VQE ────────────────────────────────────────────────────────────
        if any(w in p for w in ["vqe", "variational quantum eigensolver", "ground state"]):
            return (
                "**VQE (Variational Quantum Eigensolver)** finds the ground state energy of molecules.\n\n"
                "**Use case:** Quantum chemistry, drug discovery, materials science\n\n"
                "**How it works (hybrid quantum-classical loop):**\n"
                "1. Prepare a parameterized ansatz circuit U(θ)\n"
                "2. Measure expectation value: ⟨ψ(θ)|H|ψ(θ)⟩\n"
                "3. Classical optimizer (COBYLA, ADAM) updates θ\n"
                "4. Repeat until energy converges to minimum\n\n"
                "**Variational principle:** ⟨ψ|H|ψ⟩ ≥ E₀ (ground state energy)\n\n"
                "**Advantage:** Works on NISQ devices — short circuits tolerate noise better"
            )

        # ── QFT ────────────────────────────────────────────────────────────
        if any(w in p for w in ["qft", "quantum fourier", "fourier transform"]):
            return (
                "**QFT (Quantum Fourier Transform)** is the quantum version of the classical DFT.\n\n"
                "**What it does:** Transforms computational basis states to frequency domain\n\n"
                "**Key property:**\n"
                "QFT|j⟩ = (1/√N) Σₖ e^(2πijk/N) |k⟩\n\n"
                "**Circuit structure (n qubits):**\n"
                "1. Apply H to qubit 0\n"
                "2. Apply controlled phase rotations R_k\n"
                "3. Repeat for each qubit\n"
                "4. Swap qubits (bit reversal)\n\n"
                "**Complexity:** O(n²) gates vs O(n·2ⁿ) classically — exponential speedup\n\n"
                "**Used in:** Shor's algorithm, phase estimation, period finding"
            )

        # ── QAOA ───────────────────────────────────────────────────────────
        if any(w in p for w in ["qaoa", "quantum approximate optimization"]):
            return (
                "**QAOA (Quantum Approximate Optimization Algorithm)** solves combinatorial optimization.\n\n"
                "**Use case:** MaxCut, scheduling, routing, portfolio optimization\n\n"
                "**How it works:**\n"
                "1. Encode problem as a cost Hamiltonian H_C\n"
                "2. Alternate between cost unitary e^(−iγH_C) and mixer unitary e^(−iβH_B)\n"
                "3. Repeat p times (p = circuit depth parameter)\n"
                "4. Classically optimize angles γ, β\n"
                "5. Measure → best solution found\n\n"
                "**Parameter p:** Higher p = better approximation but deeper circuit\n\n"
                "**Advantage:** Works on NISQ hardware, approximation ratio improves with p"
            )

        # ── QEC ────────────────────────────────────────────────────────────
        if any(w in p for w in ["qec", "error correction", "error correcting", "repetition code"]):
            return (
                "**Quantum Error Correction (QEC)** protects quantum information from decoherence.\n\n"
                "**Why needed:** Qubits are fragile — even tiny environmental interactions cause errors\n\n"
                "**3-Qubit Bit-Flip Repetition Code:**\n"
                "1. Encode |ψ⟩ = α|0⟩+β|1⟩ into 3 qubits: α|000⟩ + β|111⟩\n"
                "2. If qubit 1 flips: α|010⟩ + β|101⟩\n"
                "3. Measure syndromes (ancilla qubits) to detect error\n"
                "4. Syndrome 10 → qubit 0 flipped → apply X to fix it\n"
                "5. Syndrome 11 → qubit 1 flipped → apply X to fix it\n\n"
                "**Key principle:** Measure syndromes, NOT the data qubits — preserves superposition"
            )

        # ── Gates general ──────────────────────────────────────────────────
        if any(w in p for w in ["pauli", "x gate", "y gate", "z gate", "s gate", "t gate", "rx", "ry", "rz", "rotation"]):
            return (
                "**Quantum Gates Overview:**\n\n"
                "**Pauli Gates (single qubit):**\n"
                "- `X` (NOT): flips |0⟩↔|1⟩, matrix [[0,1],[1,0]]\n"
                "- `Y`: combines X and Z, matrix [[0,−i],[i,0]]\n"
                "- `Z` (phase flip): |0⟩→|0⟩, |1⟩→−|1⟩\n\n"
                "**Phase Gates:**\n"
                "- `S` = Z^(1/2): applies phase of i to |1⟩\n"
                "- `T` = Z^(1/4): applies phase of e^(iπ/4) to |1⟩\n\n"
                "**Rotation Gates (parameterized):**\n"
                "- `RX(θ)`: rotates around X-axis of Bloch sphere\n"
                "- `RY(θ)`: rotates around Y-axis\n"
                "- `RZ(θ)`: rotates around Z-axis\n\n"
                "**Two-qubit Gates:**\n"
                "- `CNOT`: controlled-X (creates entanglement)\n"
                "- `CZ`: controlled-Z (phase kickback)\n"
                "- `SWAP`: exchanges two qubit states"
            )

        # ── Bloch sphere ───────────────────────────────────────────────────
        if any(w in p for w in ["bloch", "bloch sphere", "visualization"]):
            return (
                "The **Bloch Sphere** is a 3D visualization of a single qubit state.\n\n"
                "**Representation:**\n"
                "|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩\n\n"
                "**Key points on the sphere:**\n"
                "- North pole (+Z): |0⟩\n"
                "- South pole (−Z): |1⟩\n"
                "- +X axis: (|0⟩+|1⟩)/√2 (after H gate)\n"
                "- −X axis: (|0⟩−|1⟩)/√2\n"
                "- +Y axis: (|0⟩+i|1⟩)/√2\n\n"
                "**Gate effects on the Bloch sphere:**\n"
                "- X gate: 180° rotation around X-axis\n"
                "- H gate: 180° rotation around X+Z diagonal\n"
                "- RZ(θ): rotation by θ around Z-axis\n\n"
                "**Limitation:** Only works for a single qubit — entangled states cannot be visualized this way"
            )

        # ── Interference ───────────────────────────────────────────────────
        if any(w in p for w in ["interference", "constructive", "destructive"]):
            return (
                "**Quantum Interference** is what makes quantum algorithms powerful.\n\n"
                "**Constructive interference:** Amplitudes add up → increases probability of correct answer\n"
                "**Destructive interference:** Amplitudes cancel → decreases probability of wrong answers\n\n"
                "**Example — Deutsch-Jozsa algorithm:**\n"
                "- Balanced function: all amplitudes cancel → measure all 1s\n"
                "- Constant function: amplitudes reinforce → measure all 0s\n\n"
                "**Key insight:** Unlike classical probability, quantum amplitudes are complex numbers "
                "that can be negative or imaginary — allowing cancellation.\n\n"
                "**This is fundamentally different from classical randomness** — "
                "you're controlling the interference pattern, not just probability."
            )

        # ── Circuit ────────────────────────────────────────────────────────
        if any(w in p for w in ["circuit", "quantum circuit", "how to build"]):
            return (
                "A **Quantum Circuit** is a sequence of quantum gates applied to qubits.\n\n"
                "**Basic structure:**\n"
                "1. Initialize qubits in |0⟩ state\n"
                "2. Apply gates (unitary operations)\n"
                "3. Measure qubits → classical output\n\n"
                "**Example — Bell state circuit:**\n"
                "```\n"
                "q0: ──H────●────M\n"
                "q1: ────────X───M\n"
                "```\n"
                "1. H on q0 → superposition\n"
                "2. CNOT (q0 control, q1 target) → entanglement\n"
                "3. Measure both → always get 00 or 11\n\n"
                "**In this platform:** Use the Circuit Lab to drag and drop gates, "
                "then click Run to simulate on the quantum engine."
            )

        # ── Decoherence ────────────────────────────────────────────────────
        if any(w in p for w in ["decoherence", "noise", "error", "nisq"]):
            return (
                "**Quantum Decoherence** is the loss of quantum properties due to environmental interaction.\n\n"
                "**Main error types:**\n"
                "- **Bit flip (X error):** |0⟩ ↔ |1⟩ accidentally flipped\n"
                "- **Phase flip (Z error):** |+⟩ ↔ |−⟩ phase corrupted\n"
                "- **Depolarizing:** random Pauli error with probability p\n"
                "- **Amplitude damping:** qubit decays from |1⟩ to |0⟩ (energy loss)\n\n"
                "**T1 and T2 times:**\n"
                "- T1 = relaxation time (|1⟩ → |0⟩)\n"
                "- T2 = dephasing time (phase coherence lost)\n"
                "- Current hardware: T1/T2 ~ microseconds to milliseconds\n\n"
                "**NISQ era:** Noisy Intermediate-Scale Quantum computers have 50-1000 qubits "
                "but no full error correction yet."
            )

        # ── Default fallback ───────────────────────────────────────────────
        return (
            "Great question! Here's what I can tell you about quantum computing:\n\n"
            "**Core topics I can explain in detail:**\n"
            "- **Qubits & States:** superposition, Bloch sphere, statevectors\n"
            "- **Gates:** H, X, Y, Z, CNOT, RX/RY/RZ, SWAP, Toffoli\n"
            "- **Phenomena:** entanglement, interference, measurement, decoherence\n"
            "- **Algorithms:** Grover, Shor, VQE, QAOA, QFT, Deutsch-Jozsa, Bernstein-Vazirani\n"
            "- **Error Correction:** repetition code, syndrome measurement\n"
            "- **Circuits:** how to build, run, and interpret results\n\n"
            "Try asking something specific like:\n"
            "- *'What is the Hadamard gate?'*\n"
            "- *'How does Grover's algorithm work?'*\n"
            "- *'Explain quantum entanglement'*"
        )
