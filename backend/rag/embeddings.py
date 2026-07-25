import logging
from typing import List
from app.config import settings

logger = logging.getLogger(__name__)

class BaseEmbeddingProvider:
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        raise NotImplementedError

    def embed_query(self, text: str) -> List[float]:
        raise NotImplementedError

class LocalSentenceTransformerEmbeddings(BaseEmbeddingProvider):
    """Local HuggingFace embedding provider using sentence-transformers."""
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        try:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer(model_name)
            self.dimension = 384
        except Exception as e:
            logger.warning(f"Failed to load sentence-transformers ({e}), using FallbackEmbeddingProvider.")
            self.model = None

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        if self.model:
            embeddings = self.model.encode(texts, convert_to_numpy=True)
            return embeddings.tolist()
        return FallbackEmbeddingProvider().embed_documents(texts)

    def embed_query(self, text: str) -> List[float]:
        if self.model:
            embedding = self.model.encode(text, convert_to_numpy=True)
            return embedding.tolist()
        return FallbackEmbeddingProvider().embed_query(text)

class FallbackEmbeddingProvider(BaseEmbeddingProvider):
    """Fast deterministic hashing vector generator fallback."""
    def __init__(self, dimension: int = 128):
        self.dimension = dimension

    def _hash_text(self, text: str) -> List[float]:
        import hashlib
        vec = [0.0] * self.dimension
        words = text.lower().split()
        for word in words:
            h = int(hashlib.md5(word.encode()).hexdigest(), 16)
            idx = h % self.dimension
            vec[idx] += 1.0
        # Normalize
        norm = sum(x**2 for x in vec) ** 0.5
        if norm > 0:
            vec = [x / norm for x in vec]
        return vec

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return [self._hash_text(t) for t in texts]

    def embed_query(self, text: str) -> List[float]:
        return self._hash_text(text)

def get_embedding_provider() -> BaseEmbeddingProvider:
    """Factory returning the best available embedding provider."""
    try:
        return LocalSentenceTransformerEmbeddings()
    except Exception:
        return FallbackEmbeddingProvider()
