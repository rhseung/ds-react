import { createContext, useContext } from 'react';

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
  if (!ctx) throw new Error('[IDS] Avatar.Image and Avatar.Fallback must be used inside <Avatar>');
  return ctx;
}
