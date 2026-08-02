"use client";

import { Lightbulb, Star, Zap } from "lucide-react";
import { InsightOutput } from "@/lib/types";

interface InsightCardProps {
  data: InsightOutput;
}

export function InsightCard({ data }: InsightCardProps) {
  return (
    <div className="paper-card rounded-2xl p-6 border border-black/[0.08] shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#A3B18A]/20 text-[#3B4D28]">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2F2F2F]">Cross-Interview Insights & Patterns Canvas</h3>
            <p className="text-xs text-[#666666]">Synthesized by Customer Insights Specialist</p>
          </div>
        </div>
        <span className="tag-sage px-3 py-1 rounded-full text-xs font-bold">
          Step 06
        </span>
      </div>

      {/* Top Pain Point Themes */}
      <div>
        <h4 className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-3">Top Validated Pain Point Themes</h4>
        <div className="grid md:grid-cols-3 gap-3">
          {data.top_pain_points.map((pt, i) => (
            <div key={i} className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2F2F2F]">{pt.theme}</span>
                <span className="tag-sage px-2 py-0.5 rounded text-[10px] font-bold">
                  {pt.frequency} Mentioned
                </span>
              </div>
              <p className="text-xs text-[#666666]">{pt.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Most Requested Features & Buying Signals */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Most Requested Features */}
        <div className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-[#6E4935]" />
            <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider">Most Requested Features</h4>
          </div>
          <ul className="space-y-1.5 text-xs text-[#2F2F2F]">
            {data.most_requested_features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DDBEA9] mt-1.5 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Buying Signals & Pricing */}
        <div className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-[#3B4D28]" />
              <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider">Validated Buying Signals</h4>
            </div>
            <ul className="space-y-1 text-xs text-[#2F2F2F]">
              {data.buying_signals.map((sig, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3B18A] mt-1.5 flex-shrink-0" />
                  <span>{sig}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-black/[0.06] text-xs">
            <span className="text-[10px] font-bold text-[#2B425B] uppercase tracking-wider block">Pricing Willingness Insight:</span>
            <p className="text-[#2F2F2F] mt-0.5">{data.pricing_insights}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
