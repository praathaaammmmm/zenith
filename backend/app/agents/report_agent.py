import logging
from app.agents.base import BaseAgent
from app.schemas.state import AgentState
from app.schemas.agent_outputs import FounderReportOutput
from app.services.llm_factory import get_llm_provider
from app.prompts.agent_prompts import REPORT_AGENT_PROMPT

logger = logging.getLogger(__name__)

class FounderReportAgent(BaseAgent):
    name: str = "Founder Report Agent"

    def run(self, state: AgentState) -> AgentState:
        idea = state.get("startup_idea", "")
        config = state.get("config", {})
        
        logger.info(f"Running {self.name} for idea: {idea}")
        rag_context, sources = self.get_rag_context(state)
        
        if "knowledge_sources" not in state or state["knowledge_sources"] is None:
            state["knowledge_sources"] = []
        for src in sources:
            if src not in state["knowledge_sources"]:
                state["knowledge_sources"].append(src)

        llm = get_llm_provider(config=config)
        
        ctx = f"""
Startup Idea: '{idea}'
Research: {state.get('research').model_dump_json() if state.get('research') else ''}
Competitors: {state.get('competitors').model_dump_json() if state.get('competitors') else ''}
ICP: {state.get('icp').model_dump_json() if state.get('icp') else ''}
Personas: {state.get('personas').model_dump_json() if state.get('personas') else ''}
Interviews: {state.get('interviews').model_dump_json() if state.get('interviews') else ''}
Insights: {state.get('insights').model_dump_json() if state.get('insights') else ''}
MVP Plan: {state.get('mvp_plan').model_dump_json() if state.get('mvp_plan') else ''}
"""
        prompt = f"{rag_context}\nSynthesize all team deliverables into a final Founder Report based on:\n{ctx}"
        
        result: FounderReportOutput = llm.generate_structured(
            prompt=prompt,
            schema=FounderReportOutput,
            system_prompt=REPORT_AGENT_PROMPT
        )
        
        state["report"] = result
        if "events" not in state or state["events"] is None:
            state["events"] = []
            
        event = self.create_event(status="completed", output=result.model_dump())
        state["events"].append(event)
        state["current_step"] = self.name
        return state
