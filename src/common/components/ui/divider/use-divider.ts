import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

type UseDividerOptions = UseInteractionOptions<HTMLDivElement>;

export function useDivider({ disabled, ...eventHandlers }: UseDividerOptions = {}) {
  const { state, handlers } = useInteraction<HTMLDivElement>({ disabled, ...eventHandlers });

  return {
    state,
    handlers,
    dataProps: interactionDataProps(state),
  };
}
