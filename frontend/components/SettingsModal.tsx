"use client";

import { useState } from "react";
import { Key, Save, X, Info, Check } from "lucide-react";
import { useApiKey, ApiKeys } from "@/hooks/useApiKey";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { keys, saveKeys } = useApiKey();
  const [formKeys, setFormKeys] = useState<ApiKeys>(keys);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveKeys(formKeys);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="paper-card w-full max-w-lg rounded-2xl p-6 border border-black/[0.1] shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EAD7C3] text-[#4A3A2A]">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2F2F2F]">Strategy Engine & LLM Credentials</h3>
              <p className="text-xs text-[#666666]">Configure live provider keys or use built-in Mock strategy mode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F5EFE7] text-[#666666] hover:text-[#2F2F2F] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Info callout */}
        <div className="rounded-xl bg-[#F5EFE7] border border-black/[0.06] p-3.5 flex items-start gap-3">
          <Info className="h-4 w-4 text-[#3B4D28] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#2F2F2F] leading-relaxed">
            By default, Zenith operates in <strong>Mock Strategy Mode</strong> using pre-populated rich startup scenarios. Enter your API key below to use live LLM execution.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Provider Select */}
          <div>
            <label className="block text-xs font-semibold text-[#2F2F2F] uppercase tracking-wider mb-2">
              Strategy Engine Selection
            </label>
            <select
              value={formKeys.provider}
              onChange={(e) => setFormKeys({ ...formKeys, provider: e.target.value as any })}
              className="w-full rounded-xl bg-[#FFFDF9] border border-black/[0.12] px-4 py-2.5 text-sm text-[#2F2F2F] focus:outline-none focus:border-[#2F2F2F]"
            >
              <option value="mock">Mock Strategy Engine (Offline Demo / Free)</option>
              <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
              <option value="gemini">Google Gemini (Gemini 1.5 Flash/Pro)</option>
              <option value="anthropic">Anthropic Claude (Claude 3.5 Sonnet)</option>
            </select>
          </div>

          {/* OpenAI Key */}
          {formKeys.provider === "openai" && (
            <div>
              <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">OpenAI API Key</label>
              <input
                type="password"
                placeholder="sk-..."
                value={formKeys.openaiKey}
                onChange={(e) => setFormKeys({ ...formKeys, openaiKey: e.target.value })}
                className="w-full rounded-xl bg-[#FFFDF9] border border-black/[0.12] px-4 py-2 text-sm text-[#2F2F2F] focus:outline-none focus:border-[#2F2F2F]"
              />
            </div>
          )}

          {/* Gemini Key */}
          {formKeys.provider === "gemini" && (
            <div>
              <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Gemini API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={formKeys.geminiKey}
                onChange={(e) => setFormKeys({ ...formKeys, geminiKey: e.target.value })}
                className="w-full rounded-xl bg-[#FFFDF9] border border-black/[0.12] px-4 py-2 text-sm text-[#2F2F2F] focus:outline-none focus:border-[#2F2F2F]"
              />
            </div>
          )}

          {/* Anthropic Key */}
          {formKeys.provider === "anthropic" && (
            <div>
              <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Anthropic API Key</label>
              <input
                type="password"
                placeholder="sk-ant-..."
                value={formKeys.anthropicKey}
                onChange={(e) => setFormKeys({ ...formKeys, anthropicKey: e.target.value })}
                className="w-full rounded-xl bg-[#FFFDF9] border border-black/[0.12] px-4 py-2 text-sm text-[#2F2F2F] focus:outline-none focus:border-[#2F2F2F]"
              />
            </div>
          )}

          {/* Tavily Web Search Key */}
          <div>
            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">
              Tavily Web Search Key (Optional Live Web Grounding)
            </label>
            <input
              type="password"
              placeholder="tvly-..."
              value={formKeys.tavilyKey}
              onChange={(e) => setFormKeys({ ...formKeys, tavilyKey: e.target.value })}
              className="w-full rounded-xl bg-[#FFFDF9] border border-black/[0.12] px-4 py-2 text-sm text-[#2F2F2F] focus:outline-none focus:border-[#2F2F2F]"
            />
          </div>

          <div className="pt-4 border-t border-black/[0.06] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#666666] hover:text-[#2F2F2F] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2F2F2F] text-xs font-semibold text-[#FFFDF9] shadow-md hover:bg-[#1A1A1A] transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-4 w-4 text-[#A3B18A]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
