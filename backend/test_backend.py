import sys
import asyncio
import json
from fastapi.testclient import TestClient
from app.main import app

def test_backend_rag():
    client = TestClient(app)
    
    # 1. Test Health Endpoint
    print("Testing GET /api/health...")
    health_resp = client.get("/api/health")
    assert health_resp.status_code == 200
    assert health_resp.json()["status"] == "healthy"
    print("[OK] Health check passed:", health_resp.json())

    # 2. Test Knowledge Base Status Endpoint
    print("Testing GET /api/knowledge/status...")
    k_resp = client.get("/api/knowledge/status")
    assert k_resp.status_code == 200
    k_data = k_resp.json()
    print("[OK] RAG Knowledge Base Status:", k_data)
    assert k_data["documents"] > 0
    assert k_data["status"] == "ready"

    # 3. Test Orchestration with RAG context
    print("Testing POST /api/orchestrate...")
    post_resp = client.post(
        "/api/orchestrate",
        json={"idea": "AI tutor for Indian students preparing for competitive exams"}
    )
    assert post_resp.status_code == 200
    data = post_resp.json()
    assert "session_id" in data
    session_id = data["session_id"]
    print("[OK] Orchestration initialized successfully. Session ID:", session_id)

    # 4. Test SSE Streaming Stream
    print(f"Testing GET /api/orchestrate/stream/{session_id}...")
    with client.stream("GET", f"/api/orchestrate/stream/{session_id}") as stream:
        events = []
        for line in stream.iter_lines():
            if line.startswith("data: "):
                payload = line[6:]
                print(f"  [SSE Event] {payload[:120]}...")
                events.append(payload)
                if "[DONE]" in payload:
                    break
        assert len(events) > 5
        print(f"[OK] SSE Stream test passed with RAG Context. Received {len(events)} events!")

    print("\nALL BACKEND RAG VERIFICATION TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_backend_rag()
