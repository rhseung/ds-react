import { type CSSProperties, type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import { type AccentProps, type RenderProp, colorVars, mergeObjects, resolveRenderProp, tv } from '@/common/utils';

import { useBadge } from './use-badge';

const badge = tv({
  base: 'inline-flex items-center rounded-md font-semibold',
  variants: {
    size: {
      sm: 'px-1.5 py-0 text-xs',
      md: 'px-2 py-0.5 text-xs',
      lg: 'px-2.5 py-1 text-sm',
    },
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
    size: 'md',
  },
});

export function Badge({
  variant = 'solid',
  tone = 'default',
  size: sizeProp,
  color,
  className,
  style,
  children,
  asChild = false,
  disabled,
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
}: Badge.Props) {
  const size = useComponentSize(sizeProp);
  const { state, handlers, dataProps } = useBadge({
    disabled,
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
  const Comp = asChild ? Slot : 'span';

  return (
    <SizeContext.Provider value={size}>
      <Comp
        className={badge({ variant, tone, size, className: resolveRenderProp(className, state) })}
        style={mergeObjects(color ? colorVars(color) : undefined, resolveRenderProp(style, state))}
        {...props}
        {...dataProps}
        {...handlers}
      >
        {resolveRenderProp(children, state)}
      </Comp>
    </SizeContext.Provider>
  );
}

export namespace Badge {
  export type State = ReturnType<typeof useBadge>['state'];

  export interface Props
    extends
      Omit<ComponentProps<'span'>, 'color' | 'className' | 'style' | 'children'>,
      Omit<VariantProps<typeof badge>, 'size'>,
      SlotProps<State>,
      AccentProps {
    size?: ComponentSize;
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
