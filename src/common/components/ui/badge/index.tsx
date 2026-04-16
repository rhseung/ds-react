import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { tv } from '@/common/utils';

const badge = tv({
  base: 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold',
  variants: {
    variant: {
      solid: 'bg-neutral-text text-neutral-bg',
      soft: 'bg-neutral-bg-disabled text-neutral-text-weak',
      outline: 'border border-neutral-border bg-transparent text-neutral-text-weak',
      ghost: 'bg-transparent text-neutral-text-weak',
    },
  },
  defaultVariants: {
    variant: 'soft',
  },
});

export function Badge({ variant, className, children, ...props }: Badge.Props) {
  return (
    <span className={badge({ variant, className })} {...props}>
      {children}
    </span>
  );
}

export namespace Badge {
  export type Props = ComponentProps<'span'> & VariantProps<typeof badge>;
}
