import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { tv } from '@/common/utils';

const spinner = tv({
  base: 'animate-spin rounded-full border-2 border-current border-t-transparent',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
    color: {
      primary: 'text-primary',
      neutral: 'text-neutral-text-weak',
      current: '',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

export function Spinner({ size, color, className, ...props }: Spinner.Props) {
  return (
    <span
      role="status"
      aria-label="로딩 중"
      className={spinner({ size, color, className })}
      {...props}
    />
  );
}

export namespace Spinner {
  export type Props = ComponentProps<'span'> & VariantProps<typeof spinner>;
}
