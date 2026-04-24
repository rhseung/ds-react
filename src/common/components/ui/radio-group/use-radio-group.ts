import { useState } from 'react';

import { isFunction } from 'es-toolkit';

import { type GroupStore } from '@/common/hooks';

export type RadioGroupData<T> = {
  value: T | undefined;
};

export type RadioGroupStore<T> = GroupStore<RadioGroupData<T>> & {
  select: (v: T) => void;
};

export type UseRadioGroupOptions<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
};

export function useRadioGroup<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseRadioGroupOptions<T> = {}): RadioGroupStore<T> {
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const state: RadioGroupData<T> = { value };

  function select(v: T) {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  }

  return {
    get<R = typeof state>(selector?: (s: typeof state) => R): R {
      return (selector ? selector(state) : state) as R;
    },
    set(partialOrFn) {
      const p = isFunction(partialOrFn) ? partialOrFn(state) : partialOrFn;
      if (p.value !== undefined) select(p.value as T);
    },
    select,
  };
}
