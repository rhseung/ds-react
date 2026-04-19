import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps, StateMask } from '@/common/components/utils';
import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

import { useButton } from './use-button';

const button = tv({
  base: [
    'relative inline-flex items-center justify-center gap-2', // layout
    'rounded-lg', // shape
    'text-sm font-semibold', // typography
    'cursor-pointer transition-transform duration-fast ease-press data-active:scale-[0.98]',
    'data-disabled:cursor-not-allowed data-disabled:text-neutral-text-disabled',
  ],
  variants: {
    size: {
      default: 'px-5 py-2.5',
      icon: 'size-9',
    },
    variant: {
      solid: 'bg-accent text-on-accent data-disabled:bg-neutral-bg-disabled',
      'solid-elevated':
        'bg-accent text-on-accent data-disabled:bg-neutral-bg-disabled shadow-bevel data-active:translate-y-px data-active:shadow-bevel-active data-active:scale-100',
      outline:
        'inset-ring inset-ring-accent bg-transparent text-accent data-disabled:inset-ring-neutral-border data-disabled:bg-transparent',
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
    size: 'default',
  },
});

export function Button({
  asChild,
  variant = 'solid',
  tone = 'default',
  size = 'default',
  color,
  className,
  style,
  children,
  disabled,
  onClick,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  ...props
}: Button.Props) {
  const { handlers, dataProps } = useButton({
    disabled,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
  });

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      disabled={disabled}
      className={button({ variant, tone, size, className })}
      style={mergeObjects(color ? colorVars(color) : undefined, style)}
      {...props}
      {...dataProps}
      {...handlers}
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
