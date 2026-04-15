import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { tv } from '@/common/utils';

const textField = tv({
  base: 'w-full text-sm text-neutral-text outline-none transition-colors placeholder:text-neutral-text-weak disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      outline:
        'rounded-lg border border-neutral-border bg-neutral-bg px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20',
      filled:
        'rounded-lg border border-transparent bg-neutral-bg-disabled px-3 py-2 focus:border-primary focus:bg-neutral-bg focus:ring-2 focus:ring-primary/20',
      flushed:
        'rounded-none border-b border-neutral-border px-0 py-2 focus:border-primary focus:ring-0',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
});

export function TextField({ variant, className, ...props }: TextField.Props) {
  return <input className={textField({ variant, className })} {...props} />;
}

export namespace TextField {
  export type Props = Omit<ComponentProps<'input'>, 'size'> & VariantProps<typeof textField>;
}
