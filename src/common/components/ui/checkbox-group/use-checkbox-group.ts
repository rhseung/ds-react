import { useState } from 'react';

import { union, without, xor } from 'es-toolkit';

export type CheckboxGroupState<T> = {
  values: readonly T[];
  allValues: readonly T[];
  toggle: (v: T) => void;
  toggleAll: () => void;
  register: (v: T) => void;
  unregister: (v: T) => void;
};

type UseCheckboxGroupOptions<T> = {
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
};

export function useCheckboxGroupState<T>({
  value: valueProp,
  defaultValue = [],
  onChange,
}: UseCheckboxGroupOptions<T> = {}): CheckboxGroupState<T> {
  const isControlled = valueProp !== undefined;
  const [internalValues, setInternalValues] = useState<T[]>(defaultValue);
  const [allValues, setAllValues] = useState<T[]>([]);
  const values = isControlled ? valueProp! : internalValues;

  function toggle(v: T) {
    const next = xor(values, [v]);
    if (!isControlled) setInternalValues(next);
    onChange?.(next);
  }

  function toggleAll() {
    const allChecked = allValues.length > 0 && values.length === allValues.length;
    const next = allChecked ? [] : [...allValues];
    if (!isControlled) setInternalValues(next);
    onChange?.(next);
  }

  function register(v: T) {
    setAllValues((prev) => union(prev, [v]));
  }

  function unregister(v: T) {
    setAllValues((prev) => without(prev, v));
  }

  return { values, allValues, toggle, toggleAll, register, unregister };
}
