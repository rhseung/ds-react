import type { MouseEvent } from 'react';

import {
  interactionDataProps,
  useControllable,
  useInteraction,
  type UseInteractionOptions,
} from '@/common/hooks';

type UseToggleOptions = UseInteractionOptions<HTMLButtonElement> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function useToggle({
  disabled,
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  ...eventHandlers
}: UseToggleOptions = {}) {
  const { state, handlers } = useInteraction<HTMLButtonElement>({ disabled, ...eventHandlers });
  const [toggled, setToggled] = useControllable(pressed, defaultPressed, onPressedChange);
  const newState = { ...state, toggled };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setToggled((p) => !p);
    onClick?.(e);
  };

  return {
    state: newState,
    handlers: { ...handlers, onClick: handleClick },
    dataProps: interactionDataProps(newState),
  };
}
