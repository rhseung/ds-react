import { createContext, useContext } from 'react';

import { type StoreState } from '@/common/hooks';

import { type CheckboxStore } from './use-checkbox';

interface CheckboxContextValue {
  state: StoreState<CheckboxStore>;
}

export const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export function useCheckboxContext() {
  const ctx = useContext(CheckboxContext);
  if (!ctx) throw new Error('[IDS] Checkbox.Indicator must be used inside <Checkbox>');
  return ctx;
}
