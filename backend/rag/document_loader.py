import os
import glob
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class DocumentLoader:
    """Loads markdown, txt, and PDF documents from knowledge base directory."""

    def load_directory(self, directory_path: str) -> List[Dict[str, Any]]:
        documents = []
        if not os.path.exists(directory_path):
            logger.warning(f"Knowledge base directory path does not exist: {directory_path}")
            return documents

        for root, dirs, files in os.walk(directory_path):
            for file_name in files:
                full_path = os.path.join(root, file_name)
                rel_path = os.path.relpath(full_path, directory_path)
                category = os.path.dirname(rel_path) or "general"
                ext = os.path.splitext(file_name)[1].lower()

                doc_item = None
                if ext in [".md", ".txt"]:
                    doc_item = self._load_text_file(full_path, file_name, category)
                elif ext == ".pdf":
                    doc_item = self._load_pdf_file(full_path, file_name, category)

                if doc_item and doc_item.get("content"):
                    documents.append(doc_item)

        logger.info(f"Loaded {len(documents)} documents from {directory_path}")
        return documents

    def _load_text_file(self, full_path: str, file_name: str, category: str) -> Dict[str, Any]:
        try:
            with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            title = os.path.splitext(file_name)[0].replace("_", " ").title()
            return {
                "title": title,
                "source": file_name,
                "full_path": full_path,
                "category": category,
                "content": content,
                "metadata": {"source": file_name, "category": category, "type": "markdown"}
            }
        except Exception as e:
            logger.error(f"Error reading text file {full_path}: {e}")
            return None

    def _load_pdf_file(self, full_path: str, file_name: str, category: str) -> Dict[str, Any]:
        try:
            import pymupdf
            doc = pymupdf.open(full_path)
            text_pages = []
            for page in doc:
                text_pages.append(page.get_text())
            content = "\n".join(text_pages)
            title = os.path.splitext(file_name)[0].replace("_", " ").title()
            return {
                "title": title,
                "source": file_name,
                "full_path": full_path,
                "category": category,
                "content": content,
                "metadata": {"source": file_name, "category": category, "type": "pdf"}
            }
        except Exception as e:
            logger.error(f"Error reading PDF file {full_path}: {e}")
            return None
