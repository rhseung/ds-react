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

import { button } from './styles';
import { useButton } from './use-button';

export function Button({
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
  const size = useComponentSize(localSize);
  const { state, handlers, dataProps } = useButton({
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

  const Comp = asChild ? Slot : 'button';

  return (
    <SizeContext.Provider value={size}>
      <Comp
        disabled={disabled}
        className={button({
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

export namespace Button {
  export type State = ReturnType<typeof useButton>['state'];

  export interface Props
    extends
      Omit<ComponentProps<'button'>, 'color' | 'className' | 'style' | 'children'>,
      Omit<VariantProps<typeof button>, 'size'>,
      SlotProps<State>,
      AccentProps {
    size?: ComponentSize;
    icon?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
