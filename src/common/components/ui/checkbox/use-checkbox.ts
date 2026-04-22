import { useState } from 'react';

import { isFunction } from 'es-toolkit';

import { useControllable, type Store, useInteraction } from '@/common/hooks';

export type UseCheckboxOptions = {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export function useCheckbox({
  checked: checkedProp,
  defaultChecked = false,
  indeterminate,
  disabled = false,
  onChange,
}: UseCheckboxOptions = {}): Store<{ checked: boolean; indeterminate: boolean }> {
  const [checkedState, setChecked] = useControllable(checkedProp, defaultChecked, onChange);
  const [indeterminateState, setIndeterminate] = useControllable(indeterminate, false, undefined);
  const [disabledState, setDisabled] = useState(disabled);
  const { state: interaction, handlers } = useInteraction({ disabled: disabledState });

  const state = {
    ...interaction,
    disabled: disabledState,
    checked: checkedState,
    indeterminate: indeterminateState,
  };

  return {
    handlers,
    get<T = typeof state>(selector?: (s: typeof state) => T): T {
      return (selector ? selector(state) : state) as T;
    },
    set(partialOrFn) {
      const p = isFunction(partialOrFn) ? partialOrFn(state) : partialOrFn;
      if (p.disabled != null) setDisabled(p.disabled);
      if (p.checked != null) setChecked(p.checked);
      if (p.indeterminate != null) setIndeterminate(p.indeterminate);
    },
  };
}

export type CheckboxStore = ReturnType<typeof useCheckbox>;
