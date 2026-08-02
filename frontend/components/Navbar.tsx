"use client";

import { useEffect, useState } from "react";
import { Compass, Key, Bell, User, Sparkles, BookOpen, Layers, Users } from "lucide-react";
import { getKnowledgeStatus } from "@/lib/api";
import { useApiKey } from "@/hooks/useApiKey";

interface NavbarProps {
  onOpenSettings: () => void;
  onSelectTab: (tab: string) => void;
  activeTab: string;
}

export function Navbar({ onOpenSettings, onSelectTab, activeTab }: NavbarProps) {
  const { keys } = useApiKey();
  const [ragStatus, setRagStatus] = useState({ documents: 7, chunks: 12, status: "ready" });
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);

  useEffect(() => {
    getKnowledgeStatus().then((data) => {
      if (data && data.status) {
        setRagStatus(data);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-[#F7F3ED]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Brand Identity */}
        <button 
          onClick={() => onSelectTab("workspace")}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5A6B47] text-[#FAF8F5] shadow-sm group-hover:bg-[#495738] transition-colors">
            <Compass className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-[#2C2A29]">ZENITH</span>
            <span className="rounded-full bg-[#EAEFE3] px-2.5 py-0.5 text-[10px] font-bold text-[#5A6B47] border border-[#5A6B47]/20">
              Founder Workspace
            </span>
          </div>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#787470]">
          <button
            onClick={() => onSelectTab("workspace")}
            className={`flex items-center gap-1.5 transition-colors focus:outline-none ${
              activeTab === "workspace" ? "text-[#2C2A29] font-bold" : "hover:text-[#2C2A29]"
            }`}
          >
            <span>Workspace</span>
            <span className="text-[9px] font-normal text-[#5A6B47] bg-[#EAEFE3] px-1.5 py-0.5 rounded">2.0</span>
          </button>

          <button
            onClick={() => onSelectTab("knowledge")}
            className={`transition-colors focus:outline-none ${
              activeTab === "knowledge" ? "text-[#2C2A29] font-bold" : "hover:text-[#2C2A29]"
            }`}
          >
            Knowledge Base ({ragStatus.documents})
          </button>

          <button
            onClick={() => onSelectTab("playbooks")}
            className={`transition-colors focus:outline-none ${
              activeTab === "playbooks" ? "text-[#2C2A29] font-bold" : "hover:text-[#2C2A29]"
            }`}
          >
            Playbooks
          </button>

          <button
            onClick={() => onSelectTab("team")}
            className={`transition-colors focus:outline-none ${
              activeTab === "team" ? "text-[#2C2A29] font-bold" : "hover:text-[#2C2A29]"
            }`}
          >
            Team (8 Agents)
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* API Keys button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#EFEBE4] border border-black/[0.08] px-3.5 py-1.5 text-xs font-semibold text-[#2C2A29] transition-all shadow-sm active:scale-95"
          >
            <Key className="h-3.5 w-3.5 text-[#787470]" />
            <span>API Keys</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setShowNotificationAlert(!showNotificationAlert)}
            className="relative p-2 rounded-full bg-[#FAF8F5] border border-black/[0.08] text-[#787470] hover:text-[#2C2A29] transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#5A6B47] animate-pulse"></span>
          </button>

          {/* User Profile avatar badge */}
          <button
            onClick={() => onSelectTab("team")}
            className="flex items-center gap-2 pl-2 border-l border-black/[0.08] text-left focus:outline-none"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C2A29] text-[#FAF8F5] text-xs font-bold">
              P
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold text-[#2C2A29] leading-none">Pratham Singh</p>
              <p className="text-[10px] text-[#787470]">Founder</p>
            </div>
          </button>
        </div>

      </div>

      {/* Notification Toast Alert dropdown */}
      {showNotificationAlert && (
        <div className="absolute right-6 top-16 z-50 w-72 rounded-2xl bg-[#FAF8F5] border border-black/[0.1] shadow-xl p-4 space-y-2 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
            <span className="text-xs font-bold text-[#2C2A29]">Workspace Notifications</span>
            <button onClick={() => setShowNotificationAlert(false)} className="text-[10px] text-[#787470] hover:text-[#2C2A29]">Close</button>
          </div>
          <div className="text-xs text-[#2C2A29] space-y-1.5">
            <div className="p-2 rounded-xl bg-[#EAEFE3]/60 border border-[#5A6B47]/20">
              <p className="font-bold text-[#5A6B47]">RAG Vector Store Ready</p>
              <p className="text-[10px] text-[#787470]">7 Founder documents and 12 chunks indexed.</p>
            </div>
            <div className="p-2 rounded-xl bg-[#F5EFE7]">
              <p className="font-bold text-[#2C2A29]">AI Founder Team Standby</p>
              <p className="text-[10px] text-[#787470]">8 specialized agents ready to evaluate concept.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
