import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { tv } from '@/common/utils';

const spinner = tv({
  base: 'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function Spinner({ size = 'md', className, ...props }: Spinner.Props) {
  return (
    <span role="status" aria-label="로딩 중" className={spinner({ size, className })} {...props} />
  );
}

export namespace Spinner {
  export type Props = ComponentProps<'span'> & VariantProps<typeof spinner>;
}
