import type { MouseEvent } from 'react';

import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

type UseButtonOptions = UseInteractionOptions<HTMLButtonElement> & {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function useButton({ disabled, onClick, ...eventHandlers }: UseButtonOptions = {}) {
  const { state, handlers } = useInteraction({ disabled, ...eventHandlers });

  return {
    state,
    handlers: { ...handlers, onClick },
    dataProps: interactionDataProps(state),
  };
}
