"use client";

import { useState } from "react";
import { Bell, Download, Sparkles, Key, Check, X, ShieldCheck } from "lucide-react";

interface TopHeaderProps {
  onOpenSettings: () => void;
  onExportReport: () => void;
}

export function TopHeader({ onOpenSettings, onExportReport }: TopHeaderProps) {
  const [exported, setExported] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleExport = () => {
    onExportReport();
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] bg-[#F7F3ED]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
      <div>
        <h2 className="text-base font-extrabold text-[#2C2A29]">Welcome back, Pratham 👋</h2>
        <p className="text-[11px] text-[#787470]">Your AI Founder Team is ready to validate your next startup concept.</p>
      </div>

      <div className="flex items-center gap-3 relative">
        {/* Upgrade Button */}
        <button
          onClick={() => setShowUpgradeModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAEFE3] text-[#5A6B47] border border-[#5A6B47]/20 text-xs font-bold shadow-2xs hover:bg-[#5A6B47] hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Upgrade to Pro</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-full bg-[#FAF8F5] border border-black/[0.08] text-[#787470] hover:text-[#2C2A29] transition-all cursor-pointer"
          title="View Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#7A5744] animate-pulse"></span>
        </button>

        {/* Export Report */}
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#5A6B47] text-white text-xs font-bold shadow-xs hover:bg-[#495738] transition-all active:scale-95 cursor-pointer"
        >
          {exported ? (
            <>
              <Check className="h-3.5 w-3.5 text-white" />
              <span>Report Exported!</span>
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              <span>Export Report</span>
            </>
          )}
        </button>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="absolute right-32 top-12 z-50 w-80 rounded-2xl bg-[#FAF8F5] border border-black/[0.1] shadow-2xl p-4 space-y-3 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
              <span className="text-xs font-bold text-[#2C2A29]">Activity Notifications</span>
              <button onClick={() => setShowNotifications(false)} className="text-[10px] text-[#787470] hover:text-[#2C2A29]">Close</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#EAEFE3] border border-[#5A6B47]/20">
                <p className="font-bold text-[#5A6B47]">RAG Vector Index Ready</p>
                <p className="text-[10px] text-[#787470]">7 Founder strategy documents ready for retrieval.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4EBE6] border border-[#7A5744]/20">
                <p className="font-bold text-[#7A5744]">AI Founder Team Active</p>
                <p className="text-[10px] text-[#787470]">8 specialized agents standing by for evaluation.</p>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-[#FAF8F5] p-6 border border-black/[0.1] shadow-2xl space-y-4 relative">
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <div className="flex items-center gap-2 text-[#5A6B47]">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="text-base font-extrabold text-[#2C2A29]">Upgrade to Zenith Pro</h3>
                </div>
                <button onClick={() => setShowUpgradeModal(false)} className="text-[#787470] hover:text-[#2C2A29]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-[#787470] leading-relaxed">
                Unlock unlimited AI Founder Team orchestrations, live web grounding via Tavily API, custom persona synthesis, and PDF strategy export.
              </p>
              <div className="p-3 rounded-xl bg-[#EAEFE3] border border-[#5A6B47]/20 text-xs font-bold text-[#5A6B47]">
                Pro Plan — $49 / month
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowUpgradeModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-[#787470]">Cancel</button>
                <button onClick={() => setShowUpgradeModal(false)} className="px-4 py-2 rounded-xl bg-[#5A6B47] text-white text-xs font-bold shadow-sm">Upgrade Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
