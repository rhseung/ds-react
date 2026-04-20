import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

type UseBadgeOptions = UseInteractionOptions<HTMLSpanElement>;

export function useBadge({ disabled, ...eventHandlers }: UseBadgeOptions = {}) {
  const { state, handlers } = useInteraction<HTMLSpanElement>({ disabled, ...eventHandlers });

  return {
    state,
    handlers,
    dataProps: interactionDataProps(state),
  };
}
