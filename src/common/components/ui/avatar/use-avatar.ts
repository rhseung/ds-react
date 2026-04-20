import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

type UseAvatarOptions = UseInteractionOptions<HTMLImageElement>;

export function useAvatar({ disabled, ...eventHandlers }: UseAvatarOptions = {}) {
  const { state, handlers } = useInteraction<HTMLImageElement>({ disabled, ...eventHandlers });

  return {
    state,
    handlers,
    dataProps: interactionDataProps(state),
  };
}
