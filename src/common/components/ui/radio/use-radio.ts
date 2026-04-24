import { useState } from 'react';

import { isFunction } from 'es-toolkit';

import { useControllable, useInteraction, type Store } from '@/common/hooks';

export type UseRadioOptions = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export function useRadio({
  checked: checkedProp,
  defaultChecked = false,
  disabled = false,
  onChange,
}: UseRadioOptions = {}): Store<{ checked: boolean }> {
  const [checkedState, setChecked] = useControllable(checkedProp, defaultChecked, onChange);
  const [disabledState, setDisabled] = useState(disabled);
  const { state: interaction, handlers } = useInteraction({ disabled: disabledState });

  const state = {
    ...interaction,
    disabled: disabledState,
    checked: checkedState,
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
    },
  };
}

export type RadioStore = ReturnType<typeof useRadio>;
