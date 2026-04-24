import { createContext, useContext } from 'react';

import { IDSError } from '@/common/utils';

import { type RadioGroupStore } from './use-radio-group';

export const RadioGroupContext = createContext<RadioGroupStore<unknown> | null>(null);

export function useRadioGroupContext<T>(): RadioGroupStore<T> {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) IDSError.throw('context/missing', { component: 'RadioGroup.Item', parent: '<RadioGroup>' });
  return ctx as RadioGroupStore<T>;
}
