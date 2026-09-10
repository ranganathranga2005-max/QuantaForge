from app.ai.llm.base import LLMProviderInterface

class MockAIProvider(LLMProviderInterface):
    """
    Mock AI Provider used exclusively for architecture validation, testing, and UI integration when no live LLM key is configured.
    Clearly tags output as [Mock AI Provider] to comply with scientific transparency rules.
    """

    def is_configured(self) -> bool:
        return True

    @property
    def provider_name(self) -> str:
        return "mock_provider"

    def generate_response(self, prompt: str) -> str:
        prompt_lower = prompt.lower()

        if "h gate" in prompt_lower or "hadamard" in prompt_lower:
            return (
                "[Mock AI Provider] The Hadamard (H) gate puts a qubit into an equal superposition state: "
                "H|0⟩ = (|0⟩ + |1⟩)/√2 and H|1⟩ = (|0⟩ - |1⟩)/√2. "
                "It creates equal probabilities (50% for 0 and 50% for 1) upon measurement."
            )

        if "bell state" in prompt_lower or "entanglement" in prompt_lower:
            return (
                "[Mock AI Provider] A Bell state is a maximally entangled 2-qubit state, such as (|00⟩ + |11⟩)/√2. "
                "It is created by applying an H gate to qubit 0 followed by a CNOT controlled by q0 targeting q1."
            )

        if "grover" in prompt_lower:
            return (
                "[Mock AI Provider] Grover's Search algorithm achieves a quadratic speedup for unstructured search. "
                "It alternates between Oracle phase-inversion and Diffuser amplification stages."
            )

        if "shor" in prompt_lower:
            return (
                "[Mock AI Provider] Shor's Algorithm solves period finding using Quantum Fourier Transform (QFT). "
                "For N=15 and a=2, quantum execution discovers period r=4, allowing classical GCD to factor 15 into 3 × 5."
            )

        return (
            "[Mock AI Provider] Structured response for QuantumLearning platform intelligence layer. "
            "Context and intent successfully processed by the AI Intelligence Core."
        )
