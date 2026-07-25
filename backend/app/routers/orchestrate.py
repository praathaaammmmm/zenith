import uuid
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.schemas.requests import StartupIdeaRequest, OrchestrationResponse
from app.orchestrator.sse_streamer import initialize_session, event_generator, SESSION_STORE

router = APIRouter(prefix="/api/orchestrate", tags=["Orchestration"])

@router.post("", response_model=OrchestrationResponse)
async def start_orchestration(request: StartupIdeaRequest):
    if not request.idea or len(request.idea.strip()) < 5:
        raise HTTPException(status_code=400, detail="Startup idea must be at least 5 characters long.")
    
    session_id = str(uuid.uuid4())
    config_dict = request.config.model_dump() if request.config else None
    
    initialize_session(session_id=session_id, startup_idea=request.idea, config=config_dict)
    
    return OrchestrationResponse(
        session_id=session_id,
        status="initialized",
        message="AI Founder Team initialized successfully."
    )

@router.get("/stream/{session_id}")
async def stream_orchestration(session_id: str):
    if session_id not in SESSION_STORE:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return StreamingResponse(
        event_generator(session_id),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

@router.get("/session/{session_id}")
async def get_session_state(session_id: str):
    if session_id not in SESSION_STORE:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return SESSION_STORE[session_id]
