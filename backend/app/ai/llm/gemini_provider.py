"""
Google Gemini LLM Provider — Free Tier (google-genai SDK)
Model: gemini-2.5-flash  —  1500 requests/day FREE, no credit card needed.
Get your key at: https://aistudio.google.com/app/apikey
"""
import os
import warnings
from pathlib import Path
from app.ai.llm.base import LLMProviderInterface

# Suppress Python 3.9 deprecation warnings from google libraries
warnings.filterwarnings("ignore", category=FutureWarning)

# Load .env
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parents[4] / ".env"
    load_dotenv(dotenv_path=_env_path, override=False)
except ImportError:
    pass

SYSTEM_PROMPT = (
    "You are QuantumTutor, an expert quantum computing educational assistant "
    "embedded in an interactive quantum learning platform.\n\n"
    "Your role:\n"
    "- Explain quantum computing concepts clearly at the student's level\n"
    "- Answer questions about qubits, gates, superposition, entanglement, measurement\n"
    "- Help debug quantum circuits and explain circuit behavior\n"
    "- Explain algorithms: Grover, Shor, VQE, QAOA, QFT, Deutsch-Jozsa, Bernstein-Vazirani\n"
    "- Give step-by-step math derivations when asked\n"
    "- Always give intuitive explanations before formal ones\n\n"
    "Rules:\n"
    "- Never fabricate quantum physics\n"
    "- Use **bold** for key terms, `backticks` for gate names and equations\n"
    "- Use bullet points for multi-part answers\n"
    "- Keep responses concise but complete (under 400 words unless asked for more)\n"
)


class GeminiProvider(LLMProviderInterface):

    def __init__(self):
        # Read key from settings → then env
        self.api_key = ""
        try:
            from app.core.config import settings
            self.api_key = getattr(settings, "gemini_api_key", "").strip()
        except Exception:
            pass
        if not self.api_key:
            self.api_key = os.getenv("GEMINI_API_KEY", "").strip()

        self.model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        self.client = None
        self._error = ""

        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
            except Exception as e:
                self._error = str(e)

    @property
    def provider_name(self) -> str:
        return "gemini"

    def is_configured(self) -> bool:
        return self.client is not None

    def generate_response(self, prompt: str) -> str:
        if not self.client:
            return "llm_not_configured"

        full_prompt = SYSTEM_PROMPT + "\n\nUser: " + prompt

        try:
            from google import genai
            from google.genai import types

            response = self.client.models.generate_content(
                model=self.model_name,
                contents=full_prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=1024,
                )
            )
            return response.text

        except Exception as e:
            err = str(e)
            if "429" in err or "quota" in err.lower() or "rate" in err.lower():
                return (
                    "Rate limit reached on the free tier. "
                    "Please wait 1 minute and try again. "
                    "(Free tier: 10 requests/minute, 1500/day)"
                )
            if "401" in err or "403" in err or "api_key" in err.lower():
                return (
                    "Invalid Gemini API key. "
                    "Please check GEMINI_API_KEY in backend/.env\n"
                    "Get a free key at: https://aistudio.google.com/app/apikey"
                )
            return f"Gemini error: {err}"
