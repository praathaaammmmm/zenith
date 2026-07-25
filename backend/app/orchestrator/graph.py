import logging
from langgraph.graph import StateGraph, START, END
from app.schemas.state import AgentState
from app.agents.research_agent import ResearchAgent
from app.agents.competitor_agent import CompetitorAgent
from app.agents.icp_agent import ICPAgent
from app.agents.persona_agent import PersonaAgent
from app.agents.interview_agent import InterviewAgent
from app.agents.insight_agent import InsightAgent
from app.agents.mvp_planner_agent import MVPPlannerAgent
from app.agents.report_agent import FounderReportAgent

logger = logging.getLogger(__name__)

def research_node(state: AgentState) -> AgentState:
    return ResearchAgent().run(state)

def competitor_node(state: AgentState) -> AgentState:
    return CompetitorAgent().run(state)

def icp_node(state: AgentState) -> AgentState:
    return ICPAgent().run(state)

def persona_node(state: AgentState) -> AgentState:
    return PersonaAgent().run(state)

def interview_node(state: AgentState) -> AgentState:
    return InterviewAgent().run(state)

def insight_node(state: AgentState) -> AgentState:
    return InsightAgent().run(state)

def mvp_planner_node(state: AgentState) -> AgentState:
    return MVPPlannerAgent().run(state)

def report_node(state: AgentState) -> AgentState:
    return FounderReportAgent().run(state)

def build_founder_team_graph():
    builder = StateGraph(AgentState)

    builder.add_node("research", research_node)
    builder.add_node("competitors", competitor_node)
    builder.add_node("icp", icp_node)
    builder.add_node("personas", persona_node)
    builder.add_node("interviews", interview_node)
    builder.add_node("insights", insight_node)
    builder.add_node("mvp_planner", mvp_planner_node)
    builder.add_node("report", report_node)

    builder.add_edge(START, "research")
    builder.add_edge("research", "competitors")
    builder.add_edge("competitors", "icp")
    builder.add_edge("icp", "personas")
    builder.add_edge("personas", "interviews")
    builder.add_edge("interviews", "insights")
    builder.add_edge("insights", "mvp_planner")
    builder.add_edge("mvp_planner", "report")
    builder.add_edge("report", END)

    return builder.compile()

founder_team_graph = build_founder_team_graph()
