import logging
from app.agents.base import BaseAgent
from app.schemas.state import AgentState
from app.schemas.agent_outputs import PersonaOutput
from app.services.llm_factory import get_llm_provider
from app.prompts.agent_prompts import PERSONA_AGENT_PROMPT

logger = logging.getLogger(__name__)

class PersonaAgent(BaseAgent):
    name: str = "Persona Agent"

    def run(self, state: AgentState) -> AgentState:
        idea = state.get("startup_idea", "")
        icp = state.get("icp")
        config = state.get("config", {})
        
        logger.info(f"Running {self.name} for idea: {idea}")
        rag_context, sources = self.get_rag_context(state)
        
        if "knowledge_sources" not in state or state["knowledge_sources"] is None:
            state["knowledge_sources"] = []
        for src in sources:
            if src not in state["knowledge_sources"]:
                state["knowledge_sources"].append(src)

        llm = get_llm_provider(config=config)
        icp_ctx = icp.model_dump_json() if icp else "No ICP data."
        prompt = f"{rag_context}\nGenerate 5 realistic, distinct customer personas for startup idea: '{idea}'.\nICP Context:\n{icp_ctx}"
        
        result: PersonaOutput = llm.generate_structured(
            prompt=prompt,
            schema=PersonaOutput,
            system_prompt=PERSONA_AGENT_PROMPT
        )
        
        state["personas"] = result
        if "events" not in state or state["events"] is None:
            state["events"] = []
            
        event = self.create_event(status="completed", output=result.model_dump())
        state["events"].append(event)
        state["current_step"] = self.name
        return state
