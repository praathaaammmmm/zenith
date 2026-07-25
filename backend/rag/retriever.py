import logging
from typing import List, Dict, Any, Optional
from rag.vector_store import VectorStore

logger = logging.getLogger(__name__)

class KnowledgeRetriever:
    """Retriever exposing targeted semantic search across knowledge base categories."""

    def __init__(self, vector_store: VectorStore):
        self.vector_store = vector_store

    def retrieve(self, query: str, top_k: int = 3, category: Optional[str] = None) -> List[Dict[str, Any]]:
        logger.info(f"Retrieving context for query: '{query}' (category={category})")
        results = self.vector_store.search_similar(query=query, top_k=top_k, category_filter=category)
        return results
