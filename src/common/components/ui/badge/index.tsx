import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { tv } from '@/common/utils';

const badge = tv({
  base: 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold',
  variants: {
    variant: {
      solid: '',
      soft: '',
      outline: 'border bg-transparent',
      ghost: 'bg-transparent',
    },
    color: {
      neutral: '',
      primary: '',
      info: '',
      success: '',
      danger: '',
      warning: '',
    },
  },
  compoundVariants: [
    // solid
    { variant: 'solid', color: 'neutral', class: 'bg-neutral-text text-neutral-bg' },
    { variant: 'solid', color: 'primary', class: 'bg-primary text-on-primary' },
    { variant: 'solid', color: 'info', class: 'bg-info text-on-info' },
    { variant: 'solid', color: 'success', class: 'bg-success text-on-success' },
    { variant: 'solid', color: 'danger', class: 'bg-danger text-on-danger' },
    { variant: 'solid', color: 'warning', class: 'bg-warning text-on-warning' },
    // soft
    { variant: 'soft', color: 'neutral', class: 'bg-neutral-bg-disabled text-neutral-text-weak' },
    { variant: 'soft', color: 'primary', class: 'bg-primary-weak text-on-primary-weak' },
    { variant: 'soft', color: 'info', class: 'bg-info-weak text-on-info-weak' },
    { variant: 'soft', color: 'success', class: 'bg-success-weak text-on-success-weak' },
    { variant: 'soft', color: 'danger', class: 'bg-danger-weak text-on-danger-weak' },
    { variant: 'soft', color: 'warning', class: 'bg-warning-weak text-on-warning-weak' },
    // outline
    { variant: 'outline', color: 'neutral', class: 'border-neutral-border text-neutral-text-weak' },
    { variant: 'outline', color: 'primary', class: 'border-primary text-primary' },
    { variant: 'outline', color: 'info', class: 'border-info text-info' },
    { variant: 'outline', color: 'success', class: 'border-success text-success' },
    { variant: 'outline', color: 'danger', class: 'border-danger text-danger' },
    { variant: 'outline', color: 'warning', class: 'border-warning text-warning' },
    // ghost
    { variant: 'ghost', color: 'neutral', class: 'text-neutral-text-weak' },
    { variant: 'ghost', color: 'primary', class: 'text-primary' },
    { variant: 'ghost', color: 'info', class: 'text-info' },
    { variant: 'ghost', color: 'success', class: 'text-success' },
    { variant: 'ghost', color: 'danger', class: 'text-danger' },
    { variant: 'ghost', color: 'warning', class: 'text-warning' },
  ],
  defaultVariants: {
    variant: 'soft',
    color: 'neutral',
  },
});

export function Badge({ variant, color, className, children, ...props }: Badge.Props) {
  return (
    <span className={badge({ variant, color, className })} {...props}>
      {children}
    </span>
  );
}

export namespace Badge {
  export type Props = ComponentProps<'span'> & VariantProps<typeof badge>;
}
