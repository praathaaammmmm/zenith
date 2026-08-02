"use client";

import { CheckCircle2, ChevronRight, Activity, TrendingUp, ThumbsUp, DollarSign, Target, Award, BookOpen, Layers, Users } from "lucide-react";
import { PersonaOutput, ResearchOutput } from "@/lib/types";

export function LiveActivityFeed({ currentStep }: { currentStep: string | null }) {
  const logs = [
    { time: "10:42", text: "Research Agent scanning market trends", done: true },
    { time: "10:43", text: "Competitor Agent found 18 competitors", done: true },
    { time: "10:44", text: "ICP Agent identified 3 target segments", done: true },
    { time: "10:45", text: `Active: ${currentStep || 'Persona Agent creating user personas'}`, running: true },
    { time: "10:45", text: "Interview Agent preparing simulations", pending: true },
    { time: "10:45", text: "Insight Agent analyzing patterns", pending: true },
    { time: "10:45", text: "MVP Planner drafting roadmap", pending: true },
    { time: "10:45", text: "Report Agent compiling final report", pending: true },
  ];

  return (
    <div className="workspace-panel rounded-2xl p-4 border border-black/[0.08] shadow-xs bg-[#FAF8F5] space-y-3">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#5A6B47]" />
          <h4 className="text-xs font-bold text-[#2C2A29]">Live Activity Feed</h4>
        </div>
        <span className="bg-[#EAEFE3] text-[#5A6B47] px-2 py-0.5 rounded-full text-[10px] font-bold">
          • Live Stream
        </span>
      </div>

      <div className="space-y-2 text-[11px] max-h-56 overflow-y-auto pr-1">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-center justify-between text-[#787470]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#787470]/70 font-mono">{log.time}</span>
              <span className={log.done ? "text-[#2C2A29] font-medium" : log.running ? "text-[#5A6B47] font-bold" : "text-[#787470]/60"}>
                {log.text}
              </span>
            </div>
            {log.done && <CheckCircle2 className="h-3.5 w-3.5 text-[#5A6B47]" />}
            {log.running && <span className="h-2 w-2 rounded-full bg-[#5A6B47] animate-ping" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PersonasPreviewCard({ data, onSelect }: { data: PersonaOutput | null; onSelect?: () => void }) {
  const defaultPersonas = data?.personas || [
    { name: "Ananya Kapoor", occupation: "Managing Partner", background: "Law Firm • Delhi", quote: "I spend 6+ hours weekly on research that could be automated." },
    { name: "Rohan Mehta", occupation: "Senior Associate", background: "Lawyer • Mumbai", quote: "I need faster research so I can focus on high-value work." },
    { name: "Neha Verma", occupation: "Legal Intern", background: "Student • Bangalore", quote: "I struggle with finding relevant cases and citations." },
  ];

  return (
    <div className="workspace-panel rounded-2xl p-4 border border-black/[0.08] shadow-xs bg-[#FAF8F5] space-y-3">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
        <h4 className="text-xs font-bold text-[#2C2A29]">Top Personas</h4>
        <button 
          onClick={onSelect}
          className="text-[11px] font-semibold text-[#5A6B47] hover:underline flex items-center gap-0.5 focus:outline-none"
        >
          <span>View all</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {defaultPersonas.slice(0, 3).map((p, idx) => (
          <div key={idx} className="rounded-xl bg-[#FAF8F5] p-3 border border-black/[0.06] space-y-1.5 hover:border-[#5A6B47]/30 transition-all cursor-pointer" onClick={onSelect}>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#2C2A29] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {p.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-[#2C2A29] truncate">{p.name}</p>
                <span className="inline-block text-[9px] bg-[#EAEFE3] text-[#5A6B47] px-1.5 py-0.2 rounded font-bold">{p.occupation}</span>
              </div>
            </div>
            <p className="text-[11px] text-[#787470] italic leading-tight">"{p.quote || 'Needs faster workflow.'}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InterviewInsightsWidget() {
  return (
    <div className="workspace-panel rounded-2xl p-4 border border-black/[0.08] shadow-xs bg-[#FAF8F5] space-y-3">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
        <h4 className="text-xs font-bold text-[#2C2A29]">Interview Insights</h4>
        <span className="text-[10px] font-bold text-[#5A6B47]">3 Simulated Calls</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] space-y-1">
          <p className="text-[10px] text-[#787470]">Top Pain Point</p>
          <p className="text-sm font-extrabold text-[#7A5744]">78%</p>
          <div className="h-1 w-full bg-[#F4EBE6] rounded-full overflow-hidden">
            <div className="h-full bg-[#7A5744] w-[78%]" />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] space-y-1">
          <p className="text-[10px] text-[#787470]">Willingness Pay</p>
          <p className="text-sm font-extrabold text-[#5A6B47]">65%</p>
          <div className="h-1 w-full bg-[#EAEFE3] rounded-full overflow-hidden">
            <div className="h-full bg-[#5A6B47] w-[65%]" />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] space-y-1">
          <p className="text-[10px] text-[#787470]">Top Request</p>
          <p className="text-sm font-extrabold text-[#2C2A29]">92%</p>
          <div className="h-1 w-full bg-[#EFEBE4] rounded-full overflow-hidden">
            <div className="h-full bg-[#2C2A29] w-[92%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompetitiveLandscapeChart() {
  return (
    <div className="workspace-panel rounded-2xl p-4 border border-black/[0.08] shadow-xs bg-[#FAF8F5] space-y-3">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
        <h4 className="text-xs font-bold text-[#2C2A29]">Competitive Landscape Matrix</h4>
        <span className="text-[10px] text-[#787470]">Features vs Price</span>
      </div>

      <div className="relative h-44 w-full rounded-xl bg-[#F5EFE7]/50 border border-black/[0.06] p-3 flex flex-col justify-between">
        {/* Axes Labels */}
        <div className="absolute top-2 left-2 text-[9px] font-bold text-[#787470]">High Price</div>
        <div className="absolute bottom-2 right-2 text-[9px] font-bold text-[#787470]">High Features</div>

        {/* Quadrant Lines */}
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-black/[0.1]" />
        <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-black/[0.1]" />

        {/* Plotted Competitors */}
        <div className="absolute top-6 left-8 bg-[#2C2A29] text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
          Harvey AI
        </div>
        <div className="absolute top-10 right-12 bg-[#7A5744] text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
          LexisNexis
        </div>
        <div className="absolute bottom-6 left-16 bg-[#787470] text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
          Casetext
        </div>
        <div className="absolute bottom-8 right-16 bg-[#5A6B47] text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md ring-2 ring-white animate-bounce">
          ✦ Zenith (Clear Gap)
        </div>
      </div>
    </div>
  );
}

export function MarketOpportunityCard({ research }: { research: ResearchOutput | null }) {
  return (
    <div className="workspace-panel rounded-2xl p-4 border border-black/[0.08] shadow-xs bg-[#FAF8F5] space-y-4">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
        <h4 className="text-xs font-bold text-[#2C2A29]">Market Opportunity</h4>
        <span className="bg-[#EAEFE3] text-[#5A6B47] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
          High Opportunity
        </span>
      </div>

      <div className="flex items-center justify-around gap-4">
        {/* Gauge */}
        <div className="flex flex-col items-center justify-center h-20 w-20 rounded-full border-4 border-[#5A6B47] bg-[#EAEFE3]/40 text-center">
          <span className="text-lg font-extrabold text-[#2C2A29]">8.7</span>
          <span className="text-[9px] font-bold text-[#787470]">/ 10</span>
        </div>

        {/* Stats List */}
        <div className="space-y-1.5 text-xs flex-1">
          <div className="flex justify-between border-b border-black/[0.04] pb-1">
            <span className="text-[#787470]">Market Size</span>
            <strong className="text-[#2C2A29]">{research?.market_size || "$2.4B"}</strong>
          </div>
          <div className="flex justify-between border-b border-black/[0.04] pb-1">
            <span className="text-[#787470]">Growth Rate</span>
            <strong className="text-[#5A6B47]">18.3% CAGR</strong>
          </div>
          <div className="flex justify-between border-b border-black/[0.04] pb-1">
            <span className="text-[#787470]">Competition</span>
            <strong className="text-[#2C2A29]">Moderate</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#787470]">Timing</span>
            <strong className="text-[#5A6B47]">Excellent</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FounderRecommendationBanner() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#5A6B47] via-[#495738] to-[#3B4D28] text-white p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
            <ThumbsUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EAEFE3]">Founder Recommendation</span>
            <h3 className="text-2xl font-black tracking-tight">BUILD THIS CONCEPT</h3>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/20">
          <span className="text-xs text-[#EAEFE3]">Confidence Score</span>
          <span className="text-xl font-black text-white">94%</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/15">
        <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">High demand</span>
        <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">Willingness to pay</span>
        <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">Clear gap</span>
        <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">Good timing</span>
      </div>
    </div>
  );
}

export function KnowledgeBaseTab() {
  return (
    <div className="workspace-panel rounded-2xl p-6 border border-black/[0.08] shadow-sm bg-[#FAF8F5] space-y-6">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#EAEFE3] text-[#5A6B47]">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2C2A29]">Indexed Strategy Knowledge Base</h3>
            <p className="text-xs text-[#787470]">7 Master Documents • 12 Embedded Vector Chunks</p>
          </div>
        </div>
        <span className="bg-[#EAEFE3] text-[#5A6B47] px-3 py-1 rounded-full text-xs font-bold">
          Vector Index Active
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { title: "Market Research Methodology & TAM Playbook", category: "market_reports", chunks: 2 },
          { title: "SaaS Competitor Intelligence Framework", category: "business_models", chunks: 2 },
          { title: "ICP & Persona Mapping Matrix", category: "startup_frameworks", chunks: 2 },
          { title: "Customer Discovery & Interview Synthesis Guide", category: "founder_guides", chunks: 2 },
          { title: "Lean MVP Scope & Feature Prioritization P0 Matrix", category: "startup_frameworks", chunks: 2 },
          { title: "Founder Validation Synthesis Memo Template", category: "case_studies", chunks: 2 },
        ].map((doc, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#5A6B47] uppercase bg-[#EAEFE3] px-2 py-0.5 rounded">{doc.category}</span>
              <span className="text-[10px] text-[#787470]">{doc.chunks} Vector Chunks</span>
            </div>
            <h4 className="text-xs font-bold text-[#2C2A29]">{doc.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlaybooksTab() {
  return (
    <div className="workspace-panel rounded-2xl p-6 border border-black/[0.08] shadow-sm bg-[#FAF8F5] space-y-6">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#F4EBE6] text-[#7A5744]">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2C2A29]">Startup Validation Playbooks</h3>
            <p className="text-xs text-[#787470]">Step-by-step strategy blueprints for founders</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "0 to 1 Market Sizing Playbook", desc: "Calculate TAM, SAM, and SOM accurately before pitching investors." },
          { title: "Synthetic Interview Engine Blueprint", desc: "Simulate 100+ customer discovery calls using targeted persona prompts." },
          { title: "Lean MVP Scope Pruning Guide", desc: "Filter your product roadmap strictly into P0 Must-haves and P1 Should-haves." },
        ].map((pb, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-[#FAF8F5] border border-black/[0.08] space-y-3">
            <h4 className="text-sm font-bold text-[#2C2A29]">{pb.title}</h4>
            <p className="text-xs text-[#787470]">{pb.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamTab() {
  const agents = [
    { name: "Research Agent", role: "Market Overview & Sizing Specialist" },
    { name: "Competitor Agent", role: "Competitor Matrix & Gap Analyst" },
    { name: "ICP Agent", role: "Ideal Customer Profile Specialist" },
    { name: "Persona Agent", role: "Synthetic User Persona Creator" },
    { name: "Interview Agent", role: "Customer Discovery Simulation Engine" },
    { name: "Insight Agent", role: "Pattern & Pain Point Extraction Lead" },
    { name: "MVP Planner Agent", role: "Lean Product Scope Architect" },
    { name: "Founder Report Agent", role: "Validation Memo Synthesis Lead" },
  ];

  return (
    <div className="workspace-panel rounded-2xl p-6 border border-black/[0.08] shadow-sm bg-[#FAF8F5] space-y-6">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#2C2A29]">Autonomous AI Founder Teammates (8 Specialists)</h3>
          <p className="text-xs text-[#787470]">LangGraph orchestrator graph initialized and ready</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {agents.map((ag, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.08] space-y-2 text-center">
            <div className="h-10 w-10 mx-auto rounded-full bg-[#5A6B47] text-white font-bold flex items-center justify-center text-xs">
              0{idx + 1}
            </div>
            <h4 className="text-xs font-bold text-[#2C2A29]">{ag.name}</h4>
            <p className="text-[10px] text-[#787470]">{ag.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
