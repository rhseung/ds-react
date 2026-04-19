import { type ComponentProps } from 'react';

import { useComponentSize, type ComponentSize } from '@/common/hooks';
import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

const avatar = tv({
  base: 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold',
  variants: {
    size: {
      sm: 'size-6 text-xs',
      md: 'size-8 text-sm',
      lg: 'size-10 text-base',
    },
    tone: {
      default: 'bg-accent text-on-accent',
      weak: 'bg-accent-weak text-on-accent-weak',
      contrast: 'bg-accent-contrast text-on-accent-contrast',
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'default',
  },
});

export function Avatar({
  src,
  name,
  alt,
  size: localSize,
  tone = 'default',
  color,
  className,
  style,
  ...props
}: Avatar.Props) {
  const size = useComponentSize(localSize);
  const cls = avatar({ size, tone, className });
  const styles = mergeObjects(color ? colorVars(color) : undefined, style);
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return src ? (
    <img src={src} alt={alt ?? name ?? ''} className={cls} style={styles} {...props} />
  ) : (
    <span className={cls} style={styles} {...props}>
      {initials}
    </span>
  );
}

export namespace Avatar {
  export interface Props extends Omit<ComponentProps<'img'>, 'color'>, AccentProps {
    size?: ComponentSize;
    tone?: 'default' | 'weak' | 'contrast';
    name?: string;
  }
}
