import { createContext, useContext } from 'react';

import { type StoreState } from '@/common/hooks';

import { type RadioStore } from './use-radio';

interface RadioContextValue {
  state: StoreState<RadioStore>;
}

export const RadioContext = createContext<RadioContextValue | null>(null);

export function useRadioContext() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error('[IDS] Radio.Indicator must be used inside <Radio>');
  return ctx;
}
