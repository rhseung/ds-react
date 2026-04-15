import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { tv } from '@/common/utils';

const divider = tv({
  base: 'shrink-0 bg-neutral-border',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export function Divider({ orientation, className, ...props }: Divider.Props) {
  return (
    <div
      role="separator"
      aria-orientation={orientation ?? 'horizontal'}
      className={divider({ orientation, className })}
      {...props}
    />
  );
}

export namespace Divider {
  export type Props = ComponentProps<'div'> & VariantProps<typeof divider>;
}
