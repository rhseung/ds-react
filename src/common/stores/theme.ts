import { useEffect, useState } from 'react';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

interface ThemeStore {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (preference) => set({ preference }),
    }),
    { name: 'ids-theme' },
  ),
);

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export interface UseThemeReturn {
  /** 사용자가 선택한 preference ('light' | 'dark' | 'system') */
  preference: ThemePreference;
  /** OS preference에 관계없이 실제 적용되는 테마 */
  theme: Theme;
  /** OS preference */
  systemTheme: Theme;
  setPreference: (preference: ThemePreference) => void;
}

export function useTheme(): UseThemeReturn {
  const { preference, setPreference } = useThemeStore();
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return {
    preference,
    theme: preference === 'system' ? systemTheme : preference,
    systemTheme,
    setPreference,
  };
}
