import { useState } from 'react';
import type { MouseEvent } from 'react';

import { useInteraction, type InteractionState, type UseInteractionOptions } from '@/common/hooks';

type UseToggleOptions = UseInteractionOptions<HTMLButtonElement> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export type UseToggleReturn = {
  state: InteractionState & { pressed: boolean };
  handlers: ReturnType<typeof useInteraction<HTMLButtonElement>>['handlers'] & {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  dataProps: {
    'data-pressed'?: true;
    'data-focused'?: true;
    'data-focus-visible'?: true;
  };
};

export function useToggle({
  disabled,
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  onClick,
  ...eventHandlers
}: UseToggleOptions = {}): UseToggleReturn {
  const isControlled = pressedProp !== undefined;
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const pressed = isControlled ? pressedProp! : internalPressed;

  const { state, handlers } = useInteraction({ disabled, ...eventHandlers });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) setInternalPressed((p) => !p);
    onPressedChange?.(!pressed);
    onClick?.(e);
  };

  return {
    state: { ...state, pressed },
    handlers: { ...handlers, onClick: handleClick },
    dataProps: {
      // data-pressed = toggle on/off state (persistent), not interaction active state
      ...(pressed && { 'data-pressed': true }),
      ...(state.focused && { 'data-focused': true }),
      ...(state.focusVisible && { 'data-focus-visible': true }),
    },
  };
}
