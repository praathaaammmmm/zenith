import logging
from app.agents.base import BaseAgent
from app.schemas.state import AgentState
from app.schemas.agent_outputs import ResearchOutput
from app.services.llm_factory import get_llm_provider
from app.prompts.agent_prompts import RESEARCH_AGENT_PROMPT

logger = logging.getLogger(__name__)

class ResearchAgent(BaseAgent):
    name: str = "Research Agent"

    def run(self, state: AgentState) -> AgentState:
        idea = state.get("startup_idea", "")
        config = state.get("config", {})
        
        logger.info(f"Running {self.name} for idea: {idea}")
        rag_context, sources = self.get_rag_context(state)
        
        # Track knowledge sources
        if "knowledge_sources" not in state or state["knowledge_sources"] is None:
            state["knowledge_sources"] = []
        for src in sources:
            if src not in state["knowledge_sources"]:
                state["knowledge_sources"].append(src)

        llm = get_llm_provider(config=config)
        prompt = f"{rag_context}\nAnalyze the market context for this startup idea: '{idea}'."
        
        result: ResearchOutput = llm.generate_structured(
            prompt=prompt,
            schema=ResearchOutput,
            system_prompt=RESEARCH_AGENT_PROMPT
        )
        
        state["research"] = result
        if "events" not in state or state["events"] is None:
            state["events"] = []
            
        event = self.create_event(status="completed", output=result.model_dump())
        state["events"].append(event)
        state["current_step"] = self.name
        return state
