import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

type UseSpinnerOptions = UseInteractionOptions<HTMLSpanElement>;

export function useSpinner({ disabled, ...eventHandlers }: UseSpinnerOptions = {}) {
  const { state, handlers } = useInteraction<HTMLSpanElement>({ disabled, ...eventHandlers });

  return {
    state,
    handlers,
    dataProps: interactionDataProps(state),
  };
}
