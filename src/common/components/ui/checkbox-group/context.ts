import { createContext, useState } from 'react';

import { union, without, xor } from 'es-toolkit';

import { useControllable } from '@/common/hooks';

export type CheckboxGroupContext<T> = {
  values: readonly T[];
  allValues: readonly T[];
  toggle: (v: T) => void;
  toggleAll: () => void;
  register: (v: T) => void;
  unregister: (v: T) => void;
};

type UseCheckboxGroupContextOptions<T> = {
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
};

export function useCheckboxGroupContextValue<T>({
  value,
  defaultValue = [],
  onChange,
}: UseCheckboxGroupContextOptions<T> = {}): CheckboxGroupContext<T> {
  const [values, setValues] = useControllable(value, defaultValue, onChange);
  const [allValues, setAllValues] = useState<T[]>([]);

  function toggle(v: T) {
    setValues(xor(values, [v]));
  }

  function toggleAll() {
    const allChecked = allValues.length > 0 && values.length === allValues.length;
    setValues(allChecked ? [] : [...allValues]);
  }

  function register(v: T) {
    setAllValues((prev) => union(prev, [v]));
  }

  function unregister(v: T) {
    setAllValues((prev) => without(prev, v));
  }

  return { values, allValues, toggle, toggleAll, register, unregister };
}

export const CheckboxGroupContext = createContext<CheckboxGroupContext<unknown> | null>(null);
