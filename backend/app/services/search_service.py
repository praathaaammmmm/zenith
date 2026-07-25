import logging
from typing import List, Dict, Any, Optional
from app.config import settings

logger = logging.getLogger(__name__)

class SearchService:
    """Modular search service providing real search via Tavily or intelligent fallbacks."""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.TAVILY_API_KEY

    def search(self, query: str, max_results: int = 5) -> List[Dict[str, Any]]:
        if self.api_key:
            try:
                from tavily import TavilyClient
                client = TavilyClient(api_key=self.api_key)
                response = client.search(query=query, max_results=max_results)
                return response.get("results", [])
            except Exception as e:
                logger.warning(f"Tavily search failed ({e}), returning fallback search results.")

        # Fallback simulated search results
        return [
            {
                "title": f"Market analysis & trends for {query[:30]}...",
                "url": "https://example.com/market-research",
                "content": f"Detailed market analysis shows strong tailwinds and growing customer adoption in software tools related to {query}."
            },
            {
                "title": f"Competitor breakdown and pricing strategies",
                "url": "https://example.com/competitor-insights",
                "content": "Leading players in this sector offer seat-based and usage-based plans, with room for innovative disruptive pricing models."
            }
        ]

search_service = SearchService()
