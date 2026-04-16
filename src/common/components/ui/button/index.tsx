import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, StateMask } from '@/common/components/utils';
import { tv } from '@/common/utils';

const button = tv({
  base: [
    // TODO: trigger 이 방식 별로
    StateMask.trigger,
    'inline-flex items-center justify-center gap-2 cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold transition-all enabled:active:scale-[0.98]',
    'disabled:cursor-not-allowed disabled:text-neutral-text-disabled',
  ],
  variants: {
    variant: {
      solid: 'bg-primary text-on-primary disabled:bg-neutral-bg-disabled',
      'solid-elevated':
        'bg-primary text-on-primary disabled:bg-neutral-bg-disabled shadow-bevel enabled:active:translate-y-px enabled:active:shadow-bevel-active enabled:active:scale-100',
      soft: 'bg-primary-weak text-on-primary-weak disabled:bg-neutral-bg-disabled',
      'soft-elevated':
        'bg-primary-weak text-on-primary-weak disabled:bg-neutral-bg-disabled shadow-bevel enabled:active:translate-y-px enabled:active:shadow-bevel-active enabled:active:scale-100',
      outline:
        'inset-ring inset-ring-primary bg-transparent text-primary disabled:inset-ring-neutral-border disabled:bg-transparent',
      ghost: 'bg-transparent text-primary',
    },
    contrast: {
      true: '',
    },
  },
  compoundVariants: [
    { variant: 'solid', contrast: true, class: 'bg-primary-contrast text-on-primary-contrast' },
    {
      variant: 'solid-elevated',
      contrast: true,
      class: 'bg-primary-contrast text-on-primary-contrast',
    },
    { variant: 'soft', contrast: true, class: 'bg-primary-contrast text-on-primary-contrast' },
    {
      variant: 'soft-elevated',
      contrast: true,
      class: 'bg-primary-contrast text-on-primary-contrast',
    },
    {
      variant: 'outline',
      contrast: true,
      class: 'inset-ring-primary-contrast text-primary-contrast',
    },
    { variant: 'ghost', contrast: true, class: 'text-primary-contrast' },
  ],
  defaultVariants: {
    variant: 'solid',
  },
});

export function Button({
  asChild,
  variant,
  contrast,
  className,
  children,
  ...props
}: Button.Props) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={button({ variant, contrast, className })} {...props}>
      {children}
      <StateMask />
    </Comp>
  );
}

export namespace Button {
  export type Props = ComponentProps<'button'> &
    VariantProps<typeof button> & { asChild?: boolean };
}
