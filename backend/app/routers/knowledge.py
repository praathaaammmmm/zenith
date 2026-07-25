from fastapi import APIRouter
from rag.rag_service import rag_service

router = APIRouter(prefix="/api/knowledge", tags=["RAG Knowledge Base"])

@router.get("/status")
async def get_knowledge_status():
    status = rag_service.get_status()
    return status
