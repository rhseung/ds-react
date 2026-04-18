import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps, StateMask } from '@/common/components/utils';
import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

const button = tv({
  base: [
    'relative inline-flex items-center justify-center gap-2', // layout
    'rounded-lg px-5 py-2.5', // shape
    'text-sm font-semibold', // typography
    'cursor-pointer transition-transform duration-fast ease-press enabled:active:scale-[0.98]', // interaction
    'disabled:cursor-not-allowed disabled:text-neutral-text-disabled', // disabled
  ],
  variants: {
    variant: {
      solid: 'bg-accent text-on-accent disabled:bg-neutral-bg-disabled',
      'solid-elevated':
        'bg-accent text-on-accent disabled:bg-neutral-bg-disabled shadow-bevel enabled:active:translate-y-px enabled:active:shadow-bevel-active enabled:active:scale-100',
      outline:
        'inset-ring inset-ring-accent bg-transparent text-accent disabled:inset-ring-neutral-border disabled:bg-transparent',
      ghost: 'bg-transparent text-accent',
    },
    tone: {
      default: '',
      weak: '',
      contrast: '',
    },
  },
  compoundVariants: [
    // soft tone
    { tone: 'weak', variant: 'solid', class: 'bg-accent-weak text-on-accent-weak' },
    { tone: 'weak', variant: 'solid-elevated', class: 'bg-accent-weak text-on-accent-weak' },
    { tone: 'weak', variant: 'outline', class: 'inset-ring-accent-weak text-accent-weak' },
    { tone: 'weak', variant: 'ghost', class: 'text-accent-weak' },
    // contrast tone
    { tone: 'contrast', variant: 'solid', class: 'bg-accent-contrast text-on-accent-contrast' },
    {
      tone: 'contrast',
      variant: 'solid-elevated',
      class: 'bg-accent-contrast text-on-accent-contrast',
    },
    {
      tone: 'contrast',
      variant: 'outline',
      class: 'inset-ring-accent-contrast text-accent-contrast',
    },
    { tone: 'contrast', variant: 'ghost', class: 'text-accent-contrast' },
  ],
  defaultVariants: {
    variant: 'solid',
    tone: 'default',
  },
});

export function Button({
  asChild,
  variant = 'solid',
  tone = 'default',
  color,
  className,
  style,
  children,
  ...props
}: Button.Props) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={button({ variant, tone, className })}
      style={mergeObjects(color ? colorVars(color) : undefined, style)}
      {...props}
    >
      {children}
      <StateMask />
    </Comp>
  );
}

export namespace Button {
  export type Props = ComponentProps<'button'> &
    VariantProps<typeof button> &
    SlotProps &
    AccentProps;
}
