import { useState } from 'react';

import { isFunction } from 'es-toolkit';

import { useControllable, type Store, useInteraction } from '@/common/hooks';

export type UseTextFieldOptions = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

export function useTextField({
  value,
  defaultValue = '',
  onValueChange,
  disabled = false,
}: UseTextFieldOptions = {}): Store<{ value: string }> {
  const [valueState, setValue] = useControllable(value, defaultValue, onValueChange);
  const [disabledState, setDisabled] = useState(disabled);
  const { state: interaction, handlers } = useInteraction<HTMLDivElement>({
    disabled: disabledState,
  });

  const state = { ...interaction, disabled: disabledState, value: valueState };

  return {
    handlers,
    get<T = typeof state>(selector?: (s: typeof state) => T): T {
      return (selector ? selector(state) : state) as T;
    },
    set(partialOrFn) {
      const p = isFunction(partialOrFn) ? partialOrFn(state) : partialOrFn;
      if (p.disabled != null) setDisabled(p.disabled);
      if (p.value != null) setValue(p.value);
    },
  };
}

export type TextFieldStore = ReturnType<typeof useTextField>;
