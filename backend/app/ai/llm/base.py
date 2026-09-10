from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class LLMProviderInterface(ABC):
    @abstractmethod
    def generate_response(self, prompt: str) -> str:
        pass

    @abstractmethod
    def is_configured(self) -> bool:
        pass

    @property
    @abstractmethod
    def provider_name(self) -> str:
        pass

