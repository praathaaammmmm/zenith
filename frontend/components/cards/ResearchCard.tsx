"use client";

import { PieChart, TrendingUp, Lightbulb, AlertTriangle } from "lucide-react";
import { ResearchOutput } from "@/lib/types";

interface ResearchCardProps {
  data: ResearchOutput;
}

export function ResearchCard({ data }: ResearchCardProps) {
  return (
    <div className="paper-card rounded-2xl p-6 border border-black/[0.08] shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#A9BCD0]/20 text-[#2B425B]">
            <PieChart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2F2F2F]">Market Research & Sizing Canvas</h3>
            <p className="text-xs text-[#666666]">Synthesized by Research Lead Agent</p>
          </div>
        </div>
        <span className="tag-blue px-3 py-1 rounded-full text-xs font-bold">
          Step 01
        </span>
      </div>

      {/* Market Overview */}
      <div>
        <h4 className="text-xs font-extrabold text-[#666666] uppercase tracking-wider mb-2">Market Overview</h4>
        <p className="text-sm text-[#2F2F2F] leading-relaxed bg-[#F5EFE7]/60 p-4 rounded-xl border border-black/[0.05]">
          {data.market_overview}
        </p>
      </div>

      {/* Market Size TAM SAM SOM */}
      <div className="rounded-xl bg-[#EAD7C3]/30 border border-[#DDBEA9]/60 p-4 space-y-1">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#6E4935]" />
          <h4 className="text-xs font-bold text-[#4A3A2A] uppercase tracking-wider">Market Size Estimation (TAM / SAM / SOM)</h4>
        </div>
        <p className="text-xs text-[#2F2F2F] leading-relaxed">{data.market_size}</p>
      </div>

      {/* Grid of Trends & Opportunities */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Industry Trends */}
        <div className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm">
          <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#3B4D28]" /> Key Industry Trends
          </h4>
          <ul className="space-y-2">
            {data.industry_trends.map((trend, i) => (
              <li key={i} className="text-xs text-[#2F2F2F] flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3B18A] mt-1.5 flex-shrink-0" />
                <span>{trend}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm">
          <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-[#6E4935]" /> Strategic Opportunities
          </h4>
          <ul className="space-y-2">
            {data.opportunities.map((opp, i) => (
              <li key={i} className="text-xs text-[#2F2F2F] flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DDBEA9] mt-1.5 flex-shrink-0" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Market Risks */}
      <div className="rounded-xl bg-[#F5EFE7] border border-black/[0.06] p-4">
        <h4 className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-[#6E4935]" /> Industry & Regulatory Risks
        </h4>
        <div className="grid sm:grid-cols-2 gap-2">
          {data.risks.map((risk, i) => (
            <div key={i} className="text-xs text-[#2F2F2F] bg-[#FFFDF9] p-2.5 rounded-lg border border-black/[0.06] shadow-sm">
              • {risk}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
