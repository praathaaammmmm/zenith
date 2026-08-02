"use client";

import { Crosshair, Target, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { CompetitorOutput } from "@/lib/types";

interface CompetitorCardProps {
  data: CompetitorOutput;
}

export function CompetitorCard({ data }: CompetitorCardProps) {
  return (
    <div className="paper-card rounded-2xl p-6 border border-black/[0.08] shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#DDBEA9]/30 text-[#6E4935]">
            <Crosshair className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2F2F2F]">Competitor Landscape & Strategic Gaps</h3>
            <p className="text-xs text-[#666666]">Synthesized by Competitor Intelligence Agent</p>
          </div>
        </div>
        <span className="tag-clay px-3 py-1 rounded-full text-xs font-bold">
          Step 02
        </span>
      </div>

      {/* Strategic Market Gaps */}
      <div className="rounded-xl bg-[#EAD7C3]/25 border border-[#DDBEA9]/50 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-[#6E4935]" />
          <h4 className="text-xs font-bold text-[#4A3A2A] uppercase tracking-wider">Unexploited Strategic Gaps For Zenith Concept</h4>
        </div>
        <ul className="space-y-1.5">
          {data.overall_market_gaps.map((gap, idx) => (
            <li key={idx} className="text-xs text-[#2F2F2F] flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6E4935] mt-1.5 flex-shrink-0" />
              <span>{gap}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Competitor Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.direct_competitors.map((comp, idx) => (
          <div key={idx} className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#2F2F2F]">{comp.name}</h4>
              <span className="tag-blue px-2 py-0.5 rounded text-[10px] font-bold">
                {comp.type}
              </span>
            </div>

            <div className="text-xs text-[#666666] flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-[#3B4D28]" />
              <span>Pricing Model: <strong className="text-[#2F2F2F]">{comp.pricing}</strong></span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#3B4D28] uppercase tracking-wider block mb-1">Key Strengths</span>
                {comp.strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[#2F2F2F]">
                    <CheckCircle className="h-3 w-3 text-[#3B4D28] flex-shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#6E4935] uppercase tracking-wider block mb-1">Key Weaknesses</span>
                {comp.weaknesses.map((w, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[#2F2F2F]">
                    <XCircle className="h-3 w-3 text-[#6E4935] flex-shrink-0" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-black/[0.06] text-xs">
              <span className="text-[10px] font-bold text-[#2B425B] uppercase tracking-wider block">Positioning Gap:</span>
              <p className="text-[#2F2F2F] mt-0.5">{comp.positioning_gap}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
