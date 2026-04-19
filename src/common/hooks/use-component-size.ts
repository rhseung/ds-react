import { createContext, useContext } from 'react';

export type ComponentSize = 'sm' | 'md' | 'lg';

export const SizeContext = createContext<ComponentSize>('md');

export function useComponentSize(localSize?: ComponentSize): ComponentSize {
  const ctx = useContext(SizeContext);
  return localSize ?? ctx;
}
