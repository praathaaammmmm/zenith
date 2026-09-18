"use client";

import { ArrowRight, Compass, Flag, ShieldAlert, Sparkles, Target } from "lucide-react";
import type { FounderReportOutput, MVPPlanOutput } from "@/lib/types";

interface StrategyBoardProps {
  report: FounderReportOutput | null;
  plan: MVPPlanOutput | null;
  onStartValidation: () => void;
}

const defaultPriorities = [
  ["01", "Choose one narrow founder segment", "Make the first promise specific enough to test in one conversation."],
  ["02", "Validate the painful workflow", "Run ten structured interviews before expanding the product scope."],
  ["03", "Ship the report loop", "Turn research into a shareable recommendation that proves value quickly."],
];

export function StrategyBoard({ report, plan, onStartValidation }: StrategyBoardProps) {
  const priorities = plan?.must_have?.slice(0, 3).map((item, index) => [
    `0${index + 1}`,
    item,
    plan.technical_roadmap?.[index] || "Focus on a small, testable outcome before adding complexity.",
  ]) || defaultPriorities;

  return (
    <section className="space-y-8 pb-8">
      <div className="grid gap-8 border-b border-black/[0.08] pb-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.17em] text-[#5A6B47]"><Compass className="h-4 w-4" /> Strategy board</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.045em] text-[#2C2A29] sm:text-6xl">Make the next move <span className="font-serif font-normal italic text-[#5A6B47]">the right one.</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#787470]">A focused operating view for turning your startup idea into the next best action—without losing momentum in a sea of research.</p>
        </div>
        <div className="border-l-2 border-[#5A6B47] pl-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#787470]">Current strategic thesis</p>
          <p className="mt-2 text-lg font-bold leading-7 text-[#2C2A29]">{report?.executive_summary || "Win a small, urgent use case before expanding into a broad platform."}</p>
        </div>
      </div>

      <div className="grid gap-px overflow-hidden rounded-3xl border border-black/[0.08] bg-black/[0.08] lg:grid-cols-3">
        {priorities.map(([number, title, detail]) => (
          <article key={number} className="bg-[#FAF8F5] p-7">
            <span className="font-mono text-xs font-bold text-[#5A6B47]">{number}</span>
            <h2 className="mt-8 text-xl font-extrabold tracking-[-0.025em] text-[#2C2A29]">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#787470]">{detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <article className="rounded-3xl bg-[#5A6B47] p-8 text-[#FAF8F5]">
          <div className="flex items-center justify-between"><Flag className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.14em] text-[#EAEFE3]">30-day focus</span></div>
          <h2 className="mt-12 max-w-lg text-3xl font-black tracking-[-0.04em]">{report?.next_steps?.[0] || "Talk to the people who feel this problem every week."}</h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-[#EAEFE3]">{report?.next_steps?.[1] || "Use the findings to sharpen your promise, then test one simple prototype with the same audience."}</p>
          <button onClick={onStartValidation} className="mt-8 inline-flex items-center gap-2 border-b border-[#FAF8F5] pb-1 text-sm font-bold hover:text-[#EAEFE3]">Run a new validation <ArrowRight className="h-4 w-4" /></button>
        </article>
        <div className="space-y-4">
          <div className="border-b border-black/[0.08] pb-4"><p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#787470]"><Target className="h-4 w-4 text-[#5A6B47]" /> Success signal</p><p className="mt-2 text-lg font-bold text-[#2C2A29]">{report?.key_insights || "Five target users ask to see or use the solution again."}</p></div>
          <div className="border-b border-black/[0.08] pb-4"><p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#787470]"><ShieldAlert className="h-4 w-4 text-[#7A5744]" /> Watch out for</p><p className="mt-2 text-lg font-bold text-[#2C2A29]">{report?.competitor_landscape || "Building broad features before you have a repeatable user pull."}</p></div>
          <div><p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#787470]"><Sparkles className="h-4 w-4 text-[#5A6B47]" /> Positioning</p><p className="mt-2 text-lg font-bold text-[#2C2A29]">{report?.market_analysis || "The fastest route from an idea to a credible decision."}</p></div>
        </div>
      </div>
    </section>
  );
}
