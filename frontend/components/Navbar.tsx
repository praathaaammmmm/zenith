"use client";

import { useEffect, useState } from "react";
import { Sparkles, Database, Key, CheckCircle2 } from "lucide-react";
import { getKnowledgeStatus } from "@/lib/api";
import { useApiKey } from "@/hooks/useApiKey";

interface NavbarProps {
  onOpenSettings: () => void;
}

export function Navbar({ onOpenSettings }: NavbarProps) {
  const { keys } = useApiKey();
  const [ragStatus, setRagStatus] = useState({ documents: 7, chunks: 12, status: "ready" });

  useEffect(() => {
    getKnowledgeStatus().then(data => {
      if (data && data.status) {
        setRagStatus(data);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg shadow-purple-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">ZENITH</span>
              <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/20">
                AI Founder Team
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">Multi-Agent Startup Validation System</p>
          </div>
        </div>

        {/* Status & Key Settings */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* RAG Knowledge Status Badge */}
          <div className="hidden md:flex items-center gap-2 rounded-full bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-medium text-zinc-400">RAG Knowledge:</span>
            <span className="font-semibold text-emerald-400">{ragStatus.documents} Docs ({ragStatus.chunks} Chunks)</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          </div>

          {/* Provider Badge */}
          <div className="flex items-center gap-2 rounded-full bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="capitalize text-zinc-300 font-medium">
              Provider: <strong className="text-purple-400">{keys.provider || "Mock AI"}</strong>
            </span>
          </div>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-850 hover:bg-zinc-800 border border-zinc-700/60 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-all shadow-sm"
          >
            <Key className="h-3.5 w-3.5 text-amber-400" />
            <span>API Keys</span>
          </button>
        </div>

      </div>
    </header>
  );
}
