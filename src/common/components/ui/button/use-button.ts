import type { MouseEvent } from 'react';

import { useInteraction, type InteractionState, type UseInteractionOptions } from '@/common/hooks';

type UseButtonOptions = UseInteractionOptions<HTMLButtonElement> & {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export type UseButtonReturn = {
  state: InteractionState;
  handlers: ReturnType<typeof useInteraction<HTMLButtonElement>>['handlers'] & {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  dataProps: {
    'data-hovered'?: true;
    'data-pressed'?: true;
    'data-focused'?: true;
    'data-focus-visible'?: true;
  };
};

export function useButton({
  disabled,
  onClick,
  ...eventHandlers
}: UseButtonOptions = {}): UseButtonReturn {
  const { state, handlers } = useInteraction({ disabled, ...eventHandlers });

  return {
    state,
    handlers: { ...handlers, onClick },
    dataProps: {
      ...(state.hovered && { 'data-hovered': true }),
      ...(state.active && { 'data-pressed': true }),
      ...(state.focused && { 'data-focused': true }),
      ...(state.focusVisible && { 'data-focus-visible': true }),
    },
  };
}
