import { cn } from '@/common/utils';

import { useAvatarContext } from './context';

export function AvatarImage({ className }: AvatarImage.Props) {
  const { src, alt, imageStatus, setImageStatus } = useAvatarContext();

  if (!src || imageStatus === 'error') return null;

  return (
    <img
      src={src}
      alt={alt ?? ''}
      className={cn('size-full object-cover', className)}
      onLoad={() => setImageStatus('loaded')}
      onError={() => setImageStatus('error')}
    />
  );
}

export namespace AvatarImage {
  export interface Props {
    className?: string;
  }
}
