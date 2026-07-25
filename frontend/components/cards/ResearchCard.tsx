"use client";

import { TrendingUp, AlertTriangle, Lightbulb, PieChart, ShieldAlert } from "lucide-react";
import { ResearchOutput } from "@/lib/types";

interface ResearchCardProps {
  data: ResearchOutput;
}

export function ResearchCard({ data }: ResearchCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <PieChart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Market Research & Sizing</h3>
            <p className="text-xs text-zinc-400">Synthesized by Research Agent</p>
          </div>
        </div>
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
          Step 01
        </span>
      </div>

      {/* Market Overview */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Market Overview</h4>
        <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/60">
          {data.market_overview}
        </p>
      </div>

      {/* Market Size Gauge */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-zinc-900/60 border border-indigo-500/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Market Size Estimation (TAM / SAM / SOM)</h4>
        </div>
        <p className="text-xs text-zinc-300 leading-normal">{data.market_size}</p>
      </div>

      {/* Trends & Opportunities Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Industry Trends */}
        <div className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Key Industry Trends</h4>
          </div>
          <ul className="space-y-2">
            {data.industry_trends.map((trend, i) => (
              <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
                <span>{trend}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">High-Potential Opportunities</h4>
          </div>
          <ul className="space-y-2">
            {data.opportunities.map((opp, i) => (
              <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></span>
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Market Risks */}
      <div className="rounded-xl bg-rose-950/20 border border-rose-900/40 p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="h-4 w-4 text-rose-400" />
          <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Market & Regulatory Risks</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {data.risks.map((risk, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-rose-200 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/30">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>{risk}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
