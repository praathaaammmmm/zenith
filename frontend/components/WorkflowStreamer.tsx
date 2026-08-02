"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Compass } from "lucide-react";
import { AgentStepStatus, KnowledgeSource } from "@/lib/types";

interface WorkflowStreamerProps {
  steps: AgentStepStatus[];
  currentAgent: string | null;
  progressPercent: number;
  knowledgeSources: KnowledgeSource[];
  isProcessing: boolean;
}

const STEP_SUBTITLES: Record<string, string> = {
  research: "Market scanning",
  competitors: "Analyzing 18 players",
  icp: "Identifying segments",
  personas: "Synthesizing personas",
  interviews: "Running simulations",
  insights: "Extracting signals",
  mvp: "Crafting roadmap",
  report: "Compiling strategy",
};

export function WorkflowStreamer({
  steps,
  currentAgent,
  progressPercent,
  knowledgeSources,
  isProcessing,
}: WorkflowStreamerProps) {
  return (
    <div className="workspace-panel rounded-3xl p-6 mb-8 shadow-sm bg-[#FAF8F5]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#EAEFE3] text-[#5A6B47]">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#2C2A29]">Autonomous Strategy Execution Journey</h3>
            <p className="text-xs text-[#787470]">
              {isProcessing
                ? `Active Teammate: ${currentAgent || "Analyzing market context..."}`
                : "Your AI Founder Team is working..."}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full sm:w-64">
          <span className="text-xs font-semibold text-[#787470]">Overall Progress</span>
          <div className="flex-1 h-2 bg-[#EFEBE4] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#5A6B47]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-bold text-[#5A6B47] w-8 text-right">{progressPercent}%</span>
        </div>
      </div>

      {/* Connected Nodes Stepper Grid (Matching Image Journey) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {steps.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isRunning = step.status === "running";

          return (
            <div
              key={step.id}
              className={`rounded-2xl p-3.5 border transition-all ${
                isRunning
                  ? "bg-[#FAF8F5] border-[#5A6B47] shadow-md ring-2 ring-[#5A6B47]/20"
                  : isCompleted
                  ? "bg-[#EAEFE3]/50 border-[#5A6B47]/30"
                  : "bg-[#FAF8F5] border-black/[0.06] opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-extrabold text-[#787470]">0{idx + 1}</span>
                {isCompleted && <CheckCircle2 className="h-4 w-4 text-[#5A6B47]" />}
                {isRunning && <Loader2 className="h-4 w-4 text-[#5A6B47] animate-spin" />}
                {!isCompleted && !isRunning && <span className="h-2 w-2 rounded-full bg-[#C8C2B8]" />}
              </div>
              <h4 className={`text-xs font-bold ${isRunning ? "text-[#5A6B47]" : "text-[#2C2A29]"}`}>
                {step.label}
              </h4>
              <p className="text-[10px] text-[#787470] mt-0.5 truncate">
                {STEP_SUBTITLES[step.id] || step.name}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
