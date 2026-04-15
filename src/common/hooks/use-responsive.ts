import { createClientOnlyFn, createIsomorphicFn } from '@tanstack/react-start';

import { isNil, isPlainObject } from 'es-toolkit';
import { create } from 'zustand';

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const BREAKPOINT_ORDER = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
] as const satisfies Breakpoint[];

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

type ResponsiveState = Record<Breakpoint, boolean> & { breakpoint: Breakpoint };

// --- store ---

const getState = createIsomorphicFn()
  .server(
    () =>
      ({
        breakpoint: 'xs',
        ...Object.fromEntries(BREAKPOINT_ORDER.map((bp) => [bp, bp === 'xs'])),
      }) as ResponsiveState,
  )
  .client(() => {
    const matched = (bp: Breakpoint) =>
      window.matchMedia(`(min-width: ${BREAKPOINTS[bp]}px)`).matches;

    return {
      breakpoint: BREAKPOINT_ORDER.findLast(matched) ?? 'xs',
      ...Object.fromEntries(BREAKPOINT_ORDER.map((bp) => [bp, matched(bp)])),
    } as ResponsiveState;
  });

const addListeners = createClientOnlyFn((set: (state: ResponsiveState) => void) => {
  for (const px of Object.values(BREAKPOINTS)) {
    window.matchMedia(`(min-width: ${px}px)`).addEventListener('change', () => set(getState()));
  }
});

export const useResponsive = create<ResponsiveState>((set) => {
  addListeners(set);
  return getState();
});

// --- hooks ---

export function useResponsiveValue<T>(value: ResponsiveValue<T> | undefined): T | undefined {
  const breakpoint = useResponsive((s) => s.breakpoint);

  if (isNil(value)) return undefined;
  if (!isPlainObject(value)) return value;

  const upTo = BREAKPOINT_ORDER.slice(0, BREAKPOINT_ORDER.indexOf(breakpoint) + 1);
  const bp = upTo.findLast((bp) => bp in value);
  return bp ? value[bp] : undefined;
}
