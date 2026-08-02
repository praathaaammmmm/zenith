"use client";

import { Layers, CheckSquare, Clock, Map, Rocket } from "lucide-react";
import { MVPPlanOutput } from "@/lib/types";

interface MVPPlanCardProps {
  data: MVPPlanOutput;
}

export function MVPPlanCard({ data }: MVPPlanCardProps) {
  return (
    <div className="paper-card rounded-2xl p-6 border border-black/[0.08] shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#A3B18A]/20 text-[#3B4D28]">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2F2F2F]">Lean MVP Product Scope & Execution Roadmap</h3>
            <p className="text-xs text-[#666666]">Planned by Product Strategy Specialist Agent</p>
          </div>
        </div>
        <span className="tag-sage px-3 py-1 rounded-full text-xs font-bold">
          Step 07
        </span>
      </div>

      {/* Feature Priority Columns */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Must-Have */}
        <div className="rounded-xl bg-[#FFFDF9] border border-black/[0.08] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3B4D28] uppercase tracking-wider">Must-Have (V1 Launch)</span>
            <span className="tag-sage px-2 py-0.5 rounded text-[10px] font-bold">P0</span>
          </div>
          <ul className="space-y-2 text-xs text-[#2F2F2F]">
            {data.must_have.map((item, i) => (
              <li key={i} className="flex items-start gap-2 bg-[#F5EFE7]/60 p-2 rounded border border-black/[0.05]">
                <CheckSquare className="h-3.5 w-3.5 text-[#3B4D28] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Should-Have */}
        <div className="rounded-xl bg-[#FFFDF9] border border-black/[0.08] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2B425B] uppercase tracking-wider">Should-Have (V1.1)</span>
            <span className="tag-blue px-2 py-0.5 rounded text-[10px] font-bold">P1</span>
          </div>
          <ul className="space-y-2 text-xs text-[#2F2F2F]">
            {data.should_have.map((item, i) => (
              <li key={i} className="flex items-start gap-2 bg-[#F5EFE7]/60 p-2 rounded border border-black/[0.05]">
                <Clock className="h-3.5 w-3.5 text-[#2B425B] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future Scope */}
        <div className="rounded-xl bg-[#FFFDF9] border border-black/[0.08] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#666666] uppercase tracking-wider">Future Scope (V2)</span>
            <span className="bg-[#F5EFE7] text-[#666666] px-2 py-0.5 rounded text-[10px] font-bold">P2</span>
          </div>
          <ul className="space-y-2 text-xs text-[#666666]">
            {data.future_features.map((item, i) => (
              <li key={i} className="flex items-start gap-2 bg-[#F5EFE7]/40 p-2 rounded border border-black/[0.04]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#666666] mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technical Roadmap & Milestones */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm">
          <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-2 flex items-center gap-2">
            <Map className="h-4 w-4 text-[#3B4D28]" /> Technical Architecture Milestones
          </h4>
          <ul className="space-y-2 text-xs text-[#2F2F2F]">
            {data.technical_roadmap.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-[#F5EFE7] text-[#2F2F2F] font-bold text-[10px] flex items-center justify-center flex-shrink-0 border border-black/[0.08]">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm">
          <h4 className="text-xs font-bold text-[#2F2F2F] uppercase tracking-wider mb-2 flex items-center gap-2">
            <Rocket className="h-4 w-4 text-[#6E4935]" /> Go-To-Market Milestones
          </h4>
          <ul className="space-y-2 text-xs text-[#2F2F2F]">
            {data.suggested_milestones.map((ms, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DDBEA9] mt-1.5 flex-shrink-0" />
                <span>{ms}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
