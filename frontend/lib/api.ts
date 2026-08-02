const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === "healthy";
  } catch (e) {
    return false;
  }
}

export async function getKnowledgeStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/knowledge/status`);
    if (!res.ok) return { documents: 0, chunks: 0, status: "offline" };
    return await res.json();
  } catch (e) {
    return { documents: 0, chunks: 0, status: "offline" };
  }
}

export async function startOrchestration(idea: string, config?: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/api/orchestrate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea, config }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to initialize orchestration." }));
    throw new Error(err.detail || "Server error");
  }

  return await res.json(); // { session_id, status, message }
}

export function getSSEStreamUrl(sessionId: string): string {
  return `${API_BASE_URL}/api/orchestrate/stream/${sessionId}`;
}
