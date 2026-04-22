import { useState } from 'react';

import { isFunction } from 'es-toolkit';

import { useControllable, type Store, useInteraction } from '@/common/hooks';

export type UseToggleOptions = {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
};

export function useToggle({
  pressed,
  defaultPressed = false,
  onPressedChange,
  disabled = false,
}: UseToggleOptions = {}): Store<{ toggled: boolean }> {
  const [toggled, setToggled] = useControllable(pressed, defaultPressed, onPressedChange);
  const [disabledState, setDisabled] = useState(disabled);
  const { state: interaction, handlers } = useInteraction<HTMLButtonElement>({
    disabled: disabledState,
  });

  const state = { ...interaction, disabled: disabledState, toggled };

  return {
    handlers,
    get<T = typeof state>(selector?: (s: typeof state) => T): T {
      return (selector ? selector(state) : state) as T;
    },
    set(partialOrFn) {
      const p = isFunction(partialOrFn) ? partialOrFn(state) : partialOrFn;
      if (p.disabled != null) setDisabled(p.disabled);
      if (p.toggled != null) setToggled(p.toggled);
    },
  };
}

export type ToggleStore = ReturnType<typeof useToggle>;
