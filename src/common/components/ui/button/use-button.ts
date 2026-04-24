import { useState } from 'react';

import { isFunction } from 'es-toolkit';

import { type Store, useInteraction } from '@/common/hooks';

export type UseButtonOptions = {
  disabled?: boolean;
};

export function useButton({ disabled = false }: UseButtonOptions = {}): Store<{}> {
  const [disabledState, setDisabled] = useState(disabled);
  const { state: interaction, handlers } = useInteraction<HTMLButtonElement>({
    disabled: disabledState,
  });

  const state = { ...interaction, disabled: disabledState };

  return {
    handlers,
    get<T = typeof state>(selector?: (s: typeof state) => T): T {
      return (selector ? selector(state) : state) as T;
    },
    set(partialOrFn) {
      const p = isFunction(partialOrFn) ? partialOrFn(state) : partialOrFn;
      if (p.disabled != null) setDisabled(p.disabled);
    },
  };
}

export type ButtonStore = ReturnType<typeof useButton>;
