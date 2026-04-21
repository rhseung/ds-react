import { type CSSProperties, type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps, StateMask } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { toggle } from './styles';
import { useToggle } from './use-toggle';

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
  });

  const Comp = asChild ? Slot : 'button';

  return (
    <SizeContext.Provider value={size}>
      <Comp
        type="button"
        aria-pressed={state.toggled}
        disabled={disabled}
        className={toggle({
          variant,
          tone,
          size,
          icon,
          className: resolveRenderProp(className, state),
        })}
        style={mergeObjects(color ? colorVars(color) : undefined, resolveRenderProp(style, state))}
        {...props}
        {...dataProps}
        {...handlers}
      >
        {resolveRenderProp(children, state)}
        <StateMask />
      </Comp>
    </SizeContext.Provider>
  );
}

export namespace Toggle {
  export type State = ReturnType<typeof useToggle>['state'];

  export interface Props
    extends
      Omit<ComponentProps<'button'>, 'color' | 'className' | 'style' | 'children'>,
      Omit<VariantProps<typeof toggle>, 'size'>,
      SlotProps<State>,
      AccentProps {
    size?: ComponentSize;
    icon?: boolean;
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
