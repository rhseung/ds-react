import { createContext, useContext } from 'react';

import { IDSError } from '@/common/utils';

import { type CheckboxGroupStore } from './use-checkbox-group';

export const CheckboxGroupContext = createContext<CheckboxGroupStore<unknown> | null>(null);

export function useCheckboxGroupContext<T>(): CheckboxGroupStore<T> {
  const ctx = useContext(CheckboxGroupContext);
  if (!ctx)
    IDSError.throw('context/missing', {
      component: 'CheckboxGroup.Item / CheckboxGroup.All',
      parent: '<CheckboxGroup>',
    });
  return ctx as CheckboxGroupStore<T>;
}
