import logging
from app.agents.base import BaseAgent
from app.schemas.state import AgentState
from app.schemas.agent_outputs import InsightOutput
from app.services.llm_factory import get_llm_provider
from app.prompts.agent_prompts import INSIGHT_AGENT_PROMPT

logger = logging.getLogger(__name__)

class InsightAgent(BaseAgent):
    name: str = "Insight Agent"

    def run(self, state: AgentState) -> AgentState:
        idea = state.get("startup_idea", "")
        interviews = state.get("interviews")
        config = state.get("config", {})
        
        logger.info(f"Running {self.name} for idea: {idea}")
        rag_context, sources = self.get_rag_context(state)
        
        if "knowledge_sources" not in state or state["knowledge_sources"] is None:
            state["knowledge_sources"] = []
        for src in sources:
            if src not in state["knowledge_sources"]:
                state["knowledge_sources"].append(src)

        llm = get_llm_provider(config=config)
        interviews_ctx = interviews.model_dump_json() if interviews else "No interviews conducted."
        prompt = f"{rag_context}\nExtract and cluster top insights from customer interviews for startup idea: '{idea}'.\nInterviews Context:\n{interviews_ctx}"
        
        result: InsightOutput = llm.generate_structured(
            prompt=prompt,
            schema=InsightOutput,
            system_prompt=INSIGHT_AGENT_PROMPT
        )
        
        state["insights"] = result
        if "events" not in state or state["events"] is None:
            state["events"] = []
            
        event = self.create_event(status="completed", output=result.model_dump())
        state["events"].append(event)
        state["current_step"] = self.name
        return state
