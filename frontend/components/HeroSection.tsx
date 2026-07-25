"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Lightbulb, Zap, Rocket, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  onGenerate: (idea: string) => void;
  isProcessing: boolean;
}

const SAMPLE_PRESETS = [
  {
    title: "AI Code Security Reviewer",
    idea: "An AI-powered pull request reviewer for engineering teams that detects vulnerabilities and automatically proposes code fixes.",
    icon: ShieldCheck,
  },
  {
    title: "AI Tutor for Indian Students",
    idea: "Personalized AI tutoring app for students in Tier 2/3 cities preparing for competitive entrance exams like JEE and NEET with instant doubt resolution.",
    icon: Lightbulb,
  },
  {
    title: "Healthcare Workflow Automation",
    idea: "A compliance-ready SaaS platform automating patient intake, insurance pre-authorization, and medical chart summaries for private clinics.",
    icon: Zap,
  },
];

export function HeroSection({ onGenerate, isProcessing }: HeroSectionProps) {
  const [ideaInput, setIdeaInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaInput.trim().length >= 5 && !isProcessing) {
      onGenerate(ideaInput.trim());
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background glow graphics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 border border-purple-500/20 mb-6">
          <Rocket className="h-3.5 w-3.5 text-purple-400" />
          <span>RAG-Grounded Autonomous Multi-Agent Validation</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Validate Your Startup Idea <br className="hidden sm:inline" />
          <span className="glow-text">Before You Write Any Code</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Zenith deploys an autonomous founding team of 8 specialized AI agents that conduct market research, profile competitors, interview synthetic customer personas, and build a lean MVP roadmap.
        </p>

        {/* Main Input Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-10">
          <div className="glass-panel p-2.5 rounded-2xl flex flex-col sm:flex-row gap-3 shadow-2xl">
            <textarea
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              placeholder="Describe your startup idea in detail... (e.g. AI-powered code reviewer that auto-fixes security vulnerabilities)"
              rows={2}
              disabled={isProcessing}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none resize-none"
            />
            <button
              type="submit"
              disabled={isProcessing || ideaInput.trim().length < 5}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  <span>Orchestrating AI Team...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate AI Founder Team</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Prompt Presets */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Or try a preset startup concept:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {SAMPLE_PRESETS.map((preset, idx) => {
              const IconComp = preset.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setIdeaInput(preset.idea)}
                  disabled={isProcessing}
                  className="flex items-center gap-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all hover:border-purple-500/40 hover:text-white"
                >
                  <IconComp className="h-3.5 w-3.5 text-purple-400" />
                  <span>{preset.title}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
