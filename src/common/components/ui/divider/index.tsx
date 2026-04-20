import { type CSSProperties, type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps } from '@/common/components/utils';
import { type RenderProp, resolveRenderProp, tv } from '@/common/utils';

import { useDivider } from './use-divider';

const divider = tv({
  base: 'shrink-0 bg-neutral-border',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export function Divider({
  orientation,
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
}: Divider.Props) {
  const { state, handlers, dataProps } = useDivider({
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
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      role="separator"
      aria-orientation={orientation ?? 'horizontal'}
      className={divider({ orientation, className: resolveRenderProp(className, state) })}
      style={resolveRenderProp(style, state)}
      {...props}
      {...dataProps}
      {...handlers}
    >
      {resolveRenderProp(children, state)}
    </Comp>
  );
}

export namespace Divider {
  export type State = ReturnType<typeof useDivider>['state'];

  export interface Props
    extends Omit<ComponentProps<'div'>, 'className' | 'style' | 'children'>,
      VariantProps<typeof divider>,
      SlotProps<State> {
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
