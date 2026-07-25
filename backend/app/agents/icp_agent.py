import logging
from app.agents.base import BaseAgent
from app.schemas.state import AgentState
from app.schemas.agent_outputs import ICPOutput
from app.services.llm_factory import get_llm_provider
from app.prompts.agent_prompts import ICP_AGENT_PROMPT

logger = logging.getLogger(__name__)

class ICPAgent(BaseAgent):
    name: str = "ICP Agent"

    def run(self, state: AgentState) -> AgentState:
        idea = state.get("startup_idea", "")
        research = state.get("research")
        competitors = state.get("competitors")
        config = state.get("config", {})
        
        logger.info(f"Running {self.name} for idea: {idea}")
        rag_context, sources = self.get_rag_context(state)
        
        if "knowledge_sources" not in state or state["knowledge_sources"] is None:
            state["knowledge_sources"] = []
        for src in sources:
            if src not in state["knowledge_sources"]:
                state["knowledge_sources"].append(src)

        llm = get_llm_provider(config=config)
        ctx = f"Startup Idea: '{idea}'\nResearch: {research.model_dump_json() if research else ''}\nCompetitors: {competitors.model_dump_json() if competitors else ''}"
        prompt = f"{rag_context}\nDefine Primary and Secondary ICPs based on this context:\n{ctx}"
        
        result: ICPOutput = llm.generate_structured(
            prompt=prompt,
            schema=ICPOutput,
            system_prompt=ICP_AGENT_PROMPT
        )
        
        state["icp"] = result
        if "events" not in state or state["events"] is None:
            state["events"] = []
            
        event = self.create_event(status="completed", output=result.model_dump())
        state["events"].append(event)
        state["current_step"] = self.name
        return state
