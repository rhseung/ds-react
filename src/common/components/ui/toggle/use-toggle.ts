import { useState } from 'react';
import type { MouseEvent } from 'react';

import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

type UseToggleOptions = UseInteractionOptions<HTMLButtonElement> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function useToggle({
  disabled,
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  onClick,
  ...eventHandlers
}: UseToggleOptions = {}) {
  const isControlled = pressedProp !== undefined;
  const [internalToggled, setInternalToggled] = useState(defaultPressed);
  const toggled = isControlled ? pressedProp! : internalToggled;

  const { state, handlers } = useInteraction<HTMLButtonElement>({ disabled, ...eventHandlers });
  const newState = { ...state, toggled };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) setInternalToggled((p) => !p);
    onPressedChange?.(!toggled);
    onClick?.(e);
  };

  return {
    state: newState,
    handlers: { ...handlers, onClick: handleClick },
    dataProps: interactionDataProps(newState),
  };
}
