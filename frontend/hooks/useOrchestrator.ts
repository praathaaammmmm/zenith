"use client";

import { useState, useCallback } from "react";
import { startOrchestration, getSSEStreamUrl } from "@/lib/api";
import { OrchestratorState, AgentStepStatus, KnowledgeSource } from "@/lib/types";

const INITIAL_STEPS: AgentStepStatus[] = [
  { id: "rag", name: "RAG Intelligence Layer", label: "Querying Knowledge Base", status: "idle" },
  { id: "research", name: "Research Agent", label: "Researching Market", status: "idle" },
  { id: "competitors", name: "Competitor Agent", label: "Finding Competitors", status: "idle" },
  { id: "icp", name: "ICP Agent", label: "Building ICP", status: "idle" },
  { id: "personas", name: "Persona Agent", label: "Creating Personas", status: "idle" },
  { id: "interviews", name: "Interview Agent", label: "Interviewing Customers", status: "idle" },
  { id: "insights", name: "Insight Agent", label: "Extracting Insights", status: "idle" },
  { id: "mvp_planner", name: "MVP Planner Agent", label: "Planning MVP", status: "idle" },
  { id: "report", name: "Founder Report Agent", label: "Building Founder Report", status: "idle" },
];

export function useOrchestrator() {
  const [state, setState] = useState<OrchestratorState>({
    sessionId: null,
    idea: "",
    isProcessing: false,
    currentAgent: null,
    progressPercent: 0,
    steps: INITIAL_STEPS,
    knowledgeSources: [],
    research: null,
    competitors: null,
    icp: null,
    personas: null,
    interviews: null,
    insights: null,
    mvpPlan: null,
    report: null,
    error: null,
  });

  const launchFounderTeam = useCallback(async (idea: string, keysConfig?: Record<string, any>) => {
    setState({
      sessionId: null,
      idea,
      isProcessing: true,
      currentAgent: "RAG Intelligence Layer",
      progressPercent: 5,
      steps: INITIAL_STEPS.map((s, i) => i === 0 ? { ...s, status: "running" } : { ...s, status: "idle" }),
      knowledgeSources: [],
      research: null,
      competitors: null,
      icp: null,
      personas: null,
      interviews: null,
      insights: null,
      mvpPlan: null,
      report: null,
      error: null,
    });

    try {
      const initData = await startOrchestration(idea, keysConfig);
      const sessionId = initData.session_id;

      setState(prev => ({ ...prev, sessionId }));

      const sseUrl = getSSEStreamUrl(sessionId);
      const eventSource = new EventSource(sseUrl);

      eventSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          eventSource.close();
          setState(prev => ({
            ...prev,
            isProcessing: false,
            currentAgent: null,
            progressPercent: 100,
          }));
          return;
        }

        try {
          const payload = JSON.parse(event.data);
          const { agent, status, output, knowledge_sources, error } = payload;

          if (error) {
            eventSource.close();
            setState(prev => ({ ...prev, isProcessing: false, error }));
            return;
          }

          setState(prev => {
            let nextSteps = [...prev.steps];
            let nextSources = [...prev.knowledgeSources];

            if (knowledge_sources && Array.isArray(knowledge_sources)) {
              knowledge_sources.forEach((src: KnowledgeSource) => {
                if (!nextSources.some(s => s.title === src.title)) {
                  nextSources.push(src);
                }
              });
            }

            // Update step statuses
            const stepIndex = nextSteps.findIndex(s => s.name === agent);
            if (stepIndex !== -1) {
              if (status === "running") {
                nextSteps[stepIndex] = { ...nextSteps[stepIndex], status: "running" };
              } else if (status === "completed") {
                nextSteps[stepIndex] = { ...nextSteps[stepIndex], status: "completed" };
              }
            }

            // Compute progress percentage
            const completedCount = nextSteps.filter(s => s.status === "completed").length;
            const progressPercent = Math.min(Math.round((completedCount / nextSteps.length) * 100), 100);

            // Assign incremental agent outputs
            const updatedState: Partial<OrchestratorState> = {
              steps: nextSteps,
              currentAgent: status === "running" ? agent : prev.currentAgent,
              progressPercent,
              knowledgeSources: nextSources,
            };

            if (status === "completed" && output) {
              if (agent === "Research Agent") updatedState.research = output;
              else if (agent === "Competitor Agent") updatedState.competitors = output;
              else if (agent === "ICP Agent") updatedState.icp = output;
              else if (agent === "Persona Agent") updatedState.personas = output;
              else if (agent === "Interview Agent") updatedState.interviews = output;
              else if (agent === "Insight Agent") updatedState.insights = output;
              else if (agent === "MVP Planner Agent") updatedState.mvpPlan = output;
              else if (agent === "Founder Report Agent") updatedState.report = output;
            }

            return { ...prev, ...updatedState };
          });
        } catch (err) {
          console.error("Error parsing SSE event:", err);
        }
      };

      eventSource.onerror = (err) => {
        console.error("SSE stream error:", err);
        eventSource.close();
        setState(prev => ({
          ...prev,
          isProcessing: false,
          error: prev.report ? null : "Connection lost with Zenith backend. Re-try execution."
        }));
      };

    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: err.message || "Failed to start AI Founder Team."
      }));
    }
  }, []);

  const resetOrchestration = useCallback(() => {
    setState({
      sessionId: null,
      idea: "",
      isProcessing: false,
      currentAgent: null,
      progressPercent: 0,
      steps: INITIAL_STEPS,
      knowledgeSources: [],
      research: null,
      competitors: null,
      icp: null,
      personas: null,
      interviews: null,
      insights: null,
      mvpPlan: null,
      report: null,
      error: null,
    });
  }, []);

  return { state, launchFounderTeam, resetOrchestration };
}
