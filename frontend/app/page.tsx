"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopHeader } from "@/components/TopHeader";
import { HeroSection } from "@/components/HeroSection";
import { WorkflowStreamer } from "@/components/WorkflowStreamer";
import { SettingsModal } from "@/components/SettingsModal";
import { CustomCursor } from "@/components/CustomCursor";
import { 
  LiveActivityFeed, 
  PersonasPreviewCard, 
  InterviewInsightsWidget,
  CompetitiveLandscapeChart,
  MarketOpportunityCard, 
  FounderRecommendationBanner,
  KnowledgeBaseTab, 
  PlaybooksTab, 
  TeamTab 
} from "@/components/DashboardWidgets";
import { ResearchCard } from "@/components/cards/ResearchCard";
import { CompetitorCard } from "@/components/cards/CompetitorCard";
import { ICPCard } from "@/components/cards/ICPCard";
import { PersonaCard } from "@/components/cards/PersonaCard";
import { InterviewCard } from "@/components/cards/InterviewCard";
import { InsightCard } from "@/components/cards/InsightCard";
import { MVPPlanCard } from "@/components/cards/MVPPlanCard";
import { ReportCard } from "@/components/cards/ReportCard";
import { startOrchestration, getSSEStreamUrl } from "@/lib/api";
import { useApiKey } from "@/hooks/useApiKey";
import { OrchestratorState, AgentStepStatus } from "@/lib/types";
import { AlertCircle, RotateCcw } from "lucide-react";

const INITIAL_STEPS: AgentStepStatus[] = [
  { id: "research", name: "Market Overview & Sizing", label: "Research", status: "idle" },
  { id: "competitors", name: "Competitor Matrix & Gaps", label: "Competitors", status: "idle" },
  { id: "icp", name: "Ideal Customer Profiles", label: "ICP Profile", status: "idle" },
  { id: "personas", name: "Synthetic User Personas", label: "Personas", status: "idle" },
  { id: "interviews", name: "Customer Interviews", label: "Interviews", status: "idle" },
  { id: "insights", name: "Pain Points & Insights", label: "Insights", status: "idle" },
  { id: "mvp", name: "Lean MVP Scope Roadmap", label: "MVP Plan", status: "idle" },
  { id: "report", name: "Founder Synthesis Memo", label: "Final Report", status: "idle" },
];

const AGENT_ORDER = [
  "research",
  "competitors",
  "icp",
  "personas",
  "interviews",
  "insights",
  "mvp",
  "report",
];

