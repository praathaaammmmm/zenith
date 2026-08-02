"use client";

import { Target, Heart, AlertCircle } from "lucide-react";
import { ICPOutput } from "@/lib/types";

interface ICPCardProps {
  data: ICPOutput;
}

export function ICPCard({ data }: ICPCardProps) {
  const { primary_icp, secondary_icp, target_market_summary } = data;

  return (
    <div className="paper-card rounded-2xl p-6 border border-black/[0.08] shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#A3B18A]/20 text-[#3B4D28]">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2F2F2F]">Ideal Customer Profile (ICP) Canvas</h3>
            <p className="text-xs text-[#666666]">Defined by ICP Specialist Agent</p>
          </div>
        </div>
        <span className="tag-sage px-3 py-1 rounded-full text-xs font-bold">
          Step 03
        </span>
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-[#F5EFE7] p-4 border border-black/[0.05]">
        <h4 className="text-xs font-bold text-[#3B4D28] uppercase tracking-wider mb-1">Target Market Canvas Overview</h4>
        <p className="text-sm text-[#2F2F2F] leading-relaxed">{target_market_summary}</p>
      </div>

      {/* Primary & Secondary ICP Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Primary ICP */}
        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="tag-sage px-2.5 py-1 rounded-full text-xs font-extrabold">
              PRIMARY ICP
            </span>
            <span className="text-xs text-[#666666] font-medium">{primary_icp.budget}</span>
          </div>

          <h4 className="text-base font-bold text-[#2F2F2F]">{primary_icp.title}</h4>
          <p className="text-xs text-[#666666]"><strong className="text-[#2F2F2F]">Demographics:</strong> {primary_icp.demographics}</p>

          <div className="space-y-3 pt-2 border-t border-black/[0.06]">
            <div>
              <span className="text-[10px] font-bold text-[#3B4D28] uppercase tracking-wider flex items-center gap-1 mb-1">
                <Heart className="h-3 w-3" /> Core Goals
              </span>
              <ul className="space-y-1">
                {primary_icp.goals.map((g, i) => (
                  <li key={i} className="text-xs text-[#2F2F2F] flex items-start gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A3B18A] mt-1.5 flex-shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#6E4935] uppercase tracking-wider flex items-center gap-1 mb-1">
                <AlertCircle className="h-3 w-3" /> Key Frustrations
              </span>
              <ul className="space-y-1">
                {primary_icp.frustrations.map((f, i) => (
                  <li key={i} className="text-xs text-[#2F2F2F] flex items-start gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#DDBEA9] mt-1.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Secondary ICP */}
        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="tag-blue px-2.5 py-1 rounded-full text-xs font-extrabold">
              SECONDARY ICP
            </span>
            <span className="text-xs text-[#666666] font-medium">{secondary_icp.budget}</span>
          </div>

          <h4 className="text-base font-bold text-[#2F2F2F]">{secondary_icp.title}</h4>
          <p className="text-xs text-[#666666]"><strong className="text-[#2F2F2F]">Demographics:</strong> {secondary_icp.demographics}</p>

          <div className="space-y-3 pt-2 border-t border-black/[0.06]">
            <div>
              <span className="text-[10px] font-bold text-[#2B425B] uppercase tracking-wider flex items-center gap-1 mb-1">
                <Heart className="h-3 w-3" /> Core Goals
              </span>
              <ul className="space-y-1">
                {secondary_icp.goals.map((g, i) => (
                  <li key={i} className="text-xs text-[#2F2F2F] flex items-start gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A9BCD0] mt-1.5 flex-shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider flex items-center gap-1 mb-1">
                <AlertCircle className="h-3 w-3" /> Key Frustrations
              </span>
              <ul className="space-y-1">
                {secondary_icp.frustrations.map((f, i) => (
                  <li key={i} className="text-xs text-[#2F2F2F] flex items-start gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#666666] mt-1.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
