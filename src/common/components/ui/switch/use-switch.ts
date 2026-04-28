import { useState } from 'react';

import { isFunction } from 'es-toolkit';

import { useControllable, type Store, useInteraction } from '@/common/hooks';

export type UseSwitchOptions = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export function useSwitch({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  disabled = false,
}: UseSwitchOptions = {}): Store<{ checked: boolean }> {
  const [checkedState, setChecked] = useControllable(checkedProp, defaultChecked, onChange);
  const [disabledState, setDisabled] = useState(disabled);
  const { state: interaction, handlers } = useInteraction({ disabled: disabledState });

  const state = { ...interaction, disabled: disabledState, checked: checkedState };

  return {
    handlers,
    get<T = typeof state>(selector?: (s: typeof state) => T): T {
      return (selector ? selector(state) : state) as T;
    },
    set(partialOrFn) {
      const p = isFunction(partialOrFn) ? partialOrFn(state) : partialOrFn;
      if (p.disabled != null) setDisabled(p.disabled);
      if (p.checked != null) setChecked(p.checked);
    },
  };
}

export type SwitchStore = ReturnType<typeof useSwitch>;
