import { createContext, useContext } from 'react';

import { IDSError } from '@/common/utils';

export type ImageStatus = 'idle' | 'loaded' | 'error';

interface AvatarContextValue {
  src?: string;
  alt?: string;
  imageStatus: ImageStatus;
  setImageStatus: (status: ImageStatus) => void;
}

export const AvatarContext = createContext<AvatarContextValue | null>(null);

export function useAvatarContext() {
  const ctx = useContext(AvatarContext);
  if (!ctx)
    IDSError.throw('context/missing', {
      component: 'Avatar.Image / Avatar.Fallback',
      parent: '<Avatar>',
    });
  return ctx;
}
