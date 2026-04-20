import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

type UseButtonOptions = UseInteractionOptions<HTMLButtonElement>;

export function useButton({ disabled, ...eventHandlers }: UseButtonOptions = {}) {
  const { state, handlers } = useInteraction({ disabled, ...eventHandlers });

  return {
    state,
    handlers,
    dataProps: interactionDataProps(state),
  };
}
