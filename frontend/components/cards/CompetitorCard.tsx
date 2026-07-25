"use client";

import { Crosshair, Target, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { CompetitorOutput } from "@/lib/types";

interface CompetitorCardProps {
  data: CompetitorOutput;
}

export function CompetitorCard({ data }: CompetitorCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Crosshair className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Competitor Landscape & Strategic Gaps</h3>
            <p className="text-xs text-zinc-400">Synthesized by Competitor Agent</p>
          </div>
        </div>
        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/20">
          Step 02
        </span>
      </div>

      {/* Strategic Market Gaps */}
      <div className="rounded-xl bg-gradient-to-r from-purple-950/40 via-zinc-900/60 to-zinc-900/60 border border-purple-500/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-4 w-4 text-purple-400" />
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Unexploited Market Gaps For Zenith</h4>
        </div>
        <ul className="space-y-2">
          {data.overall_market_gaps.map((gap, idx) => (
            <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></span>
              <span>{gap}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Competitor Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.direct_competitors.map((comp, idx) => (
          <div key={idx} className="rounded-xl bg-zinc-900/70 p-4 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{comp.name}</h4>
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
                {comp.type} Competitor
              </span>
            </div>

            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
              <span>Pricing: <strong className="text-zinc-200">{comp.pricing}</strong></span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">Strengths</span>
                {comp.strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <div>
                <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">Weaknesses</span>
                {comp.weaknesses.map((w, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-zinc-300">
                    <XCircle className="h-3 w-3 text-rose-400 flex-shrink-0" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 text-xs">
              <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block">Positioning Gap:</span>
              <p className="text-zinc-300 mt-0.5">{comp.positioning_gap}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
