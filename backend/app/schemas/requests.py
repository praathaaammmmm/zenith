from typing import Optional, Dict
from pydantic import BaseModel, Field

class APIKeysConfig(BaseModel):
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    gemini_api_key: Optional[str] = None
    tavily_api_key: Optional[str] = None
    provider: Optional[str] = "mock"

class StartupIdeaRequest(BaseModel):
    idea: str = Field(..., min_length=5, description="Startup idea description")
    config: Optional[APIKeysConfig] = None

class OrchestrationResponse(BaseModel):
    session_id: str
    status: str
    message: str
