"use client";

import { useState } from "react";
import { 
  Sparkles, 
  LayoutDashboard, 
  Target, 
  BookOpen, 
  Layers, 
  FileText, 
  Users, 
  Settings, 
  Key, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSettings: () => void;
}

export function Sidebar({ activeTab, onSelectTab, onOpenSettings }: SidebarProps) {
  const navItems = [
    { id: "workspace", label: "Workspace", icon: LayoutDashboard },
    { id: "strategy", label: "Strategy Board", icon: Target },
    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
    { id: "playbooks", label: "Playbooks", icon: Layers },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "team", label: "AI Founder Team", icon: Users },
  ];

  return (
    <aside className="w-56 flex-shrink-0 border-r border-black/[0.06] bg-[#FAF8F5] flex flex-col justify-between p-4 min-h-screen sticky top-0 h-screen hidden md:flex z-30">
      <div className="space-y-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5A6B47] text-white shadow-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-[#2C2A29]">ZENITH</span>
            <span className="block text-[9px] font-bold text-[#5A6B47] uppercase tracking-wider">AI Startup OS</span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <p className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-[#787470] mb-2">Main Menu</p>
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#EAEFE3] text-[#5A6B47] shadow-xs"
                    : "text-[#787470] hover:bg-[#EFEBE4] hover:text-[#2C2A29]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-3 w-3 text-[#5A6B47]" />}
              </button>
            );
          })}
        </nav>

        {/* Settings Action */}
        <div className="pt-4 border-t border-black/[0.06] space-y-1">
          <p className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-[#787470] mb-2">Engine Setup</p>
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#787470] hover:bg-[#EFEBE4] hover:text-[#2C2A29] transition-all"
          >
            <Key className="h-4 w-4" />
            <span>API & Model Keys</span>
          </button>
        </div>

      </div>

      {/* User Profile Pinned at Bottom */}
      <div className="pt-4 border-t border-black/[0.06]">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#EFEBE4]/60 border border-black/[0.05]">
          <div className="h-8 w-8 rounded-full bg-[#2C2A29] text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
            P
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-[#2C2A29] truncate">Pratham Singh</p>
            <p className="text-[10px] text-[#787470]">Founder</p>
          </div>
        </div>
      </div>

    </aside>
  );
}
