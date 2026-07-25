"use client";

import { useState, useEffect } from "react";

export interface ApiKeysState {
  openai_api_key: string;
  anthropic_api_key: string;
  gemini_api_key: string;
  tavily_api_key: string;
  provider: string;
}

const STORAGE_KEY = "zenith_api_keys";

const defaultKeys: ApiKeysState = {
  openai_api_key: "",
  anthropic_api_key: "",
  gemini_api_key: "",
  tavily_api_key: "",
  provider: "mock",
};

export function useApiKey() {
  const [keys, setKeys] = useState<ApiKeysState>(defaultKeys);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setKeys(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading API keys from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveKeys = (newKeys: ApiKeysState) => {
    setKeys(newKeys);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newKeys));
    } catch (e) {
      console.error("Error saving API keys", e);
    }
  };

  return { keys, saveKeys, isLoaded };
}
