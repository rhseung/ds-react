import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize } from '@/common/hooks';

import { useAvatarContext } from './context';

export function AvatarFallback({ asChild = false, children }: AvatarFallback.Props) {
  const { imageStatus } = useAvatarContext();
  const size = useComponentSize();

  if (imageStatus === 'loaded') return null;

  return (
    <SizeContext.Provider value={size}>
      {asChild ? <Slot>{children}</Slot> : children}
    </SizeContext.Provider>
  );
}

export namespace AvatarFallback {
  export type Props = SlotProps;
}
