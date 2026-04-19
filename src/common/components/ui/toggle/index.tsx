import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps, StateMask } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

import { useToggle } from './use-toggle';

const toggle = tv({
  base: [
    'relative inline-flex items-center justify-center',
    'rounded-lg',
    'font-semibold',
    'cursor-pointer transition-transform duration-fast ease-press data-active:scale-[0.98]',
    'data-disabled:cursor-not-allowed data-disabled:text-neutral-text-disabled',
  ],
  variants: {
    size: {
      sm: 'h-8 gap-1 px-2.5 text-xs',
      md: 'h-9 gap-1.5 px-3 text-sm',
      lg: 'h-10 gap-1.5 px-3 text-base',
    },
    icon: {
      true: '',
    },
    variant: {
      solid: 'bg-accent text-on-accent data-disabled:bg-neutral-bg-disabled',
      'solid-elevated':
        'bg-accent text-on-accent data-disabled:bg-neutral-bg-disabled shadow-bevel data-active:translate-y-px data-active:shadow-bevel-active data-active:scale-100 data-toggled:translate-y-px data-toggled:shadow-bevel-active',
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
    // icon sizes
    { icon: true, size: 'sm', class: 'size-8 px-0' },
    { icon: true, size: 'md', class: 'size-9 px-0' },
    { icon: true, size: 'lg', class: 'size-10 px-0' },
    // weak tone
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
    size: 'md',
  },
});

export function Toggle({
  asChild,
  variant = 'solid',
  tone = 'default',
  size: localSize,
  icon,
  color,
  className,
  style,
  children,
  disabled,
  pressed,
  defaultPressed,
  onPressedChange,
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
}: Toggle.Props) {
  const size = useComponentSize(localSize);
  const { state, handlers, dataProps } = useToggle({
    disabled,
    pressed: pressed,
    defaultPressed,
    onPressedChange,
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
    <SizeContext.Provider value={size}>
      <Comp
        type="button"
        aria-pressed={state.toggled}
        disabled={disabled}
        className={toggle({ variant, tone, size, icon, className })}
        style={mergeObjects(color ? colorVars(color) : undefined, style)}
        {...props}
        {...dataProps}
        {...handlers}
      >
        {children}
        <StateMask />
      </Comp>
    </SizeContext.Provider>
  );
}

export namespace Toggle {
  export interface Props
    extends Omit<ComponentProps<'button'>, 'color'>,
      Omit<VariantProps<typeof toggle>, 'size'>,
      SlotProps,
      AccentProps {
    size?: ComponentSize;
    icon?: boolean;
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  }
}
