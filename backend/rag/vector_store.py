import logging
from typing import List, Dict, Any, Optional
from rag.embeddings import get_embedding_provider, BaseEmbeddingProvider

logger = logging.getLogger(__name__)

class VectorStore:
    """ChromaDB vector store with cosine similarity retrieval and fallback."""

    def __init__(self, collection_name: str = "zenith_startup_knowledge"):
        self.collection_name = collection_name
        self.embedding_provider: BaseEmbeddingProvider = get_embedding_provider()
        self.chunks: List[Dict[str, Any]] = []
        self.chroma_client = None
        self.collection = None
        self._init_chroma()

    def _init_chroma(self):
        try:
            import chromadb
            self.chroma_client = chromadb.Client()
            self.collection = self.chroma_client.get_or_create_collection(
                name=self.collection_name,
                metadata={"hnsw:space": "cosine"}
            )
            logger.info(f"Initialized ChromaDB collection '{self.collection_name}'.")
        except Exception as e:
            logger.warning(f"ChromaDB client init failed ({e}). Using in-memory vector store fallback.")

    def add_documents(self, chunks: List[Dict[str, Any]]):
        if not chunks:
            return

        self.chunks.extend(chunks)
        contents = [c["content"] for c in chunks]
        metadatas = [c["metadata"] for c in chunks]
        ids = [c["chunk_id"] for c in chunks]

        if self.collection:
            try:
                embeddings = self.embedding_provider.embed_documents(contents)
                self.collection.add(
                    documents=contents,
                    embeddings=embeddings,
                    metadatas=metadatas,
                    ids=ids
                )
                logger.info(f"Added {len(chunks)} text chunks to ChromaDB collection.")
                return
            except Exception as e:
                logger.error(f"Error adding documents to ChromaDB ({e}).")

        logger.info(f"Stored {len(chunks)} chunks in fallback in-memory store.")

    def search_similar(
        self,
        query: str,
        top_k: int = 3,
        category_filter: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        if not self.chunks and (not self.collection or self.collection.count() == 0):
            return []

        if self.collection and self.collection.count() > 0:
            try:
                query_emb = self.embedding_provider.embed_query(query)
                where_clause = {"category": category_filter} if category_filter else None
                results = self.collection.query(
                    query_embeddings=[query_emb],
                    n_results=min(top_k, self.collection.count()),
                    where=where_clause
                )
                
                documents = results.get("documents", [[]])[0]
                metadatas = results.get("metadatas", [[]])[0]
                
                output = []
                for doc, meta in zip(documents, metadatas):
                    output.append({
                        "content": doc,
                        "title": meta.get("title", "Startup Knowledge"),
                        "source": meta.get("source", "Knowledge Base"),
                        "category": meta.get("category", "General"),
                        "metadata": meta
                    })
                return output
            except Exception as e:
                logger.warning(f"ChromaDB search failed ({e}), using in-memory search.")

        # Fallback keyword + vector match
        query_words = set(query.lower().split())
        scored = []
        for chunk in self.chunks:
            if category_filter and chunk.get("category") != category_filter:
                continue
            text = chunk.get("content", "").lower()
            score = sum(1 for w in query_words if w in text)
            scored.append((score, chunk))
            
        scored.sort(key=lambda x: x[0], reverse=True)
        return [item[1] for item in scored[:top_k]]

    def count(self) -> int:
        if self.collection:
            try:
                return self.collection.count()
            except Exception:
                pass
        return len(self.chunks)
