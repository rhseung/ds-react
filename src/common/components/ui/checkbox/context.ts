import { createContext, useContext } from 'react';

import { type StoreState } from '@/common/hooks';
import { IDSError } from '@/common/utils';

import { type CheckboxStore } from './use-checkbox';

interface CheckboxContextValue {
  state: StoreState<CheckboxStore>;
}

export const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export function useCheckboxContext() {
  const ctx = useContext(CheckboxContext);
  if (!ctx)
    IDSError.throw('context/missing', { component: 'Checkbox.Indicator', parent: '<Checkbox>' });
  return ctx;
}
