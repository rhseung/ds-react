import { createContext, useContext } from 'react';

import { type useCheckbox } from './use-checkbox';

interface CheckboxContextValue {
  state: ReturnType<ReturnType<typeof useCheckbox>['get']>;
}

export const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export function useCheckboxContext() {
  const ctx = useContext(CheckboxContext);
  if (!ctx) throw new Error('[IDS] Checkbox.Indicator must be used inside <Checkbox>');
  return ctx;
}
