import os
import logging
from typing import List, Dict, Any, Optional
from rag.document_loader import DocumentLoader
from rag.chunking import TextChunker
from rag.vector_store import VectorStore
from rag.retriever import KnowledgeRetriever

logger = logging.getLogger(__name__)

class RAGService:
    """Main RAG Knowledge Intelligence Service."""

    def __init__(self, knowledge_base_dir: Optional[str] = None):
        if not knowledge_base_dir:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            knowledge_base_dir = os.path.join(base_dir, "knowledge_base")

        self.knowledge_base_dir = knowledge_base_dir
        self.loader = DocumentLoader()
        self.chunker = TextChunker()
        self.vector_store = VectorStore()
        self.retriever = KnowledgeRetriever(self.vector_store)
        self.is_initialized = False
        self.document_count = 0
        self.chunk_count = 0

    def initialize_knowledge_base(self):
        """Loads and indexes knowledge base documents."""
        try:
            documents = self.loader.load_directory(self.knowledge_base_dir)
            self.document_count = len(documents)
            chunks = self.chunker.chunk_documents(documents)
            self.chunk_count = len(chunks)

            self.vector_store.add_documents(chunks)
            self.is_initialized = True
            logger.info(f"RAG Knowledge Base initialized with {self.document_count} documents and {self.chunk_count} chunks.")
        except Exception as e:
            logger.error(f"Error initializing RAG knowledge base: {e}")
            self.is_initialized = False

    def retrieve_context_for_agent(self, agent_name: str, startup_idea: str) -> List[Dict[str, Any]]:
        """
        Retrieves domain-specific knowledge tailored to each specialized agent.
        """
        if not self.is_initialized:
            self.initialize_knowledge_base()

        category_map = {
            "Research Agent": "market_reports",
            "Competitor Agent": "business_models",
            "ICP Agent": "startup_frameworks",
            "Persona Agent": "founder_guides",
            "Interview Agent": "startup_frameworks",
            "Insight Agent": "founder_guides",
            "MVP Planner Agent": "startup_frameworks",
            "Founder Report Agent": "case_studies"
        }

        cat = category_map.get(agent_name)
        results = self.retriever.retrieve(query=startup_idea, top_k=3, category=cat)
        
        # If no results in specific category, search across all categories
        if not results:
            results = self.retriever.retrieve(query=startup_idea, top_k=3, category=None)

        return results

    def get_status(self) -> Dict[str, Any]:
        if not self.is_initialized:
            self.initialize_knowledge_base()
        return {
            "documents": self.document_count,
            "chunks": self.chunk_count,
            "status": "ready" if self.is_initialized else "fallback_mode"
        }

rag_service = RAGService()
