"use client";

import { Award, FileText, CheckCircle2 } from "lucide-react";
import { FounderReportOutput } from "@/lib/types";

interface ReportCardProps {
  data: FounderReportOutput;
}

export function ReportCard({ data }: ReportCardProps) {
  return (
    <div className="paper-card rounded-2xl p-6 md:p-8 border border-black/[0.1] shadow-xl space-y-8 bg-gradient-to-b from-[#FFFDF9] via-[#F5EFE7]/40 to-[#FFFDF9]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.08] pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#2F2F2F] text-[#FFFDF9] shadow-md">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-[#2F2F2F]">Final Founder Synthesis Memo</h3>
              <span className="tag-sage px-2.5 py-0.5 text-xs font-bold rounded-full">
                COMPLETE
              </span>
            </div>
            <p className="text-xs text-[#666666]">Synthesized by Lead Founder Report Specialist</p>
          </div>
        </div>
        <span className="tag-beige px-4 py-1.5 text-xs font-bold rounded-full">
          Step 08 — Core Strategy Deliverable
        </span>
      </div>

      {/* Executive Summary Callout */}
      <div className="rounded-2xl bg-[#F5EFE7] border border-black/[0.06] p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#3B4D28]" />
          <h4 className="text-sm font-bold text-[#2F2F2F] uppercase tracking-wider">Executive Summary</h4>
        </div>
        <p className="text-sm text-[#2F2F2F] leading-relaxed font-normal">{data.executive_summary}</p>
      </div>

      {/* Grid of Key Takeaways */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-3">
          <h4 className="text-xs font-bold text-[#2B425B] uppercase tracking-wider">Market Analysis</h4>
          <p className="text-xs text-[#2F2F2F] leading-relaxed">{data.market_analysis}</p>
        </div>

        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-3">
          <h4 className="text-xs font-bold text-[#6E4935] uppercase tracking-wider">Competitor Landscape</h4>
          <p className="text-xs text-[#2F2F2F] leading-relaxed">{data.competitor_landscape}</p>
        </div>

        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-3">
          <h4 className="text-xs font-bold text-[#3B4D28] uppercase tracking-wider">Target ICP & Persona Summary</h4>
          <p className="text-xs text-[#2F2F2F] leading-relaxed">{data.icp_summary}</p>
          <p className="text-xs text-[#666666] italic pt-2 border-t border-black/[0.06]">{data.persona_highlights}</p>
        </div>

        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-3">
          <h4 className="text-xs font-bold text-[#4A3A2A] uppercase tracking-wider">Interview & Key Insights</h4>
          <p className="text-xs text-[#2F2F2F] leading-relaxed">{data.interview_highlights}</p>
          <p className="text-xs text-[#2F2F2F] pt-2 border-t border-black/[0.06]">{data.key_insights}</p>
        </div>
      </div>

      {/* Pricing & MVP Launch Strategy */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-2">
          <h4 className="text-xs font-bold text-[#3B4D28] uppercase tracking-wider">Recommended Pricing Strategy</h4>
          <p className="text-xs text-[#2F2F2F] leading-relaxed">{data.pricing_suggestions}</p>
        </div>

        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-2">
          <h4 className="text-xs font-bold text-[#2B425B] uppercase tracking-wider">MVP Launch Roadmap Strategy</h4>
          <p className="text-xs text-[#2F2F2F] leading-relaxed">{data.mvp_roadmap}</p>
        </div>
      </div>

      {/* Go-To-Market & Action Plan */}
      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-black/[0.08]">
        <div className="rounded-xl bg-[#FFFDF9] p-5 border border-black/[0.08] shadow-sm space-y-3">
          <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider">Go-To-Market Channels</h4>
          <ul className="space-y-2">
            {data.gtm_suggestions.map((gtm, i) => (
              <li key={i} className="text-xs text-[#2F2F2F] flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#3B4D28] mt-0.5 flex-shrink-0" />
                <span>{gtm}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-[#F5EFE7] border border-black/[0.06] p-5 space-y-3">
          <h4 className="text-xs font-bold text-[#4A3A2A] uppercase tracking-wider">Recommended Next Action Items</h4>
          <ul className="space-y-2">
            {data.next_steps.map((step, i) => (
              <li key={i} className="text-xs text-[#2F2F2F] flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-[#2F2F2F] text-[#FFFDF9] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
