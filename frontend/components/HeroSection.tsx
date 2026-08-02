"use client";

import { useState } from "react";
import { ArrowRight, Search, Users, Crosshair, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onGenerate: (idea: string) => void;
  isProcessing: boolean;
}

const SAMPLE_PRESETS = [
  { title: "AI Legal Assistant", idea: "An automated legal research and contract review assistant for law firms and corporate legal counsels." },
  { title: "Study Companion", idea: "A personalized AI exam study companion for students preparing for competitive entrance exams with instant doubt resolution." },
  { title: "Fitness Coach", idea: "An AI-powered micro-workout and nutrition planner tailored for corporate professionals with 15-minute daily schedules." },
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
    <section className="relative overflow-hidden pt-6 pb-10">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Headline & Search Input */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAEFE3] px-3.5 py-1 text-xs font-bold text-[#5A6B47] border border-[#5A6B47]/20">
            <span className="h-2 w-2 rounded-full bg-[#5A6B47] animate-pulse" />
            <span>RAG-Grounded AI Founder Team</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#2C2A29] leading-[1.1]">
            Build products <br />
            <span className="font-serif italic font-normal text-[#5A6B47]">people actually want.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-sm text-[#787470] max-w-xl leading-relaxed font-medium">
            Zenith assembles an AI Founder Team that researches markets, analyzes competitors, interviews realistic customer personas, and recommends what founders should build.
          </p>

          {/* Search-style Input */}
          <form onSubmit={handleSubmit} className="max-w-xl">
            <div className="paper-card p-2 rounded-2xl flex items-center gap-3 border border-black/[0.1] shadow-md bg-[#FAF8F5]">
              <input
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder="Describe your startup idea..."
                disabled={isProcessing}
                className="flex-1 bg-transparent px-4 py-3 text-sm text-[#2C2A29] placeholder-[#787470]/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isProcessing || ideaInput.trim().length < 5}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5A6B47] hover:bg-[#495738] px-5 py-3 text-xs font-bold text-white transition-all disabled:opacity-50 whitespace-nowrap shadow-sm active:scale-95"
              >
                {isProcessing ? (
                  <span>Validating...</span>
                ) : (
                  <>
                    <span>Start Validation</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#787470]">
            <span className="font-semibold">Try a concept:</span>
            {SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setIdeaInput(preset.idea)}
                disabled={isProcessing}
                className="rounded-full bg-[#FAF8F5] hover:bg-[#EFEBE4] border border-black/[0.08] px-3 py-1 text-[11px] font-semibold text-[#2C2A29] transition-all shadow-2xs"
              >
                {preset.title}
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Hero Illustration Cards */}
        <div className="lg:col-span-5 relative min-h-[300px] hidden lg:block">
          {/* Dotted path SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 40 40 Q 200 120 300 240" fill="none" stroke="#5A6B47" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />
          </svg>

          {/* Card 1: Market Research */}
          <div className="floating-badge absolute top-2 right-6 p-3.5 rounded-2xl flex items-center gap-3 w-64 shadow-md bg-[#FAF8F5]">
            <div className="p-2 rounded-xl bg-[#EAEFE3] text-[#5A6B47]">
              <Search className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2C2A29]">Market Research</p>
              <p className="text-[10px] text-[#787470]">Scanning trends & TAM...</p>
            </div>
          </div>

          {/* Card 2: Customer Interviews */}
          <div className="floating-badge absolute top-24 left-4 p-4 rounded-2xl space-y-2 w-72 shadow-lg bg-[#FAF8F5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#F4EBE6] text-[#7A5744]">
                  <Users className="h-4 w-4" />
                </div>
                <p className="text-xs font-bold text-[#2C2A29]">Customer Interviews</p>
              </div>
              <span className="text-[10px] font-bold text-[#5A6B47]">3 in progress</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-black/[0.06]">
              <div className="flex -space-x-1.5">
                <span className="h-6 w-6 rounded-full bg-[#2C2A29] text-white text-[10px] flex items-center justify-center font-bold">AK</span>
                <span className="h-6 w-6 rounded-full bg-[#5A6B47] text-white text-[10px] flex items-center justify-center font-bold">RM</span>
                <span className="h-6 w-6 rounded-full bg-[#7A5744] text-white text-[10px] flex items-center justify-center font-bold">NV</span>
              </div>
              <span className="text-[10px] text-[#787470]">Synthesizing...</span>
            </div>
          </div>

          {/* Card 3: Competitor Sweep */}
          <div className="floating-badge absolute bottom-4 right-4 p-3.5 rounded-2xl flex items-center gap-3 w-64 shadow-md bg-[#FAF8F5]">
            <div className="p-2 rounded-xl bg-[#EFEBE4] text-[#2C2A29]">
              <Crosshair className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2C2A29]">Competitor Sweep</p>
              <p className="text-[10px] text-[#787470]">18 competitors mapped</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
