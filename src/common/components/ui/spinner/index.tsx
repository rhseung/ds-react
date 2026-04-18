import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

const spinner = tv({
  base: 'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
    tone: {
      default: 'text-accent',
      weak: 'text-accent-weak',
      contrast: 'text-accent-contrast',
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'default',
  },
});

export function Spinner({
  size = 'md',
  tone = 'default',
  color,
  className,
  style,
  ...props
}: Spinner.Props) {
  return (
    <span
      role="status"
      aria-label="로딩 중"
      className={spinner({ size, tone, className })}
      style={mergeObjects(color ? colorVars(color) : undefined, style)}
      {...props}
    />
  );
}

export namespace Spinner {
  export type Props = ComponentProps<'span'> & VariantProps<typeof spinner> & AccentProps;
}
