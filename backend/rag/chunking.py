import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class TextChunker:
    """Intelligent text chunking maintaining document metadata and context overlaps."""

    def __init__(self, chunk_size: int = 750, overlap: int = 100):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_documents(self, documents: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        chunks = []
        for doc in documents:
            content = doc.get("content", "")
            title = doc.get("title", "")
            source = doc.get("source", "")
            category = doc.get("category", "")
            metadata = doc.get("metadata", {})

            paragraphs = content.split("\n\n")
            current_chunk = []
            current_length = 0

            for para in paragraphs:
                para = para.strip()
                if not para:
                    continue

                if current_length + len(para) > self.chunk_size and current_chunk:
                    chunk_text = "\n\n".join(current_chunk)
                    chunks.append({
                        "chunk_id": f"{source}_{len(chunks)}",
                        "title": title,
                        "source": source,
                        "category": category,
                        "content": f"Document: {title}\nSource: {source}\n\n{chunk_text}",
                        "metadata": {**metadata, "title": title, "source": source, "category": category}
                    })
                    # Keep last paragraph for overlap
                    current_chunk = current_chunk[-1:]
                    current_length = sum(len(p) for p in current_chunk)

                current_chunk.append(para)
                current_length += len(para)

            if current_chunk:
                chunk_text = "\n\n".join(current_chunk)
                chunks.append({
                    "chunk_id": f"{source}_{len(chunks)}",
                    "title": title,
                    "source": source,
                    "category": category,
                    "content": f"Document: {title}\nSource: {source}\n\n{chunk_text}",
                    "metadata": {**metadata, "title": title, "source": source, "category": category}
                })

        logger.info(f"Chunked {len(documents)} documents into {len(chunks)} text chunks.")
        return chunks
