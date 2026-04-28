import { createContext, useContext } from 'react';

import { type StoreState } from '@/common/hooks';
import { IDSError } from '@/common/utils';

import { type SwitchStore } from './use-switch';

interface SwitchContextValue {
  state: StoreState<SwitchStore>;
}

export const SwitchContext = createContext<SwitchContextValue | null>(null);

export function useSwitchContext() {
  const ctx = useContext(SwitchContext);
  if (!ctx)
    IDSError.throw('context/missing', { component: 'Switch.Thumb', parent: '<Switch>' });
  return ctx;
}
