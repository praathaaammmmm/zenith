"use client";

import { MessageSquareQuote, CheckCircle, XCircle } from "lucide-react";
import { InterviewOutput } from "@/lib/types";

interface InterviewCardProps {
  data: InterviewOutput;
}

export function InterviewCard({ data }: InterviewCardProps) {
  return (
    <div className="paper-card rounded-2xl p-6 border border-black/[0.08] shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#EAD7C3] text-[#4A3A2A]">
            <MessageSquareQuote className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2F2F2F]">Synthetic Customer Interview Transcripts</h3>
            <p className="text-xs text-[#666666]">Simulated by Customer Interview Specialist</p>
          </div>
        </div>
        <span className="tag-beige px-3 py-1 rounded-full text-xs font-bold">
          Step 05
        </span>
      </div>

      {/* Synthesis Summary */}
      <div className="rounded-xl bg-[#F5EFE7] p-4 border border-black/[0.05]">
        <h4 className="text-xs font-bold text-[#4A3A2A] uppercase tracking-wider mb-1">Interview Synthesis</h4>
        <p className="text-sm text-[#2F2F2F] leading-relaxed">{data.summary}</p>
      </div>

      {/* Interview Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.interviews.map((res, idx) => (
          <div key={idx} className="rounded-xl bg-[#FFFDF9] p-4 border border-black/[0.08] shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-[#2F2F2F]">{res.persona_name}</h4>
                {res.would_buy ? (
                  <span className="tag-sage px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-[#3B4D28]" /> WOULD BUY
                  </span>
                ) : (
                  <span className="tag-clay px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1">
                    <XCircle className="h-3 w-3 text-[#6E4935]" /> NO BUY
                  </span>
                )}
              </div>
              <p className="text-xs text-[#666666] font-medium mb-3">{res.persona_occupation}</p>

              <blockquote className="italic text-xs text-[#2F2F2F] bg-[#F5EFE7]/50 p-3 rounded-lg border border-black/[0.05] mb-3">
                "{res.quote}"
              </blockquote>

              <p className="text-xs text-[#2F2F2F] mb-2">
                <strong className="text-[#6E4935]">Feedback:</strong> {res.why_buy_or_not}
              </p>
            </div>

            <div className="pt-2.5 border-t border-black/[0.06] space-y-1 text-xs">
              <div className="flex justify-between text-[#666666]">
                <span>Willingness to Pay:</span>
                <strong className="text-[#3B4D28] font-bold">{res.willingness_to_pay}</strong>
              </div>
              <div className="text-[11px] text-[#666666]">
                <span>Valued Feature:</span> <strong className="text-[#2B425B]">{res.most_valued_feature}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
