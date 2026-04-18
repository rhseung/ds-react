import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

const badge = tv({
  base: 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold',
  variants: {
    variant: {
      solid: 'bg-neutral-text text-neutral-bg',
      outline: 'border border-neutral-border bg-transparent text-neutral-text-weak',
      ghost: 'bg-transparent text-neutral-text-weak',
    },
    tone: {
      default: '',
      weak: '',
      contrast: '',
    },
  },
  compoundVariants: [
    { tone: 'default', variant: 'solid', class: 'bg-accent text-on-accent' },
    { tone: 'default', variant: 'outline', class: 'border-accent text-accent' },
    { tone: 'default', variant: 'ghost', class: 'text-accent' },
    { tone: 'weak', variant: 'solid', class: 'bg-accent-weak text-on-accent-weak' },
    { tone: 'weak', variant: 'outline', class: 'border-accent-weak text-accent-weak' },
    { tone: 'weak', variant: 'ghost', class: 'text-accent-weak' },
    { tone: 'contrast', variant: 'solid', class: 'bg-accent-contrast text-on-accent-contrast' },
    { tone: 'contrast', variant: 'outline', class: 'border-accent-contrast text-accent-contrast' },
    { tone: 'contrast', variant: 'ghost', class: 'text-accent-contrast' },
  ],
  defaultVariants: {
    variant: 'solid',
    tone: 'default',
  },
});

export function Badge({
  variant = 'solid',
  tone = 'default',
  color,
  className,
  style,
  children,
  ...props
}: Badge.Props) {
  return (
    <span
      className={badge({ variant, tone, className })}
      style={mergeObjects(color ? colorVars(color) : undefined, style)}
      {...props}
    >
      {children}
    </span>
  );
}

export namespace Badge {
  export type Props = ComponentProps<'span'> & VariantProps<typeof badge> & AccentProps;
}
