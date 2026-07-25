"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Database, BookOpen, Layers } from "lucide-react";
import { AgentStepStatus, KnowledgeSource } from "@/lib/types";

interface WorkflowStreamerProps {
  steps: AgentStepStatus[];
  currentAgent: string | null;
  progressPercent: number;
  knowledgeSources: KnowledgeSource[];
  isProcessing: boolean;
}

export function WorkflowStreamer({
  steps,
  currentAgent,
  progressPercent,
  knowledgeSources,
  isProcessing,
}: WorkflowStreamerProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 mb-10 shadow-2xl border border-zinc-800/80">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Autonomous AI Founder Team Workflow</h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            {isProcessing
              ? `Active Agent: ${currentAgent || "Synthesizing market context..."}`
              : "Execution pipeline status across specialized AI agents."}
          </p>
        </div>

        {/* Overall Progress Bar */}
        <div className="flex items-center gap-3 w-full sm:w-64">
          <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-semibold text-purple-400 w-10 text-right">{progressPercent}%</span>
        </div>
      </div>

      {/* Stepper Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {steps.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isRunning = step.status === "running";
          const isIdle = step.status === "idle";

          return (
            <div
              key={step.id}
              className={`rounded-xl p-3 border transition-all ${
                isRunning
                  ? "bg-purple-950/30 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : isCompleted
                  ? "bg-zinc-900/90 border-emerald-500/30"
                  : "bg-zinc-950/50 border-zinc-850/60 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Step 0{idx + 1}</span>
                {isCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                {isRunning && <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />}
                {isIdle && <span className="h-2 w-2 rounded-full bg-zinc-700"></span>}
              </div>
              <h4 className={`text-xs font-semibold ${isRunning ? "text-purple-300" : isCompleted ? "text-zinc-200" : "text-zinc-500"}`}>
                {step.label}
              </h4>
              <p className="text-[10px] text-zinc-500 mt-1 truncate">{step.name}</p>
            </div>
          );
        })}
      </div>

      {/* RAG Knowledge Sources Used Section */}
      {knowledgeSources.length > 0 && (
        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-amber-400" />
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Knowledge Sources Used by AI Team ({knowledgeSources.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {knowledgeSources.map((src, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300 border border-zinc-800"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                <span className="font-medium">{src.title}</span>
                <span className="text-[10px] text-zinc-500">({src.source})</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
