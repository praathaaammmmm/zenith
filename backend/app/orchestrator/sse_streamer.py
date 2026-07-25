import json
import asyncio
import logging
from typing import AsyncGenerator, Dict, Any, Optional
from app.orchestrator.graph import founder_team_graph
from app.schemas.state import AgentState

logger = logging.getLogger(__name__)

SESSION_STORE: Dict[str, AgentState] = {}
SESSION_QUEUES: Dict[str, asyncio.Queue] = {}

AGENTS_SEQUENCE = [
    ("research", "Research Agent"),
    ("competitors", "Competitor Agent"),
    ("icp", "ICP Agent"),
    ("personas", "Persona Agent"),
    ("interviews", "Interview Agent"),
    ("insights", "Insight Agent"),
    ("mvp_planner", "MVP Planner Agent"),
    ("report", "Founder Report Agent"),
]

def initialize_session(session_id: str, startup_idea: str, config: Optional[Dict[str, Any]] = None):
    initial_state: AgentState = {
        "session_id": session_id,
        "startup_idea": startup_idea,
        "config": config or {},
        "retrieved_context": [],
        "knowledge_sources": [],
        "events": [],
        "current_step": "initialized"
    }
    SESSION_STORE[session_id] = initial_state
    SESSION_QUEUES[session_id] = asyncio.Queue()
    return initial_state

async def run_and_stream_workflow(session_id: str):
    state = SESSION_STORE.get(session_id)
    queue = SESSION_QUEUES.get(session_id)
    
    if not state or not queue:
        logger.error(f"Session {session_id} not initialized.")
        return

    try:
        # Emit RAG Retrieval step
        rag_event = {
            "session_id": session_id,
            "agent": "RAG Intelligence Layer",
            "status": "running",
            "message": "Querying startup knowledge base & frameworks..."
        }
        await queue.put(f"data: {json.dumps(rag_event)}\n\n")
        await asyncio.sleep(0.3)

        for node_key, agent_name in AGENTS_SEQUENCE:
            running_event = {
                "session_id": session_id,
                "agent": agent_name,
                "status": "running",
                "message": f"{agent_name} is processing grounded context..."
            }
            await queue.put(f"data: {json.dumps(running_event)}\n\n")
            
            loop = asyncio.get_event_loop()
            state = await loop.run_in_executor(
                None, 
                lambda s=state, nk=node_key: founder_team_graph.nodes[nk].invoke(s)
            )
            SESSION_STORE[session_id] = state
            
            step_output = state.get(node_key)
            output_dict = step_output.model_dump() if hasattr(step_output, "model_dump") else step_output
            
            completed_event = {
                "session_id": session_id,
                "agent": agent_name,
                "status": "completed",
                "output": output_dict,
                "knowledge_sources": state.get("knowledge_sources", [])
            }
            await queue.put(f"data: {json.dumps(completed_event)}\n\n")
            await asyncio.sleep(0.4)

        final_event = {
            "session_id": session_id,
            "agent": "Supervisor",
            "status": "workflow_completed",
            "message": "AI Founder Team evaluation complete.",
            "knowledge_sources": state.get("knowledge_sources", [])
        }
        await queue.put(f"data: {json.dumps(final_event)}\n\n")
        await queue.put("data: [DONE]\n\n")

    except Exception as e:
        logger.exception(f"Error during workflow execution for session {session_id}: {e}")
        error_event = {
            "session_id": session_id,
            "agent": "Supervisor",
            "status": "error",
            "error": str(e)
        }
        await queue.put(f"data: {json.dumps(error_event)}\n\n")
        await queue.put("data: [DONE]\n\n")

async def event_generator(session_id: str) -> AsyncGenerator[str, None]:
    queue = SESSION_QUEUES.get(session_id)
    if not queue:
        yield f"data: {json.dumps({'error': 'Session not found'})}\n\n"
        return

    asyncio.create_task(run_and_stream_workflow(session_id))

    while True:
        try:
            data = await asyncio.wait_for(queue.get(), timeout=30.0)
            yield data
            if "[DONE]" in data:
                break
        except asyncio.TimeoutError:
            yield "data: {\"status\": \"ping\"}\n\n"
