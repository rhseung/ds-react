import { createContext, useContext } from 'react';

import { type StoreState } from '@/common/hooks';
import { IDSError } from '@/common/utils';

import { type RadioStore } from './use-radio';

interface RadioContextValue {
  state: StoreState<RadioStore>;
}

export const RadioContext = createContext<RadioContextValue | null>(null);

export function useRadioContext() {
  const ctx = useContext(RadioContext);
  if (!ctx) IDSError.throw('context/missing', { component: 'Radio.Indicator', parent: '<Radio>' });
  return ctx;
}
