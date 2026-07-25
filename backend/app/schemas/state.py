from typing import TypedDict, Optional, List, Any, Dict
from app.schemas.agent_outputs import (
    ResearchOutput,
    CompetitorOutput,
    ICPOutput,
    PersonaOutput,
    InterviewOutput,
    InsightOutput,
    MVPPlanOutput,
    FounderReportOutput,
)

class AgentState(TypedDict, total=False):
    session_id: str
    startup_idea: str
    config: Optional[Dict[str, Any]]
    
    # RAG Knowledge Intelligence state
    retrieved_context: Optional[List[str]]
    knowledge_sources: Optional[List[Dict[str, str]]]
    
    # Agent incremental outputs
    research: Optional[ResearchOutput]
    competitors: Optional[CompetitorOutput]
    icp: Optional[ICPOutput]
    personas: Optional[PersonaOutput]
    interviews: Optional[InterviewOutput]
    insights: Optional[InsightOutput]
    mvp_plan: Optional[MVPPlanOutput]
    report: Optional[FounderReportOutput]
    
    # Workflow metadata & SSE events log
    events: List[Dict[str, Any]]
    current_step: str
    error: Optional[str]
