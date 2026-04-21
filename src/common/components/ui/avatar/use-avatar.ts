import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

type UseAvatarOptions = UseInteractionOptions<HTMLElement>;

export function useAvatar({ disabled, ...eventHandlers }: UseAvatarOptions = {}) {
  const { state, handlers } = useInteraction<HTMLElement>({ disabled, ...eventHandlers });

  return {
    state,
    handlers,
    dataProps: interactionDataProps(state),
  };
}
