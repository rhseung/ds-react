import { useCallback, useState } from 'react';

import { isFunction, union, without, xor } from 'es-toolkit';

import { useControllable, type GroupStore } from '@/common/hooks';

export type CheckboxGroupData<T> = {
  values: T[];
  allValues: T[];
};

export type CheckboxGroupStore<T> = GroupStore<CheckboxGroupData<T>> & {
  toggle: (v: T) => void;
  toggleAll: () => void;
  register: (v: T) => void;
  unregister: (v: T) => void;
};

export type UseCheckboxGroupOptions<T> = {
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
};

export function useCheckboxGroup<T>({
  value,
  defaultValue = [],
  onChange,
}: UseCheckboxGroupOptions<T> = {}): CheckboxGroupStore<T> {
  const [values, setValues] = useControllable(value, defaultValue, onChange);
  const [allValues, setAllValues] = useState<T[]>([]);

  const state: CheckboxGroupData<T> = { values, allValues };

  function toggle(v: T) {
    setValues(xor(values, [v]));
  }

  function toggleAll() {
    const allChecked = allValues.length > 0 && values.length === allValues.length;
    setValues(allChecked ? [] : [...allValues]);
  }

  const register = useCallback((v: T) => {
    setAllValues((prev) => union(prev, [v]));
  }, []);

  const unregister = useCallback((v: T) => {
    setAllValues((prev) => without(prev, v));
  }, []);

  return {
    get<R = typeof state>(selector?: (s: typeof state) => R): R {
      return (selector ? selector(state) : state) as R;
    },
    set(partialOrFn) {
      const p = isFunction(partialOrFn) ? partialOrFn(state) : partialOrFn;
      if (p.values != null) setValues(p.values);
    },
    toggle,
    toggleAll,
    register,
    unregister,
  };
}
