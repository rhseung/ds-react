import { type ReactNode } from 'react';

import { isFunction } from 'es-toolkit';
import { castArray } from 'es-toolkit/compat';

export type RenderProp<S, T> = T | ((state: S) => T);

export function resolveRenderProp<S, T>(value: RenderProp<S, T>, state: S): T {
  return isFunction(value) ? value(state) : value;
}

export function mergeChildren(existing: ReactNode, ...extra: ReactNode[]): ReactNode {
  if (extra.length === 0) return existing;
  const existingFlat = castArray(existing);
  return [...existingFlat, ...extra];
}
