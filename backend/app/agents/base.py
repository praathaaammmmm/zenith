import time
import logging
from typing import Dict, Any, Tuple, List
from app.schemas.state import AgentState
from rag.rag_service import rag_service

logger = logging.getLogger(__name__)

RAG_INSTRUCTION_PREFIX = """
[RETRIEVED STARTUP KNOWLEDGE BASE CONTEXT]
You have access to grounded startup knowledge, frameworks, and market benchmarks retrieved specifically for this step:
{context_text}

Instructions:
1. Use this retrieved startup knowledge when making strategic recommendations.
2. Do not blindly copy the retrieved information. Combine it with your analytical reasoning.
[END RETRIEVED KNOWLEDGE]
"""

class BaseAgent:
    name: str = "Base Agent"

    def run(self, state: AgentState) -> AgentState:
        raise NotImplementedError

    def get_rag_context(self, state: AgentState) -> Tuple[str, List[Dict[str, str]]]:
        """
        Retrieves domain-specific knowledge chunks for this agent and formats prompt context.
        """
        idea = state.get("startup_idea", "")
        retrieved = rag_service.retrieve_context_for_agent(self.name, idea)
        
        sources = []
        context_texts = []
        for item in retrieved:
            title = item.get("title", "Startup Knowledge")
            source = item.get("source", "Knowledge Base")
            content = item.get("content", "")
            context_texts.append(content)
            sources.append({"title": title, "source": source, "category": item.get("category", "General")})

        if not context_texts:
            context_texts.append("General lean startup methodology and PMF principles apply.")
            sources.append({"title": "Lean Startup Methodology", "source": "lean_startup_methodology.md", "category": "startup_frameworks"})

        formatted_context = RAG_INSTRUCTION_PREFIX.format(context_text="\n---\n".join(context_texts))
        return formatted_context, sources

    def create_event(self, status: str, output: Any = None, error: str = None) -> Dict[str, Any]:
        return {
            "agent": self.name,
            "status": status,
            "timestamp": time.time(),
            "output": output,
            "error": error
        }
