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

/**
 * 현재 브레이크포인트에 맞는 반응형 값을 반환합니다.
 *
 * @param value - 단일 값 또는 브레이크포인트 맵 (`{ sm: ..., lg: ... }`).
 *   모바일 퍼스트 방식으로 동작하며, 현재 브레이크포인트 이하에서 정의된 가장 큰 키의 값을 사용합니다.
 *
 * @example
 * useResponsiveValue('center')           // → 'center' at all sizes
 * useResponsiveValue({ xs: 12, lg: 16 })  // → 12 below lg, 16 at lg+
 */
export function useResponsiveValue<T>(value: ResponsiveValue<T> | undefined): T | undefined {
  const breakpoint = useResponsive((s) => s.breakpoint);

  if (isNil(value)) return undefined;
  if (!isPlainObject(value)) return value;

  const upTo = BREAKPOINT_ORDER.slice(0, BREAKPOINT_ORDER.indexOf(breakpoint) + 1);
  const bp = upTo.findLast((bp) => bp in value);
  return bp ? value[bp] : undefined;
}
