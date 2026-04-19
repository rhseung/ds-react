import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { useComponentSize, type ComponentSize } from '@/common/hooks';
import { tv } from '@/common/utils';

const spinner = tv({
  base: 'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-4.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function Spinner({ size: sizeProp, className, ...props }: Spinner.Props) {
  const size = useComponentSize(sizeProp);

  return (
    <span role="status" aria-label="로딩 중" className={spinner({ size, className })} {...props} />
  );
}

export namespace Spinner {
  export interface Props
    extends ComponentProps<'span'>, Omit<VariantProps<typeof spinner>, 'size'> {
    size?: ComponentSize;
  }
}