export default function Home() {
  const { keys } = useApiKey();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("workspace");
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

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handleGenerate = async (idea: string) => {
    setActiveTab("workspace");
    setState({
      sessionId: null,
      idea,
      isProcessing: true,
      currentAgent: "Market Research Agent",
      progressPercent: 5,
      steps: INITIAL_STEPS.map((s) => ({ ...s, status: "idle" })),
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
      const config: Record<string, any> = {
        provider: keys.provider,
      };
      if (keys.provider === "openai" && keys.openaiKey) config.openai_api_key = keys.openaiKey;
      if (keys.provider === "gemini" && keys.geminiKey) config.gemini_api_key = keys.geminiKey;
      if (keys.provider === "anthropic" && keys.anthropicKey) config.anthropic_api_key = keys.anthropicKey;
      if (keys.tavilyKey) config.tavily_api_key = keys.tavilyKey;

      const response = await startOrchestration(idea, config);
      const sessionId = response.session_id;

      setState((prev) => ({ ...prev, sessionId }));

      const sseUrl = getSSEStreamUrl(sessionId);
      const es = new EventSource(sseUrl);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          handleSSEMessage(payload);
        } catch (e) {
          console.error("Failed to parse SSE payload", e);
        }
      };

      es.onerror = (err) => {
        console.error("SSE stream error", err);
        es.close();
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          error: prev.report ? null : "Connection lost with Zenith backend strategy engine. Please retry.",
        }));
      };
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: err.message || "Failed to initialize strategy team.",
      }));
    }
  };

  const handleSSEMessage = (payload: any) => {
    const { status, agent, output, knowledge_sources, error } = payload;

    const getStepId = (name: string) => {
      if (!name) return "";
      const lower = name.toLowerCase();
      if (lower.includes("research")) return "research";
      if (lower.includes("competitor")) return "competitors";
      if (lower.includes("icp")) return "icp";
      if (lower.includes("persona")) return "personas";
      if (lower.includes("interview")) return "interviews";
      if (lower.includes("insight")) return "insights";
      if (lower.includes("mvp")) return "mvp";
      if (lower.includes("report") || lower.includes("founder")) return "report";
      return "";
    };

    const stepId = getStepId(agent);

    if (status === "running") {
      setState((prev) => {
        const stepIdx = AGENT_ORDER.indexOf(stepId);
        const progress = stepIdx >= 0 ? Math.min(95, Math.round(((stepIdx + 0.2) / AGENT_ORDER.length) * 100)) : prev.progressPercent;

        const updatedSteps = prev.steps.map((s) => {
          if (s.id === stepId) return { ...s, status: "running" as const };
          return s;
        });

        return {
          ...prev,
          currentAgent: agent,
          progressPercent: progress,
          steps: updatedSteps,
        };
      });
    } else if (status === "completed") {
      setState((prev) => {
        const stepIdx = AGENT_ORDER.indexOf(stepId);
        const progress = stepIdx >= 0 ? Math.min(100, Math.round(((stepIdx + 1) / AGENT_ORDER.length) * 100)) : prev.progressPercent;

        const updatedSteps = prev.steps.map((s) => {
          if (s.id === stepId) return { ...s, status: "completed" as const };
          return s;
        });

        let newKnowledge = prev.knowledgeSources;
        if (knowledge_sources && Array.isArray(knowledge_sources)) {
          const existingTitles = new Set(prev.knowledgeSources.map((k) => k.title));
          const fresh = knowledge_sources.filter((k: any) => !existingTitles.has(k.title));
          newKnowledge = [...prev.knowledgeSources, ...fresh];
        }

        return {
          ...prev,
          progressPercent: progress,
          steps: updatedSteps,
          knowledgeSources: newKnowledge,
          research: stepId === "research" ? output : prev.research,
          competitors: stepId === "competitors" ? output : prev.competitors,
          icp: stepId === "icp" ? output : prev.icp,
          personas: stepId === "personas" ? output : prev.personas,
          interviews: stepId === "interviews" ? output : prev.interviews,
          insights: stepId === "insights" ? output : prev.insights,
          mvpPlan: stepId === "mvp" ? output : prev.mvpPlan,
          report: stepId === "report" ? output : prev.report,
        };
      });
    } else if (status === "workflow_completed") {
      if (eventSourceRef.current) eventSourceRef.current.close();
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        currentAgent: null,
        progressPercent: 100,
      }));
    } else if (status === "error" || error) {
      if (eventSourceRef.current) eventSourceRef.current.close();
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: error || "An error occurred during strategy execution.",
      }));
    }
  };

  const handleExportReport = () => {
    if (!state.report) return;
    const content = JSON.stringify(state.report, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Zenith_Founder_Memo_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2C2A29] flex font-sans selection:bg-[#EAEFE3] selection:text-[#2C2A29]">
      <CustomCursor />
      
      {/* Fixed Left Sidebar (~220px) */}
      <Sidebar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />

      {/* Main Workspace Scroll Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <TopHeader 
          onOpenSettings={() => setIsSettingsOpen(true)} 
          onExportReport={handleExportReport} 
        />

        <main className="flex-1 px-8 py-6 w-full max-w-7xl mx-auto space-y-8">
          
          {/* Error Banner */}
          {state.error && (
            <div className="rounded-2xl bg-[#FAF8F5] border border-[#7A5744]/30 p-4 text-[#7A5744] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-[#7A5744] flex-shrink-0" />
                <p className="text-sm font-semibold">{state.error}</p>
              </div>
              <button
                onClick={() => handleGenerate(state.idea)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5A6B47] text-xs font-bold text-white hover:bg-[#495738] transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Retry Evaluation
              </button>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === "knowledge" && <KnowledgeBaseTab />}
          {activeTab === "playbooks" && <PlaybooksTab />}
          {activeTab === "team" && <TeamTab />}

          {activeTab === "workspace" && (
            <>
              {/* Hero Section */}
              <HeroSection onGenerate={handleGenerate} isProcessing={state.isProcessing} />

              {/* AI Pipeline Strip (8 Steps) */}
              <WorkflowStreamer
                steps={state.steps}
                currentAgent={state.currentAgent}
                progressPercent={state.progressPercent}
                knowledgeSources={state.knowledgeSources}
                isProcessing={state.isProcessing}
              />

              {/* Three-Column Card Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <LiveActivityFeed currentStep={state.currentAgent} />
                </div>
                <div className="md:col-span-4">
                  <PersonasPreviewCard data={state.personas} />
                </div>
                <div className="md:col-span-4">
                  <InterviewInsightsWidget />
                </div>
              </div>

              {/* Bottom Row: Competitive Matrix + Market Opportunity */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-6">
                  <CompetitiveLandscapeChart />
                </div>
                <div className="md:col-span-6">
                  <MarketOpportunityCard research={state.research} />
                </div>
              </div>

              {/* Founder Recommendation Banner */}
              <FounderRecommendationBanner />

              {/* Deliverables Stack */}
              <div className="space-y-8 pt-4">
                {state.report && <ReportCard data={state.report} />}
                {state.mvpPlan && <MVPPlanCard data={state.mvpPlan} />}
                {state.insights && <InsightCard data={state.insights} />}
                {state.interviews && <InterviewCard data={state.interviews} />}
                {state.personas && <PersonaCard data={state.personas} />}
                {state.icp && <ICPCard data={state.icp} />}
                {state.competitors && <CompetitorCard data={state.competitors} />}
                {state.research && <ResearchCard data={state.research} />}
              </div>
            </>
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-black/[0.06] py-6 px-8 bg-[#EFEBE4]/50 text-center text-xs text-[#787470]">
          <p>Zenith — AI Startup OS • RAG Knowledge & Strategy Engine</p>
        </footer>

      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
