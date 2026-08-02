"use client";

import { useState, useEffect } from "react";

export interface ApiKeys {
  openaiKey?: string;
  anthropicKey?: string;
  geminiKey?: string;
  tavilyKey?: string;
  provider: "openai" | "anthropic" | "gemini" | "mock";
}

const STORAGE_KEY = "zenith_api_keys";

const DEFAULT_KEYS: ApiKeys = {
  openaiKey: "",
  anthropicKey: "",
  geminiKey: "",
  tavilyKey: "",
  provider: "mock",
};

export function useApiKey() {
  const [keys, setKeys] = useState<ApiKeys>(DEFAULT_KEYS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setKeys(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load API keys", e);
    }
  }, []);

  const saveKeys = (newKeys: ApiKeys) => {
    setKeys(newKeys);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newKeys));
    } catch (e) {
      console.error("Failed to save API keys", e);
    }
  };

  return { keys, saveKeys };
}
