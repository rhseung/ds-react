import { type CSSProperties, type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { badge } from './styles';
import { useBadge } from './use-badge';

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
