import logging
from app.agents.base import BaseAgent
from app.schemas.state import AgentState
from app.schemas.agent_outputs import InterviewOutput
from app.services.llm_factory import get_llm_provider
from app.prompts.agent_prompts import INTERVIEW_AGENT_PROMPT

logger = logging.getLogger(__name__)

class InterviewAgent(BaseAgent):
    name: str = "Interview Agent"

    def run(self, state: AgentState) -> AgentState:
        idea = state.get("startup_idea", "")
        personas = state.get("personas")
        config = state.get("config", {})
        
        logger.info(f"Running {self.name} for idea: {idea}")
        rag_context, sources = self.get_rag_context(state)
        
        if "knowledge_sources" not in state or state["knowledge_sources"] is None:
            state["knowledge_sources"] = []
        for src in sources:
            if src not in state["knowledge_sources"]:
                state["knowledge_sources"].append(src)

        llm = get_llm_provider(config=config)
        personas_ctx = personas.model_dump_json() if personas else "No personas generated."
        prompt = f"{rag_context}\nSimulate 1-on-1 discovery interviews for each persona regarding startup idea: '{idea}'.\nPersonas Context:\n{personas_ctx}"
        
        result: InterviewOutput = llm.generate_structured(
            prompt=prompt,
            schema=InterviewOutput,
            system_prompt=INTERVIEW_AGENT_PROMPT
        )
        
        state["interviews"] = result
        if "events" not in state or state["events"] is None:
            state["events"] = []
            
        event = self.create_event(status="completed", output=result.model_dump())
        state["events"].append(event)
        state["current_step"] = self.name
        return state
