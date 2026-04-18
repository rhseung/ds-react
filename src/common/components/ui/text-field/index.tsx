import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

const textField = tv({
  base: 'w-full text-sm text-neutral-text outline-none transition-colors placeholder:text-neutral-text-weak disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      outline: 'rounded-lg border border-neutral-border bg-neutral-bg px-3 py-2',
      filled:
        'rounded-lg border border-transparent bg-neutral-bg-disabled px-3 py-2 focus:bg-neutral-bg',
      underline: 'rounded-none border-b border-neutral-border px-0 py-2',
    },
    tone: {
      default: '',
      weak: '',
      contrast: '',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      tone: 'default',
      class: 'focus:border-accent focus:ring-2 focus:ring-accent/20',
    },
    {
      variant: 'outline',
      tone: 'weak',
      class: 'focus:border-accent-weak focus:ring-2 focus:ring-accent-weak/20',
    },
    {
      variant: 'outline',
      tone: 'contrast',
      class: 'focus:border-accent-contrast focus:ring-2 focus:ring-accent-contrast/20',
    },
    {
      variant: 'filled',
      tone: 'default',
      class: 'focus:border-accent focus:ring-2 focus:ring-accent/20',
    },
    {
      variant: 'filled',
      tone: 'weak',
      class: 'focus:border-accent-weak focus:ring-2 focus:ring-accent-weak/20',
    },
    {
      variant: 'filled',
      tone: 'contrast',
      class: 'focus:border-accent-contrast focus:ring-2 focus:ring-accent-contrast/20',
    },
    { variant: 'underline', tone: 'default', class: 'focus:border-accent' },
    { variant: 'underline', tone: 'weak', class: 'focus:border-accent-weak' },
    { variant: 'underline', tone: 'contrast', class: 'focus:border-accent-contrast' },
  ],
  defaultVariants: {
    variant: 'outline',
    tone: 'default',
  },
});

export function TextField({
  variant = 'outline',
  tone = 'default',
  color,
  className,
  style,
  ...props
}: TextField.Props) {
  return (
    <input
      className={textField({ variant, tone, className })}
      style={mergeObjects(color ? colorVars(color) : undefined, style)}
      {...props}
    />
  );
}

export namespace TextField {
  export type Props = Omit<ComponentProps<'input'>, 'size'> &
    VariantProps<typeof textField> &
    AccentProps;
}
